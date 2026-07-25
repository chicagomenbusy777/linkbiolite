(function(){
  "use strict";
  const els = {
    email: document.getElementById("authEmail"),
    password: document.getElementById("authPassword"),
    submitBtn: document.getElementById("authSubmitBtn"),
    toggleBtn: document.getElementById("authToggleBtn"),
    title: document.getElementById("authTitle")
  };
  if(!els.submitBtn) return;

  let mode = "signup";
  function updateUI(){
    els.title.textContent = mode === "signup" ? "무료로 시작하기" : "로그인";
    els.submitBtn.textContent = mode === "signup" ? "가입하기" : "로그인";
    els.toggleBtn.textContent = mode === "signup" ? "이미 계정이 있으신가요? 로그인" : "계정이 없으신가요? 가입하기";
  }
  updateUI();

  els.toggleBtn.addEventListener("click", function(){
    mode = mode === "signup" ? "login" : "signup";
    updateUI();
  });

  els.submitBtn.addEventListener("click", function(){
    const email = els.email.value.trim();
    const password = els.password.value;
    if(!email || !password){ toast("이메일과 비밀번호를 입력해주세요"); return; }
    if(mode === "signup" && password.length < 6){ toast("비밀번호는 6자 이상이어야 합니다"); return; }
    els.submitBtn.disabled = true;
    const action = mode === "signup"
      ? auth.createUserWithEmailAndPassword(email, password)
      : auth.signInWithEmailAndPassword(email, password);
    action.then(function(){ location.href = "dashboard.html"; })
      .catch(function(err){
        console.error(err);
        toast("실패: " + err.message);
        els.submitBtn.disabled = false;
      });
  });

  auth.onAuthStateChanged(function(user){ if(user) location.href = "dashboard.html"; });
})();
