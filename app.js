// ====== ENLACES ======
const API="https://script.google.com/macros/s/AKfycbzvdiMotbDGdDKUovmDbmkRU26dY-P4_1qtvWKbK4anQMV-cQD9XSDz98z_L_MLauOPFw/exec";
const SHEET="https://docs.google.com/spreadsheets/d/1JWhtxnTkh0ZnyTk2fhlvGbwifNYXdAkc-akwJb-WdKA/edit?usp=sharing";

const G=[["1ª visita",["Cuestionario #1 (1visita)","Antropometría y bioimpedancia (1visita)"]],
["2ª visita",["Antropometría y bioimpedancia (2visita)"]],
["3ª visita",["Antropometría y bioimpedancia (3visita)","Agua corporal (3visita)"]],
["4ª visita (3 meses)",["Cuestionario #2 (4visita)","Antropometría 4visita (3 meses vida)","Antropometría 4visita (3 meses post)","Agua corporal 4visita (3 meses post)","Agua corporal 4visita (3 meses vida)"]]];

const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let role=localStorage.getItem("ms_role"),DB=[],ALERTS=[],ALERT_PREFS={enabled:false,email:""},tab="alertas",draTab="reportes",loaded=false,sig="",sigRecent="",sigAlert="",sigAvDra="",sigCalDra="",timer=null;
let TOK=localStorage.getItem("ms_tok")||"",ME=null;try{ME=JSON.parse(localStorage.getItem("ms_me")||"null")}catch(e){}

function toast(m,t){const d=document.createElement("div");if(t==="err")d.className="err";d.textContent=m;$("#toast").appendChild(d);setTimeout(()=>d.remove(),4000)}

const IC={pencil:'<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',chat:'<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/>',lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 118 0v4"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/>',bell:'<path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 003.4 0"/>',
belloff:'<path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 003.4 0M3 3l18 18"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
moon:'<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>',
more:'<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>',
sheet:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 9h16M4 15h16M10 3v18"/>',
sliders:'<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
down:'<path d="M12 3v12M7 11l5 5 5-5M5 21h14"/>',swap:'<path d="M17 3l4 4-4 4M21 7H8M7 21l-4-4 4-4M3 17h13"/>',
out:'<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>',
cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',check:'<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',chev:'<path d="M6 9l6 6 6-6"/>',plus:'<path d="M12 5v14M5 12h14"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',palette:'<circle cx="12" cy="12" r="9"/><circle cx="8.5" cy="10" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="15.5" cy="10" r="1"/>'};
function ic(n){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+IC[n]+'</svg>'}

// ---- Efecto onda (ripple) al tocar cualquier botón interactivo ----
document.addEventListener("pointerdown",e=>{
  const b=e.target.closest(".btn,.ghost,.ib,nav button,.srow,.lg button,.tabs2 button,.sw");
  if(!b||b.disabled)return;
  b.classList.add("rpl-h");
  const r=b.getBoundingClientRect(),s=document.createElement("span"),d=Math.max(r.width,r.height);
  s.className="rpl";s.style.width=s.style.height=d+"px";
  s.style.left=(e.clientX-r.left-d/2)+"px";s.style.top=(e.clientY-r.top-d/2)+"px";
  b.appendChild(s);setTimeout(()=>s.remove(),600);
},{passive:true});

// ---- Tema ----
function theme(){const s=localStorage.getItem("ms_theme");const d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;
document.documentElement.dataset.t=d?"dark":"light";document.documentElement.dataset.c=localStorage.getItem("ms_color")||"ciruela";$("meta[name=theme-color]").content=getComputedStyle(document.documentElement).getPropertyValue("--bg").trim()||"#92228C";$("#bTheme").innerHTML=ic(d?"sun":"moon")}
matchMedia("(prefers-color-scheme: dark)").addEventListener("change",theme);
$("#bTheme").onclick=()=>{localStorage.setItem("ms_theme",document.documentElement.dataset.t==="dark"?"light":"dark");theme()};
theme();

// ---- Instalación como app ----
let dp;addEventListener("beforeinstallprompt",e=>{e.preventDefault();dp=e;$("#bInst").hidden=false});
$("#bInst").onclick=async()=>{if(!dp)return;dp.prompt();await dp.userChoice;dp=null;$("#bInst").hidden=true};
if(/iphone|ipad|ipod/i.test(navigator.userAgent)&&!(matchMedia("(display-mode: standalone)").matches||navigator.standalone)&&!localStorage.getItem("ms_ios"))$("#iosTip").hidden=false;
$("#iosX").onclick=()=>{$("#iosTip").hidden=true;localStorage.setItem("ms_ios","1")};
if("serviceWorker"in navigator)addEventListener("load",()=>navigator.serviceWorker.register("sw.js").then(r=>r.update()).catch(()=>{}));

// ---- Avisos ----
function bell(){$("#bBell").innerHTML=ic(("Notification"in window&&Notification.permission==="granted")?"bell":"belloff")}
$("#bBell").onclick=()=>{const open=$("#cfg").hidden;$("#cfg").hidden=!open;if(open){mailUI();if(role==="dra")loadAlertPrefs()} };
$("#browserNotify").onclick=async()=>{if(!( "Notification"in window))return toast("Este dispositivo no admite avisos","err");const p=await Notification.requestPermission();bell();toast(p==="granted"?"Notificaciones del dispositivo activadas":"Permiso de notificaciones no concedido",p==="granted"?"":"err")};
function beep(){try{const c=new(window.AudioContext||window.webkitAudioContext)(),t=c.currentTime;
[660,880].forEach((f,i)=>{const o=c.createOscillator(),g=c.createGain();o.frequency.value=f;o.connect(g);g.connect(c.destination);
g.gain.setValueAtTime(.2,t+i*.18);g.gain.exponentialRampToValueAtTime(.001,t+i*.18+.16);o.start(t+i*.18);o.stop(t+i*.18+.17)})}catch(e){}}
function notify(n){beep();if("Notification"in window&&Notification.permission==="granted"){const m=n+(n>1?" expedientes nuevos":" expediente nuevo"),o={body:m,icon:"icons/icon-192.png"};
navigator.serviceWorker?.ready.then(r=>r.showNotification("nexo",o)).catch(()=>{try{new Notification("nexo",o)}catch(e){}})}}

// ---- Recuperar contraseña desde la pantalla de ingreso ----
$("#bForgot").onclick=()=>{
  $("#loginFields").hidden=true;$("#resetFields").hidden=false;
  $("#resetStep1").hidden=false;$("#resetStep2").hidden=true;
  $("#ru").value=$("#u").value.trim();
  $("#resetMsg").textContent="Ingresa tu usuario y el correo donde deseas recibir el código de verificación.";
};
$("#bBackLogin").onclick=()=>{
  $("#resetFields").hidden=true;$("#loginFields").hidden=false;
};
$("#bSendCode").onclick=async()=>{
  const u=$("#ru").value.trim().toLowerCase(),email=$("#rmail").value.trim().toLowerCase();
  if(!u||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))return toast("Ingresa tu usuario y un correo válido","err");
  const b=$("#bSendCode");b.disabled=true;b.textContent="Enviando código…";
  let d=null;try{d=await(await fetch(API,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({action:"reqReset",user:u,email})})).json()}catch(x){}
  b.disabled=false;b.textContent="Enviar código al correo";
  if(d&&d.ok){
    $("#resetStep1").hidden=true;$("#resetStep2").hidden=false;
    $("#resetMsg").textContent="Revisa tu correo ("+email+") y escribe el código de 6 dígitos que te enviamos.";
    toast("Código enviado a tu correo");
  }else toast(d?.error||"No se pudo enviar el código. Verifica que el backend esté actualizado.","err");
};
$("#bConfirmReset").onclick=async()=>{
  const u=$("#ru").value.trim().toLowerCase(),code=$("#rcode").value.trim(),p1=$("#rpass1").value,p2=$("#rpass2").value;
  if(!code)return toast("Ingresa el código de 6 dígitos","err");
  if(p1!==p2)return toast("Las contraseñas no coinciden","err");
  if(p1.length<10||!/[A-Za-z]/.test(p1)||!/[0-9]/.test(p1))return toast("Mínimo 10 caracteres, con letras y números","err");
  const b=$("#bConfirmReset");b.disabled=true;b.textContent="Guardando…";
  let d=null;try{d=await(await fetch(API,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({action:"confirmReset",user:u,code,newPass:p1})})).json()}catch(x){}
  b.disabled=false;b.textContent="Guardar nueva contraseña";
  if(d&&d.ok){
    toast("¡Contraseña actualizada! Ya puedes ingresar");
    $("#u").value=u;$("#p").value=p1;
    $("#rcode").value=$("#rpass1").value=$("#rpass2").value="";
    $("#resetFields").hidden=true;$("#loginFields").hidden=false;
  }else toast(d?.error||"No se pudo restablecer la contraseña","err");
};

// ---- Sesión ----
function syncRole(){
  try{ME=JSON.parse(localStorage.getItem("ms_me")||"null")}catch(e){ME=null}
  TOK=localStorage.getItem("ms_tok")||"";
  role=localStorage.getItem("ms_role");
  if(role!=="dra"&&role!=="asis"){
    if(ME&&ME.role){role=ME.role==="investigadora"?"dra":"asis";localStorage.setItem("ms_role",role)}
    else if(TOK){role="asis";localStorage.setItem("ms_role",role)}
  }
}
syncRole();

$("#fLogin").onsubmit=async e=>{e.preventDefault();if(!$("#resetFields").hidden)return;const b=$("#bLoginSubmit");b.disabled=true;b.textContent="Verificando…";
let d=null;try{d=await(await fetch(API,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({action:"login",user:$("#u").value.trim().toLowerCase(),pass:$("#p").value})})).json()}catch(x){}
b.disabled=false;b.textContent="Ingresar";
if(d&&d.ok){TOK=d.token;ME={user:d.user,name:d.name,role:d.role};localStorage.setItem("ms_tok",TOK);localStorage.setItem("ms_me",JSON.stringify(ME));role=d.role==="investigadora"?"dra":"asis";localStorage.setItem("ms_role",role);$("#p").value="";await start();if(d.mustChange){window.openSet?.("pass");toast("Por seguridad, cambia tu contraseña temporal ahora","err")}}
else toast(d?.error||"No se pudo conectar. Revisa tu internet","err")};
if($("#bOut"))$("#bOut").onclick=()=>logout();
if($("#bSwitch"))$("#bSwitch").onclick=()=>{role=role==="dra"?"asis":"dra";localStorage.setItem("ms_role",role);view()};

async function start(){
  syncRole();
  if(!TOK||!role){$("#app").hidden=true;$("#login").hidden=false;return}
  $("#login").hidden=true;$("#app").hidden=false;
  if(window.closeSet)window.closeSet();
  bell();view();
  await load();
  sig="";render();renderRecent();renderAlerts();renderAvDra(1);
  if(!timer)timer=setInterval(load,30000);
}
function view(){
  syncRole();
  {const vf=document.getElementById("vForm");if(vf)vf.hidden=true}
  {const vs=document.getElementById("vSet");if(vs)vs.hidden=true}
  if($("#bCfg"))$("#bCfg").hidden=true;
  if($("#bSheet")){$("#bSheet").hidden=role!=="asis";$("#bSheet").href=SHEET}
  if($("#vDra"))$("#vDra").hidden=role!=="dra";
  if($("#vAsis"))$("#vAsis").hidden=role!=="asis";
  if($("#vAlertas"))$("#vAlertas").hidden=true;
  if($("#vHist"))$("#vHist").hidden=true;
  if($("#vAvance"))$("#vAvance").hidden=true;
  if($("#vCalDra"))$("#vCalDra").hidden=true;
  if($("#navDra"))$("#navDra").hidden=role!=="dra";
  if($("#nav"))$("#nav").hidden=role!=="asis";
  if($("#assistantNotifySettings"))$("#assistantNotifySettings").hidden=role!=="asis";
  if($("#draNotifySettings"))$("#draNotifySettings").hidden=role!=="dra";
  if($("#who"))$("#who").textContent=role==="dra"?"Dra. Lilliam":(ME&&ME.name?ME.name:"Equipo asistente");
  sig="";render();renderRecent();loadAlerts();
  if(role==="dra"){loadAlertPrefs();applyDraTab()}
} 
let histMode="alertas";
function histUI(){document.querySelectorAll("[data-hm]").forEach(b=>b.classList.toggle("on",b.dataset.hm===histMode));$("#histAlerts").hidden=histMode!=="alertas";$("#recent").hidden=histMode!=="reportes"}
document.querySelectorAll("[data-hm]").forEach(b=>b.onclick=()=>{histMode=b.dataset.hm;histUI()});
function applyDraTab(){if(role!=="dra")return;setTimeout(renderAvDra,0);setTimeout(renderCalDra,0);
document.querySelectorAll("[data-dratab]").forEach(b=>b.classList.toggle("on",b.dataset.dratab===draTab));
if($("#fabDra"))$("#fabDra").classList.toggle("on",draTab==="reportes");
$("#vDra").hidden=draTab!=="reportes";$("#vAlertas").hidden=draTab!=="alertas";$("#vHist").hidden=draTab!=="historial";$("#vAvance").hidden=draTab!=="avance";if($("#vCalDra"))$("#vCalDra").hidden=draTab!=="visitas";$("#alertForm").hidden=true;$("#alT").hidden=false;$("#alertsList").hidden=false;
if(draTab==="alertas"){$("#alH").textContent="Alertas de corrección";$("#alP").textContent="Solicitudes de los asistentes por atender.";$("#alT").textContent="Pendientes de corregir"}
histUI();window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll("[data-dratab]").forEach(b=>b.onclick=()=>{draTab=b.dataset.dratab;applyDraTab();renderAlerts();loadAlerts()});
if($("#fabDra"))$("#fabDra").onclick=()=>{if(window.closeSet)window.closeSet();draTab="reportes";applyDraTab()};

// ---- Preferencias de notificaciones y correo ----
function mailUI(){const m=localStorage.getItem("ms_mail")||"";$("#mailIn").value=m;$("#calOpt").checked=localStorage.getItem("ms_cal")==="1";$("#assistantMailOpt").checked=localStorage.getItem("ms_mail_enabled")!=="0";$("#mailStatus").textContent=m?"Correo guardado: "+m:"Agrega tu correo para recibir avisos y usarlo en invitaciones de calendario."}
$("#mailAdd").onclick=async()=>{const m=$("#mailIn").value.trim().toLowerCase(),cal=$("#calOpt").checked,mailOn=$("#assistantMailOpt").checked;if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m))return toast("Escribe un correo válido","err");const ok=await post({action:"subscribe",email:m,calendar:cal,notifications:mailOn});if(!ok)return toast("No se pudo guardar. Revisa la conexión","err");localStorage.setItem("ms_mail",m);localStorage.setItem("ms_cal",cal?"1":"0");localStorage.setItem("ms_mail_enabled",mailOn?"1":"0");mailUI();toast("Preferencias guardadas")};
$("#saveDraPrefs").onclick=async()=>{const email=$("#draEmail").value.trim().toLowerCase(),enabled=$("#draNotify").checked;if(enabled&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))return toast("Escriba un correo válido","err");const ok=await post({action:"setAlertPrefs",enabled,email});if(!ok)return toast("No se pudo guardar. Revisa la conexión","err");localStorage.setItem("ms_dra_email",email);if(email)$("#calMail").value=email;ALERT_PREFS={enabled,email};toast("Preferencias guardadas")};
async function loadAlertPrefs(){try{const d=await api({action:"read",tipo:"preferencias"});if(d&&typeof d==="object"){ALERT_PREFS=d;$("#draNotify").checked=!!d.enabled;$("#draEmail").value=d.email||localStorage.getItem("ms_dra_email")||""}}catch(e){$("#draEmail").value=localStorage.getItem("ms_dra_email")||""}}

