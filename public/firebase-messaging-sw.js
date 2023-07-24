importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyCuZnB58QkBZUyaJegv4x2TRhNAcbZhw5M",
  authDomain: "chatzz-5f912.firebaseapp.com",
  projectId: "chatzz-5f912",
  storageBucket: "chatzz-5f912.appspot.com",
  messagingSenderId: "787521622242",
  appId: "1:787521622242:web:6a0cbbccc804bc3aad4ebb",
  measurementId: "G-MMGTJ245GB",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
