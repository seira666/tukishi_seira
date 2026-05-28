//===============================================================
// Masonry + Fancybox
//===============================================================
$(function () {

  const $grid = $('.masonry-grid');

  if ($grid.length) {

    //===========================================================
    // タッチ端末判定
    //===========================================================
    const isTouchDevice =
      ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0);

    //===========================================================
    // PCのみ hover動画再生
    //===========================================================
    if (!isTouchDevice) {

      $grid.on('mouseenter', '.is-video video', function () {

        this.play();

      });

      $grid.on('mouseleave', '.is-video video', function () {

        this.pause();

      });

    }

    //===========================================================
    // Masonry
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
      toolbar: false
    });

  }

});


//===============================================================
// 背景動画 autoplay 完全版
// PC / iPhone / Safari / Chrome 対応
//===============================================================
window.addEventListener("load", () => {

  const videos =
    document.querySelectorAll("#mainimg video");

  if (!videos.length) return;

  videos.forEach(video => {

    //===========================================================
    // 強制属性
    //===========================================================
    video.muted = true;
    video.defaultMuted = true;

    video.autoplay = true;
    video.loop = true;

    video.playsInline = true;

    video.setAttribute("muted", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("loop", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    //===========================================================
    // preload
    //===========================================================
    video.preload = "auto";

    //===========================================================
    // 読み込み
    //===========================================================
    video.load();

    //===========================================================
    // 再生関数
    //===========================================================
    const startVideo = () => {

      const playPromise = video.play();

      if (playPromise !== undefined) {

        playPromise
          .then(() => {

            console.log("VIDEO PLAY OK");

          })
          .catch(error => {

            console.log("VIDEO PLAY BLOCKED", error);

          });

      }

    };

    //===========================================================
    // 初回再生
    //===========================================================
    startVideo();

    //===========================================================
    // iPhoneタップ後再生
    //===========================================================
    document.addEventListener(
      "touchstart",
      startVideo,
      { passive:true }
    );

    //===========================================================
    // PCクリック後再生
    //===========================================================
    document.addEventListener(
      "click",
      startVideo
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

  });

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

  }, 3200);

});