// ---- Datos ----
async function api(o){try{const r=await fetch(API,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({...o,token:TOK}),signal:AbortSignal.timeout?AbortSignal.timeout(25000):undefined}),d=await r.json();if(d&&d.error==="auth"){logout(true);return null}return d}catch(e){return null}}
async function post(o){const d=await api(o);return !!(d&&d.ok)}
function logout(exp){if(!TOK&&!exp)return;try{if(!exp)api({action:"logout"})}catch(e){}["ms_tok","ms_me","ms_role"].forEach(k=>localStorage.removeItem(k));if(exp)toast("Tu sesión terminó. Inicia sesión de nuevo","err");setTimeout(()=>location.reload(),exp?900:300)}
async function load(){let ok=true;
try{const d=await api({action:"read",tipo:""});if(!Array.isArray(d))throw 0;
const prev=new Set(DB.map(x=>x.id));
DB=d.map(w=>({id:w.ID,timestamp:w["Fecha Registro"],expediente:w.Expediente,esNuevo:w["Es Nuevo"]==="SÍ",estadoParticipante:w["Estado Participante"]||"Activo",fechaVisita:w["Fecha Visita"]||"",fechaLlegada:w["Fecha Llegada"]||"",formularios:(w.Formularios||"").split(", ").filter(Boolean),notas:w.Notas||"",estado:w.Estado||"Pendiente",horaVisita:w["Hora Visita"]||"",completos:w["Formularios Completos"]!=="NO",bdE:w["BD Estado"]||"Sin iniciar",bdR:w["BD Responsable"]||"",rcE:w["RedCap Estado"]||"Sin iniciar",rcR:w["RedCap Responsable"]||"",obs:String(w.Observaciones||"").split("\n").filter(Boolean)}));
const n=DB.filter(r=>r.estado==="Pendiente"&&!prev.has(r.id)).length;
if(loaded&&n&&role==="asis")notify(n);loaded=true}catch(e){ok=false}
$("#dot").className="dot"+(ok?"":" off");render();renderRecent();await Promise.all([loadAlerts(),loadAv()])}

// ---- Vista Lilliam ----
$("#forms").innerHTML=G.map((g,i)=>`<details class="card grp"><summary><b>${g[0]}</b><span class="gc" id="gc${i}">0/${g[1].length}</span><span class="sp"></span><button type="button" class="ghost" data-all="${i}">Seleccionar todo</button><span class="chev">${ic("chev")}</span></summary><div class="gb">${g[1].map(f=>`<label class="opt"><input type="checkbox" name="fm" data-g="${i}" value="${f}"><span>${f}</span></label>`).join("")}</div></details>`).join("");
function cnt(){G.forEach((g,i)=>{const n=document.querySelectorAll(`[data-g="${i}"]:checked`).length,e=$("#gc"+i);e.textContent=n+"/"+g[1].length;e.classList.toggle("on",n>0)})}
$("#forms").onclick=e=>{const i=e.target.dataset.all;if(i==null)return;e.preventDefault();const c=[...document.querySelectorAll(`[data-g="${i}"]`)],on=c.some(x=>!x.checked);c.forEach(x=>x.checked=on);cnt()};
$("#forms").onchange=cnt;$("#fDra").addEventListener("reset",()=>setTimeout(()=>{cnt();$("#calBox").hidden=true;$("#calMail").value=localStorage.getItem("ms_dmail")||""}));
$("#cal").onchange=()=>{$("#calBox").hidden=!$("#cal").checked;if($("#cal").checked)$("#calMail").value=localStorage.getItem("ms_dra_email")||$("#draEmail").value||""};$("#calMail").value=localStorage.getItem("ms_dmail")||"";
document.querySelectorAll("[name=est]").forEach(r=>r.onchange=()=>{$("#forms").hidden=document.querySelector("[name=est]:checked").value!=="Activo"});
$("#fDra").onsubmit=async e=>{e.preventDefault();const est=document.querySelector("[name=est]:checked").value,act=est==="Activo";
const fm=act?[...document.querySelectorAll("[name=fm]:checked")].map(x=>x.value):["[Cambio de Estado: "+est+"]"];
if(!fm.length)return toast("Selecciona al menos un formulario","err");
const ex=$("#exp").value.trim().toUpperCase();if(DB.some(r=>r.expediente===ex&&r.estado==="Pendiente")&&!confirm("Ya hay un reporte pendiente del expediente "+ex+". ¿Enviar otro de todos modos?"))return;
const cal=$("#cal").checked,cm=$("#calMail").value.trim().toLowerCase();
if(cal){if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(cm))return toast("Escribe tu correo para recibir el evento","err");
if(!$("#llegada").value&&!(act&&$("#fecha").value))return toast("Elige al menos una fecha para el calendario","err");localStorage.setItem("ms_dmail",cm)}
const d=new Date(),z=n=>String(n).padStart(2,"0");
const rec={action:"add",id:"REG-"+Date.now(),timestamp:`${z(d.getDate())}/${z(d.getMonth()+1)}/${d.getFullYear()} ${z(d.getHours())}:${z(d.getMinutes())}:${z(d.getSeconds())}`,
expediente:$("#exp").value.trim().toUpperCase(),esNuevo:$("#nuevo").checked,estadoParticipante:est,fechaVisita:act?$("#fecha").value:"",horaVisita:act&&$("#fecha").value?$("#hora").value:"",completos:!act||document.querySelector("[name=comp]:checked").value==="SÍ",formularios:fm,notas:$("#notas").value.trim(),estado:"Pendiente",usuario:"Dra",fechaLlegada:$("#llegada").value,calendar:cal,calEmail:cm};
const b=$("#send");b.disabled=true;b.textContent="Enviando…";
        await post(rec);await load();
        const ok=DB.some(r=>r.id===rec.id);
        
        // --- INYECTAR EN AVANCES SI ES NUEVO ---
        if(ok){
           const mMatch = /^CRM[-\s]?0*(\d{1,3})$/i.exec(ex);
           if(mMatch){
             const p2 = pad2(parseInt(mMatch[1], 10));
             const delK = "DEL|N|"+p2;
             if(isDel(delK)) avDelPut(delK,"0"); // Restaura si estaba borrado
             
             // Agrega las filas vacías a AVD para que la tabla las dibuje
             AVD["BD|CRM"+p2] = {v: avV(AVS.bd,"CRM"+p2), n: ""};
             AVD["RM|CR-M-"+p2] = {v: avV(AVS.rm,"CR-M-"+p2), n: ""};
             avPut(AVS.bd, "CRM"+p2, AVD["BD|CRM"+p2].v, "");
             avPut(AVS.rm, "CR-M-"+p2, AVD["RM|CR-M-"+p2].v, "");
             
             sig="force"; if(typeof renderAvDra==="function") renderAvDra(1);
           }
        }
        // ----------------------------------------
        
        toast(ok?"✓ Registro enviado y confirmado en la hoja":"No se pudo confirmar el envío. Revisa la conexión e inténtalo de nuevo",ok?"":"err");
        if(ok){$("#fDra").reset();$("#forms").hidden=false;$("#exp").focus()}b.disabled=false;b.textContent="Enviar registro"};

function chk(r){return r.completos?"":'<p class="mu s"><span class="tag co">⚠ Formularios incompletos</span></p>'}
function trk(r,edit){if(!/^(Pendiente|Completado)$/.test(r.estado))return"";return[["bd","Base de datos"],["rc","RedCap"]].map(([k,nm])=>{const e=r[k+"E"],p=r[k+"R"];return edit?`<div class="trk"><b>${nm}</b><select data-a="s" data-k="${k}" data-id="${esc(r.id)}">${["Sin iniciar","En proceso","Finalizado"].map(o=>`<option${o===e?" selected":""}>${o}</option>`).join("")}</select><input type="text" placeholder="¿Quién lo hace?" value="${esc(p)}" data-a="w" data-k="${k}" data-id="${esc(r.id)}"></div>`:`<p class="mu s">${nm}: <b>${e}</b>${p?" · "+esc(p):""}</p>`}).join("")}
const TH=[["ciruela","Ciruela","#92228C","#A93E7E"],["salvia","Salvia","#4f7d68","#6b9684"],["oceano","Océano","#4a6fa5","#6b8fc0"],["arena","Arena","#a0694b","#bf8a6c"],["aurora","Aurora","#3B82F6","#FBCFE8"],["sunset","Sunset","#EA6113","#FBB931"],["viola","Viola","#7a1fa2","#FFC472"],["luigi","Luigi","#30B155","#C2DD6C"]];
$("#sw").innerHTML=TH.map(t=>`<button type="button" class="sw" data-c="${t[0]}"><i style="background:linear-gradient(135deg,${t[2]},${t[3]})"></i>${t[1]}</button>`).join("");
function thUI(){const c=localStorage.getItem("ms_color")||"ciruela",m=localStorage.getItem("ms_theme")||"auto";document.querySelectorAll(".sw").forEach(b=>b.classList.toggle("on",b.dataset.c===c));document.querySelectorAll("[data-m]").forEach(b=>b.classList.toggle("on",b.dataset.m===m))}
$("#sw").onclick=e=>{const b=e.target.closest(".sw");if(!b)return;localStorage.setItem("ms_color",b.dataset.c);theme();thUI()};
$("#modeTabs").onclick=e=>{const m=e.target.closest("[data-m]")?.dataset.m;if(!m)return;m==="auto"?localStorage.removeItem("ms_theme"):localStorage.setItem("ms_theme",m);theme();thUI()};
$("#bThemes").onclick=()=>{$("#themeBox").hidden=!$("#themeBox").hidden;thUI()};
let avMode="bd",hsMode="exp";
document.querySelectorAll("[data-hs]").forEach(b=>b.onclick=()=>{hsMode=b.dataset.hs;document.querySelectorAll("[data-hs]").forEach(x=>x.classList.toggle("on",x===b));sig="";render()});
function trkOne(r,k){const e=r[k+"E"],p=r[k+"R"];return `<div class="trk"><select data-a="s" data-k="${k}" data-id="${esc(r.id)}">${["Sin iniciar","En proceso","Finalizado"].map(o=>`<option${o===e?" selected":""}>${o}</option>`).join("")}</select><input type="text" placeholder="¿Quién lo hace?" value="${esc(p)}" data-a="w" data-k="${k}" data-id="${esc(r.id)}"></div>`}
function avH(it){const nm=avMode==="bd"?"Base de datos":"RedCap",all=DB.filter(r=>/^(Pendiente|Completado)$/.test(r.estado)),done=all.filter(r=>r[avMode+"E"]==="Finalizado").length,pct=all.length?Math.round(done/all.length*100):0;
return `<div class="card sum"><div class="row"><b>${nm}</b><span class="sp"></span><span class="mu">${done} de ${all.length} finalizados · ${pct}%</span></div><div class="bar"><i style="width:${pct}%"></i></div></div>`+(it.length?it.map(r=>{const e=r[avMode+"E"];return `<div class="card"><div class="row"><b class="exp">${esc(r.expediente)}</b><span class="sp"></span><span class="tag ${e==="Finalizado"?"st-a":e==="En proceso"?"co":""}">${esc(e)}</span></div>${trkOne(r,avMode)}</div>`}).join(""):'<div class="empty">Nada por aquí</div>')}
document.querySelectorAll("[data-av]").forEach(b=>b.onclick=()=>{avMode=b.dataset.av;document.querySelectorAll("[data-av]").forEach(x=>x.classList.toggle("on",x===b));sig="";render()});

