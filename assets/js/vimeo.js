const vimeoRef = document.querySelector('.vimeo');
const vimeoIframeRef = document.querySelector('.vimeo .vimeo-container iframe');
const vimeoFirstClickRef = document.querySelector('.vimeo .vimeo-container .first-click');
const vimeoPlayPauseRef = document.querySelector('.vimeo .vimeo-container .vimeo-play-pause-button .vimeo-play-pause');
const vimeoPlayPausePlayRef = document.querySelector('.vimeo .vimeo-container .vimeo-play-pause-button .vimeo-play-pause .play');
const vimeoPlayPausePauseRef = document.querySelector('.vimeo .vimeo-container .vimeo-play-pause-button .vimeo-play-pause .pause');
const vimeoControlsRef = document.querySelector('.vimeo .vimeo-container .vimeo-controls');
const vimeoControlsPlayRef = document.querySelector('.vimeo .vimeo-container .vimeo-controls .play');
const vimeoControlsPauseRef = document.querySelector('.vimeo .vimeo-container .vimeo-controls .pause');
const vimeoControlsMuteRef = document.querySelector('.vimeo .vimeo-container .vimeo-controls .mute');
const vimeoControlsUnmuteRef = document.querySelector('.vimeo .vimeo-container .vimeo-controls .unmute');
const vimeoControlsFullscreenRef = document.querySelector('.vimeo .vimeo-container .vimeo-controls .fullscreen');
const vimeoProgressRef = document.querySelector('.vimeo .vimeo-container .vimeo-progress');
const vimeoProgressValueRef = document.querySelector('.vimeo .vimeo-container .vimeo-progress .vimeo-progress-value');

vimeoIframeRef.setAttribute('frameborder', '0');
vimeoIframeRef.setAttribute('allow', 'autoplay; fullscreen; encrypted-media');
vimeoIframeRef.setAttribute('src', `https://player.vimeo.com/video/${vimeoIframeRef.getAttribute('vimeo')}?background=0&title=0&byline=0&portrait=0&controls=0&autoplay=1&muted=1`);
vimeoFirstClickRef.classList.add('visible');

const player = new Vimeo.Player(vimeoIframeRef);

player.ready().then(() => {
  let isFirstClick = true;

  const onClickPlayPause = async () => {
    if (isFirstClick) {
      isFirstClick = false;
      await player.setMuted(false);

      const savedTime = parseFloat(localStorage.getItem('vimeo-current-time'));
      if (!isNaN(savedTime)) {
        await player.setCurrentTime(savedTime);
      } else {
        await player.setCurrentTime(0);
      }

      await player.setVolume(1);
      vimeoFirstClickRef.classList.remove('visible');
      vimeoControlsRef.classList.add('visible');

      vimeoControlsPauseRef.classList.add('visible');
      vimeoControlsMuteRef.classList.add('visible');
      vimeoControlsFullscreenRef.classList.add('visible');
      vimeoProgressRef.classList.add('visible');

      vimeoPlayPausePauseRef.style.display = 'none';
      player.play();
    } else {
      const isVideoPaused = await player.getPaused();
      if (isVideoPaused) {
        player.play();

        vimeoPlayPausePauseRef.style.display = 'none';
        vimeoPlayPausePauseRef.classList.remove('visible');

        vimeoPlayPausePlayRef.style.display = 'block';
        vimeoPlayPausePlayRef.classList.add('visible');

        setTimeout(() => {
          vimeoPlayPausePlayRef.classList.remove('visible');
        }, 100);

        vimeoControlsPlayRef.classList.remove('visible');
        vimeoControlsPauseRef.classList.add('visible');
      } else {
        player.pause();

        vimeoPlayPausePlayRef.style.display = 'none';
        vimeoPlayPausePlayRef.classList.remove('visible');

        vimeoPlayPausePauseRef.style.display = 'block';
        vimeoPlayPausePauseRef.classList.add('visible');

        setTimeout(() => {
          vimeoPlayPausePauseRef.classList.remove('visible');
        }, 100);

        vimeoControlsPauseRef.classList.remove('visible');
        vimeoControlsPlayRef.classList.add('visible');
      }
    }
  };

  const onClickMuteUnmute = async () => {
    const volume = await player.getVolume();

    if (volume > 0) {
      await player.setMuted(true);
      await player.setVolume(0);
      vimeoControlsMuteRef.classList.remove('visible');
      vimeoControlsUnmuteRef.classList.add('visible');
    } else {
      await player.setMuted(false);
      await player.setVolume(1);

      vimeoControlsMuteRef.classList.add('visible');
      vimeoControlsUnmuteRef.classList.remove('visible');
    }
  };

  const onClickFullScreenToggle = () => {
    if (vimeoRef.classList.contains('fullscreen')) {
      vimeoRef.classList.remove('fullscreen');
      document.body.classList.remove('fullscreen');

      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      vimeoRef.classList.add('fullscreen');
      document.body.classList.add('fullscreen');

      if (document.body.requestFullscreen) {
        document.body.requestFullscreen();
      } else if (document.body.webkitRequestFullscreen) {
        document.body.webkitRequestFullscreen();
      } else if (document.body.msRequestFullscreen) {
        document.body.msRequestFullscreen();
      }
    }
  };

  vimeoPlayPauseRef.addEventListener('click', onClickPlayPause);
  vimeoControlsPlayRef.addEventListener('click', onClickPlayPause);
  vimeoControlsPauseRef.addEventListener('click', onClickPlayPause);
  vimeoControlsMuteRef.addEventListener('click', onClickMuteUnmute);
  vimeoControlsUnmuteRef.addEventListener('click', onClickMuteUnmute);
  vimeoControlsFullscreenRef.addEventListener('click', onClickFullScreenToggle);

  player.on('timeupdate', data => {
    if (!isFirstClick) {
      localStorage.setItem('vimeo-current-time', data.seconds);
      vimeoProgressValueRef.style.width = `${data.percent * 100}%`;
    }
  });

  player.on('ended', () => {
    player.setCurrentTime(0);

    if (isFirstClick) {
      player.play();
    } else {
      vimeoControlsPauseRef.classList.remove('visible');
      vimeoControlsPlayRef.classList.add('visible');

      if (vimeoRef.classList.contains('fullscreen')) {
        onClickFullScreenToggle();
      }
    }
  });
});

// const lastSecond = localStorage.setItem();