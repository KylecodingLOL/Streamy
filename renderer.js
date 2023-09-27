const { ipcRenderer } = require('electron');

window.onload = () => {
  const buttons = [
    { id: 'openTwitchBtn', url: 'https://www.twitch.tv/' },
    { id: 'openKickBtn', url: 'https://kick.com/' },
    { id: 'openRumbleBtn', url: 'https://rumble.com/' },
    { id: 'openYoutubeBtn', url: 'https://www.youtube.com/' },
    { id: 'openTiktokBtn', url: 'https://www.tiktok.com/' },
    { id: 'openTwittersBtn', url: 'https://twitter.com/' },
    { id: 'openInstagramsBtn', url: 'https://www.instagram.com/' },
    { id: 'openTiktoksBtn', url: 'https://www.tiktok.com/' },
    { id: 'openThreadsBtn', url: 'https://www.threads.net/' },
    { id: 'openFacebooksBtn', url: 'https://www.facebook.com/' },
  ];

  buttons.forEach(button => {
    const elem = document.getElementById(button.id);
    if (elem) {
      elem.addEventListener('click', () => {
        ipcRenderer.send('load-url', button.url);
      });
    }
  });
};