// ---- Avances v2: Base de datos / RedCap / General + comentarios + sincronización multiusuario ----
let AVD={},AVT={},COM=[],AB="V",agEditOpen=false,rcSub="rm",AGX=[0],AGY=[0],comLoaded=false;
const GR="#cfd8e3",SEED={"BD|CRM01":["V,V,V,V,V,A,V,V,V,V,A,V,A",""],"BD|CRM02":["V,V,V,V,V,A,V,V,V,V,A,V,A",""],"BD|CRM03":["V,V,V,V,V,A,R,V,V,V,A,V,A",""],"BD|CRM04":["V,V,V,G,G,G,R,G,G,G,G,G,G",""],"BD|CRM05":["V,V,V,V,V,A,V,V,V,V,A,V,A",""],"BD|CRM06":["V,V,V,V,V,A,V,V,V,V,A,V,A",""],"BD|CRM07":["V,V,V,G,G,G,R,G,G,G,G,G,G",""],"BD|CRM08":["V,V,V,V,V,A,V,V,V,V,A,V,A",""],"BD|CRM09":["V,V,V,V,V,A,V,V,V,V,A,V,A",""],"BD|CRM10":["V,V,V,V,V,A,V,V,V,V,A,V,A",""],"BD|CRM11":["V,V,V,V,V,A,V,V,V,V,A,R,A",""],"BD|CRM12":["V,V,V,G,G,G,R,G,G,G,G,G,G",""],"BD|CRM13":["V,V,V,V,V,A,V,V,V,V,A,V,A",""],"BD|CRM14":["V,V,V,V,V,A,V,V,V,V,A,V,A",""],"BD|CRM15":["V,V,G,G,G,G,R,G,G,G,G,G,G",""],"BD|CRM16":["V,V,V,V,V,A,V,V,V,V,A,V,A",""],"BD|CRM17":["V,V,V,V,V,A,R,V,R,R,A,R,A",""],"BD|CRM18":["V,V,V,V,V,A,V,V,V,V,A,V,A",""],"BD|CRM19":["V,V,V,V,R,A,N,N,N,N,A,N,A",""],"BD|CRM20":["V,V,V,V,R,A,N,N,N,N,A,N,A",""],"BD|CRM21":["V,V,G,G,G,G,G,G,G,G,G,G,G",""],"BD|CRM22":["V,R,V,V,V,A,N,N,N,N,A,N,A",""],"BD|CRM23":["R,V,N,N,N,A,N,N,N,N,A,N,A",""],"BD|CRM24":[",,,G,G,G,G,G,G,G,G,G,G",""],"BD|CRM25":[",,,,,A,,,,,A,,A",""],"BD|CRM26":[",,,,,A,,,,,A,,A",""],"RM|CR-M-01":["V,V,V,V,V,R,V,R","Están pendientes los resultados de composición corporal correspondientes a los formularios N.º 4, N.º 7 y N.º 8."],"RM|CR-M-02":["V,V,V,V,V,R,V,R","Están pendientes los resultados de composición corporal correspondientes a los formularios N.º 4, N.º 7 y N.º 8."],"RM|CR-M-03":["V,V,V,V,V,R,V,R","Están pendientes los resultados de composición corporal de los formularios N.º 4, N.º 7 y N.º 8. Además, falta registrar el perímetro al nacer en el apartado 2.11 del Cuestionario 2."],"RM|CR-M-04":["V,V,V,V,S,S,S,S","La participante se retiró durante la segunda visita."],"RM|CR-M-05":["V,V,V,V,V,R,V,R","Están pendientes los resultados de composición corporal correspondientes a los formularios N.º 4, N.º 7 y N.º 8."],"RM|CR-M-06":["V,V,V,V,V,R,V,R","Están pendientes los resultados de composición corporal correspondientes a los formularios N.º 4, N.º 7 y N.º 8."],"RM|CR-M-07":["V,V,V,V,S,S,S,S","La participante se retiró durante la segunda visita."],"RM|CR-M-08":["V,V,V,V,V,R,V,R","Están pendientes los resultados de composición corporal correspondientes a los formularios N.º 4, N.º 7 y N.º 8."],"RM|CR-M-09":["V,V,V,V,V,R,V,R","Están pendientes los resultados de composición corporal correspondientes a los formularios N.º 4, N.º 7 y N.º 8."],"RM|CR-M-10":["V,V,V,V,V,R,V,R","Están pendientes los resultados de composición corporal correspondientes a los formularios N.º 4, N.º 7 y N.º 8."],"RM|CR-M-11":["V,V,V,V,V,R,V,R","Están pendientes los resultados de composición corporal del formulario N.º 4 y del formulario N.º 7. También se requiere revisar y completar los datos correspondientes al formulario N.º 8."],"RM|CR-M-12":["V,V,V,V,S,S,S,S","La participante se retiró durante la segunda visita."],"RM|CR-M-13":["V,V,V,V,V,R,V,R","Están pendientes los resultados de composición corporal correspondientes a los formularios N.º 4, N.º 7 y N.º 8."],"RM|CR-M-14":["V,V,V,V,V,R,V,R","Están pendientes los resultados de composición corporal correspondientes a los formularios N.º 4, N.º 7 y N.º 8."],"RM|CR-M-15":["V,V,V,S,S,S,S,S","La participante se retiró durante la primera visita."],"RM|CR-M-16":["V,V,V,V,V,R,V,R","Están pendientes los resultados de composición corporal correspondientes a los formularios N.º 4, N.º 7 y N.º 8."],"RM|CR-M-17":["V,V,V,V,V,R,R,R","Están pendientes los resultados de composición corporal de los formularios N.º 4 y N.º 8. En el formulario N.º 6 falta el peso final del embarazo. En el formulario N.º 7 falta el número de frasco. En el formulario N.º 8 se deben completar los datos sobre líquidos entre la medición basal y la posdosi"],"RM|CR-M-18":["V,V,V,V,V,R,V,R","Están pendientes los resultados de composición corporal de los formularios N.º 4, N.º 7 y N.º 8. Además, se debe corregir el código de la persona entrevistadora en el Cuestionario 2."],"RM|CR-M-19":["V,V,V,V,V,R,S,S","Falta registrar el número de frasco y la hora de la última ingesta de alimentos. También están pendientes los resultados de composición corporal del formulario N.º 4 y el número de frasco correspondiente."],"RM|CR-M-20":["V,V,V,V,V,R,S,S","Están pendientes los resultados de composición corporal de los formularios N.º 4, N.º 7 y N.º 8. En el formulario N.º 4 falta el número de frasco y están pendientes los resultados de composición corporal correspondientes."],"RM|CR-M-21":["V,V,V,S,S,S,S,S","La participante se retiró durante la primera visita."],"RM|CR-M-22":["V,V,V,V,V,R,S,S","Están pendientes los resultados de composición corporal de los formularios N.º 4, N.º 7 y N.º 8. "],"RM|CR-M-23":["V,V,V,V,V,R,S,S","Están pendientes los resultados de composición corporal de los formularios N.º 4, N.º 7 y N.º 8. "],"RM|CR-M-24":["V,V,R,V,S,S,S,S","Están pendientes los resultados de composición corporal de los formularios N.º 4, N.º 7 y N.º 8.  Falta registrar el peso al inicio del control prenatal en el formulario de recolección N.º 1."],"RM|CR-M-25":["V,V,V,V,V,R,S,S","El expediente cuenta con información hasta la tercera visita. En el formulario N.º 4 se deben completar o verificar el número de frasco, la hora de consumo de líquidos, la muestra de saliva posdosis y la hora de obtención de la muestra."],"RM|CR-M-26":["V,V,V,V,S,S,S,S","El expediente cuenta con información hasta la primera visita. Se requieren las firmas correspondientes en el formulario N.º 2."],"RB|01":["V,V,V,V,R","Agua corporal total por deuterio (3 meses posparto): faltan los resultados de composición corporal."],"RB|02":["V,V,V,V,R","Agua corporal total por deuterio (3 meses posparto): faltan los resultados de composición corporal."],"RB|03":["V,R,V,V,R","Datos del niño: Falta el perimetro cefálico al nacer (centímetros)"],"RB|04":["V,S,S,S,S","Retiro "],"RB|05":["V,V,V,V,R","Agua corporal total por deuterio (3 meses posparto): faltan los resultados de composición corporal."],"RB|06":["V,V,V,V,R","Agua corporal total por deuterio (3 meses posparto): faltan los resultados de composición corporal."],"RB|07":["V,S,S,S,S","Retiro"],"RB|08":["V,V,V,V,R","Agua corporal total por deuterio (3 meses posparto): faltan los resultados de composición corporal."],"RB|09":["V,V,V,V,R","Agua corporal total por deuterio (3 meses posparto): faltan los resultados de composición corporal."],"RB|10":["V,V,V,V,R","Agua corporal total por deuterio (3 meses posparto): faltan los resultados de composición corporal."],"RB|11":["V,V,V,V,R","Agua corporal total por deuterio (3 meses posparto): faltan los resultados de composición corporal."],"RB|12":["V,S,S,S,S","Retiro"],"RB|13":["V,V,V,V,R","Agua corporal total por deuterio (3 meses posparto): faltan los resultados de composición corporal."],"RB|14":["V,V,V,V,R","Agua corporal total por deuterio (3 meses posparto): faltan los resultados de composición corporal."],"RB|15":["V,S,S,S,S","Retiro"],"RB|16":["V,V,V,V,R","Agua corporal total por deuterio (3 meses posparto): faltan los resultados de composición corporal."],"RB|17":["V,V,V,V,R","Agua corporal total por deuterio (3 meses posparto): faltan los resultados de composición corporal."],"RB|18":["V,V,V,V,R","Agua corporal total por deuterio (3 meses posparto): faltan los resultados de composición corporal."],"RB|None":[",,,,",""]},
RC=[["V","Completo","#a9d18e"],["R","Incompleto","#ff4d4d"],["S","Incompleto (sin datos guardados)","#ff9f43"],["X","Por verificar","#ffd966"]],
avIds=(p,n)=>Array.from({length:n},(_,i)=>p+String(i+1).padStart(2,"0")),
AVS={bd:{t:"Base de datos",pre:"BD",ids:avIds("CRM",26),cols:[["Cuest. 1 · 1ª vis.","#92d050"],["Antrop. 1ª vis.","#d070d0"],["Antrop. 2ª vis.","#4db8ff"],["Antrop. 3ª vis.","#f4b183"],["Agua 3ª vis.","#3fa9e0"],["R. Mic","#bfbfbf",1],["Cuest. 2 · 4ª vis.","#ffd966"],["Antrop. 4ª bebé","#ffff66"],["Antrop. 4ª madre","#e2a0e2"],["Agua 4ª madre","#7fc7f0"],["R. Mic","#bfbfbf",1],["Agua 4ª bebé","#ff8f8f"],["R. Mic","#bfbfbf",1]],
 st:[["V","Completo","#a9d18e"],["R","Incompleto","#ff4d4d"],["G","Se retiró","#7f7f7f"],["N","Pend. de visita","#ffd966"],["A","Pend. de análisis","#00b0f0"],["P","Perdido","#ff4fb0"]]},
rm:{t:"RedCap · Madres",pre:"RM",ids:avIds("CR-M-",26),notes:1,st:RC,ord:[0,1,2,3,4,6,5,7],cols:[["Identificador",GR],["Cuest. 1 · 1ª vis.","#92d050"],["Antrop. 1ª vis.","#d070d0"],["Antrop. 2ª vis.","#4db8ff"],["Antrop. 3ª vis.","#f4b183"],["Antrop. 4ª madre","#e2a0e2"],["Agua 3ª vis.","#3fa9e0"],["Agua 4ª madre","#7fc7f0"]]},
rb:{t:"RedCap · Bebés",pre:"RB",ids:avIds("",19),notes:1,st:RC,cols:[["Identificador",GR],["Datos del niño",GR],["Cuest. 2 · 4ª vis.","#ffd966"],["Antrop. 4ª bebé","#ffff66"],["Agua 4ª bebé","#ff8f8f"]]}},
HN={bd:"Base de datos",rm:"RedCap · Madres",rb:"RedCap · Bebés",gn:"General"},
PR=[["Cuest. 1 · 1ª vis.",0,"rm",1],["Antrop. 1ª vis.",1,"rm",2],["Antrop. 2ª vis.",2,"rm",3],["Antrop. 3ª vis.",3,"rm",4],["Agua 3ª vis.",4,"rm",6],["Cuest. 2 · 4ª vis.",6,"rb",2],["Antrop. 4ª bebé",7,"rb",3],["Antrop. 4ª madre",8,"rm",5],["Agua 4ª madre",9,"rm",7],["Agua 4ª bebé",11,"rb",4]];
const myR=()=>role==="dra"?"investigadora":"asistente",cSeen=()=>JSON.parse(localStorage.getItem("ms_cseen")||"{}");
const pad2=n=>String(n).padStart(2,"0");

// Sincronización de eliminaciones para TODOS los usuarios:
// Guarda tanto en DEL|... (para nuevo backend) como el marcador "[ELIMINADO]" en la nota de BD|CRMxx o RB|xx (compatible de inmediato sin tocar nada)
function isDel(k){
  const o=AVD[k];if(o&&o.v&&o.v[0]==="1")return true;
  const q=k.split("|");
  if(q[1]==="N"){
    const b=AVD["BD|CRM"+q[2]],m=AVD["RM|CR-M-"+q[2]];
    return !!((b&&b.n==="[ELIMINADO]")||(m&&m.n==="[ELIMINADO]"));
  }
  if(q[1]==="RB"){
    const r=AVD["RB|"+q[2]];
    return !!(r&&r.n==="[ELIMINADO]");
  }
  return false;
}
function avNums(){
  const s=new Set(Array.from({length:26},(_,i)=>i+1));
  DB.forEach(r=>{const x=/^CRM[-\s]?0*(\d{1,3})$/i.exec(String(r.expediente).trim());if(x)s.add(+x[1])});
  Object.keys(AVD).forEach(k=>{const x=/^(?:BD\|CRM|RM\|CR-M-|DEL\|N\|)(\d+)$/.exec(k);if(x)s.add(+x[1])});
  return[...s].sort((a,b)=>a-b).filter(n=>!isDel("DEL|N|"+pad2(n)));
}
function avRows(m){
  if(m.pre==="RB"){
    const s=new Set(Array.from({length:19},(_,i)=>i+1));
    Object.keys(AVD).forEach(k=>{const x=/^(?:RB\||DEL\|RB\|)(\d+)$/.exec(k);if(x)s.add(+x[1])});
    return[...s].sort((a,b)=>a-b).filter(n=>!isDel("DEL|RB|"+pad2(n))).map(pad2);
  }
  return avNums().map(n=>(m.pre==="BD"?"CRM":"CR-M-")+pad2(n));
}
function avRec(m,id){const k=m.pre+"|"+id,o=AVD[k];if(o)return o;const s=SEED[k];return s?{v:s[0].split(","),n:s[1]}:null}
function avV(m,id){const o=avRec(m,id),a=o?o.v.slice():m.cols.map(c=>c[2]?"A":"");while(a.length<m.cols.length)a.push("");return a.slice(0,m.cols.length)}
function avPut(m,id,v,n){const k=m.pre+"|"+id,o=avRec(m,id)||{n:""};AVD[k]={v,n:n===null?(o.n==="[ELIMINADO]"?"":o.n):n};clearTimeout(AVT[k]);AVT[k]=setTimeout(async()=>{let ok=false;for(const w of[0,1500,4000]){if(w)await new Promise(r=>setTimeout(r,w));ok=await post({action:"setAvance",clave:k,valores:AVD[k].v.join(","),notas:AVD[k].n});if(ok)break}delete AVT[k];if(!ok){const q=JSON.parse(localStorage.getItem("ms_q")||"{}");q[k]=AVD[k];localStorage.setItem("ms_q",JSON.stringify(q));toast("Sin conexión: "+id+" se guardará al volver","err")}},350)}

function delList(m){
  const seen=new Set(),o=[];
  const nums=new Set(Array.from({length:26},(_,i)=>pad2(i+1)));
  Object.keys(AVD).forEach(k=>{const x=/^(?:BD\|CRM|RM\|CR-M-|RB\||DEL\|(?:N|RB)\|)(\d+)$/.exec(k);if(x)nums.add(pad2(+x[1]))});
  nums.forEach(num=>{
    const k=(m.pre==="RB"?"DEL|RB|":"DEL|N|")+num;
    if(isDel(k)&&!seen.has(k)){seen.add(k);o.push({k,id:num,lab:m.pre==="RB"?"Bebé "+num:"CRM"+num+" · CR-M-"+num})}
  });
  return o.sort((a,b)=>a.id.localeCompare(b.id));
}
function avDelPut(k,f){
  AVD[k]={v:[f],n:""};
  const q=k.split("|"),num=q[2];
  if(q[1]==="N"){
    const bk="BD|CRM"+num,bv=avV(AVS.bd,"CRM"+num);
    avPut(AVS.bd,"CRM"+num,bv,f==="1"?"[ELIMINADO]":"");
  }else if(q[1]==="RB"){
    const rv=avV(AVS.rb,num),oldN=((SEED["RB|"+num]||[])[1])||"";
    avPut(AVS.rb,num,rv,f==="1"?"[ELIMINADO]":oldN);
  }
  clearTimeout(AVT[k]);AVT[k]=setTimeout(async()=>{
    await post({action:"setAvance",clave:k,valores:f,notas:""});
    delete AVT[k];
  },250);
}

// Detalle de expedientes retirados ("G" = Se retiró): cantidad por expediente + formulario a partir del cual se retiró
function getRetiradosBD(){
  const m=AVS.bd,ord=m.ord||m.cols.map((_,i)=>i);
  const rows=avRows(m).map(id=>({id,v:avV(m,id)}));
  const out=[];
  rows.forEach(r=>{
    const idx=ord.findIndex(i=>r.v[i]==="G");
    if(idx>=0){
      const colIdx=ord[idx];
      const formName=m.cols[colIdx][0];
      const totalG=r.v.filter((x,i)=>!m.cols[i][2]&&x==="G").length;
      const num=r.id.replace(/\D+/g,"");
      const rmNote=((avRec(AVS.rm,"CR-M-"+num)||{}).n)||"";
      out.push({id:r.id,desde:formName,totalG,nota:rmNote&&rmNote!=="[ELIMINADO]"?rmNote:""});
    }
  });
  return out;
}
function showRetiradosDlg(){
  const L=getRetiradosBD();
  const body=L.length
    ?`<p class="mu s" style="margin:0">Total: <b>${L.length} ${L.length===1?"expediente retirado":"expedientes retirados"}</b>. Se indica a partir de cuál formulario se registró el retiro:</p><div class="rlist">${L.map(x=>`<div class="ret-item"><b>${esc(x.id)}</b><span>Se retiró a partir de: <b>${esc(x.desde)}</b></span>${x.nota?`<small>📝 ${esc(x.nota)}</small>`:""}</div>`).join("")}</div>`
    :`<p class="mu" style="margin:0">No hay expedientes marcados como «Se retiró» en este momento.</p>`;
  dlgBox("Expedientes que se retiraron",body+'<div class="dlg-a"><button type="button" class="btn" data-r="1">Entendido</button></div>');
}

