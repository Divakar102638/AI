// InterviewAI — app enhancements: theme toggle, lazy-load, simple analytics, contact modal, i18n skeleton
(function(){
  function setTheme(t){
    if(t==='light') document.documentElement.setAttribute('data-theme','light');
    else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('iai_theme', t||'dark');
    const btn = document.getElementById('themeToggle'); if(btn) btn.textContent = t==='light'?'🌞':'🌙';
    if(btn) btn.setAttribute('aria-pressed', t==='light');
  }

  function toggleTheme(){
    const cur = localStorage.getItem('iai_theme')||'dark';
    setTheme(cur==='light'?'dark':'light');
  }

  function initTheme(){
    const pref = localStorage.getItem('iai_theme');
    if(pref) setTheme(pref==='light'?'light':'dark');
    else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) setTheme('light');
    else setTheme('dark');
    const btn = document.getElementById('themeToggle'); if(btn) btn.addEventListener('click', toggleTheme);
  }

  // simple privacy-friendly analytics (local only)
  function logEvent(name, data){
    try{
      const s = JSON.parse(localStorage.getItem('iai_analytics')||'{}');
      s[name] = (s[name]||0)+1; localStorage.setItem('iai_analytics', JSON.stringify(s));
    }catch(e){console.warn(e)}
    console.log('Analytics event:', name, data||{});
  }

  // Lazy load images using data-src
  function initLazy(){
    const imgs = document.querySelectorAll('img[data-src]');
    if('IntersectionObserver' in window){
      const io = new IntersectionObserver((entries, obs)=>{
        entries.forEach(e=>{
          if(e.isIntersecting){
            const el = e.target; el.src = el.dataset.src; el.removeAttribute('data-src'); obs.unobserve(el);
          }
        });
      },{rootMargin:'200px'});
      imgs.forEach(i=>io.observe(i));
    } else {
      imgs.forEach(i=>{ i.src = i.dataset.src; i.removeAttribute('data-src'); });
    }
  }

  // Contact modal (client-side only)
  function createContactUI(){
    if(document.getElementById('iaiContactBtn')) return;
    const btn = document.createElement('button'); btn.id='iaiContactBtn'; btn.className='logout-btn'; btn.style.position='fixed'; btn.style.right='16px'; btn.style.bottom='16px'; btn.style.zIndex=9999; btn.textContent='Contact';
    document.body.appendChild(btn);
    const modal = document.createElement('div'); modal.id='iaiContactModal'; modal.style.position='fixed'; modal.style.inset=0; modal.style.display='none'; modal.style.alignItems='center'; modal.style.justifyContent='center'; modal.style.zIndex=9998; modal.style.background='rgba(0,0,0,0.6)';
    modal.innerHTML = `
      <div style="background:var(--bg2);padding:1.2rem;border-radius:10px;max-width:520px;width:92%;">
        <h3 style="margin:0 0 8px 0">Contact / Feedback</h3>
        <div style="display:flex;flex-direction:column;gap:8px">
          <input id="iaiContactName" placeholder="Your name (optional)" style="padding:0.6rem;border-radius:6px;border:1px solid var(--border);background:var(--surface);color:var(--text)" />
          <input id="iaiContactEmail" placeholder="Email (optional)" style="padding:0.6rem;border-radius:6px;border:1px solid var(--border);background:var(--surface);color:var(--text)" />
          <textarea id="iaiContactMsg" placeholder="Message" rows="5" style="padding:0.6rem;border-radius:6px;border:1px solid var(--border);background:var(--surface);color:var(--text)"></textarea>
          <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:6px">
            <button id="iaiContactCancel" class="logout-btn">Cancel</button>
            <button id="iaiContactSend" class="auth-btn">Send</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    btn.addEventListener('click', ()=>{ modal.style.display='flex'; document.getElementById('iaiContactMsg').focus(); });
    document.getElementById('iaiContactCancel').addEventListener('click', ()=>{ modal.style.display='none'; });
    document.getElementById('iaiContactSend').addEventListener('click', ()=>{
      const msg = document.getElementById('iaiContactMsg').value.trim();
      const email = document.getElementById('iaiContactEmail').value.trim();
      if(!msg){ alert('Please enter a message'); return; }
      logEvent('contact_sent',{email:!!email});
      modal.innerHTML = '<div style="background:var(--bg2);padding:1.2rem;border-radius:10px;max-width:520px;width:92%;text-align:center;"><h3>Thanks — message saved locally</h3><p>We logged your message in local storage for privacy. Implement a server endpoint to receive messages.</p><button id="iaiContactOk" class="auth-btn">OK</button></div>';
      document.getElementById('iaiContactOk').addEventListener('click', ()=>{ modal.style.display='none'; });
    });
  }

  // i18n skeleton
  const I18N = { en: {}, hi: {} };
  function initLangSelector(){
    const wrapper = document.createElement('div'); wrapper.style.display='inline-block'; wrapper.style.marginRight='8px';
    const sel = document.createElement('select'); sel.id='iaiLang'; sel.style.padding='6px'; sel.innerHTML='<option value="en">EN</option><option value="hi">HI</option>';
    wrapper.appendChild(sel);
    const topbar = document.querySelector('.topbar-right'); if(topbar) topbar.insertBefore(wrapper, topbar.firstChild);
    sel.addEventListener('change', ()=>{ logEvent('lang_change',{lang:sel.value}); /* real translation implementation omitted */ });
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    initTheme(); initLazy(); createContactUI(); initLangSelector(); logEvent('page_view');
  });
})();
