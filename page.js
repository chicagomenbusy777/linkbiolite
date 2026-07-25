/* ==========================================================
   page.js — public profile viewer (page.html?u=slug).
   Read-only, no auth needed (profiles are publicly readable).
   ========================================================== */
(function(){
  "use strict";

  const root = document.getElementById("profileRoot");
  const slug = new URLSearchParams(location.search).get("u");

  if(typeof window.FIREBASE_CONFIG === "undefined"){
    root.innerHTML = "<div class=\"empty-state\">firebase-config.js가 없습니다. SETUP.md를 확인해주세요.</div>";
    return;
  }
  if(!slug){
    root.innerHTML = "<div class=\"empty-state\">주소가 올바르지 않습니다. ?u=사용자명 형태로 접속해주세요.</div>";
    return;
  }

  const db = firebase.firestore();
  db.collection("profiles").doc(slug).get().then(function(doc){
    if(!doc.exists){
      root.innerHTML = "<div class=\"empty-state\">존재하지 않는 페이지입니다.</div>";
      return;
    }
    const p = doc.data();
    const initial = (p.displayName || slug).trim().charAt(0).toUpperCase() || "?";
    const links = (p.links || []).map(function(l){
      return "<a href=\"" + escapeHtml(l.url) + "\" target=\"_blank\" rel=\"noopener noreferrer nofollow\">" + escapeHtml(l.label) + "</a>";
    }).join("");
    root.innerHTML =
      "<div class=\"avatar\">" + escapeHtml(initial) + "</div>" +
      "<h1>" + escapeHtml(p.displayName || slug) + "</h1>" +
      (p.bio ? "<p>" + escapeHtml(p.bio) + "</p>" : "") +
      "<div class=\"profile-links\">" + (links || "<div class=\"empty-state\">아직 등록된 링크가 없습니다</div>") + "</div>" +
      "<div class=\"badge\">Made with LinkBio Lite</div>";
    document.title = (p.displayName || slug) + " — LinkBio Lite";
  }).catch(function(err){
    console.error(err);
    root.innerHTML = "<div class=\"empty-state\">불러오지 못했습니다: " + escapeHtml(err.message) + "</div>";
  });
})();
