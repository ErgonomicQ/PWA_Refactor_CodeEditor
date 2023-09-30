const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {
  butInstall.style.display = 'none';
  deferredPrompt.prompt();
  const choiceResult = await deferredPrompt.userChoice;
  if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the PWA installation');
  } else {
    console.log('User dismissed the PWA installation');
  }
  deferredPrompt = null;
});

window.addEventListener('appinstalled', (event) => {
  console.log('App successfully installed');
});