function dlgBox(title,body,btns){return new Promise(res=>{const o=document.createElement("div");o.className="dlg";o.innerHTML='<div class="dlg-p" role="dialog" aria-modal="true"><b></b>'+body+'</div>';o.querySelector("b").textContent=title;const end=v=>{o.classList.add("out");setTimeout(()=>o.remove(),300);res(v)};o.onclick=e=>{const b=e.target.closest("[data-r]");if(b)end(b.dataset.r);else if(e.target===o)end(null)};document.body.appendChild(o)})}
function confirmDlg(title,text,okL){return dlgBox(title,'<p class="mu" style="margin:0">'+String(text).replace(/&/g,"&amp;").replace(/</g,"&lt;")+'</p><div class="dlg-a"><button type="button" class="ghost" data-r="">Cancelar</button><button type="button" class="btn" data-r="1" style="background:#e5484d">'+okL+'</button></div>').then(v=>v==="1")}
function avBadge(){const s=cSeen(),n=COM.filter(c=>c.r!==myR()&&c.ts>(s[c.h]||0)).length;document.querySelectorAll("[data-tab=avance],[data-dratab=avance]").forEach(b=>{let x=b.querySelector(".bdg");if(!n){x&&x.remove();return}if(!x){x=document.createElement("span");x.className="bdg";b.appendChild(x)}x.textContent=n})}
async function loadAv(){
  if(Object.keys(AVT).length)return;
  try{
    const d=await api({action:"read",tipo:"avances"});
    if(!Array.isArray(d)||(d.length&&!d[0].k))return;
    const o={},remotos=[];
    d.forEach(r=>{
      if(r.k.startsWith("CM|")){
        const q=r.k.split("|");
        remotos.push({h:q[1],ts:+q[2],t:r.v,r:r.n,f:r.u,a:r.p});
      }else o[r.k]={v:r.v.split(","),n:r.n};
    });
    const mx=COM.reduce((a,c)=>Math.max(a,c.ts),0);
    const nw=remotos.filter(c=>c.ts>mx&&c.r!==myR()).length;
    Object.assign(o,JSON.parse(localStorage.getItem("ms_q")||"{}"));
    AVD=o;
    COM=mergeComents(COM,remotos);
    if(!localStorage.getItem("ms_cseen")){
      const s={};COM.forEach(c=>s[c.h]=Math.max(s[c.h]||0,c.ts));
      localStorage.setItem("ms_cseen",JSON.stringify(s))
    }
    if(comLoaded&&nw)toast("💬 Comentario nuevo en Avance");
    comLoaded=true;
    avBadge();render();renderAvDra()
  }catch(e){}
}
/* ===== BLOQUE 2: Chat estilo WhatsApp + sincronización de comentarios ===== */
const CHD={};
const fmtChatDay = ts => {
  const d = new Date(ts), hoy = new Date(); hoy.setHours(0,0,0,0);
  const dd = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diff = Math.round((hoy - dd) / 86400000);
  if (diff === 0) return "Hoy";
  if (diff === 1) return "Ayer";
  if (diff < 7) return DIAS_L[d.getDay()];
  return `${d.getDate()} de ${MESES_C[d.getMonth()]}`;
};
const hhmm = ts => { const d = new Date(ts); return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`; };
const chatKey = c => `${c.h}|${c.ts}|${c.r}|${String(c.t).slice(0,80)}`;
function mergeComents(local, remote) {
  const seen = new Set(), out = [];
  [...(remote||[]), ...(local||[])].forEach(c => {
    if (!c || !c.h || !c.ts) return;
    const k = chatKey(c);
    if (seen.has(k)) return;
    seen.add(k); out.push(c);
  });
  return out.sort((a,b) => a.ts - b.ts);
}
function msgH(c, showName) {
  return `<div class="msg ${c.r === myR() ? "me" : ""}">
    ${showName ? `<small>${esc(c.a || (c.r === "asistente" ? "Asistente" : "Dra. Lilliam"))}</small>` : ""}
    ${esc(c.t)}
    <span class="t">${hhmm(c.ts)}</span>
  </div>`;
}
function chH(k) {
  const L = COM.filter(c => c.h === k);
  const s = cSeen();
  const mx = L.reduce((a,c) => Math.max(a, c.ts), 0);
  if (mx > (s[k] || 0)) { s[k] = mx; localStorage.setItem("ms_cseen", JSON.stringify(s)); setTimeout(avBadge, 0); }

  let html = "", lastDay = "", lastR = "";
  L.forEach(c => {
    const dk = new Date(c.ts).toDateString();
    if (dk !== lastDay) {
      html += `<div class="msg-sep"><span>${fmtChatDay(c.ts)}</span></div>`;
      lastDay = dk; lastR = "";
    }
    const showName = c.r !== lastR;
    lastR = c.r;
    html += msgH(c, showName);
  });

  setTimeout(() => {
    document.querySelectorAll(`.msgs[data-k="${k}"]`).forEach(e => e.scrollTop = e.scrollHeight);
  }, 30);

  const d = CHD[k] || "";
  return `<div class="card chat">
    <div class="chat-hdr">
      <div class="avatar">${HN[k].split(" ")[0].slice(0,2).toUpperCase()}</div>
      <div><b>${HN[k]}</b><small>${L.length} ${L.length===1?"mensaje":"mensajes"} · compartido entre todos</small></div>
    </div>
    <div class="msgs" data-k="${k}">${html || ""}</div>
    <div class="composer">
      <textarea rows="1" maxlength="500" dir="ltr" enterkeyhint="send" autocomplete="off" placeholder="Escribe un comentario…" data-k="${k}">${esc(d)}</textarea>
      <button class="send" type="button" data-cs="${k}" aria-label="Enviar"${d.trim() ? "" : " disabled"}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
      </button>
    </div>
  </div>`;
}
async function chSend(box, k) {
  const i = box.querySelector("textarea"), t = i.value.trim();
  if (!t) return;
  const c = { h: k, ts: Date.now(), t, r: myR(), f: "ahora", a: "Tú" };
  COM = mergeComents([c], COM);
  CHD[k] = "";
  i.value = ""; i.style.height = "";
  box.querySelector(".send").disabled = true;
  const wrap = box.closest(".chat");
  if (wrap) wrap.outerHTML = chH(k);
  const nuevo = document.querySelector(`.msgs[data-k="${k}"]`);
  if (nuevo) nuevo.scrollTop = nuevo.scrollHeight;
  if (!await post({ action: "setAvance", clave: "CM", hilo: k, texto: t })) {
    toast("No se pudo enviar el comentario", "err");
  }
}

/* Tarjeta compacta para abrir el chat en pantalla completa inmersiva */
function chPreviewCard(k) {
  const L = COM.filter(c => c.h === k);
  const lastMsg = L.length ? L[L.length - 1] : null;
  const name = HN[k] || "Equipo";
  return `<div class="card chat-launcher-card" data-open-chat="${k}">
    <div class="chat-launcher-info">
      <div class="avatar">${name.split(" ")[0].slice(0,2).toUpperCase()}</div>
      <div class="chat-launcher-text">
        <div class="chat-launcher-title">
          <b>Comentarios · ${name}</b>
          <span class="chat-launcher-badge">${L.length}</span>
        </div>
        <p class="chat-launcher-preview">${lastMsg ? esc(lastMsg.t) : "Sin comentarios aún · Toca para abrir el chat"}</p>
      </div>
    </div>
    <button type="button" class="chat-launcher-btn" data-open-chat="${k}">
      Abrir chat <span class="chev">${ic("chev")}</span>
    </button>
  </div>`;
}

/* ===== CONTROLADOR DE SUBVIEWS INMERSIVAS Y GESTOS ESTILO iOS ===== */
let activeSubviewOnBack = null;
function openSubview(title, subtitle, contentHtml, onBackFn) {
  const container = document.getElementById("subviewContainer");
  const titleEl = document.getElementById("subviewTitle");
  const subEl = document.getElementById("subviewSubtitle");
  const bodyEl = document.getElementById("subviewBody");
  if (!container || !bodyEl) return;

  activeSubviewOnBack = onBackFn || null;
  if (titleEl) titleEl.textContent = title || "Detalle";
  if (subEl) {
    subEl.textContent = subtitle || "";
    subEl.style.display = subtitle ? "block" : "none";
  }
  bodyEl.innerHTML = contentHtml || "";

  container.hidden = false;
  requestAnimationFrame(() => {
    document.body.classList.add("in-subview");
  });

  try {
    history.pushState({ subview: true }, "");
  } catch(e) {}
}

function closeSubview() {
  if (!document.body.classList.contains("in-subview")) return;
  document.body.classList.remove("in-subview");
  
  const container = document.getElementById("subviewContainer");
  setTimeout(() => {
    if (container && !document.body.classList.contains("in-subview")) {
      container.hidden = true;
      const bodyEl = document.getElementById("subviewBody");
      if (bodyEl) bodyEl.innerHTML = "";
    }
    if (typeof activeSubviewOnBack === "function") {
      activeSubviewOnBack();
      activeSubviewOnBack = null;
    }
  }, 350);
}

// Botón de Volver en cabecera y lanzador de chat
document.addEventListener("click", e => {
  if (e.target.closest("#subviewBackBtn") || e.target.id === "subviewContainer") {
    closeSubview();
    return;
  }
  const chatLaunch = e.target.closest("[data-open-chat]");
  if (chatLaunch) {
    const k = chatLaunch.dataset.openChat;
    const name = HN[k] || "Equipo";
    openSubview("Comentarios", name, chH(k), () => {
      const launcher = document.querySelector(`.chat-launcher-card[data-open-chat="${k}"]`);
      if (launcher) launcher.outerHTML = chPreviewCard(k);
    });
    return;
  }
});

// Soporte para botón físico/hardware Atrás del celular
document.addEventListener("keydown", e => { if (e.key === "Escape" && document.body.classList.contains("in-subview")) closeSubview(); });
window.addEventListener("popstate", e => {
  if (document.body.classList.contains("in-subview")) {
    closeSubview();
  }
});

// Gesto táctil "Swipe Back" (deslizar de izquierda a derecha para volver)
{
  let touchStartX = 0, touchStartY = 0;
  window.addEventListener("touchstart", e => {
    if (e.touches && e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener("touchend", e => {
    if (!touchStartX) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
    if (touchStartX < 90 && dx > 70 && dy < 60) {
      if (document.body.classList.contains("in-subview")) {
        closeSubview();
      }
    }
    touchStartX = 0;
  }, { passive: true });
}
function renderGeneralProgressRing(pc, T, bdn){
  const c = 238.76;
  const off = Math.max(0, (c * (1 - (pc || 0) / 100)).toFixed(1));
  return `<div class="cal-prog-card">
    <div class="cal-prog-ring-wrap">
      <svg class="prog-ring" viewBox="0 0 100 100">
        <circle class="prog-ring-bg" cx="50" cy="50" r="38"></circle>
        <circle class="prog-ring-fill" cx="50" cy="50" r="38" stroke-dasharray="${c}" stroke-dashoffset="${off}"></circle>
      </svg>
      <div class="cal-prog-center">
        <span class="prog-pct">${pc}%</span>
        <span class="prog-sub">IGUALDAD</span>
      </div>
    </div>
    <div class="cal-prog-info">
      <div class="prog-title">Igualdad Base de datos ↔ RedCap</div>
      <p class="mu s" style="margin:2px 0 6px">RedCap lleva <b>${T.ok}</b> de los <b>${bdn}</b> formularios que ya están en la Base de datos física.</p>
      <div class="prog-metrics">
        <div class="prog-metric"><span class="pdot" style="background:#a9d18e"></span><span class="prog-metric-txt"><b>${T.ok}</b> en ambos sistemas</span></div>
        <div class="prog-metric"><span class="pdot" style="background:#ffd966"></span><span class="prog-metric-txt"><b>${T.fa}</b> falta pasar a RedCap</span></div>
        <div class="prog-metric"><span class="pdot" style="background:#ff7a7a"></span><span class="prog-metric-txt"><b>${T.so}</b> solo en RedCap</span></div>
        <div class="prog-metric"><span class="pdot" style="background:#d9d2dd"></span><span class="prog-metric-txt"><b>${T.pe}</b> pendientes en ambos</span></div>
      </div>
    </div>
  </div>`;
}

function genH(){const T={ok:0,fa:0,so:0,pe:0},per=PR.map(()=>({b:0,r:0})),gap={},rev={};
const NS=avNums(),RBS=new Set(avRows(AVS.rb));for(const n of NS){const e="CRM"+pad2(n),p2=pad2(n),bv=avV(AVS.bd,e),mv=avV(AVS.rm,"CR-M-"+p2),kv=RBS.has(p2)?avV(AVS.rb,p2):[];
PR.forEach((p,i)=>{const b=bv[p[1]],r=(p[2]==="rm"?mv:kv)[p[3]];if(b==="G"||b==="P")return;const bd=b==="V",rc=r==="V";per[i].b+=bd;per[i].r+=rc;
if(bd&&rc)T.ok++;else if(bd){T.fa++;(gap[e]=gap[e]||[]).push(p[0])}else if(rc){T.so++;(rev[e]=rev[e]||[]).push(p[0])}else T.pe++})}
const bdn=T.ok+T.fa,pc=bdn?Math.round(T.ok/bdn*100):0,
lg=(x,c,t)=>`<button type="button" style="background:${c};color:#222">${t} · ${x}</button>`,ls=o=>Object.keys(o).sort().map(e=>`<p class="mu s"><b>${e}</b> · ${o[e].join(", ")}</p>`).join("");
return `<div class="gn">`
+renderGeneralProgressRing(pc, T, bdn)
+`<div class="lg">${lg(T.ok,"#a9d18e","En ambos")}${lg(T.fa,"#ffd966","Falta pasar a RedCap")}${lg(T.so,"#ff7a7a","Solo en RedCap")}${lg(T.pe,"#d9d2dd","Pendiente en ambos")}</div>`
+`<div class="card"><b>Por formulario</b><p class="mu s"><span style="color:var(--pr)">■</span> Base de datos · <span style="color:#2f9e8f">■</span> RedCap</p>${PR.map((p,i)=>`<div class="pf"><span>${p[0]}</span><div><div class="bar" style="height:6px;margin:0"><i style="width:${per[i].b/NS.length*100}%"></i></div><div class="bar" style="height:6px;margin:3px 0 0"><i style="width:${per[i].r/NS.length*100}%;background:#2f9e8f"></i></div></div><small>${per[i].b} · ${per[i].r}</small></div>`).join("")}</div>`
+`<div class="card"><b>Falta pasar a RedCap</b><div class="gl">${ls(gap)||'<p class="mu s">Todo lo que está en la Base de datos ya está en RedCap.</p>'}</div>${Object.keys(rev).length?`<b style="display:block;margin-top:12px">Está en RedCap pero no en la Base de datos</b><div class="gl">${ls(rev)}</div>`:""}</div></div>`}

function renderProgressRing(pct, complete, total, incomplete, inProgress, title, subText){
  const c = 238.76;
  const off = Math.max(0, (c * (1 - (pct || 0) / 100)).toFixed(1));
  const sub = subText || "COMPLETOS";
  return `<div class="cal-prog-card">
    <div class="cal-prog-ring-wrap">
      <svg class="prog-ring" viewBox="0 0 100 100">
        <circle class="prog-ring-bg" cx="50" cy="50" r="38"></circle>
        <circle class="prog-ring-fill" cx="50" cy="50" r="38" stroke-dasharray="${c}" stroke-dashoffset="${off}"></circle>
      </svg>
      <div class="cal-prog-center">
        <span class="prog-pct">${pct}%</span>
        <span class="prog-sub">${sub}</span>
      </div>
    </div>
    <div class="cal-prog-info">
      <div class="prog-title">${esc(title || "Base de datos")}</div>
      <div class="prog-metrics">
        <div class="prog-metric"><span class="pdot" style="background:#22c55e"></span><span class="prog-metric-txt"><b>${complete}</b> completos de ${total}</span></div>
        <div class="prog-metric"><span class="pdot" style="background:#ef4444"></span><span class="prog-metric-txt"><b>${incomplete}</b> con formularios incompletos</span></div>
        <div class="prog-metric"><span class="pdot" style="background:#eab308"></span><span class="prog-metric-txt"><b>${inProgress}</b> expedientes en proceso</span></div>
      </div>
    </div>
  </div>`;
}
const stCol=(m,x)=>(m&&m.st&&m.st.find(s=>s[0]===x)||[])[2]||"transparent";
function updateProgressCardAndStats(m){
  const ord=m.ord||m.cols.map((_,i)=>i),req=m.cols.map(c=>!c[2]),
  rows=avRows(m).map(id=>({id,v:avV(m,id)})),
  sOf=v=>v.every((x,i)=>!req[i]||x==="V")?"f":v.some(x=>x==="R"||x==="S")?"i":"p",t={f:0,i:0,p:0},cnt={},expCnt={};
  rows.forEach(r=>{
    t[sOf(r.v)]++;
    const seenInRow=new Set();
    r.v.forEach(x=>{cnt[x]=(cnt[x]||0)+1;if(x)seenInRow.add(x)});
    seenInRow.forEach(x=>expCnt[x]=(expCnt[x]||0)+1);
  });
  const pct=rows.length?Math.round(t.f/rows.length*100):0;
  const pctEl=document.querySelector(".prog-pct");
  if(pctEl)pctEl.textContent=pct+"%";
  const fillEl=document.querySelector(".prog-ring-fill");
  if(fillEl){
    const c=238.76;
    fillEl.style.strokeDashoffset=Math.max(0,(c*(1-pct/100)).toFixed(1));
  }
  const mEls=document.querySelectorAll(".cal-prog-info .prog-metric-txt");
  if(mEls&&mEls.length>=3){
    mEls[0].innerHTML=`<b>${t.f}</b> completos de ${rows.length}`;
    mEls[1].innerHTML=`<b>${t.i}</b> con formularios incompletos`;
    mEls[2].innerHTML=`<b>${t.p}</b> expedientes en proceso`;
  }
  m.st.forEach(s=>{
    const isG=s[0]==="G";
    const numShow=isG?(expCnt.G||0)+" exp.":(cnt[s[0]]||0);
    const btn=document.querySelector(`.lg button[data-ab="${s[0]}"]`);
    if(btn)btn.innerHTML=`${s[1]} · ${numShow}${isG?" ⓘ":""}`;
  });
}
function agH(k,ed){
  const m=AVS[k],ord=m.ord||m.cols.map((_,i)=>i),req=m.cols.map(c=>!c[2]),
  rows=avRows(m).map(id=>{const rawN=(avRec(m,id)||{}).n||"";return{id,v:avV(m,id),n:rawN==="[ELIMINADO]"?"":rawN}}),
  sOf=v=>v.every((x,i)=>!req[i]||x==="V")?"f":v.some(x=>x==="R"||x==="S")?"i":"p",t={f:0,i:0,p:0},cnt={},expCnt={};
  rows.forEach(r=>{
    t[sOf(r.v)]++;
    const seenInRow=new Set();
    r.v.forEach(x=>{cnt[x]=(cnt[x]||0)+1;if(x)seenInRow.add(x)});
    seenInRow.forEach(x=>expCnt[x]=(expCnt[x]||0)+1);
  });
  const pct=rows.length?Math.round(t.f/rows.length*100):0,col=x=>stCol(m,x);
  setTimeout(()=>document.querySelectorAll(".ag").forEach(a=>{a.scrollLeft=AGX[0]||0;a.scrollTop=AGY[0]||0;}),0);

  const curSt=(m.st.find(s=>s[0]===AB)||[])[1]||(AB==="-"?"Borrar":AB==="DEL"?"Eliminar":"Editar");
  const curBg=(m.st.find(s=>s[0]===AB)||[])[2]||(AB==="DEL"?"#e5484d":"transparent");

  return renderProgressRing(pct,t.f,rows.length,t.i,t.p,m.t)
  +`<div class="lg">${m.st.map(s=>{
    const isG=s[0]==="G";
    const numShow=isG?(expCnt.G||0)+" exp.":(cnt[s[0]]||0);
    return `<button type="button" data-ab="${s[0]}" ${isG?'data-ret-info="1" title="Toca para ver cuáles expedientes se retiraron"':""} class="${ed&&AB===s[0]?"on":""}" style="background:${s[2]};color:${isG?"#fff":"#222"}">${s[1]} · ${numShow}${isG?" ⓘ":""}</button>`;
  }).join("")}</div>`
  +(ed&&AB==="DEL"?'<p class="mu s" style="margin-top:8px;color:#e5484d">Modo eliminar: toca el número del expediente que quieras quitar de la tabla para todos los usuarios.</p>':ed?'<p class="mu s" style="margin-top:8px">Elige una opción con el lápiz flotante o toca los indicadores para pintar celdas. Toca «Se retiró» para ver el resumen de retiros.'+(m.notes?" Toca el expediente para ver o escribir observaciones.":"")+"</p>":'<p class="mu s" style="margin-top:8px">💡 Toca el indicador gris <b>«Se retiró»</b> para ver cuáles expedientes se retiraron y a partir de qué formulario.</p>')
  +`<div class="ag-stage">
    <div class="ag${ed?" ed":""}${ed&&AB==="DEL"?" del":""}">
      <table>
        <tr><th></th>${ord.map(i=>`<th class="${m.cols[i][2]?"mic":""}" style="background:${m.cols[i][1]}">${m.cols[i][0]}</th>`).join("")}</tr>
        ${rows.map(r=>`<tr><td data-an="${r.id}">${r.id}${r.n?" 💬":""}</td>${ord.map(i=>`<td data-ac="${i}" class="${m.cols[i][2]?"mic":""}" style="background:${col(r.v[i])}"></td>`).join("")}</tr>`).join("")}
      </table>
    </div>
    ${ed?`
      <div class="ag-dial-backdrop" id="agDialBackdrop" ${agEditOpen?"":'hidden style="display:none;"'}></div>
      <div class="ag-dial-items" id="agDialItems" ${agEditOpen?"":'hidden style="display:none;"'}>
        ${m.st.map((s,idx)=>`<button type="button" class="ag-dial-pill ${AB===s[0]?"on":""}" data-ab="${s[0]}" style="--del:${idx*0.025}s"><span class="ag-dial-dot" style="background:${s[2]}"></span><span>${s[1]}</span>${AB===s[0]?'<span class="ag-dial-check">✓</span>':""}</button>`).join("")}
        <div class="ag-dial-sep"></div>
        <button type="button" class="ag-dial-pill ${AB==="-"?"on":""}" data-ab="-" style="--del:${m.st.length*0.025}s"><span class="ag-dial-dot" style="background:var(--bd)">🧹</span><span>Borrar celda</span>${AB==="-"?'<span class="ag-dial-check">✓</span>':""}</button>
        <button type="button" class="ag-dial-pill" data-add="1" style="--del:${(m.st.length+1)*0.025}s"><span class="ag-dial-dot plus">＋</span><span>Agregar expediente</span></button>
        <button type="button" class="ag-dial-pill del ${AB==="DEL"?"on":""}" data-ab="DEL" style="--del:${(m.st.length+2)*0.025}s"><span class="ag-dial-dot del">🗑</span><span>Eliminar expediente</span>${AB==="DEL"?'<span class="ag-dial-check">✓</span>':""}</button>
        ${delList(m).length?`<button type="button" class="ag-dial-pill" data-restore="1" style="--del:${(m.st.length+3)*0.025}s"><span class="ag-dial-dot">↩</span><span>Restaurar (${delList(m).length})</span></button>`:""}
      </div>
      <div class="ag-active-pill" id="agActivePill" ${(!agEditOpen&&AB&&AB!=="DEL"&&AB!=="-")?"":'hidden style="display:none;"'}><i style="background:${curBg}"></i><span>${curSt}</span></div>
      <button type="button" class="ag-fab-pencil ${agEditOpen?"open":""}" id="agFabPencil" title="Opciones de edición">
        ${ic("pencil")}
        <span class="ag-fab-badge-indicator" id="agFabBadge" style="background:${curBg};${(!agEditOpen&&curBg!=="transparent")?"":"display:none"}"></span>
      </button>
    `:""}
  </div>`;
}
function avPage(ed,it){const k=avMode==="bd"?"bd":avMode==="rc"?rcSub:"gn",top=ed?"":`<div class="tabs2">${[["bd","Base de datos"],["rc","RedCap"],["gn","General"]].map(([x,t])=>`<button type="button" data-avd="${x}" class="${avMode===x?"on":""}">${t}</button>`).join("")}</div>`,
sub=avMode==="rc"?`<div class="tabs2" style="margin-bottom:10px">${[["rm","Madres"],["rb","Bebés"]].map(([x,t])=>`<button type="button" data-rs="${x}" class="${rcSub===x?"on":""}">${t}</button>`).join("")}</div>`:"";
return `<div class="avw">${top}${sub}${avMode==="gn"?genH():agH(k,ed)}${chPreviewCard(k)}${ed&&avMode!=="gn"?`<details class="card" style="margin-top:12px"><summary><b>Registros por procesar</b> · ${HN[avMode==="bd"?"bd":"rm"].split(" ")[0]==="Base"?"Base de datos":"RedCap"}</summary>${avH(it)}</details>`:""}</div>`}
function renderAvDra(f){
  if(role!=="dra"||draTab!=="avance")return;
  if(!f&&document.activeElement?.matches("#avDra input,#avDra textarea"))return;
  const s=JSON.stringify(AVD)+JSON.stringify(COM)+avMode+rcSub+JSON.stringify(DB);
  if(!f&&s===sigAvDra)return;
  sigAvDra=s;
  $("#avDra").innerHTML=avPage(0,[]);
}
document.body.appendChild($("#toast"));
document.addEventListener("scroll",e=>{if(e.target.classList&&e.target.classList.contains("ag")){AGX[0]=e.target.scrollLeft;AGY[0]=e.target.scrollTop;}},true);
document.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey&&!e.isComposing&&e.target.matches&&e.target.matches(".composer textarea")){e.preventDefault();const b=e.target.closest(".chat");chSend(b,b.querySelector("[data-cs]").dataset.cs)}if(e.key==="Escape"&&!$("#alertForm").hidden)closeForm()});
document.addEventListener("input",e=>{const t=e.target;if(!t.matches||!t.matches(".composer textarea"))return;CHD[t.dataset.k]=t.value;t.style.height="auto";t.style.height=Math.min(t.scrollHeight,120)+"px";t.closest(".composer").querySelector(".send").disabled=!t.value.trim()});
function ask(title,val,ro,ph){return new Promise(res=>{const o=document.createElement("div");o.className="dlg";o.innerHTML='<div class="dlg-p" role="dialog" aria-modal="true"><b></b><textarea rows="3" maxlength="300"></textarea><div class="dlg-a"><button type="button" class="ghost" data-x></button>'+(ro?"":'<button type="button" class="btn" data-ok>Guardar</button>')+'</div></div>';
o.querySelector("b").textContent=title;o.querySelector("[data-x]").textContent=ro?"Cerrar":"Cancelar";const t=o.querySelector("textarea");t.value=val||"";t.readOnly=!!ro;if(ph)t.placeholder=ph;
const end=v=>{o.classList.add("out");setTimeout(()=>o.remove(),300);res(v)};
o.onclick=e=>{if(e.target===o||e.target.dataset.x!==undefined)end(null);else if(e.target.dataset.ok!==undefined)end(t.value.trim())};
t.onkeydown=e=>{if(e.key==="Enter"&&!e.shiftKey&&!e.isComposing){e.preventDefault();if(!ro)end(t.value.trim())}if(e.key==="Escape")end(null)};
document.body.appendChild(o);if(!ro)setTimeout(()=>t.focus(),60)})}
window.hideAlertForm=function(){const f=document.getElementById("alertForm");if(!f||f.hidden||f.classList.contains("out"))return;f.classList.add("out");setTimeout(()=>{f.classList.remove("out");f.hidden=true},340)};function closeForm(){hideAlertForm()}
{const f=$("#alertForm");document.body.appendChild(f);f.insertAdjacentHTML("afterbegin",'<button type="button" class="ib" id="fx" aria-label="Cerrar">✕</button>');$("#fx").onclick=closeForm;document.addEventListener("click",e=>{if(e.target===document.body&&!f.hidden)closeForm()})}
async function flushQ(){const q=JSON.parse(localStorage.getItem("ms_q")||"{}");for(const k of Object.keys(q)){if(await post({action:"setAvance",clave:k,valores:q[k].v.join(","),notas:q[k].n})){delete q[k];localStorage.setItem("ms_q",JSON.stringify(q))}else break}}
document.addEventListener("click",async e=>{
  if(e.target.closest("#agFabPencil")){
    agEditOpen=!agEditOpen;
    const p=document.getElementById("agFabPencil"),d=document.getElementById("agDialItems"),b=document.getElementById("agDialBackdrop"),a=document.getElementById("agActivePill"),bg=document.getElementById("agFabBadge");
    if(p)p.classList.toggle("open",agEditOpen);
    if(d){d.hidden=!agEditOpen;d.style.display=agEditOpen?"flex":"none";}
    if(b){b.hidden=!agEditOpen;b.style.display=agEditOpen?"block":"none";}
    if(a){a.hidden=agEditOpen||!AB||AB==="DEL"||AB==="-";a.style.display=(!agEditOpen&&AB&&AB!=="DEL"&&AB!=="-")?"flex":"none";}
    if(bg)bg.style.display=(agEditOpen||!curBg||curBg==="transparent")?"none":"block";
    return;
  }
  if(e.target.closest("#agDialBackdrop")){
    agEditOpen=false;
    const p=document.getElementById("agFabPencil"),d=document.getElementById("agDialItems"),b=document.getElementById("agDialBackdrop"),a=document.getElementById("agActivePill"),bg=document.getElementById("agFabBadge");
    if(p)p.classList.remove("open");
    if(d){d.hidden=true;d.style.display="none";}
    if(b){b.hidden=true;b.style.display="none";}
    if(a){a.hidden=!AB||AB==="DEL"||AB==="-";a.style.display=(AB&&AB!=="DEL"&&AB!=="-")?"flex":"none";}
    if(bg)bg.style.display=(!curBg||curBg==="transparent")?"none":"block";
    return;
  }
  const t=e.target.closest("[data-avd],[data-rs],[data-ab],[data-ac],[data-an],[data-cs],[data-add],[data-restore],[data-ret-info]");
  if(!t)return;
  const ed=role==="asis",d=t.dataset;
  
  if(d.cs){chSend(t.closest(".chat"),d.cs);return;}
  if(d.avd){avMode=d.avd;renderAvDra(1);return;}
  if(d.rs){rcSub=d.rs;sig="force";render();renderAvDra(1);return;}
  
  const m=AVS[avMode==="bd"?"bd":rcSub];
  if(d.ab!==undefined){
    if(d.ab==="G"&&(!ed||AB==="G")){showRetiradosDlg();return;}
    if(ed){
      AB=d.ab;
      agEditOpen=false;
      const p=document.getElementById("agFabPencil"),dial=document.getElementById("agDialItems"),b=document.getElementById("agDialBackdrop"),a=document.getElementById("agActivePill"),bg=document.getElementById("agFabBadge");
      if(p)p.classList.remove("open");
      if(dial)dial.hidden=true;
      if(b)b.hidden=true;
      const curSt=(m.st.find(s=>s[0]===AB)||[])[1]||(AB==="-"?"Borrar":AB==="DEL"?"Eliminar":"Editar");
      const curBg=(m.st.find(s=>s[0]===AB)||[])[2]||(AB==="DEL"?"#e5484d":"transparent");
      if(a){a.hidden=!AB||AB==="DEL"||AB==="-";a.querySelector("i").style.background=curBg;a.querySelector("span").textContent=curSt}
      if(bg){bg.style.background=curBg;bg.style.display=(curBg==="transparent")?"none":"block"}
      document.querySelectorAll(".ag-dial-pill, .lg button").forEach(btn=>{if(btn.dataset.ab!==undefined)btn.classList.toggle("on",btn.dataset.ab===AB)});
      document.querySelectorAll(".ag").forEach(tbl=>{tbl.classList.toggle("del",AB==="DEL")});
    }
    return;
  }
  
  // LOGICA PARA AGREGAR EXPEDIENTE NUEVO
  if(d.add){
    agEditOpen=false;
    if(!ed)return;
    const x=parseInt(await ask(m.pre==="RB"?"Número del bebé (ej. 20)":"Número del expediente (ej. 27 para CRM27)","",0,"Número"),10);
    if(!x||x<1||x>999)return;
    const p2=pad2(x), delK=(m.pre==="RB"?"DEL|RB|":"DEL|N|")+p2;
    
    if(isDel(delK)) avDelPut(delK,"0");
    
    if(m.pre==="RB"){
      AVD["RB|"+p2] = {v: avV(AVS.rb,p2), n: ""};
      avPut(AVS.rb, p2, AVD["RB|"+p2].v, "");
    }else{
      AVD["BD|CRM"+p2] = {v: avV(AVS.bd,"CRM"+p2), n: ""};
      AVD["RM|CR-M-"+p2] = {v: avV(AVS.rm,"CR-M-"+p2), n: ""};
      avPut(AVS.bd, "CRM"+p2, AVD["BD|CRM"+p2].v, "");
      avPut(AVS.rm, "CR-M-"+p2, AVD["RM|CR-M-"+p2].v, "");
    }
    
    sig="force"; render(); if(typeof renderAvDra==="function") renderAvDra(1);
    toast("Expediente "+(m.pre==="RB"?p2:"CRM"+p2)+" agregado");
    return;
  }
  
  // LOGICA PARA RESTAURAR ELIMINADOS
  if(d.restore){
    agEditOpen=false;
    if(!ed)return;
    const L=delList(m);if(!L.length)return;
    const r=await dlgBox("Restaurar expedientes",'<div class="rlist">'+L.map(x=>'<button type="button" class="srow" data-r="'+x.k+'"><span class="stx"><b>'+x.lab+'</b></span><span class="chev">'+ic("chev")+'</span></button>').join("")+'</div><div class="dlg-a"><button type="button" class="ghost" data-r="">Cerrar</button></div>');
    if(!r)return;
    avDelPut(r,"0");
    sig="force"; render(); if(typeof renderAvDra==="function") renderAvDra(1);
    toast("Expediente restaurado");
    return;
  }
  
  const tr=t.closest("tr");if(!tr)return;const id=tr.firstChild.dataset.an;
  
  // LOGICA PARA ELIMINAR EXPEDIENTE
  if(d.an!==undefined&&ed&&AB==="DEL"){
    const num=pad2(parseInt(String(id).match(/(\d+)$/)[1],10)),k=(m.pre==="RB"?"DEL|RB|":"DEL|N|")+num;
    const ok=await confirmDlg("¿Eliminar "+id+" para todos?",m.pre==="RB"?"Se quitará de la tabla RedCap · Bebés en todos los usuarios.":"Se quitará de Base de datos y de RedCap · Madres en todos los usuarios.","Eliminar");
    AB="V";
    if(ok){
      avDelPut(k,"1");
      toast("Expediente "+id+" eliminado");
    }
    sig="force"; render(); if(typeof renderAvDra==="function") renderAvDra(1);
    return;
  }
  
  if(d.an!==undefined){
    if(!m.notes)return;
    const raw=(avRec(m,id)||{}).n||"",cur=raw==="[ELIMINADO]"?"":raw;
    if(!ed){await ask("Observaciones de "+id,cur||"Sin observaciones",1);return;}
    const n=await ask("Observaciones de "+id,cur,0,"Escribe una observación…");
    if(n===null)return;
    avPut(m,id,avV(m,id),n.trim().slice(0,300));
    sig="force"; render(); if(typeof renderAvDra==="function") renderAvDra(1);
    return;
  }
  
  if(ed&&AB==="DEL")return;
  if(ed&&d.ac!==undefined){
    const v=avV(m,id);
    const newColor=AB==="-"?"":AB;
    if(v[+d.ac]===newColor)return;
    v[+d.ac]=newColor;
    avPut(m,id,v,null);
    t.style.background=stCol(m,newColor);
    try{updateProgressCardAndStats(m);}catch(err){}
    return;
  }
});

// ---- Movimiento estilo iOS y estabilidad en la primera carga ----
{const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;let lastT=null,lastN=0,busy=false;
const order=()=>[...document.querySelectorAll(role==="dra"?"[data-dratab]":"#nav [data-tab]")].map(b=>b.dataset.dratab||b.dataset.tab);
function vt(fn,cur){const L=order(),dir=L.indexOf(cur)>=L.indexOf(lastT)?"fwd":"back",go=lastT!==null&&cur!==lastT&&document.startViewTransition&&!reduce;lastT=cur;if(!go){fn();return}
document.documentElement.dataset.dir=dir;document.body.classList.add("entering");setTimeout(()=>document.body.classList.remove("entering"),1100);document.startViewTransition(fn)}
function ring(){const n=+(($("#cnt")||{}).textContent||"").replace(/\D/g,"")||0,b=document.querySelector("#nav [data-tab=alertas]");if(b&&n>lastN){b.classList.remove("ring");void b.offsetWidth;b.classList.add("ring")}lastN=n}
const R=render,A=applyDraTab,Ld=load;
let skOn=true;render=function(){if(skOn&&!loaded&&role==="asis"&&!DB.length&&["alertas","visitas","historial"].includes(tab)){$("#list").innerHTML='<div class="sk"></div>'.repeat(3);return}role==="asis"?vt(R,tab):R();setTimeout(ring,0)};
applyDraTab=function(){role==="dra"?vt(A,draTab):A()};
load=async function(){if(busy)return;busy=true;try{await Ld()}finally{busy=false;if(skOn){skOn=false;sig="";sigRecent="";sigAlert="";sigAvDra="";sigCalDra="";render();renderRecent();renderAvDra(1);if(typeof renderCalDra==="function")renderCalDra(1)}else if(typeof renderCalDra==="function"){renderCalDra()}if((localStorage.getItem("ms_q")||"{}")!=="{}")flushQ()}};
toast=function(m,t){const d=document.createElement("div"),i=document.createElement("i"),s=document.createElement("span");if(t==="err")d.className="err";i.textContent=t==="err"?"!":"✓";s.textContent=m;d.append(i,s);$("#toast").appendChild(d);setTimeout(()=>{d.classList.add("out");setTimeout(()=>d.remove(),400)},3400)};
document.addEventListener("visibilitychange",()=>{if(!document.hidden&&TOK)load()});
setTimeout(()=>{const t=()=>document.querySelectorAll("nav svg *").forEach(e=>e.setAttribute("pathLength","1")),mo=new MutationObserver(t);t();document.querySelectorAll("nav").forEach(n=>mo.observe(n,{childList:true,subtree:true}))},0)}

function obsH(r){return r.obs.map(o=>`<p class="mu s">💬 ${esc(o)}</p>`).join("")}
function cd(r){const z=n=>String(n).padStart(2,"0"),y=d=>""+d.getFullYear()+z(d.getMonth()+1)+z(d.getDate()),[a,b,c]=r.fechaVisita.split("-").map(Number);
if(!r.horaVisita)return[y(new Date(a,b-1,c)),y(new Date(a,b-1,c+1))];const[H,M]=r.horaVisita.split(":").map(Number),t=d=>y(d)+"T"+z(d.getHours())+z(d.getMinutes())+"00";return[t(new Date(a,b-1,c,H,M)),t(new Date(a,b-1,c,H+1,M))]}
function gcal(r){const[s,e]=cd(r);return"https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent("Visita · Exp. "+r.expediente)+"&dates="+s+"/"+e+"&details="+encodeURIComponent("Expediente "+r.expediente)}
function dl(r){const[s,e]=cd(r),t=r.horaVisita?"":";VALUE=DATE",c="BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//nexo//ES\r\nBEGIN:VEVENT\r\nUID:"+r.id+"@nexo\r\nDTSTAMP:"+new Date().toISOString().replace(/[-:]|\.\d+/g,"")+"\r\nDTSTART"+t+":"+s+"\r\nDTEND"+t+":"+e+"\r\nSUMMARY:Visita · Exp. "+r.expediente+"\r\nBEGIN:VALARM\r\nTRIGGER:"+(r.horaVisita?"-PT1H":"-PT15H")+"\r\nACTION:DISPLAY\r\nDESCRIPTION:Visita\r\nEND:VALARM\r\nEND:VEVENT\r\nEND:VCALENDAR",a=document.createElement("a");
a.href=URL.createObjectURL(new Blob([c],{type:"text/calendar"}));a.download="visita-"+r.expediente+".ics";a.click()}
function ec(e){return e==="Activo"?"st-a":e==="Finalizó"?"st-f":"st-r"}
function forms(r){const used=new Set();let h="";
G.forEach(g=>{const m=g[1].filter(f=>r.formularios.includes(f));if(!m.length)return;m.forEach(f=>used.add(f));
h+=`<details class="vd"${tab==="alertas"?" open":""}><summary><b>${g[0]}</b><span class="gc on">${m.length}</span><span class="sp"></span><span class="chev">${ic("chev")}</span></summary><div class="chips">${m.map(f=>`<span class="chip">${esc(f)}</span>`).join("")}</div></details>`});
const o=r.formularios.filter(f=>!used.has(f));
if(o.length)h+=`<div class="chips">${o.map(f=>`<span class="chip">${esc(f)}</span>`).join("")}</div>`;return h}
function renderRecent(){if(role!=="dra")return;const it=DB.slice(-30).reverse(),s=JSON.stringify(it);if(s===sigRecent)return;sigRecent=s;
$("#recent").innerHTML=it.length?it.map(r=>`<div class="card"><div class="row"><b>${esc(r.expediente)}</b><span class="sp"></span><span class="tag ${r.estado==="Pendiente"?"co":""}">${r.estado==="Pendiente"?"Pendiente":"✓ "+esc(r.estado)}</span></div><p class="mu s">${esc(r.timestamp)}</p>${chk(r)}${trk(r,0)}${obsH(r)}</div>`).join(""):'<div class="empty">Aún no hay envíos</div>'}
function dtag(f){const t=new Date();t.setHours(0,0,0,0);const n=Math.round((new Date(f+"T00:00:00")-t)/864e5);return n<0?'<span class="tag co">Vencida</span>':n===0?'<span class="tag lime">Hoy</span>':n===1?'<span class="tag">Mañana</span>':""}
function ago(t){const m=String(t).match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/);if(!m)return"";const d=Math.round((Date.now()-new Date(m[3],m[2]-1,m[1],m[4],m[5]))/6e4);return d<1?"ahora":d<60?`hace ${d} min`:d<1440?`hace ${Math.floor(d/60)} h`:`hace ${Math.floor(d/1440)} d`}

// ====== CALENDARIO INTERACTIVO (Dra. Lilliam y Asistentes) ======
const MESES=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
const MESES_C=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
const DIAS_L=["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
const DIAS_C=["DOM","LUN","MAR","MIÉ","JUE","VIE","SÁB"];
const isoToday=()=>{const d=new Date(),z=n=>String(n).padStart(2,"0");return `${d.getFullYear()}-${z(d.getMonth()+1)}}-${z(d.getDate())}`.replace("}}","}")};
function todayStr(){const d=new Date(),z=n=>String(n).padStart(2,"0");return `${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())}`}
let calY=new Date().getFullYear(),calM=new Date().getMonth(),calSel=todayStr(),calCompact=true,calAnim="";

function fmt12(hm){
  if(!hm)return"Todo el día";
  const [h,m]=String(hm).split(":").map(Number);
  if(isNaN(h))return hm;
  const ap=h>=12?"p.m.":"a.m.",h12=h%12||12;
  return `${h12}:${String(m||0).padStart(2,"0")} ${ap}`;
}
function fmtShortDate(iso){
  if(!iso)return"";
  const [y,m,d]=iso.split("-").map(Number);
  const dt=new Date(y,m-1,d);
  return `${DIAS_C[dt.getDay()].toLowerCase()}, ${d} de ${MESES_C[m-1]}`;
}
function fmtAddLabel(iso){
  if(!iso)return"Añadir visita";
  const [,m,d]=iso.split("-").map(Number);
  return `Añadir el ${d} ${MESES_C[m-1]}`;
}
function isoWeekNum(y,m,d){
  const dt=new Date(Date.UTC(y,m,d));
  const dayNum=dt.getUTCDay()||7;
  dt.setUTCDate(dt.getUTCDate()+4-dayNum);
  const yearStart=new Date(Date.UTC(dt.getUTCFullYear(),0,1));
  return Math.ceil((((dt-yearStart)/86400000)+1)/7);
}
function calEventsMap(q=""){
  const map={};
  const add=(dateStr,ev)=>{if(!dateStr)return;(map[dateStr]=map[dateStr]||[]).push(ev)};
  DB.forEach(r=>{
    if(q&&!(r.expediente+" "+r.formularios.join(" ")+" "+(r.notas||"")).toLowerCase().includes(q))return;
    if(r.fechaVisita){
      const cls=r.estado==="Completado"?"c-done":r.esNuevo?"c-new":"c-vis";
      add(r.fechaVisita,{kind:"visita",id:r.id,date:r.fechaVisita,time:r.horaVisita||"",title:`Exp. ${r.expediente}`,sub:r.formularios.filter(f=>!f.startsWith("[")).join(", ")||r.notas||"Próxima visita programada",cls,r});
    }
    if(r.fechaLlegada){
      add(r.fechaLlegada,{kind:"llegada",id:r.id,date:r.fechaLlegada,time:"",title:`Llegada · ${r.expediente}`,sub:r.notas||"Llegada de participante",cls:"c-lleg",r});
    }
  });
  Object.keys(map).forEach(k=>map[k].sort((a,b)=>(a.time||"99:99").localeCompare(b.time||"99:99")));
  return map;
}
function buildCalHTML(q=""){
  const evMap=calEventsMap(q);
  const first=new Date(calY,calM,1);
  const startOffset=(first.getDay()+6)%7; // Lunes = 0
  const cur=new Date(calY,calM,1-startOffset);
  const tStr=todayStr(),tDay=new Date().getDate();
  let weeksHTML="";
  for(let w=0;w<6;w++){
    const wNum=isoWeekNum(cur.getFullYear(),cur.getMonth(),cur.getDate());
    let cellsHTML=`<div class="cal-wnum">${wNum}</div>`;
    for(let d=0;d<7;d++){
      const y=cur.getFullYear(),m=cur.getMonth(),day=cur.getDate();
      const iso=`${y}-${String(m+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
      const isOut=m!==calM,isToday=iso===tStr,isSel=iso===calSel,isSun=d===6;
      const evs=evMap[iso]||[];
      const pills=evs.slice(0,3).map(e=>`<div class="cal-pill ${e.cls}">${esc(e.time?e.time+" ":"")}${esc(e.r.expediente)}</div>`).join("")+(evs.length>3?`<div class="cal-more">+${evs.length-3} más</div>`:"");
      const bars=evs.slice(0,4).map(e=>`<i class="cal-bar ${e.cls}"></i>`).join("");
      cellsHTML+=`<div class="cal-cell${isOut?" out":""}${isToday?" today":""}${isSel?" sel":""}${isSun?" sun":""}" data-cdate="${iso}">
        <div class="cal-dhead"><span class="cal-dnum">${day}</span></div>
        <div class="cal-ev-list">${pills}</div>
        <div class="cal-bars">${bars}</div>
      </div>`;
      cur.setDate(cur.getDate()+1);
    }
    weeksHTML+=`<div class="cal-wrow">${cellsHTML}</div>`;
    if(cur.getMonth()!==calM&&w>=4)break;
  }
  const [sy,sm,sd]=calSel.split("-").map(Number);
  const selDt=new Date(sy,sm-1,sd);
  const selEvs=evMap[calSel]||[];
  const addBarHTML=`<button type="button" class="cal-add-bar" data-cal-add="${calSel}">
    <span>${fmtAddLabel(calSel)}</span>
    <i>＋</i>
  </button>`;
  const splitHTML=`<div class="cal-split-wrap${calCompact?"":" hide"}"><div class="cal-split-inner"><div class="cal-split">
    <div class="cal-shdr">
      <b>${sd}</b><span>${DIAS_C[selDt.getDay()]} · ${MESES[sm-1]} ${sy}</span>
      <span class="sp"></span>
      <button type="button" class="ghost" data-cal-daycard="${calSel}">Ver tarjeta del día</button>
    </div>
    <div class="cal-tline">
      ${selEvs.length?selEvs.map(e=>`<div class="cal-titem" data-cal-ev="${esc(e.id)}" data-cal-kind="${e.kind}">
        <div class="cal-ttime">${esc(e.time||"Todo el día")}</div>
        <div class="cal-tbar ${e.cls}"></div>
        <div class="cal-tbody">
          <b>${esc(e.title)} ${e.r.esNuevo?'<span class="tag lime" style="font-size:9.5px;padding:1px 6px">NUEVA</span>':""}</b>
          <p>${esc(e.sub)}</p>
        </div>
      </div>`).join(""):`<div class="empty" style="padding:14px 10px 4px">No hay visitas programadas para este día.</div>`}
    </div>
    ${addBarHTML}
  </div></div></div>`;

  return `<div class="cal-shell${calCompact?"":" full-mode"}">
    <div class="cal-top">
      <button type="button" class="cal-navb" data-cal-nav="-1" title="Mes anterior">‹</button>
      <h3 class="cal-mtitle" data-cal-pickm="1">${MESES[calM]} ${calY!==new Date().getFullYear()?`<small>${calY}</small>`:""}</h3>
      <button type="button" class="cal-navb" data-cal-nav="1" title="Mes siguiente">›</button>
      <span class="sp"></span>
      <div class="cal-vmode">
        <button type="button" data-cal-mode="split" class="${calCompact?"on":""}">Dividido</button>
        <button type="button" data-cal-mode="full" class="${!calCompact?"on":""}">Mes</button>
      </div>
      <button type="button" class="cal-today-b" data-cal-today="1" title="Ir a hoy">${tDay}</button>
    </div>
    <div class="cal-board${calCompact?" compact":""}">
      <div class="cal-dow"><span></span><span>LUN</span><span>MAR</span><span>MIÉ</span><span>JUE</span><span>VIE</span><span>SÁB</span><span>DOM</span></div>
      <div class="cal-weeks ${calAnim}">${weeksHTML}</div>
    </div>
    ${splitHTML}
    <div class="cal-full-add">${addBarHTML}</div>
  </div>`;
}

