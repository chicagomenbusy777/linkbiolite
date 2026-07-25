(function(){
  "use strict";
  if(typeof window.FIREBASE_CONFIG === "undefined"){
    document.addEventListener("DOMContentLoaded", function(){
      document.body.innerHTML =
        "<div style='padding:60px 20px;text-align:center;font-family:sans-serif;color:#333;'>" +
        "firebase-config.js가 없습니다.<br>" +
        "<a href='https://github.com/chicagomenbusy777/linkbiolite/blob/main/SETUP.md'>SETUP.md</a>의 안내에 따라 Firebase 프로젝트를 연결해주세요." +
        "</div>";
    });
    throw new Error("Missing firebase-config.js — see SETUP.md");
  }
  firebase.initializeApp(window.FIREBASE_CONFIG);
  window.db = firebase.firestore();
  window.auth = firebase.auth();
})();
