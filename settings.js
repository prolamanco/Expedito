// ===== Ajustes por secciones + Gestión de Usuarios (Dra.) + Correo de Invitación =====
(()=>{
const vs=document.createElement("section");vs.id="vSet";vs.hidden=true;$("#vDra").after(vs);
const row=(id,ico,t,sub)=>`<button type="button" class="srow" data-go="${id}"><span class="sico">${ic(ico)}</span><span class="stx"><b>${t}</b><small>${sub}</small></span><span class="chev">${ic("chev")}</span></button>`;
const back='<button type="button" class="ghost sback">‹ Volver a Ajustes</button>';
vs.innerHTML=`<div id="setHub">
<div class="card hero"><h2>Ajustes</h2><p id="meTxt"></p></div>
<div class="set-grid">
  <div class="set-col">
    <div class="slab">Cuenta y seguridad</div>
    <div class="card sgrp">${row("pass","lock","Contraseña","Cambia tu contraseña de acceso")}${row("user","user","Nombre de usuario","Cambia el usuario con el que ingresas")}<button type="button" class="srow" data-go="team" id="rowTeam" hidden><span class="sico">${ic("user")}</span><span class="stx"><b>Gestión de usuarios</b><small>Crear, editar, cambiar claves o eliminar cuentas</small></span><span class="chev">${ic("chev")}</span></button></div>
  </div>
  <div class="set-col">
    <div class="slab">Preferencias</div>
    <div class="card sgrp">${row("notif","bell","Notificaciones","Correo, calendario y avisos del dispositivo")}${row("theme","palette","Apariencia","Modo día o noche y temas de color")}</div>
  </div>
  <div class="set-col">
    <div class="slab">Soporte y mejora</div>
    <div class="card sgrp">${row("feed","chat","Retroalimentación o reporte de error","Envíanos tu opinión o cuéntanos qué falla")}</div>
  </div>
  <div class="set-col">
    <div class="slab">Aplicación y sesión</div>
    <div class="card sgrp" id="setApp"></div>
  </div>
</div>
</div>
<div class="spg" id="pg-pass" hidden>${back}
<div class="card"><b>Contraseña</b><p class="mu">Mínimo 10 caracteres, con letras y números.</p>
<input type="password" id="pw0" placeholder="Contraseña actual" autocomplete="current-password" style="margin-top:12px">
<input type="password" id="pw1" placeholder="Nueva contraseña" autocomplete="new-password" style="margin-top:8px">
<input type="password" id="pw2" placeholder="Repite la nueva" autocomplete="new-password" style="margin-top:8px">
<button type="button" class="btn" id="pwBtn" style="margin-top:12px">Guardar contraseña</button>
<p class="mu s">Los cambios de contraseña quedan registrados para el administrador.</p></div></div>
<div class="spg" id="pg-user" hidden>${back}
<div class="card"><b>Nombre de usuario</b><p class="mu">Escribe el nuevo usuario y confirma con tu contraseña.</p>
<input type="text" id="nu1" placeholder="Nuevo usuario (ej. nombre.rol)" autocapitalize="none" style="margin-top:12px">
<input type="password" id="nu2" placeholder="Tu contraseña, para confirmar" autocomplete="current-password" style="margin-top:12px">
<button type="button" class="btn" id="nuBtn" style="margin-top:12px">Cambiar usuario</button>
<p class="mu s">Los cambios de usuario quedan registrados para el administrador.</p></div></div>
<div class="spg" id="pg-team" hidden>${back}
<div class="card">
  <div class="row"><b>Usuarios registrados</b><span class="sp"></span><button type="button" class="ghost" id="uNewBtn">＋ Nuevo usuario</button></div>
  <p class="mu s">Como investigadora principal, aquí puedes crear cuentas nuevas o cambiar el nombre, usuario, rol y contraseña de cualquier integrante.</p>
  <div id="uCreateBox" class="card" hidden style="margin:12px 0 0;background:var(--soft);padding:14px">
    <b style="font-size:14px">Crear nuevo usuario</b>
    <input type="text" id="cuName" placeholder="Nombre visible (ej. María)" style="margin-top:8px">
    <input type="text" id="cuEmail" inputmode="email" placeholder="Correo electrónico (donde recibirá la contraseña)" autocapitalize="none" style="margin-top:8px">
    <input type="text" id="cuUser" placeholder="Usuario para ingresar (se generará automáticamente)" autocapitalize="none" style="margin-top:8px">
    <select id="cuRole" style="margin-top:8px"><option value="asistente">Rol: Asistente</option><option value="investigadora">Rol: Investigadora (Jefa)</option></select>
    <div class="row" style="margin-top:8px;flex-wrap:nowrap">
      <input type="text" id="cuPass" placeholder="Contraseña inicial" autocapitalize="none" style="margin:0;flex:1">
      <button type="button" class="ib" id="cuGenPass" title="Generar nueva contraseña" style="flex:none;width:44px;height:44px;font-size:22px;font-weight:bold;line-height:1">↻</button>
    </div>
    <label class="opt" style="background:var(--sf);margin-top:8px"><input type="checkbox" id="cuMust" checked><span>Pedirle que cambie la contraseña al entrar</span></label>
    <div class="row" style="margin-top:10px;justify-content:flex-end">
      <button type="button" class="ghost" id="cuCancel">Cancelar</button>
      <button type="button" class="btn" id="cuSave" style="width:auto;padding:10px 18px">Crear cuenta</button>
    </div>
  </div>
  <div id="uList" style="margin-top:12px;display:grid;gap:10px"></div>
</div></div>
<div class="spg" id="pg-feed" hidden>${back}
<div class="card"><div class="fbhead"><div class="fbico">${ic("chat")}</div><h3>Opiniones y sugerencias</h3><p class="mu">Ayúdanos a mejorar nexo. Cuéntanos qué te gusta, qué falla o qué te gustaría ver en la app.</p></div>
<div class="tabs2" id="fbType" style="margin:14px 0 0"><button type="button" data-ft="sug" class="on">Sugerencia</button><button type="button" data-ft="bug">Reportar un error</button></div>
<label class="f" style="margin-top:14px">Tu comentario <span style="color:#e5484d">*</span></label>
<textarea id="fbText" rows="5" maxlength="1500" placeholder="Escribe tu comentario aquí…"></textarea>
<label class="f" style="margin-top:12px">Medio de contacto <small class="mu">(opcional)</small></label>
<input type="text" id="fbContact" placeholder="WhatsApp, correo, Instagram…" autocapitalize="none">
<button type="button" class="btn" id="fbSend" style="margin-top:14px">Enviar sugerencia</button>
<div class="row" style="margin-top:10px;justify-content:center;gap:8px">
  <a class="ghost" id="fbGmail" href="#" target="_blank" rel="noopener">Abrir en Gmail Web</a>
  <button type="button" class="ghost" id="fbMailApp">Abrir app de Correo</button>
</div>
<p class="mu s" style="text-align:center">Se envía directo al equipo o mediante tu aplicación de correo preferida.</p></div></div>
<div class="spg" id="pg-notif" hidden>${back}</div>
<div class="spg" id="pg-theme" hidden>${back}<div class="card" id="modeCard"><b>Modo</b><p class="mu">Elige cómo se ve la app: automático, de día o de noche.</p></div></div>`;
$("#pg-notif").append($("#cfg"));
$("#modeCard").append($("#modeTabs"));$("#pg-theme").append($("#themeBox"));
const mk=(el,ico,t,sub,cls)=>{el.className="srow"+(cls?" "+cls:"");el.innerHTML=`<span class="sico">${ic(ico)}</span><span class="stx"><b>${t}</b><small>${sub}</small></span>`;$("#setApp").append(el)};
mk($("#bSheet"),"sheet","Ver Excel en Drive","Abre la hoja de cálculo");
mk($("#bInst"),"down","Instalar app","Agrégala a tu pantalla de inicio");
mk($("#bOut"),"out","Cerrar sesión","Salir de tu cuenta","danger");
$("#bCfg")?.remove();$("#bSwitch")?.remove();
$("#bTheme").style.display="none";$("#bMenu").style.display="none";

const pages=["pass","user","team","notif","theme","feed"];
const marks=on=>document.querySelectorAll("nav button").forEach(b=>{if(b.dataset.act==="settings")b.classList.toggle("on",on);else if(on)b.classList.remove("on")});

// ----- Lógica de Gestión de Usuarios -----
async function loadTeamUsers(){
  const box=$("#uList");if(!box)return;
  box.innerHTML='<p class="mu s">Cargando usuarios…</p>';
  const d=await api({action:"adminUsers",op:"list"});
  if(!d||!d.ok)return box.innerHTML='<p class="mu s">No se pudo cargar la lista. Verifica que Seguridad.gs esté implementado con Nueva versión.</p>';
  box.innerHTML=d.users.map(u=>`<div class="card" style="margin:0;padding:14px;background:var(--soft)">
    <div class="row">
      <div><b style="font-size:15px">${esc(u.name)}</b> <span class="tag ${u.role==="investigadora"?"lime":""}">${esc(u.role)}</span> ${!u.activo?'<span class="tag co">Inactivo</span>':""}</div>
      <span class="sp"></span>
      <button type="button" class="ghost" data-uedit="${esc(u.user)}">Editar</button>
      ${ME&&ME.user===u.user?"":`<button type="button" class="ghost" style="color:#e5484d" data-udel="${esc(u.user)}" data-uname="${esc(u.name)}">Eliminar</button>`}
    </div>
    <p class="mu s" style="margin:4px 0 0">Usuario: <b>${esc(u.user)}</b> · Último acceso: ${esc(u.ultimo)}</p>
    <div id="ue-${esc(u.user)}" hidden style="margin-top:12px;padding-top:12px;border-top:1px solid var(--bd);display:grid;gap:8px">
      <label class="f" style="margin:0">Nombre visible</label>
      <input type="text" data-uf="name" value="${esc(u.name)}">
      <label class="f" style="margin:0">Usuario de acceso</label>
      <input type="text" data-uf="user" value="${esc(u.user)}" autocapitalize="none">
      <label class="f" style="margin:0">Rol</label>
      <select data-uf="role"><option value="asistente"${u.role==="asistente"?" selected":""}>Asistente</option><option value="investigadora"${u.role==="investigadora"?" selected":""}>Investigadora (Jefa)</option></select>
      <label class="f" style="margin:0">Nueva contraseña (déjala vacía si no quieres cambiarla)</label>
      <input type="text" data-uf="pass" placeholder="Mínimo 10 caracteres con letras y números" autocapitalize="none">
      <label class="opt" style="margin:0;background:var(--sf)"><input type="checkbox" data-uf="activo"${u.activo?" checked":""}><span>Cuenta activa (puede iniciar sesión)</span></label>
      <div class="row" style="justify-content:flex-end;margin-top:4px">
        <button type="button" class="ghost" data-ucancel="${esc(u.user)}">Cancelar</button>
        <button type="button" class="btn" data-usave="${esc(u.user)}" style="width:auto;padding:10px 18px">Guardar cambios</button>
      </div>
    </div>
  </div>`).join("");
}

function genRandomPass(){
  const c="abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let p="";for(let i=0;i<12;i++)p+=c.charAt(Math.floor(Math.random()*c.length));
  return p;
}

$("#cuName").addEventListener("input", e => {
  const nm = e.target.value.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  const rl = $("#cuRole").value;
  if(nm) $("#cuUser").value = nm + "." + rl;
  else $("#cuUser").value = "";
});
$("#cuRole").addEventListener("change", e => {
  const nm = $("#cuName").value.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  if(nm) $("#cuUser").value = nm + "." + e.target.value;
});
$("#cuGenPass").onclick = () => { $("#cuPass").value = genRandomPass(); };

$("#uNewBtn").onclick=()=>{
  $("#uCreateBox").hidden=!$("#uCreateBox").hidden;
  if(!$("#uCreateBox").hidden && !$("#cuPass").value) $("#cuPass").value = genRandomPass();
};
$("#cuCancel").onclick=()=>{$("#uCreateBox").hidden=true};
$("#cuSave").onclick=async()=>{
  const name=$("#cuName").value.trim(),newUser=$("#cuUser").value.trim().toLowerCase(),roleVal=$("#cuRole").value,pass=$("#cuPass").value.trim(),mustChange=$("#cuMust").checked;
  const email=$("#cuEmail").value.trim().toLowerCase();
  if(!name||!newUser||!pass)return toast("Completa nombre, usuario y contraseña","err");
  if(email&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))return toast("Si indicas un correo, asegúrate de que sea válido","err");
  const b=$("#cuSave");b.disabled=true;b.textContent="Creando…";
  const d=await api({action:"adminUsers",op:"create",name,newUser,email,role:roleVal,pass,mustChange});
  b.disabled=false;b.textContent="Crear cuenta";
  if(d&&d.ok){
    toast("Usuario "+newUser+" creado");
    $("#cuName").value=$("#cuEmail").value=$("#cuUser").value=$("#cuPass").value="";$("#uCreateBox").hidden=true;
    loadTeamUsers();
  }else toast(d?.error||"No se pudo crear","err");
};

$("#uList").onclick=async e=>{
  const ed=e.target.closest("[data-uedit]");
  if(ed){const pane=document.getElementById("ue-"+ed.dataset.uedit);if(pane)pane.hidden=!pane.hidden;return}
  const cn=e.target.closest("[data-ucancel]");
  if(cn){const pane=document.getElementById("ue-"+cn.dataset.ucancel);if(pane)pane.hidden=true;return}
  const sv=e.target.closest("[data-usave]");
  if(sv){
    const target=sv.dataset.usave,pane=document.getElementById("ue-"+target);if(!pane)return;
    const name=pane.querySelector('[data-uf="name"]').value.trim();
    const newUser=pane.querySelector('[data-uf="user"]').value.trim().toLowerCase();
    const roleVal=pane.querySelector('[data-uf="role"]').value;
    const newPass=pane.querySelector('[data-uf="pass"]').value.trim();
    const activo=pane.querySelector('[data-uf="activo"]').checked;
    sv.disabled=true;sv.textContent="Guardando…";
    const d=await api({action:"adminUsers",op:"update",target,name,newUser,role:roleVal,newPass,activo,mustChange:false});
    sv.disabled=false;sv.textContent="Guardar cambios";
    if(d&&d.ok){
      if(ME&&ME.user===target){ME={...ME,user:newUser,name};localStorage.setItem("ms_me",JSON.stringify(ME))}
      toast("Datos de "+name+" actualizados");
      loadTeamUsers();
    }else toast(d?.error||"No se pudo actualizar","err");
    return;
  }
  const dl=e.target.closest("[data-udel]");
  if(dl){
    const target=dl.dataset.udel,uname=dl.dataset.uname;
    const ok=await confirmDlg("¿Eliminar a "+uname+" ("+target+")?","Esta cuenta ya no podrá ingresar a nexo. Puedes volver a crearla cuando quieras.","Eliminar cuenta");
    if(!ok)return;
    const d=await api({action:"adminUsers",op:"delete",target});
    if(d&&d.ok){toast("Usuario eliminado");loadTeamUsers()}else toast(d?.error||"No se pudo eliminar","err");
  }
};
// ---------------------------------------------

function show(id){$("#setHub").hidden=!!id;pages.forEach(p=>$("#pg-"+p).hidden=p!==id);
if(id==="team")loadTeamUsers();
if(id==="notif"){$("#cfg").hidden=false;$("#assistantNotifySettings").hidden=role!=="asis";$("#draNotifySettings").hidden=role!=="dra";if(typeof mailUI==="function")mailUI();if(role==="dra"&&typeof loadAlertPrefs==="function")loadAlertPrefs()}
if(id==="theme"){$("#themeBox").hidden=false;if(typeof thUI==="function")thUI()}
scrollTo({top:0,behavior:"smooth"})}
window.openSet=page=>{if(window.hideAlertForm)hideAlertForm();
document.querySelectorAll("#app section").forEach(x=>x.hidden=true);vs.hidden=false;marks(true);
$("#bSheet").hidden=role!=="asis";if($("#rowTeam"))$("#rowTeam").hidden=role!=="dra";$("#meTxt").textContent=ME?`${ME.name} · ${ME.user}`:"";show(page||null)};
window.closeSet=()=>{if(vs.hidden)return;vs.hidden=true;marks(false);if(role==="asis")$("#vAsis").hidden=false};
vs.addEventListener("click",e=>{const g=e.target.closest("[data-go]");if(g)return show(g.dataset.go);if(e.target.closest(".sback"))show(null)});
document.querySelectorAll("nav [data-act=settings]").forEach(b=>b.addEventListener("click",()=>openSet()));
$("#navDra").addEventListener("click",e=>{if(e.target.closest("[data-dratab]"))closeSet()},true);
$("#bBell").onclick=()=>openSet("notif");
{const r=render;render=function(){if(!vs.hidden)return;return r.apply(this,arguments)};const a=applyDraTab;applyDraTab=function(){if(!vs.hidden)return;return a.apply(this,arguments)}}

let fbT="sug";
function buildFbMail(){
  const t=$("#fbText").value.trim(),c=$("#fbContact").value.trim(),bug=fbT==="bug",
  subj=bug?"[nexo] Reporte de error":"[nexo] Sugerencia",
  body=(t||"(Escribe aquí tu mensaje)")+"\n\n"+(c?"Contacto: "+c+"\n":"")+"—\nUsuario: "+(ME?ME.user+" ("+(role==="dra"?"investigadora":"asistente")+")":"-")+"\nPantalla: "+innerWidth+"x"+innerHeight+"\nFecha: "+new Date().toLocaleString("es-CR");
  return {t,c,subj,body,mailto:"mailto:leo1403b.v@gmail.com?subject="+encodeURIComponent(subj)+"&body="+encodeURIComponent(body),gmail:"https://mail.google.com/mail/?view=cm&fs=1&to=leo1403b.v@gmail.com&su="+encodeURIComponent(subj)+"&body="+encodeURIComponent(body)};
}
$("#fbType").onclick=e=>{const t=e.target.closest("[data-ft]");if(!t)return;fbT=t.dataset.ft;document.querySelectorAll("#fbType button").forEach(b=>b.classList.toggle("on",b===t));$("#fbSend").textContent=fbT==="bug"?"Enviar reporte":"Enviar sugerencia";$("#fbText").placeholder=fbT==="bug"?"Describe qué pasó, en qué pantalla y qué esperabas que ocurriera…":"Escribe tu comentario aquí…"};
$("#fbGmail").onclick=e=>{const m=buildFbMail();if(!m.t){e.preventDefault();return toast("Escribe tu comentario primero","err")}$("#fbGmail").href=m.gmail};
$("#fbMailApp").onclick=()=>{const m=buildFbMail();if(!m.t)return toast("Escribe tu comentario primero","err");window.location.href=m.mailto};
$("#fbSend").onclick=async()=>{
  const m=buildFbMail();if(!m.t)return toast("Escribe tu comentario","err");
  const b=$("#fbSend");b.disabled=true;b.textContent="Enviando…";
  const ok=await post({action:"feedback",tipo:fbT,texto:m.t,contacto:m.c,meta:innerWidth+"x"+innerHeight});
  b.disabled=false;b.textContent=fbT==="bug"?"Enviar reporte":"Enviar sugerencia";
  if(ok){
    $("#fbText").value="";$("#fbContact").value="";
    toast("¡Gracias! Tu mensaje fue enviado directamente");
  }else{
    toast("Abriendo tu aplicación de correo…");
    window.location.href=m.mailto;
  }
};

$("#pwBtn").onclick=async()=>{const a=$("#pw0").value,b=$("#pw1").value;
if(b!==$("#pw2").value)return toast("Las contraseñas nuevas no coinciden","err");
if(b.length<10||!/[A-Za-z]/.test(b)||!/[0-9]/.test(b))return toast("Mínimo 10 caracteres, con letras y números","err");
const d=await api({action:"changePass",old:a,new:b});
if(d?.ok){["pw0","pw1","pw2"].forEach(i=>$("#"+i).value="");toast("Contraseña actualizada")}else toast(d?.error||"No se pudo cambiar","err")};
$("#nuBtn").onclick=async()=>{const u=$("#nu1").value.trim().toLowerCase();if(!u)return toast("Escribe el nuevo usuario","err");
const d=await api({action:"changeUser",newUser:u,pass:$("#nu2").value});
if(d?.ok){ME={...ME,user:d.user};localStorage.setItem("ms_me",JSON.stringify(ME));$("#meTxt").textContent=`${ME.name} · ${ME.user}`;$("#nu1").value=$("#nu2").value="";toast("Usuario actualizado")}else toast(d?.error||"No se pudo cambiar","err")};

$("#fabNew").onclick=()=>{const f=$("#alertForm");f.classList.remove("out");f.hidden=false;f.scrollTop=0};
{const nv=$("#nav"),nvd=$("#navDra"),set=()=>{const h=(nv&&!nv.hidden?nv.offsetHeight:nvd&&!nvd.hidden?nvd.offsetHeight:62);document.documentElement.style.setProperty("--navH",h+"px")};if(window.ResizeObserver){const ro=new ResizeObserver(set);if(nv)ro.observe(nv);if(nvd)ro.observe(nvd)}set()}

// ===== Deslizar entre pestañas (izquierda/derecha) =====
{let sx=0,sy=0,st=0,on=false;
const blocked=t=>{for(let e=t;e&&e!==document.body;e=e.parentElement){if(e.matches&&e.matches("input,textarea,select,[contenteditable],[data-noswipe],#alertForm,.dlg,#toast"))return true;const o=getComputedStyle(e).overflowX;if((o==="auto"||o==="scroll")&&e.scrollWidth>e.clientWidth+2)return true}return false};
const free=()=>{const vf=document.getElementById("vForm");return (vs.hidden||!$("#setHub").hidden)&&$("#alertForm").hidden&&!$(".dlg")&&$("#app")&&!$("#app").hidden&&(!vf||vf.hidden)};
addEventListener("touchstart",e=>{on=false;if(e.touches.length!==1||!free()||blocked(e.target))return;const t=e.touches[0];sx=t.clientX;sy=t.clientY;st=Date.now();on=true},{passive:true});
addEventListener("touchend",e=>{if(!on)return;on=false;const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;
if(Math.abs(dx)<70||Math.abs(dy)>Math.abs(dx)*.5||Date.now()-st>700||!free())return;
const L=role==="dra"?["alertas","visitas","avance","historial","ajustes"]:["alertas","visitas","avance","historial","ajustes"],cur=vs.hidden?(role==="dra"?draTab:tab):"ajustes",i=L.indexOf(cur),n=i+(dx<0?1:-1);
if(i<0||n<0||n>=L.length)return;
const g=L[n],b=document.querySelector(g==="ajustes"?(role==="dra"?"#navDra [data-act=settings]":"#nav [data-act=settings]"):role==="dra"?`#navDra [data-dratab="${g}"]`:`#nav [data-tab="${g}"]`);if(b)b.click()},{passive:true})}

// Arranca la sesión al final, cuando todos los módulos (Formularios y Ajustes) ya están listos
syncRole();
if(TOK)start();else{$("#app").hidden=true;$("#login").hidden=false}
})();
