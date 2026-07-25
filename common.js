(function(){
  "use strict";
  let toastTimer = null;
  window.toast = function(msg){
    const el = document.getElementById("toast");
    if(!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ el.classList.remove("show"); }, 2400);
  };
  window.escapeHtml = function(str){
    return String(str).replace(/[&<>"']/g, function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  };
  const DARK_KEY = "lbl_dark";
  document.body.classList.toggle("dark", localStorage.getItem(DARK_KEY) === "1");
  document.addEventListener("DOMContentLoaded", function(){
    const btn = document.getElementById("darkToggle");
    if(btn) btn.addEventListener("click", function(){
      const on = document.body.classList.toggle("dark");
      localStorage.setItem(DARK_KEY, on ? "1" : "0");
    });
  });
})();
