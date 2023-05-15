const thisHead = document.querySelector('head');
const thisFavicon = document.createElement('link');
thisFavicon.rel = 'icon';
thisFavicon.type = 'image/x-icon';
thisFavicon.href='libs/assets/logo.png';
thisHead.appendChild(thisFavicon);