function renderCalDra(force){
  const host=$("#vCalDra");
  if(!host||role!=="dra"||draTab!=="visitas")return;
  const s=JSON.stringify(DB.map(r=>[r.id,r.fechaVisita,r.horaVisita,r.fechaLlegada,r.notas,r.estado]))+"|"+calY+"-"+calM+"-"+calSel+"-"+calCompact;
  if(!force&&s===sigCalDra&&host.innerHTML)return;
  sigCalDra=s;
  host.innerHTML=buildCalHTML("");
  calAnim="";
}

function shiftDateISO(iso,deltaDays){
  const [y,m,d]=iso.split("-").map(Number);
  const dt=new Date(y,m-1,d+deltaDays);
  const z=n=>String(n).padStart(2,"0");
  return `${dt.getFullYear()}-${z(dt.getMonth()+1)}-${z(dt.getDate())}`;
}

// Tarjeta emergente interactiva del día (con swipe izquierda/derecha para cambiar de día como en el video 00:09-00:13)
function openDayPopup(iso){
  calSel=iso;
  const [y,m,d]=iso.split("-").map(Number);
  calY=y;calM=m-1;
  sig="";render();renderCalDra();
  let ov=document.querySelector(".cal-day-ov");
  if(!ov){
    ov=document.createElement("div");
    ov.className="cal-day-ov";
    ov.setAttribute("data-noswipe","1");
    document.body.appendChild(ov);
  }
  const paint=curIso=>{
    calSel=curIso;
    const [cy,cm,cd]=curIso.split("-").map(Number);
    const dt=new Date(cy,cm-1,cd);
    const evs=(calEventsMap("")[curIso])||[];
    ov.innerHTML=`<div class="cal-day-card">
      <div class="row" style="margin-bottom:4px">
        <button type="button" class="cal-navb" data-dnav="-1">‹</button>
        <div><b style="font-size:24px;font-weight:800;letter-spacing:-.03em">${cd}</b> <span style="font-size:15px;color:var(--mu);font-weight:600">${DIAS_L[dt.getDay()]}</span></div>
        <button type="button" class="cal-navb" data-dnav="1">›</button>
        <span class="sp"></span>
        <button type="button" class="ib" data-dclose="1" style="width:36px;height:36px">✕</button>
      </div>
      <p class="mu s" style="margin:0 0 14px">${cd} ${MESES_C[cm-1]} ${cy} · ${evs.length} ${evs.length===1?"evento programado":"eventos programados"}</p>
      <div class="cal-tline" style="flex:1;overflow:auto;align-content:start">
        ${evs.length?evs.map(e=>`<div class="cal-titem" data-dev="${esc(e.id)}" data-dkind="${e.kind}">
          <div class="cal-ttime">${esc(e.time||"Todo el día")}</div>
          <div class="cal-tbar ${e.cls}"></div>
          <div class="cal-tbody">
            <b>${esc(e.title)}</b>
            <p>${esc(e.sub)}</p>
          </div>
        </div>`).join(""):`<div class="empty" style="padding:48px 12px">No hay visitas en esta fecha.<p class="mu s">Toca el botón de abajo para agendar una visita.</p></div>`}
      </div>
      <button type="button" class="btn" data-dadd="${curIso}" style="margin-top:14px;display:flex;align-items:center;justify-content:space-between;padding:13px 18px;border-radius:99px">
        <span>${fmtAddLabel(curIso)}</span><b style="font-size:18px">＋</b>
      </button>
    </div>`;
  };
  paint(iso);
  let sx=0;
  ov.ontouchstart=e=>{if(e.touches.length===1)sx=e.touches[0].clientX};
  ov.ontouchend=e=>{const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>60)paint(shiftDateISO(calSel,dx<0?1:-1))};
  ov.onclick=e=>{
    if(e.target===ov||e.target.closest("[data-dclose]")){ov.classList.add("out");setTimeout(()=>ov.remove(),220);sig="";render();renderCalDra();return}
    const nav=e.target.closest("[data-dnav]");
    if(nav){paint(shiftDateISO(calSel,+nav.dataset.dnav));return}
    const add=e.target.closest("[data-dadd]");
    if(add){const dIso=add.dataset.dadd;ov.remove();openQuickAddVisit(dIso);return}
    const ev=e.target.closest("[data-dev]");
    if(ev){const id=ev.dataset.dev,k=ev.dataset.dkind;ov.remove();openVisitDetailSheet(id,k)}
  };
}

