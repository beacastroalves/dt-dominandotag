const vimeoIframeRef = document.querySelector('.vimeo .vimeo-container iframe');
const vimeoFirstClickRef = document.querySelector('.vimeo .vimeo-container .first-click');
const vimeoPlayPauseRef = document.querySelector('.vimeo .vimeo-container .vimeo-play-pause-button .vimeo-play-pause');
const vimeoPlayPausePlayRef = document.querySelector('.vimeo .vimeo-container .vimeo-play-pause-button .vimeo-play-pause .play');
const vimeoPlayPausePauseRef = document.querySelector('.vimeo .vimeo-container .vimeo-play-pause-button .vimeo-play-pause .pause');

vimeoIframeRef.setAttribute('frameborder', '0');
vimeoIframeRef.setAttribute('allow', 'autoplay; fullscreen; encrypted-media');
vimeoIframeRef.setAttribute('src', `https://player.vimeo.com/video/${vimeoIframeRef.getAttribute('vimeo')}?background=0&title=0&byline=0&portrait=0&controls=0&autoplay=1&muted=1`);
vimeoFirstClickRef.classList.add('visible');

const player = new Vimeo.Player(vimeoIframeRef);

player.ready().then(() => {
  let isFirstClick = true;

  vimeoPlayPauseRef.addEventListener('click', async () => {
    if (isFirstClick) {
      isFirstClick = false;
      await player.setMuted(false);
      await player.setCurrentTime(0);
      await player.setVolume(1);
      vimeoFirstClickRef.classList.remove('visible');
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
      } else {
        player.pause();

        vimeoPlayPausePlayRef.style.display = 'none';
        vimeoPlayPausePlayRef.classList.remove('visible');

        vimeoPlayPausePauseRef.style.display = 'block';
        vimeoPlayPausePauseRef.classList.add('visible');

        setTimeout(() => {
          vimeoPlayPausePauseRef.classList.remove('visible');
        }, 100);
      }
    }
  });
});

