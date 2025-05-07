const vimeoRef = document.querySelector('.vimeo');
const vimeoIframeRef = document.querySelector('.vimeo .vimeo-container iframe');
const vimeoFirstClickRef = document.querySelector('.vimeo .vimeo-container .first-click');
const vimeoFirstClickBoxPRef = document.querySelector('.vimeo .vimeo-container .first-click .first-click-box p');
const vimeoPlayPauseRef = document.querySelector('.vimeo .vimeo-container .vimeo-play-pause-button .vimeo-play-pause');
const vimeoPlayPausePlayRef = document.querySelector('.vimeo .vimeo-container .vimeo-play-pause-button .vimeo-play-pause .play');
const vimeoPlayPausePauseRef = document.querySelector('.vimeo .vimeo-container .vimeo-play-pause-button .vimeo-play-pause .pause');
const vimeoControlsRef = document.querySelector('.vimeo .vimeo-container .vimeo-controls');
const vimeoControlsPlayRef = document.querySelector('.vimeo .vimeo-container .vimeo-controls .play');
const vimeoControlsPauseRef = document.querySelector('.vimeo .vimeo-container .vimeo-controls .pause');
const vimeoControlsSpeedCycleRef = document.querySelector('.vimeo .vimeo-container .vimeo-controls .speed-cycle');
const vimeoControlsSpeedCycleTextRef = document.querySelector('.vimeo .vimeo-container .vimeo-controls .speed-cycle .speed-cycle-text');
const vimeoControlsMuteRef = document.querySelector('.vimeo .vimeo-container .vimeo-controls .mute');
const vimeoControlsUnmuteRef = document.querySelector('.vimeo .vimeo-container .vimeo-controls .unmute');
const vimeoControlsFullscreenRef = document.querySelector('.vimeo .vimeo-container .vimeo-controls .fullscreen');
const vimeoProgressRef = document.querySelector('.vimeo .vimeo-container .vimeo-progress');
const vimeoProgressValueRef = document.querySelector('.vimeo .vimeo-container .vimeo-progress .vimeo-progress-value');
const vimeodepRefs = document.querySelectorAll('.vimeodep');

vimeoIframeRef.setAttribute('frameborder', '0');
vimeoIframeRef.setAttribute('allow', 'autoplay; fullscreen; encrypted-media');
vimeoIframeRef.setAttribute('src', `https://player.vimeo.com/video/${vimeoIframeRef.getAttribute('vimeo')}?background=0&title=0&byline=0&portrait=0&controls=0&autoplay=1&muted=1`);
vimeoFirstClickRef.classList.add('visible');

const finished = localStorage.getItem('vimeo-video-finished');
const savedTime = parseFloat(localStorage.getItem('vimeo-current-time'));

const updateFirstClickBox = () => {
  if (localStorage.getItem('vimeo-video-finished')) {
    vimeoFirstClickBoxPRef.textContent = 'Para reassistir a aula';
  } else {
    vimeoFirstClickBoxPRef.textContent = 'Para assistir sua aula';
  }

  if (!isNaN(parseFloat(localStorage.getItem('vimeo-current-time')))) {
    vimeoFirstClickBoxPRef.textContent = 'Para continuar sua aula';
  }
};

updateFirstClickBox();
const player = new Vimeo.Player(vimeoIframeRef);

player.ready().then(async () => {
  let isFirstClick = true;

  if (!isNaN(savedTime)) {
    player.pause();
    player.setCurrentTime(savedTime);
  } else {
    player.setCurrentTime(0);
  }

  const toggleFirstClick = async () => {
    isFirstClick = !isFirstClick;

    if (isFirstClick) {
      await player.setMuted(true);
      await player.setVolume(0);

      vimeoFirstClickRef.classList.add('visible');
      vimeoControlsRef.classList.remove('visible');

      vimeoControlsPlayRef.classList.add('visible');
      vimeoControlsPauseRef.classList.remove('visible');
      vimeoControlsMuteRef.classList.remove('visible');
      vimeoControlsSpeedCycleRef.classList.remove('visible');
      vimeoControlsFullscreenRef.classList.remove('visible');

      vimeoPlayPausePauseRef.style.display = 'block';
      player.pause();
      updateFirstClickBox();
    } else {
      await player.setMuted(false);
      await player.setVolume(1);
      vimeoFirstClickRef.classList.remove('visible');
      vimeoControlsRef.classList.add('visible');

      vimeoControlsPlayRef.classList.remove('visible');
      vimeoControlsPauseRef.classList.add('visible');
      vimeoControlsMuteRef.classList.add('visible');
      vimeoControlsSpeedCycleRef.classList.add('visible');
      vimeoControlsFullscreenRef.classList.add('visible');
      vimeoProgressRef.classList.add('visible');

      vimeoPlayPausePauseRef.style.display = 'none';
      player.play();
    }
  };

  const onClickPlayPause = async () => {
    if (isFirstClick) {
      toggleFirstClick();
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

  const onClickSpeedCycle = async () => {
    const speed = await player.getPlaybackRate();

    if (speed === 1) {
      vimeoControlsSpeedCycleTextRef.textContent = '1,5';
      await player.setPlaybackRate(1.5);
    } else if (speed === 1.5) {
      vimeoControlsSpeedCycleTextRef.textContent = '2';
      await player.setPlaybackRate(2);
    } else  {
      vimeoControlsSpeedCycleTextRef.textContent = '1';
      await player.setPlaybackRate(1);
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
  vimeoControlsSpeedCycleRef.addEventListener('click', onClickSpeedCycle);
  vimeoControlsFullscreenRef.addEventListener('click', onClickFullScreenToggle);

  player.on('timeupdate', data => {
    if (!isFirstClick) {
      localStorage.setItem('vimeo-current-time', data.seconds);
      vimeoProgressValueRef.style.width = `${data.percent * 100}%`;
    }
  });

  player.on('ended', () => {
    player.setCurrentTime(0);
    localStorage.removeItem('vimeo-current-time');

    if (isFirstClick) {
      player.play();
    } else {
      if (vimeoRef.classList.contains('fullscreen')) {
        onClickFullScreenToggle();
      }

      if (!finished) {
        vimeodepRefs.forEach(vimeodepRef => {
          vimeodepRef.style.display = vimeodepRef.dataset.originalDisplay;
        });

        localStorage.setItem('vimeo-video-finished', true);
      }

      toggleFirstClick();
      // Cenário opcional: abrir automaticamente o formulário no final do vídeo usando => openModal();
    }
  });

  document.addEventListener('visibilitychange', () => {
    if(document.hidden && !isFirstClick) {
      toggleFirstClick();
    }
  });

  window.addEventListener('blur', () => {
    if (!isFirstClick) {
      toggleFirstClick();
    }
  });
});

if (!finished) {
  vimeodepRefs.forEach(vimeodepRef => {
    vimeodepRef.dataset.originalDisplay = getComputedStyle(vimeodepRef).display;
    vimeodepRef.style.display = 'none';
  });
}