//===============================================================
// Masonry + Fancybox + Video
// 完全完成版
//===============================================================

$(function () {

  const $grid = $('.masonry-grid');

  //===========================================================
  // Masonry
  //===========================================================
  if ($grid.length) {

    // タッチ端末判定
    const isTouchDevice =
      ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0);

    //===========================================================
    // PC hover動画再生
    //===========================================================
    if (!isTouchDevice) {

      $grid.on(
        'mouseenter',
        '.is-video video',
        function () {

          this.muted = true;

          const playPromise =
            this.play();

          if (playPromise !== undefined) {

            playPromise.catch(() => {});

          }

        }
      );

      $grid.on(
        'mouseleave',
        '.is-video video',
        function () {

          this.pause();

          this.currentTime = 0;

        }
      );

    }

    //===========================================================
    // Masonry初期化
    //===========================================================
    $grid.imagesLoaded(function () {

      $grid.masonry({

        itemSelector: '.grid-item',

        columnWidth: '.grid-sizer',

        percentPosition: true,

        gutter: 16

      });

    });

    //===========================================================
    // layout更新
    //===========================================================
    $grid.imagesLoaded().progress(function () {

      $grid.masonry('layout');

    });

    //===========================================================
    // Fancybox
    //===========================================================
    $('[data-fancybox]').fancybox({

      loop: true,

      smallBtn: true,

      toolbar: false,

      protect: true

    });

  }

});


//===============================================================
// 背景動画 autoplay 完全版
// PC / iPhone / Safari / Chrome
//===============================================================
window.addEventListener("load", () => {

  //===========================================================
  // loading後に再生
  //===========================================================
  setTimeout(() => {

    const isSP =
      window.innerWidth <= 600;

    //===========================================================
    // 使用動画
    //===========================================================
    const targetVideo =
      document.querySelector(
        isSP
        ? "#mainimg .video-sp"
        : "#mainimg .video-pc"
      );

    if (!targetVideo) return;

    //===========================================================
    // 非使用動画停止
    //===========================================================
    const allVideos =
      document.querySelectorAll("#mainimg video");

    allVideos.forEach(video => {

      if (video !== targetVideo) {

        video.pause();

        video.style.display = "none";

      }

    });

    //===========================================================
    // Safari autoplay対策
    //===========================================================
    targetVideo.muted = true;
    targetVideo.defaultMuted = true;

    targetVideo.autoplay = true;
    targetVideo.loop = true;

    targetVideo.playsInline = true;

    targetVideo.setAttribute("muted", "");
    targetVideo.setAttribute("autoplay", "");
    targetVideo.setAttribute("loop", "");
    targetVideo.setAttribute("playsinline", "");
    targetVideo.setAttribute("webkit-playsinline", "");

    //===========================================================
    // preload
    //===========================================================
    targetVideo.preload = "auto";

    //===========================================================
    // 強制表示
    //===========================================================
    targetVideo.style.opacity = "1";

    targetVideo.style.visibility = "visible";

    targetVideo.style.display = "block";

    //===========================================================
    // load
    //===========================================================
    targetVideo.load();

    //===========================================================
    // 再生関数
    //===========================================================
    const startVideo = () => {

      const playPromise =
        targetVideo.play();

      if (playPromise !== undefined) {

        playPromise
          .then(() => {

            console.log("BACKGROUND VIDEO PLAY OK");

          })
          .catch(error => {

            console.log(
              "BACKGROUND VIDEO BLOCKED",
              error
            );

          });

      }

    };

    //===========================================================
    // 初回再生
    //===========================================================
    startVideo();

    //===========================================================
    // PC操作後
    //===========================================================
    document.addEventListener(
      "mousemove",
      startVideo,
      { once:true }
    );

    //===========================================================
    // iPhone操作後
    //===========================================================
    document.addEventListener(
      "touchstart",
      startVideo,
      { once:true }
    );

    //===========================================================
    // click後
    //===========================================================
    document.addEventListener(
      "click",
      startVideo,
      { once:true }
    );

    //===========================================================
    // タブ復帰
    //===========================================================
    document.addEventListener(
      "visibilitychange",
      () => {

        if (!document.hidden) {

          startVideo();

        }

      }
    );

  }, 300);

});


//===============================================================
// Loading
//===============================================================
window.addEventListener("load", () => {

  setTimeout(() => {

    const loading =
      document.getElementById("loading");

    if (loading) {

      loading.classList.add("hide");

    }

  }, 2500);

});


//===============================================================
// resize時 動画切替
//===============================================================
window.addEventListener("resize", () => {

  clearTimeout(window.__videoResizeTimer);

  window.__videoResizeTimer =
    setTimeout(() => {

      location.reload();

    }, 300);

});