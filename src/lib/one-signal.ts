import OneSignal from 'react-onesignal';

export default async function runOneSignal() {
  await OneSignal.init({
    appId: import.meta.env.VITE_API_ONE_SIGNAL_APP_ID,
    allowLocalhostAsSecureOrigin: true,
  });
  OneSignal.Slidedown.promptPush();
}