// Hoja de detalle de una visita (con barra inferior Editar, Calendario, Compartir, Quitar)
function openVisitDetailSheet(id,kind="visita"){
  const r=DB.find(x=>x.id===id);if(!r)return;
  const fStr=kind==="llegada"?r.fechaLlegada:r.fechaVisita;
  const hStr=kind==="llegada"?"":r.horaVisita;
  const o=document.createElement("div");o.className="dlg";o.setAttribute("data-noswipe","1");
  o.innerHTML=`<div class="dlg-p" role="dialog" aria-modal="true">
    <div class="row">
      <button type="button" class="ib" data-x="1" style="width:36px;height:36px">‹</button>
      <div style="flex:1"><b style="font-size:19px">${kind==="llegada"?"Llegada · ":"Visita · "}Exp. ${esc(r.expediente)}</b></div>
      <span class="tag ${ec(r.estadoParticipante)}">${esc(r.estadoParticipante)}</span>
    </div>
    <div class="card" style="margin:0;padding:14px 16px;background:var(--soft)">
      <div class="row" style="justify-content:space-between;text-align:center">
        <div><small class="mu s">FECHA</small><b style="display:block;font-size:14px;margin-top:2px">${esc(fmtShortDate(fStr))}</b></div>
        <span style="color:var(--mu);font-weight:800">→</span>
        <div><small class="mu s">HORARIO</small><b style="display:block;font-size:14px;margin-top:2px">${esc(fmt12(hStr))}</b></div>
      </div>
    </div>
    <div>
      <div class="ev-detail-row"><span class="ev-detail-ico">${ic("sheet")}</span><div><small class="mu s" style="display:block">Formularios asociados</small><b>${esc(r.formularios.join(", ")||"Visita general")}</b></div></div>
      <div class="ev-detail-row"><span class="ev-detail-ico">${ic("bell")}</span><div><small class="mu s" style="display:block">Estado y seguimiento</small><b>${esc(r.estado)} · BD: ${esc(r.bdE)} · RedCap: ${esc(r.rcE)}</b></div></div>
      ${r.notas?`<div class="ev-detail-row"><span class="ev-detail-ico">${ic("chat")}</span><div><small class="mu s" style="display:block">Notas</small><b>${esc(r.notas)}</b></div></div>`:""}
    </div>
    <div id="evEditBox" hidden class="card" style="margin:0;padding:12px;background:var(--soft)">
      <label class="f">Reprogramar fecha y hora</label>
      <div class="row" style="flex-wrap:nowrap;margin-bottom:8px">
        <input type="date" id="evNewDate" value="${esc(fStr)}" style="flex:2">
        <input type="time" id="evNewTime" value="${esc(hStr)}" style="flex:1">
      </div>
      <input type="text" id="evNewNote" placeholder="Nota de la visita (opcional)" value="${esc(r.notas||"")}" style="margin-bottom:8px">
      <button type="button" class="btn" id="evSaveBtn" style="padding:11px">Guardar cambios</button>
    </div>
    <div class="ev-dock">
      <button type="button" id="evBtnEdit">${ic("sliders")}<span>Editar</span></button>
      ${r.fechaVisita?`<a target="_blank" rel="noopener" href="${esc(gcal(r))}">${ic("cal")}<span>Google Cal</span></a>`:""}
      ${r.fechaVisita?`<button type="button" id="evBtnIcs">${ic("down")}<span>Apple/ICS</span></button>`:""}
      <button type="button" class="danger" id="evBtnDel">${ic("out")}<span>Quitar fecha</span></button>
    </div>
  </div>`;
  const close=()=>{o.classList.add("out");setTimeout(()=>o.remove(),280)};
  o.onclick=async e=>{
    if(e.target===o||e.target.closest("[data-x]"))return close();
    if(e.target.closest("#evBtnEdit")){const b=o.querySelector("#evEditBox");b.hidden=!b.hidden;return}
    if(e.target.closest("#evBtnIcs")){dl(r);return}
    if(e.target.closest("#evSaveBtn")){
      const nf=o.querySelector("#evNewDate").value,nh=o.querySelector("#evNewTime").value,nn=o.querySelector("#evNewNote").value.trim();
      if(!nf)return toast("Selecciona una fecha","err");
      const btn=o.querySelector("#evSaveBtn");btn.disabled=true;btn.textContent="Guardando…";
      
      let updObj = {notas:nn};
      if(kind==="llegada"){r.fechaLlegada=nf;r.notas=nn; updObj.fechaLlegada=nf;}
      else{r.fechaVisita=nf;r.horaVisita=nh;r.notas=nn; updObj.fechaVisita=nf;updObj.horaVisita=nh;}
      
      calSel=nf;
      const ok=await post({action:"updateStatus",id:r.id,...updObj});
      toast(ok?"Fecha reprogramada":"Error al guardar",ok?"":"err");
      close();sig="";render();if(typeof renderCalDra==="function")renderCalDra(1);
      
      // Actualización silenciosa sin parpadeo
      const cell = document.querySelector(`.cal-cell[data-cdate="${calSel}"]`);
      if(cell) cell.click();
      return;
    }
    if(e.target.closest("#evBtnDel")){
      const okC=await confirmDlg("¿Quitar esta visita del calendario?","El expediente "+r.expediente+" seguirá registrado pero ya no tendrá esta fecha asignada.","Quitar fecha");
      if(!okC)return;
      
      let updObj = {};
      if(kind==="llegada"){r.fechaLlegada=""; updObj.fechaLlegada="";}
      else{r.fechaVisita="";r.horaVisita=""; updObj.fechaVisita="";updObj.horaVisita="";}
      
      const ok=await post({action:"updateStatus",id:r.id,...updObj});
      toast(ok?"Fecha quitada del calendario":"Error de conexión",ok?"":"err");
      close();sig="";render();if(typeof renderCalDra==="function")renderCalDra(1);
      
      // Actualización silenciosa sin parpadeo
      const cell = document.querySelector(`.cal-cell[data-cdate="${calSel}"]`);
      if(cell) cell.click();
    }
  };
  document.body.appendChild(o);
}

