// Shared header + footer (injected so every page stays identical)
const pages=[['index.html','Home'],['about.html','About'],['help.html','Help Center'],['contact.html','Contact']];
const here=location.pathname.split('/').pop()||'index.html';
const cur=p=>p===here?' active" aria-current="page':'';
document.getElementById('site-header').innerHTML=`<nav class="navbar navbar-expand-md navbar-dark" aria-label="Main"><div class="container-lg">
<a class="navbar-brand brand" href="index.html"><img src="img/logo.svg" alt="" width="36" height="36">UB Voice</a>
<button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Open menu"><span class="navbar-toggler-icon"></span></button>
<div class="collapse navbar-collapse" id="nav"><ul class="navbar-nav ms-auto align-items-md-center gap-md-1">
${pages.map(([p,t])=>`<li><a class="nav-link${cur(p)}" href="${p}">${t}</a></li>`).join('')}
<li class="my-2 my-md-0"><a class="btn btn-cta btn-sm ms-md-2${cur('submit.html')}" href="submit.html">Submit a concern</a></li>
</ul></div></div></nav>`;
document.getElementById('site-footer').innerHTML=`<div class="container-lg"><div class="row g-4">
<div class="col-md-5"><h2>UB Voice</h2><p class="mb-0">A student concern portal for the University of Baguio. Built as an HCI class prototype.</p></div>
<div class="col-6 col-md-3 offset-md-1"><h2>Pages</h2><ul>${pages.map(([p,t])=>`<li><a href="${p}">${t}</a></li>`).join('')}</ul></div>
<div class="col-6 col-md-3"><h2>Get started</h2><ul><li><a href="submit.html">Submit a concern</a></li><li><a href="https://ubaguio.edu/contact-us/" target="_blank" rel="noopener">Official UB contact</a></li></ul></div>
</div><div class="foot-note">Prototype only. Not an official University of Baguio channel.</div></div>`;

// Header shadow, back-to-top, scroll reveal
const hdr=document.getElementById('site-header');
const toTopBtn=document.createElement('button');toTopBtn.id='toTop';toTopBtn.type='button';toTopBtn.setAttribute('aria-label','Back to top');toTopBtn.innerHTML='<i class="bi bi-arrow-up"></i>';
toTopBtn.onclick=()=>scrollTo({top:0});document.body.appendChild(toTopBtn);
const onScroll=()=>{hdr.classList.toggle('scrolled',scrollY>8);toTopBtn.classList.toggle('show',scrollY>600);};
addEventListener('scroll',onScroll,{passive:true});onScroll();
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));

// Form: error prevention
(()=>{
const f=document.getElementById('concernForm');if(!f)return;
const $=id=>document.getElementById(id);
const rules={
 email:v=>v&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)?'Enter an email like name@example.com, or leave it blank.':'',
 category:v=>v?'':'Choose a category.',
 message:v=>v.trim().length<10?'Write at least 10 characters so the concern is clear.':''
};
let dirty=false;
const check=id=>{const el=$(id),m=rules[id](el.value);el.classList.toggle('is-invalid',!!m);el.setAttribute('aria-invalid',!!m);$(id+'Err').textContent=m;return !m;};
Object.keys(rules).forEach(id=>{const el=$(id);
 el.addEventListener('blur',()=>check(id));
 el.addEventListener('input',()=>{dirty=true;if(el.classList.contains('is-invalid'))check(id);});
 el.addEventListener('change',()=>{dirty=true;if(el.classList.contains('is-invalid'))check(id);});});
const count=$('count');
$('message').addEventListener('input',e=>{const n=e.target.value.length;count.textContent=n+' / 500';count.classList.toggle('warn',n>=450);});
$('name').addEventListener('input',()=>dirty=true);
$('anonymous').addEventListener('change',e=>{$('name').disabled=e.target.checked;if(e.target.checked)$('name').value='';});
const modal=new bootstrap.Modal($('confirmModal'));
const reset=()=>{f.reset();$('name').disabled=false;count.textContent='0 / 500';count.classList.remove('warn');['email','category','message'].forEach(i=>{$(i).classList.remove('is-invalid');$(i+'Err').textContent='';});dirty=false;};
f.addEventListener('submit',e=>{e.preventDefault();
 const bad=Object.keys(rules).filter(id=>!check(id));
 if(bad.length){$('formAlert').innerHTML='<div class="alert alert-danger">Fix '+bad.length+' field'+(bad.length>1?'s':'')+' below, then try again.</div>';$(bad[0]).focus();return;}
 $('formAlert').innerHTML='';
 $('sumCat').textContent=$('category').value;
 const m=$('message').value.trim();$('sumMsg').textContent=m.length>140?m.slice(0,140)+'...':m;
 modal.show();});
$('confirmSend').addEventListener('click',e=>{const b=e.currentTarget;b.disabled=true;modal.hide();
 reset();$('formAlert').innerHTML='<div class="alert alert-success"><i class="bi bi-check-circle-fill me-2"></i>Done. This is a prototype, so nothing was sent or saved.</div>';$('formAlert').focus();$('formAlert').scrollIntoView({block:'center'});b.disabled=false;});
$('clearBtn').addEventListener('click',()=>{if(!dirty||confirm('Clear everything you typed?'))reset();});
addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue='';}});
})();
