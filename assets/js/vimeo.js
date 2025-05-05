const vimeoIframeRef = document.querySelector('.vimeo .vimeo-container iframe');
const vimeoFirstClickRef = document.querySelector('.vimeo .vimeo-container .first-click');

vimeoIframeRef.setAttribute('frameborder', '0');
vimeoIframeRef.setAttribute('allow', 'autoplay; fullscreen; encrypted-media');
vimeoIframeRef.setAttribute('src', `https://player.vimeo.com/video/${vimeoIframeRef.getAttribute('vimeo')}?background=0&title=0&byline=0&portrait=0&controls=0&autoplay=1&muted=1`);
vimeoFirstClickRef.classList.add('visible');