// Modal rápido para agendar una visita futura en cualquier fecha seleccionada (Dra. y Asistentes)
function openQuickAddVisit(isoDate){
  const dIso=isoDate||calSel||todayStr();
  const exps=[...new Set(DB.map(r=>r.expediente).concat(avNums().map(n=>"CRM"+pad2(n))))].sort();
  const o=document.createElement("div");o.className="dlg";o.setAttribute("data-noswipe","1");
  o.innerHTML=`<div class="dlg-p" role="dialog" aria-modal="true">
    <div class="row"><b>Programar visita en calendario</b><span class="sp"></span><button type="button" class="ib" data-x="1" style="width:34px;height:34px">✕</button></div>
    <div>
      <label class="f">Expediente</label>
      <input type="text" id="qaExp" list="qaExpList" placeholder="Ej. CRM01" autocapitalize="characters" required>
      <datalist id="qaExpList">${exps.map(x=>`<option value="${esc(x)}">`).join("")}</datalist>
    </div>
    <div class="row" style="flex-wrap:nowrap">
      <div style="flex:2"><label class="f">Fecha de visita</label><input type="date" id="qaDate" value="${esc(dIso)}"></div>
      <div style="flex:1.2"><label class="f">Hora (opc.)</label><input type="time" id="qaTime" value="08:00"></div>
    </div>
    <div>
      <label class="f">Motivo o visita a realizar</label>
      <select id="qaVisitType">
        <option value="Próxima visita programada">Próxima visita programada</option>
        <option value="1ª visita · Seguimiento">1ª visita · Seguimiento</option>
        <option value="2ª visita · Antropometría">2ª visita · Antropometría</option>
        <option value="3ª visita · Agua corporal">3ª visita · Agua corporal</option>
        <option value="4ª visita (3 meses)">4ª visita (3 meses)</option>
      </select>
    </div>
    <div>
      <label class="f">Notas adicionales (opcional)</label>
      <input type="text" id="qaNotes" placeholder="Ej. Confirmar asistencia por teléfono, traer muestras…">
    </div>
    <label class="opt" style="margin:0"><input type="checkbox" id="qaCal" checked><span>Enviar invitación por correo / Google Calendar a los suscritos</span></label>
    <div class="dlg-a" style="margin-top:4px">
      <button type="button" class="ghost" data-x="1">Cancelar</button>
      <button type="button" class="btn" id="qaSubmit">Guardar visita</button>
    </div>
  </div>`;
  const close=()=>{o.classList.add("out");setTimeout(()=>o.remove(),280)};
  o.onclick=async e=>{
    if(e.target===o||e.target.closest("[data-x]"))return close();
    if(e.target.closest("#qaSubmit")){
      const exp=o.querySelector("#qaExp").value.trim().toUpperCase();
      const fv=o.querySelector("#qaDate").value;
      const hv=o.querySelector("#qaTime").value;
      const vt=o.querySelector("#qaVisitType").value;
      const nt=o.querySelector("#qaNotes").value.trim();
      const sendCal=o.querySelector("#qaCal").checked;
      if(!exp||!fv)return toast("Indica el expediente y la fecha","err");
      const btn=o.querySelector("#qaSubmit");btn.disabled=true;btn.textContent="Agendando…";
      // Si hay un expediente pendiente existente y sin fecha, o si el usuario prefiere crear el evento
      const existing=DB.find(r=>r.expediente===exp&&r.estado==="Pendiente"&&!r.fechaVisita);
      let ok=false;
      if(existing&&!sendCal){
        existing.fechaVisita=fv;existing.horaVisita=hv;if(nt)existing.notas=nt;
        ok=await post({action:"updateStatus",id:existing.id,fechaVisita:fv,horaVisita:hv,notas:existing.notas});
      }else{
        const now=new Date(),z=n=>String(n).padStart(2,"0");
        const mail=(role==="dra"?(localStorage.getItem("ms_dra_email")||localStorage.getItem("ms_dmail")):localStorage.getItem("ms_mail"))||"";
        const rec={
          action:"add",
          id:"REG-"+Date.now(),
          timestamp:`${z(now.getDate())}/${z(now.getMonth()+1)}/${now.getFullYear()} ${z(now.getHours())}:${z(now.getMinutes())}:${z(now.getSeconds())}`,
          expediente:exp,
          esNuevo:false,
          estadoParticipante:"Activo",
          fechaVisita:fv,
          horaVisita:hv,
          completos:true,
          formularios:[vt],
          notas:nt,
          estado:"Pendiente",
          usuario:ME?.name||(role==="dra"?"Dra":"Asistente"),
          fechaLlegada:"",
          calendar:sendCal,
          calEmail:mail
        };
        ok=await post(rec);
        if(ok)await load();
      }
      const [ny,nm]=fv.split("-").map(Number);
      calY=ny;calM=nm-1;calSel=fv;
      toast(ok?"✓ Visita agendada en el calendario":"No se pudo agendar. Revisa tu conexión",ok?"":"err");
      close();sig="";render();renderCalDra();
    }
  };
  document.body.appendChild(o);
  setTimeout(()=>o.querySelector("#qaExp")?.focus(),80);
}

// Delegación global de eventos para el Calendario (tanto en vista Asistentes como vista Dra. Lilliam)
document.addEventListener("click",e=>{
  const nav=e.target.closest("[data-cal-nav]");
  if(nav){
    const dir=+nav.dataset.calNav;
    calAnim=dir>0?"anim-l":"anim-r";
    calM+=dir;
    if(calM>11){calM=0;calY++}else if(calM<0){calM=11;calY--}
    const z=n=>String(n).padStart(2,"0");
    calSel=`${calY}-${z(calM+1)}-01`;
    sig="";render();renderCalDra();return;
  }
  const td=e.target.closest("[data-cal-today]");
  if(td){
    const now=new Date();calY=now.getFullYear();calM=now.getMonth();calSel=todayStr();
    calAnim="anim-r";sig="";render();renderCalDra(1);return;
  }
  const md=e.target.closest("[data-cal-mode]");
  if(md){
    const wantCompact=md.dataset.calMode==="split";
    if(calCompact===wantCompact)return;
    calCompact=wantCompact;
    // Transición suave en vivo sin destruir el DOM para que las celdas y el panel inferior se animen con fluidez
    document.querySelectorAll(".cal-shell").forEach(sh=>{
      sh.classList.toggle("full-mode",!calCompact);
      sh.querySelector(".cal-board")?.classList.toggle("compact",calCompact);
      sh.querySelector(".cal-split-wrap")?.classList.toggle("hide",!calCompact);
      sh.querySelectorAll("[data-cal-mode]").forEach(b=>b.classList.toggle("on",(b.dataset.calMode==="split")===calCompact));
    });
    return;
  }
const cell=e.target.closest("[data-cdate]");
  if(cell){
    const iso=cell.dataset.cdate;
    const [y,m]=iso.split("-").map(Number);
    const sameSel=calSel===iso;
    calSel=iso;
    
    // Si cambia de mes, sí debe recargar el calendario entero
    if(y!==calY||m-1!==calM){
      calY=y;calM=m-1;
      sig="";render();if(typeof renderCalDra==="function")renderCalDra(1);
      return;
    }
    
    // Si abre la tarjeta emergente del día
    if(!calCompact||sameSel){openDayPopup(iso);return}
    
    // --- SOLUCIÓN DEL PARPADEO ---
    // 1. Quitar selección anterior y marcar solo el día nuevo
    document.querySelectorAll(".cal-cell").forEach(c => c.classList.toggle("sel", c.dataset.cdate === iso));
    
    // 2. Reconstruir solo el panel de las citas de abajo, sin borrar todo el calendario
    const [sy,sm,sd] = iso.split("-").map(Number);
    const selDt = new Date(sy,sm-1,sd);
    const q = document.getElementById("q") ? document.getElementById("q").value.trim().toLowerCase() : "";
    const evMap = typeof calEventsMap==="function" ? calEventsMap(q) : {};
    const selEvs = evMap[iso] || [];
    const splitHTML = `
      <div class="cal-shdr">
        <b>${sd}</b><span>${DIAS_C[selDt.getDay()]} · ${MESES[sm-1]} ${sy}</span>
        <span class="sp"></span>
        <button type="button" class="ghost" data-cal-daycard="${iso}">Ver tarjeta del día</button>
      </div>
      <div class="cal-tline">
        ${selEvs.length?selEvs.map(e=>`<div class="cal-titem" data-cal-ev="${esc(e.id)}" data-cal-kind="${e.kind}">
          <div class="cal-ttime">${esc(e.time||"Todo el día")}</div>
          <div class="cal-tbar ${e.cls}"></div>
          <div class="cal-tbody">
            <b>${esc(e.title)} ${e.r.esNuevo?'<span class="tag lime" style="font-size:9.5px;padding:1px 6px">NUEVA</span>':""}</b>
            <p>${esc(e.sub)}</p>
          </div>
        </div>`).join(""):`<div class="empty" style="padding:14px 10px 4px">No hay visitas programadas para este día.</div>`}
      </div>
      <button type="button" class="cal-add-bar" data-cal-add="${iso}">
        <span>${typeof fmtAddLabel==="function"?fmtAddLabel(iso):"Añadir visita"}</span>
        <i>＋</i>
      </button>
    `;
    
    // Inyectar el nuevo contenido sin recargar la pantalla
    document.querySelectorAll(".cal-split").forEach(el => el.innerHTML = splitHTML);
    document.querySelectorAll(".cal-full-add .cal-add-bar").forEach(el => {
       el.dataset.calAdd = iso;
       el.querySelector("span").textContent = typeof fmtAddLabel==="function"?fmtAddLabel(iso):"Añadir visita";
    });
    
    sig=""; // Reinicia la firma para no bloquear otras actualizaciones futuras
    return;
  }
  const dc=e.target.closest("[data-cal-daycard]");
  if(dc){openDayPopup(dc.dataset.calDaycard);return}
  const add=e.target.closest("[data-cal-add]");
  if(add){openQuickAddVisit(add.dataset.calAdd);return}
  const ev=e.target.closest("[data-cal-ev]");
  if(ev){openVisitDetailSheet(ev.dataset.calEv,ev.dataset.calKind);return}
});

