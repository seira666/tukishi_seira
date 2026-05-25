//===============================================================
// Masonry + Fancybox + 動画ホバー処理（iPhone完全安定版）
//===============================================================
$(function () {

  const $grid = $('.masonry-grid');

  if ($grid.length) {

    // タッチ端末判定
    const isTouchDevice =
      ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0);

    // ============================================================
    // PCのみ hover 動画再生
    // ============================================================
    if (!isTouchDevice) {

      $grid.on('mouseenter', '.is-video video', function () {
        this.play();
      });

      $grid.on('mouseleave', '.is-video video', function () {
        this.pause();
      });

    }

    // ============================================================
    // Masonry初期化
    // ============================================================
    $grid.imagesLoaded(function () {

      $grid.masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: 16
      });

    });

    // ============================================================
    // レイアウト更新
    // ============================================================
    $grid.imagesLoaded().progress(function () {
      $grid.masonry('layout');
    });

    // ============================================================
    // Fancybox
    // ============================================================
    $('[data-fancybox]').fancybox({
      loop: true,
      smallBtn: true,
      toolbar: false
    });

  }

});


//===============================================================
// iPhone Safari 背景動画 autoplay 完全対策
//===============================================================
document.addEventListener("DOMContentLoaded", () => {

  // 背景動画のみ対象
  const videos = document.querySelectorAll("#mainimg video");

  if (!videos.length) return;

  videos.forEach(video => {

    // =========================================
    // iPhone Safari 必須設定
    // =========================================
    video.muted = true;
    video.defaultMuted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;

    // 属性強制付与
    video.setAttribute("muted", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("loop", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    // 読み込み
    video.load();

    // =========================================
    // 再生処理
    // =========================================
    const playVideo = () => {

      const promise = video.play();

      if (promise !== undefined) {

        promise
          .then(() => {

            console.log("Background video autoplay OK");

          })
          .catch(() => {

            console.log("Autoplay blocked");

          });

      }

    };

    // 初回再生
    playVideo();

    // iPhoneで停止した時の復帰
    document.addEventListener("touchstart", playVideo, { passive: true });

    // Safariが裏復帰した時
    document.addEventListener("visibilitychange", () => {

      if (!document.hidden) {
        playVideo();
      }

    });

  });

});

//===============================================================
// iPhone Safari autoplay 完全対策
//===============================================================
document.addEventListener("DOMContentLoaded", () => {

  const videos = document.querySelectorAll("#mainimg video");

  videos.forEach(video => {

    // Safari用
    video.muted = true;
    video.defaultMuted = true;

    video.playsInline = true;

    video.setAttribute("muted", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    // 強制ロード
    video.load();

    // 再生
    const playVideo = () => {

      const promise = video.play();

      if (promise !== undefined) {

        promise
          .then(() => {
            console.log("Autoplay success");
          })
          .catch(() => {
            console.log("Autoplay blocked");
          });

      }

    };

    // 初回再生
    playVideo();

    // iPhone用保険
    document.addEventListener(
      "touchstart",
      playVideo,
      { once: true }
    );

  });

});