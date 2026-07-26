/* ==========================================================
   app.js — LinkBio Lite, config-file edition. No backend, no accounts:
   this page reads config.js and renders the profile + links directly.
   To update your page, edit config.js and push.
   ========================================================== */
(function(){
  "use strict";

  const root = document.getElementById("profileRoot");

  if(typeof window.PROFILE_CONFIG === "undefined"){
    root.innerHTML =
      "<div class=\"empty-state\">config.js가 없습니다.<br>" +
      "<a href=\"https://github.com/chicagomenbusy777/linkbiolite/blob/main/SETUP.md\">SETUP.md</a>의 안내에 따라 " +
      "config.js를 만들어주세요 (계정 생성 불필요, 파일 하나만 채우면 됩니다).</div>";
    return;
  }

  const p = window.PROFILE_CONFIG;
  const initial = (p.displayName || "?").trim().charAt(0).toUpperCase() || "?";
  const links = (p.links || []).map(function(l){
    return "<a href=\"" + escapeHtml(l.url) + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + escapeHtml(l.label) + "</a>";
  }).join("");

  document.title = (p.displayName || "LinkBio Lite") + " — LinkBio Lite";
  root.innerHTML =
    "<div class=\"avatar\">" + escapeHtml(initial) + "</div>" +
    "<h1>" + escapeHtml(p.displayName || "") + "</h1>" +
    (p.bio ? "<p>" + escapeHtml(p.bio) + "</p>" : "") +
    "<div class=\"profile-links\">" + (links || "<div class=\"empty-state\">아직 등록된 링크가 없습니다</div>") + "</div>" +
    "<div class=\"badge\">Made with LinkBio Lite</div>";
})();