// ---- Vista asistentes ----
function render(){
  if(role!=="asis")return;
  $("#vAlertas").hidden=tab!=="nueva";
  if(tab==="nueva"){
    $("#alH").textContent="Crear alerta de corrección";
    $("#alP").textContent="Avisa a la Dra. si falta algo o hay dudas en un formulario.";
    $("#alT").textContent="Historial de alertas";
  }
  const HD={alertas:["Expedientes por localizar","Pendientes que registró la Dra. Lilliam."],visitas:["Próximas visitas","Participantes con visita programada."],historial:["Historial","Expedientes ya procesados."],avance:["Avance de trabajo","Marca en qué etapa va cada expediente."]}[tab];
  if(HD){$("#aH").textContent=HD[0];$("#aP").textContent=HD[1]}
  $("#vAsis").hidden=tab==="nueva";
  $("#avTabs").hidden=tab!=="avance";
  $("#stats").hidden=(tab!=="alertas");
  $("#hsTabs").hidden=tab!=="historial";
  {const ha=tab==="historial"&&hsMode==="al";$("#list").hidden=ha;$("#asAlerts").hidden=!ha;$("#alT").hidden=$("#alertsList").hidden=tab==="nueva";if(tab==="historial")renderAlerts()}
  document.querySelectorAll("#nav button").forEach(b=>b.classList.toggle("on",b.dataset.tab===tab));
  if(tab==="nueva"){renderAlerts();return}
  const pend=DB.filter(r=>r.estado==="Pendiente").length;
  $("#cnt").textContent=pend?`(${pend})`:"";
  document.title=(pend?`(${pend}) `:"")+"nexo";
  const q=$("#q").value.toLowerCase().trim(),s=JSON.stringify(DB)+tab+q+avMode+hsMode+JSON.stringify(AVD)+JSON.stringify(COM)+rcSub+AB+calY+"-"+calM+"-"+calSel+"-"+calCompact;
  if(s===sig)return;
  if(document.activeElement?.matches("#list input,#list select,#list textarea"))return;
  const _prevAg=document.querySelector(".ag");if(_prevAg){AGX[0]=_prevAg.scrollLeft;AGY[0]=_prevAg.scrollTop;}
  sig=s;
  document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("on",b.dataset.tab===tab));
  const nue=DB.filter(r=>r.estado==="Pendiente"&&r.esNuevo).length,vis=DB.filter(r=>r.fechaVisita).length;
  $("#stats").innerHTML=`<button data-tab="alertas"><b>${pend}</b><span>Pendientes</span></button><button data-tab="alertas"><b>${nue}</b><span>Nuevas</span></button><button data-tab="visitas"><b>${vis}</b><span>Visitas</span></button>`;
  let it=DB.slice().reverse().filter(r=>!q||(r.expediente+" "+r.formularios.join(" ")).toLowerCase().includes(q));
  it=tab==="avance"?it.filter(r=>/^(Pendiente|Completado)$/.test(r.estado)).sort((a,b)=>(a[avMode+"E"]==="Finalizado")-(b[avMode+"E"]==="Finalizado")):tab==="alertas"?it.filter(r=>r.estado==="Pendiente"):tab==="visitas"?it.filter(r=>r.fechaVisita).sort((a,b)=>a.fechaVisita.localeCompare(b.fechaVisita)):it.filter(r=>r.estado!=="Pendiente");
  {const t=$("#avTabs"),qEl=$("#q"),heroEl=$("#vAsis .hero");if(t&&tab==="avance")t.hidden=false;if(qEl)qEl.style.display=(tab==="avance"||tab==="visitas")?"none":"";if(heroEl)heroEl.hidden=tab==="visitas"}
  $("#list").innerHTML=tab==="avance"?avPage(1,it):tab==="visitas"?buildCalHTML(q):it.length?it.map(r=>`<div class="card ${r.esNuevo&&r.estado==="Pendiente"?"nw":""}">
<div class="row"><b class="exp">${esc(r.expediente)}</b>${r.esNuevo?'<span class="tag lime">NUEVA</span>':""}<span class="tag ${ec(r.estadoParticipante)}">${esc(r.estadoParticipante)}</span></div>
${forms(r)}
${r.fechaVisita?`<div class="vis">📅 <input type="date" value="${esc(r.fechaVisita)}" data-a="d" data-id="${esc(r.id)}"><input type="time" value="${esc(r.horaVisita)}" data-a="t" data-id="${esc(r.id)}">${dtag(r.fechaVisita)}<button class="ghost" data-a="x" data-id="${esc(r.id)}">Quitar</button></div><div class="row" style="margin-top:8px"><a class="ghost" target="_blank" rel="noopener" href="${esc(gcal(r))}">＋ Google Calendar</a><button class="ghost" data-a="c" data-id="${esc(r.id)}">＋ Apple / Outlook</button></div>`:""}${r.fechaLlegada?`<p class="mu">Llegada: ${esc(r.fechaLlegada)}</p>`:""}${r.notas?`<p class="mu">📝 ${esc(r.notas)}</p>`:""}
<p class="mu s">${esc(r.timestamp)} · ${ago(r.timestamp)} · ${esc(r.estado)}</p>
${chk(r)}${trk(r,r.estado==="Pendiente")}${obsH(r)}${r.estado==="Pendiente"?`<div class="row" style="margin-top:10px;flex-wrap:nowrap"><input type="text" id="o-${esc(r.id)}" placeholder="Observación de datos faltantes (opcional)"><button class="ghost" data-a="o" data-id="${esc(r.id)}">Enviar a la Dra.</button></div>`:`<div style="margin-top:10px"><button class="ghost" data-a="r" data-id="${esc(r.id)}">Regresar a pendiente</button></div>`}</div>`).join("")
  :`<div class="empty">${tab==="alertas"?"🎉 No hay alertas pendientes":"Nada por aquí"}</div>`;
  calAnim="";
}
$("#q").oninput=render;
$("#stats").onclick=e=>{const t=e.target.closest("button")?.dataset.tab;if(t){tab=t;sig="";render()}};
$("#nav").onclick=e=>{const t=e.target.closest("button")?.dataset.tab;if(t==="ajustes")return;if(t&&t!=="nueva"&&window.closeSet)closeSet();if(t==="nueva"){const f=$("#alertForm");f.classList.remove("out");f.hidden=false;f.scrollTop=0;return}if(t){tab=t;sig="";hideAlertForm();render();loadAlerts()}};
const up=async(r,o,m)=>{sig="";render();const ok=await post({action:"updateStatus",id:r.id,...o});toast(ok?m:"Error de conexión",ok?"":"err")};
$("#list").onclick=async e=>{const b=e.target.closest("[data-a]");if(!b||!/^[xroc]$/.test(b.dataset.a))return;const r=DB.find(x=>x.id===b.dataset.id),a=b.dataset.a;if(!r)return;
if(a==="c")return dl(r);
if(a==="x"){r.fechaVisita=r.horaVisita="";return up(r,{fechaVisita:"",horaVisita:""},"Fecha eliminada")}
if(a==="r"){r.estado="Pendiente";r.bdE=r.rcE="En proceso";return up(r,{statusValue:"Pendiente",bdEstado:"En proceso",rcEstado:"En proceso"},"Regresado a pendientes")}
const i=document.getElementById("o-"+r.id),t=i.value.trim();if(!t)return toast("Escribe la observación","err");
const autor="Asistente";r.obs.push("[ahora] "+autor+": "+t);i.value="";sig="";render();const ok=await post({action:"addObs",id:r.id,texto:t,autor:autor});toast(ok?"Observación enviada a la Dra.":"Error de conexión",ok?"":"err")};
$("#list").onchange=async e=>{const i=e.target,a=i.dataset.a,r=DB.find(x=>x.id===i.dataset.id);if(!r||!a)return;
if(a==="d"){if(!i.value)return;r.fechaVisita=i.value;i.blur();return up(r,{fechaVisita:i.value},"Fecha actualizada")}
if(a==="t"){r.horaVisita=i.value;i.blur();return up(r,{horaVisita:i.value},i.value?"Hora actualizada":"Hora quitada")}
const k=i.dataset.k;
if(a==="w"){r[k+"R"]=i.value.trim();return up(r,{[k+"Resp"]:r[k+"R"]},"Responsable guardado")}
if(a==="s"){const n=r[k+"R"]||(ME&&ME.name)||"Equipo asistente";
r[k+"E"]=i.value;r[k+"R"]=n;if(r.bdE==="Finalizado"&&r.rcE==="Finalizado")r.estado="Completado";i.blur();
up(r,{[k+"Estado"]:i.value,[k+"Resp"]:n},r.estado==="Completado"?"✓ Completado en Base de datos y RedCap":"Estado actualizado")}};

// ---- Alertas de corrección ----
const ALERT_FORMS=G.flatMap(g=>g[1]);
$("#alertForms").innerHTML=G.map(g=>`<details class="card grp af"><summary><b>${g[0]}</b><span class="gc" data-af>0/${g[1].length}</span><span class="sp"></span><span class="chev">${ic("chev")}</span></summary><div class="gb">${g[1].map(f=>`<label class="opt"><input type="checkbox" name="af" value="${esc(f)}"><span>${esc(f)}</span></label>`).join("")}</div></details>`).join("");
$("#alertForms").onchange=()=>document.querySelectorAll("#alertForms details").forEach(d=>{const n=d.querySelectorAll("[name=af]:checked").length,e=d.querySelector("[data-af]");e.textContent=n+"/"+d.querySelectorAll("[name=af]").length;e.classList.toggle("on",n>0)});
$("#alertForm").addEventListener("reset",()=>setTimeout(()=>$("#alertForms").onchange()));
async function loadAlerts(){try{const d=await api({action:"read",tipo:"alertas"});if(Array.isArray(d))ALERTS=d;renderAlerts()}catch(e){}}

function renderAlerts(){if(role!=="dra"&&role!=="asis")return;const host=role==="dra"&&draTab==="historial"?$("#histAlerts"):role==="asis"?$("#asAlerts"):$("#alertsList");if(!host)return;let list=ALERTS.slice().reverse();if(role==="dra")list=list.filter(a=>(a.estado==="Corregida")===(draTab==="historial"));const s=JSON.stringify(list)+"|"+role+"|"+draTab+"|"+tab+"|"+hsMode;if(s===sigAlert&&host.innerHTML)return;sigAlert=s;host.innerHTML=list.length?list.map(a=>`<div class="card alert-card ${a.estado==="Corregida"?"done":""}"><div class="row"><b class="exp">${esc(a.expediente)}</b><span class="sp"></span><span class="tag ${a.estado==="Corregida"?"lime":"co"}">${esc(a.estado)}</span></div><p class="mu s">Creada: ${esc(a.fecha)} · Por: <b>${esc(a.creador)}</b></p><p><b>Formulario:</b> ${esc(a.formularios)}</p><p><b>Pregunta por revisar:</b> ${esc(a.pregunta)}</p><p><b>Observaciones:</b> ${esc(a.observaciones)}</p>${a.respuesta?`<p><b>Respuesta de la Dra.:</b> ${esc(a.respuesta)}</p><p class="mu s">Corregida: ${esc(a.fechaResolucion||"")}</p>`:""}<div class="row" style="margin-top:10px">${role==="dra"&&a.estado!=="Corregida"?`<button class="ghost" data-alert-resolve="${esc(a.id)}">Marcar corregida</button>`:""}<span class="sp"></span><button class="ghost" data-alert-delete="${esc(a.id)}">Eliminar</button></div></div>`).join(""):'<div class="empty">'+(role==="dra"&&draTab==="alertas"?"🎉 No hay alertas pendientes":"Todavía no hay alertas.")+'</div>';}
$("#cancelAlert").onclick=()=>hideAlertForm();
$("#alertForm").onsubmit=async e=>{e.preventDefault();const forms=[...document.querySelectorAll("[name=af]:checked")].map(x=>x.value),email=$("#aCreatorEmail").value.trim().toLowerCase()||(role==="dra"?(localStorage.getItem("ms_dra_email")||$("#draEmail").value.trim().toLowerCase()):localStorage.getItem("ms_mail"))||"";if(!forms.length)return toast("Selecciona un formulario","err");if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))return toast("Escriba un correo válido para recibir la notificación","err");$("#aCreatorEmail").value=email;const data={action:"createAlert",id:"ALT-"+Date.now(),expediente:$("#aExp").value.trim().toUpperCase(),formularios:forms,pregunta:$("#aQuestion").value.trim(),observaciones:$("#aNotes").value.trim(),creador:$("#aCreator").value.trim(),email:email};if(!data.expediente||!data.pregunta||!data.observaciones||!data.creador)return toast("Complete todos los campos","err");const b=$("#sendAlert");b.disabled=true;b.textContent="Enviando…";await post(data);await new Promise(r=>setTimeout(r,800));await loadAlerts();const ok=ALERTS.some(a=>a.id===data.id);toast(ok?"Alerta enviada a la Dra. Lilliam":"No se pudo confirmar. Revise la conexión",ok?"":"err");if(ok){$("#alertForm").reset();hideAlertForm()}b.disabled=false;b.textContent="Enviar alerta"};
$("#alertsList").onclick=async e=>{const r=e.target.closest("[data-alert-resolve],[data-alert-delete]");if(!r)return;const id=r.dataset.alertResolve||r.dataset.alertDelete;if(r.dataset.alertResolve){const respuesta=prompt("Anote brevemente qué se corrigió (opcional):")||"La Dra. Lilliam marcó la alerta como corregida.";await post({action:"resolveAlert",id,respuesta});toast("Alerta marcada como corregida; se notificará al asistente")}else{if(!confirm("¿Eliminar esta alerta del historial? Esta acción no se puede deshacer."))return;await post({action:"deleteAlert",id});toast("Alerta eliminada del historial")}await new Promise(r=>setTimeout(r,500));await loadAlerts()};

document.querySelectorAll("[data-ic]").forEach(e=>e.insertAdjacentHTML("afterbegin",ic(e.dataset.ic)));
$("#bMenu").onclick=e=>{e.stopPropagation();$("#menu").hidden=!$("#menu").hidden};
addEventListener("click",()=>{$("#menu").hidden=true});


/* ===== MEJORA MÓVIL 4: Auto-ocultar barra al hacer scroll en celular ===== */
{
  let lastScrollY = 0;
  const isMobile = () => window.innerWidth < 820;

  document.addEventListener("scroll", e => {
    if (!isMobile() || document.body.classList.contains("in-subview")) return;
    const isAg = e.target && e.target.classList && e.target.classList.contains("ag");
    const y = isAg ? e.target.scrollTop : window.scrollY;
    const delta = y - lastScrollY;

    if (delta > 8 && y > 30) {
      // Scroll ABAJO: ocultar barra para ganar 100% de pantalla
      document.body.classList.add("nav-hidden");
    } else if (delta < -6 || y <= 20) {
      // Scroll ARRIBA o inicio: mostrar barra
      document.body.classList.remove("nav-hidden");
    }

    lastScrollY = y;
  }, true);

  // Al tocar pestañas o botones superiores, asegurar que la barra sea visible
  document.addEventListener("click", e => {
    if (e.target.closest("header, .tabs2, #bMenu, [data-tab], [data-dratab]")) {
      document.body.classList.remove("nav-hidden");
    }
  });
}

/* ===== MEJORA MÓVIL 2: Tarjeta de progreso colapsable (tocar para expandir/colapsar) ===== */
document.addEventListener("click", e => {
  const card = e.target.closest(".cal-prog-card");
  if (!card || window.innerWidth >= 820) return;
  card.classList.toggle("compact");
});

// Inicializar anillos de progreso como compactos en móvil
{
  const obs = new MutationObserver(() => {
    if (window.innerWidth >= 820) return;
    document.querySelectorAll(".cal-prog-card:not(.compact-init)").forEach(c => {
      c.classList.add("compact", "compact-init");
    });
  });
  obs.observe(document.body, { childList: true, subtree: true });
}
