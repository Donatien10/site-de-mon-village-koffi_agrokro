const KEY='koffiAgrokroMemorialsV1';
const $=s=>document.querySelector(s);
$('#year').textContent=new Date().getFullYear();
$('#menuToggle').addEventListener('click',()=>$('#mainNav').classList.toggle('open'));
document.querySelectorAll('#mainNav a').forEach(a=>a.addEventListener('click',()=>$('#mainNav').classList.remove('open')));
function getPeople(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return []}}
function ageAtBirth(birth,death){if(!birth||!death)return null;const b=new Date(birth+'T00:00:00'),d=new Date(death+'T00:00:00');if(isNaN(b)||isNaN(d)||d<b)return null;let age=d.getFullYear()-b.getFullYear();if(d.getMonth()<b.getMonth()||(d.getMonth()===b.getMonth()&&d.getDate()<b.getDate()))age--;return age}
function formatDate(v){if(!v)return 'Non renseignée';return new Date(v+'T00:00:00').toLocaleDateString('fr-FR')}
function renderMemorial(){const grid=$('#memorialGrid');if(!grid)return;const q=$('#memorialSearch').value.trim().toLowerCase();const people=getPeople().filter(p=>(p.name+' '+(p.place||'')).toLowerCase().includes(q));$('#memorialCount').textContent=people.length+' hommage'+(people.length>1?'s':'');if(!people.length){grid.innerHTML='<div class="empty-state">Aucune fiche trouvée. Les hommages validés apparaîtront ici.</div>';return}grid.innerHTML=people.map(p=>{const age=ageAtBirth(p.birth,p.death);return `<article class="memorial-card">${p.photo?`<img class="memorial-photo" src="${p.photo}" alt="Portrait de ${escapeHtml(p.name)}">`:'<div class="memorial-photo" aria-hidden="true"></div>'}<div><h3>${escapeHtml(p.name)}</h3><p>Naissance : ${formatDate(p.birth)}</p><p>Décès : ${formatDate(p.death)}</p><p><strong>${age===null?'Âge non calculable':age+' ans'}</strong></p>${p.place?`<p>${escapeHtml(p.place)}</p>`:''}${p.note?`<p>${escapeHtml(p.note)}</p>`:''}</div></article>`}).join('')}
function escapeHtml(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
if($('#memorialSearch'))$('#memorialSearch').addEventListener('input',renderMemorial);
renderMemorial();