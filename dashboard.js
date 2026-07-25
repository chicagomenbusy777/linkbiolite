/* ==========================================================
   dashboard.js — claim a slug, edit profile + links.
   One profile per account for MVP simplicity (slug === Firestore doc
   ID under `profiles`, so uniqueness is free — Firestore just won't
   let a second create() land on an existing doc ID once the security
   rule requires ownerUid to match on update).
   ========================================================== */
(function(){
  "use strict";

  const els = {
    claimView: document.getElementById("claimView"),
    editView: document.getElementById("editView"),
    slugInput: document.getElementById("slugInput"),
    claimBtn: document.getElementById("claimBtn"),
    publicLink: document.getElementById("publicLink"),
    copyLinkBtn: document.getElementById("copyLinkBtn"),
    displayName: document.getElementById("displayName"),
    bio: document.getElementById("bio"),
    linkRows: document.getElementById("linkRows"),
    addLinkBtn: document.getElementById("addLinkBtn"),
    saveBtn: document.getElementById("saveBtn"),
    logoutBtn: document.getElementById("logoutBtn")
  };
  if(!els.claimView) return;

  const PAGE_BASE = location.origin + location.pathname.replace(/dashboard\.html$/, "") + "page.html?u=";

  let currentUser = null;
  let currentSlug = null;

  function slugify(raw){
    return raw.toLowerCase().trim().replace(/[^a-z0-9-]/g, "").slice(0, 40);
  }

  function findMyProfile(){
    db.collection("profiles").where("ownerUid", "==", currentUser.uid).limit(1).get().then(function(snap){
      if(snap.empty){
        els.claimView.style.display = "block";
        els.editView.style.display = "none";
      } else {
        const doc = snap.docs[0];
        currentSlug = doc.id;
        showEdit(doc.data());
      }
    }).catch(function(err){
      console.error(err);
      toast("불러오지 못했습니다: " + err.message);
    });
  }

  els.claimBtn.addEventListener("click", function(){
    const slug = slugify(els.slugInput.value);
    if(slug.length < 3){ toast("3자 이상의 영문/숫자/하이픈으로 입력해주세요"); return; }
    els.claimBtn.disabled = true;
    const ref = db.collection("profiles").doc(slug);
    ref.get().then(function(doc){
      if(doc.exists){
        toast("이미 사용 중인 주소입니다");
        els.claimBtn.disabled = false;
        return;
      }
      return ref.set({
        ownerUid: currentUser.uid,
        displayName: currentUser.email.split("@")[0],
        bio: "",
        links: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(function(){
        currentSlug = slug;
        toast("페이지가 생성되었습니다");
        showEdit({ displayName: currentUser.email.split("@")[0], bio: "", links: [] });
      });
    }).catch(function(err){
      console.error(err);
      toast("실패: " + err.message);
    }).finally(function(){
      els.claimBtn.disabled = false;
    });
  });

  function showEdit(data){
    els.claimView.style.display = "none";
    els.editView.style.display = "block";
    els.displayName.value = data.displayName || "";
    els.bio.value = data.bio || "";
    els.publicLink.textContent = PAGE_BASE + currentSlug;
    els.publicLink.href = PAGE_BASE + currentSlug;
    renderLinkRows(data.links || []);
  }

  function renderLinkRows(links){
    els.linkRows.innerHTML = "";
    if(!links.length) links = [{ label: "", url: "" }];
    links.forEach(addLinkRow);
  }

  function addLinkRow(link){
    link = link || { label: "", url: "" };
    const row = document.createElement("div");
    row.className = "link-row";
    row.innerHTML =
      "<input type=\"text\" class=\"link-label\" placeholder=\"이름 (예: 인스타그램)\" maxlength=\"60\" value=\"" + escapeHtml(link.label) + "\">" +
      "<input type=\"url\" class=\"link-url\" placeholder=\"https://...\" maxlength=\"500\" value=\"" + escapeHtml(link.url) + "\">" +
      "<button type=\"button\">✕</button>";
    row.querySelector("button").addEventListener("click", function(){ row.remove(); });
    els.linkRows.appendChild(row);
  }

  els.addLinkBtn.addEventListener("click", function(){ addLinkRow(); });

  els.saveBtn.addEventListener("click", function(){
    if(!currentSlug) return;
    const links = Array.from(els.linkRows.querySelectorAll(".link-row")).map(function(row){
      return {
        label: row.querySelector(".link-label").value.trim().slice(0, 60),
        url: row.querySelector(".link-url").value.trim().slice(0, 500)
      };
    }).filter(function(l){ return l.label && l.url; });

    els.saveBtn.disabled = true;
    db.collection("profiles").doc(currentSlug).update({
      displayName: els.displayName.value.trim().slice(0, 60) || currentUser.email.split("@")[0],
      bio: els.bio.value.trim().slice(0, 200),
      links: links,
      ownerUid: currentUser.uid
    }).then(function(){
      toast("저장되었습니다");
    }).catch(function(err){
      console.error(err);
      toast("저장 실패: " + err.message);
    }).finally(function(){
      els.saveBtn.disabled = false;
    });
  });

  if(els.copyLinkBtn){
    els.copyLinkBtn.addEventListener("click", function(){
      navigator.clipboard.writeText(els.publicLink.href).then(function(){ toast("링크가 복사되었습니다"); });
    });
  }

  els.logoutBtn.addEventListener("click", function(){
    auth.signOut().then(function(){ location.href = "login.html"; });
  });

  auth.onAuthStateChanged(function(user){
    if(!user){ location.href = "login.html"; return; }
    currentUser = user;
    findMyProfile();
  });
})();
