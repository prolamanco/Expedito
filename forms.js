// ===== Formularios (PILOTO): se guardan en este dispositivo y se exportan a PDF =====
(()=>{
const AL=["Carne y/o pollo","Pescado y/o mariscos","Embutidos","Arroz, pasta o frijoles","Vegetales o ensalada","Pan o tortillas","Postre","Fresco sin azúcar","Fresco con azúcar","Agua","Huevos","Lácteos"];
const NSNR=["1. Sí","2. No","9. NS/NR"];
const S=[["Datos de la entrevista",[["P1","Identificador participante","t"],["P2","Fecha de la entrevista","d"],["P3","Hora de inicio","h"],["P4","Lugar de entrevista","s",["1. Casa de habitación","2. Consultorio médico","3. Lugar de trabajo","4. INISA"]],["P5","Entrevistador(a)","t"]]],
["A. Características sociodemográficas",[["A1","Fecha de nacimiento","d"],["A2","Edad actual en años cumplidos","n"],["A3","Nacionalidad","s",["1. Costarricense","2. Extranjera"]],["A4","Lugar de residencia","g",["Provincia","Cantón","Distrito"]],
["A5","¿Actualmente vive en una zona urbana o rural?","s",["1. Rural","2. Urbana","9. NS/NR"]],["A6","¿Cuál es su estado conyugal actual?","s",["1. Soltera","2. Casada","3. Unión libre","4. Separada","5. Divorciada","6. Viuda","7. NS/NR"]],
["A7","¿Sabe leer y escribir?","s",["1. Sí","2. No"]],["A8","Nivel educativo","s",["0. Ninguno","1. Primaria","2. Secundaria","3. Parauniversitaria","4. Universitaria","9. NS/NR"],"Años de estudio"],
["A9","¿Cuál es su ocupación actual?","s",["1. Ama de casa","2. Trabajo técnico","3. Trabajo profesional","4. Estudiante","5. Trabajo independiente","6. Otro","9. NS/NR"],"Si es otro, ¿cuál?"],
["A10","De las personas que viven con usted en la vivienda, ¿cuántas trabajan?","n"],["A11","¿Cuántas personas viven en su vivienda (incluyéndose)?","n"],["A12","¿Cuántas personas menores de edad viven en su hogar?","n"],
["A13","¿Las personas que viven en su hogar comparten un mismo presupuesto?","s",NSNR],["A14","¿La vivienda se encuentra sobre una calle pavimentada?","s",["1. Sí","2. No"]],
["A15","La vivienda en la que usted vive es","s",["1. Propia totalmente pagada","2. Propia pagando a plazos","3. Alquilada","4. Otra (cedida, prestada)","5. En precario","6. Otro material (zinc, adobe)","9. NS/NR"]],
["A16","El piso de su vivienda es principalmente de","s",["1. Cerámica, mosaico, terrazo","2. Cemento (ocre, lujado)","3. Madera","4. Material natural (chonta/rollizo)","5. Piso de tierra","6. Otro material","9. NS/NR"]],
["A17","La luz eléctrica de su vivienda proviene…","s",["1. Del ICE o de la CNFL","2. De la ESPH o la JASEC","3. De una cooperativa","4. De panel solar","5. De otra fuente","6. No hay luz eléctrica","9. NS/NR"]],
["A18","El agua que se consume en su vivienda proviene de","s",["1. Acueducto rural o cantonal (ASADA o CAAR)","2. Acueducto AyA, municipal, de empresa o cooperativa","3. Un pozo","4. Un río, quebrada o naciente","5. Otra fuente (lluvia, camión cisterna)","6. NS/NR"],"Si es otra fuente, especifique"],
["A19","Cocinan principalmente con","s",["1. Electricidad","2. Gas","3. Leña o carbón","4. Otro","5. Ninguno (no cocina)","9. NS/NR"],"Si es otro, ¿cuál?"]]],
["B. Características gineco-obstétricas",[["B1","¿Está usted asegurada con la Caja Costarricense de Seguro Social?","s",["1. Sí","2. No (pase a B3)","9. NS/NR (pase a B3)"]],
["B2","¿Qué tipo de seguro social tiene usted?","s",["1. Asalariado","2. Familiar","3. Por cuenta propia o voluntario","4. Por el Estado (incluye familiares)","5. Pensionado","6. Otro (estudiante, refugiado)","7. NS/NR"]],
["B3","¿Ha tenido enfermedades previas al embarazo?","s",NSNR],["B4","Mencione cuáles enfermedades","t",null,null,1],
["B5","¿Dónde lleva su control prenatal?","s",["1. Consulta pública (EBAIS, clínica, hospital)","2. Consulta privada","3. Ambas pública y privada","4. Otras","5. NS/NR"],"Si es otra, especifique"],
["B6","¿Cuántos partos, cesáreas, abortos y gestaciones ha tenido? (0 si ninguno)","g",["Partos","Cesáreas","Abortos","Gestación"]],
["B7","¿Ha presentado alguna enfermedad durante el embarazo? ¿Cuál y en qué trimestre? (escriba «Ninguna» si no hubo)","g",["1er trimestre","2do trimestre","3er trimestre"]],
["B8","Previo al embarazo, usted","y",["Fumaba","Consumía alcohol","Consumía drogas"],"Si consumía drogas, ¿cuál?"]]],
["C. Hábitos alimentarios",[["C1","¿Cuáles tiempos de comida al día realiza? (puede marcar más de una)","m",["1. Desayuno","2. Merienda de media mañana","3. Almuerzo","4. Merienda de media tarde","5. Cena","6. Otro","7. NS/NR"],"Si es otro, especifique"],
["C2","Piense en el almuerzo: ¿incluye con mucha frecuencia en esta comida…?","y",AL],["C3","Piense en la cena: ¿incluye con mucha frecuencia en esta comida…?","y",AL],
["C4","Entre comidas, ¿consume usted…?","y",["Dulces","Frutas o vegetales","Galletas o pan","Papas o tortillas tostadas","No consume alimentos entre comidas","Otro"],"Si es otro, ¿cuál?"],
["C5","¿Con qué frecuencia durante la semana consume alimentos preparados fuera de casa?","s",["0. Ninguna","1. 1 o 2 veces a la semana","2. 3 o 4 veces a la semana","3. 5 o 6 veces a la semana","4. 7 o 8 veces a la semana","5. Más de 8 veces a la semana","6. NS/NR"]],
["C6","¿Cuáles tiempos de comida al día realiza fuera de casa? (puede marcar más de una)","m",["0. Ninguno","1. Desayuno","2. Merienda de media mañana","3. Almuerzo","4. Merienda de media tarde","5. Cena","6. Otro","7. NS/NR"],"Si es otro, especifique"],
["C7","Al consumir alimentos preparados fuera de casa, ¿qué tipo consume con mayor frecuencia? (puede marcar más de uno)","m",["1. Comida tradicional costarricense","2. Pizza","3. Pastas","4. Pollo asado","5. Pollo frito","6. Tacos","7. Hamburguesa","8. Empanadas","9. Papas fritas","10. Otro","11. NS/NR"],"Si es otro, especifique"],
["C8","¿Cuál es la principal razón para consumir alimentos preparados fuera de su hogar?","s",["1. Ninguna, siempre cocino en casa","2. Disponibilidad de alimentos ya listos para consumir","3. Tiempo","4. Cansancio","5. Trabajo","6. Estrés","7. Ocio","8. Otro","9. NS/NR"],"Si es otro, especifique"]]]];
const Q=S.flatMap(s=>s[1]),K="ms_forms";
const ld=()=>{try{return JSON.parse(localStorage.getItem(K)||"[]")}catch(e){return[]}};
const sv=a=>{try{localStorage.setItem(K,JSON.stringify(a))}catch(e){toast("No se pudo guardar en este dispositivo","err")}};
let cur=null,fv=null,tm;
const sk=(q,a)=>q[0]==="B2"&&/^(2|9)/.test(a.B1||"");
const ok=(q,a)=>{const v=a[q[0]],t=q[2];if(q[5]||sk(q,a))return true;
if(t==="m")return(v||[]).length>0;if(t==="g")return q[3].every(f=>String(v?.[f]??"").trim());if(t==="y")return q[3].every(f=>v?.[f]);return!!String(v??"").trim()};
const save=(a,done)=>{const l=ld(),i=l.findIndex(x=>x.id===cur.id);cur.ans=a;cur.ts=Date.now();if(done!=null)cur.done=done;i<0?l.push(cur):l[i]=cur;sv(l)};
const ctl=(q,a)=>{const[id,,t,o,x]=q,v=a[id];let h="";
if(t==="s"||t==="m")h=o.map(op=>`<label class="opt"><input type="${t==="s"?"radio":"checkbox"}" name="${id}" value="${esc(op)}"${(t==="s"?v===op:(v||[]).includes(op))?" checked":""}><span>${esc(op)}</span></label>`).join("");
else if(t==="g")h=o.map(f=>`<input type="${id==="B6"?"number":"text"}" ${id==="B6"?'inputmode="numeric" ':""}data-g="${id}" data-f="${esc(f)}" placeholder="${esc(f)}" value="${esc(v?.[f]||"")}" style="margin-top:8px">`).join("");
else if(t==="y")h=o.map(f=>`<div class="yrow"><span>${esc(f)}</span><div class="seg yn">${["Sí","No"].map(z=>`<label><input type="radio" name="${id}|${esc(f)}" data-y="${id}" data-f="${esc(f)}" value="${z}"${v?.[f]===z?" checked":""}><span>${z}</span></label>`).join("")}</div></div>`).join("");
else h=`<input type="${{d:"date",h:"time",n:"number"}[t]||"text"}"${t==="n"?' inputmode="numeric"':""} data-k="${id}" value="${esc(v||"")}">`;
if(x)h+=`<input type="text" data-x="${id}" placeholder="${esc(x)}" value="${esc(a[id+"_x"]||"")}" style="margin-top:8px">`;return h};
const col=()=>{const a={},f=$("#fBody");
f.querySelectorAll("[data-k]").forEach(e=>a[e.dataset.k]=e.value);
f.querySelectorAll("[data-x]").forEach(e=>{if(e.value)a[e.dataset.x+"_x"]=e.value});
f.querySelectorAll("[data-g]").forEach(e=>{(a[e.dataset.g]??={})[e.dataset.f]=e.value});
f.querySelectorAll("input[type=radio]:checked").forEach(e=>{if(e.dataset.y)(a[e.dataset.y]??={})[e.dataset.f]=e.value;else a[e.name]=e.value});
f.querySelectorAll("input[type=checkbox]:checked").forEach(e=>(a[e.name]??=[]).push(e.value));return a};
const prog=()=>{const a=col(),qs=Q.filter(q=>!q[5]&&!sk(q,a)),d=qs.filter(q=>ok(q,a)).length;
$("#fp").textContent=`${d} de ${qs.length} respondidas`;$("#fbar").style.width=Math.round(d/qs.length*100)+"%";
S.forEach((s,i)=>{const q2=s[1].filter(q=>!q[5]&&!sk(q,a)),n=q2.filter(q=>ok(q,a)).length,e=$("#fc"+i);e.textContent=n+"/"+q2.length;e.classList.toggle("on",n===q2.length)});
document.querySelectorAll(".q.miss").forEach(e=>{const q=Q.find(z=>z[0]===e.dataset.q);if(ok(q,a))e.classList.remove("miss")});return a};
const at=(q,a)=>{const v=a[q[0]],t=q[2];let r;
if(t==="m")r=(v||[]).map(esc).join(", ");else if(t==="g")r=q[3].map(f=>`${esc(f)}: ${esc(v?.[f]||"—")}`).join(" · ");
else if(t==="y")r=q[3].map(f=>`${esc(f)}: ${esc(v?.[f]||"—")}`).join("<br>");else r=esc(v||"");
if(a[q[0]+"_x"])r+=` — ${esc(a[q[0]+"_x"])}`;return r||"—"};
function pdf(x){const a=x.ans;$("#printArea").innerHTML=`<h2>CUESTIONARIO No.1 A LA MUJER EMBARAZADA</h2><p class="sm">PROYECTO: Composición corporal de mujeres embarazadas y sus hijos en Costa Rica utilizando como indicadores la antropometría, la bioimpedancia y el método de agua deuterada para la valoración del estado nutricional de los participantes.</p>${S.map(s=>`<h3>${esc(s[0])}</h3><table>${s[1].map(q=>`<tr><td class="c1">${q[0]}</td><td class="c2">${esc(q[1])}</td><td>${at(q,a)}</td></tr>`).join("")}</table>`).join("")}<p class="sm">Estado: ${x.done?"Completo":"Borrador"} · ${new Date(x.ts).toLocaleString("es-CR")}</p>`;
const t=document.title;document.title=`Cuestionario1_${String(a.P1||"sin-IP").replace(/\W+/g,"-")}_${a.P2||""}`;window.print();setTimeout(()=>document.title=t,1500)}
const lst=()=>{const l=ld().sort((a,b)=>b.ts-a.ts);return l.length?l.map(x=>`<div class="fl"><div><b>${esc(x.ans.P1||"Sin identificador")}</b> <span class="tag ${x.done?"st-a":"co"}">${x.done?"Completo":"Borrador"}</span><p class="mu s">Cuestionario No.1 · ${new Date(x.ts).toLocaleString("es-CR")}</p></div><div class="row"><button type="button" class="ghost" data-o="${x.id}">Abrir</button><button type="button" class="ghost" data-p="${x.id}">PDF</button><button type="button" class="ghost" data-d="${x.id}">Borrar</button></div></div>`).join(""):'<p class="mu">Todavía no hay formularios guardados.</p>'};
document.body.insertAdjacentHTML("beforeend",'<div id="printArea"></div>');
const vf=document.createElement("section");vf.id="vForm";vf.hidden=true;$("#vDra").after(vf);
function menu(){vf.innerHTML=`<div class="card hero"><h2>Formularios</h2><p>Piloto: lo que llenes se guarda en este dispositivo y se puede pasar a PDF.</p></div>
<div class="card"><b>1. Elige la visita</b><div class="vpick">${G.map((g,i)=>`<button type="button" class="ghost${fv===i?" on":""}" data-v="${i}"${i?" disabled":""}>${esc(g[0])}${i?" · pronto":""}</button>`).join("")}</div></div>
${fv===0?`<div class="card"><b>2. Elige el formulario</b><button type="button" class="btn" id="fNew" style="margin-top:10px">Cuestionario No.1 · Mujer embarazada</button>${G[0][1].slice(1).map(n=>`<p class="mu">${esc(n)} · próximamente</p>`).join("")}</div>`:""}
<div class="card"><b>Guardados en este dispositivo</b>${lst()}</div>`}
function fill(){const a=cur.ans;vf.innerHTML=`<div class="card hero"><h2>Cuestionario No.1</h2><p>A la mujer embarazada · 1ª visita · se guarda solo mientras escribes</p></div>
<div class="card"><div class="row"><b id="fp"></b><span class="sp"></span><span class="tag co">Piloto</span></div><div class="bar"><i id="fbar" style="width:0"></i></div></div>
<div id="fBody">${S.map((s,i)=>`<details class="card grp"${i===0?" open":""}><summary><b>${esc(s[0])}</b><span class="gc" id="fc${i}">0/0</span><span class="sp"></span><span class="chev">${ic("chev")}</span></summary><div class="gb">${s[1].map(q=>`<div class="q" data-q="${q[0]}"><label class="f">${q[0]} · ${esc(q[1])}${q[5]?" (opcional)":""}</label>${ctl(q,a)}</div>`).join("")}</div></details>`).join("")}</div>
<div class="row" style="gap:8px"><button type="button" class="ghost" id="fBack">‹ Volver</button><span class="sp"></span><button type="button" class="ghost" id="fPdf">PDF</button><button type="button" class="btn" id="fEnd" style="width:auto;padding:12px 20px">Finalizar</button></div>`;prog()}
function fin(){const a=prog(),miss=Q.filter(q=>!ok(q,a));document.querySelectorAll(".q.miss").forEach(e=>e.classList.remove("miss"));
if(miss.length){miss.forEach(q=>vf.querySelector(`[data-q="${q[0]}"]`).classList.add("miss"));const f=vf.querySelector(`[data-q="${miss[0][0]}"]`);f.closest("details").open=true;f.scrollIntoView({behavior:"smooth",block:"center"});save(a,false);return toast(`Faltan ${miss.length} preguntas por responder`,"err")}
save(a,true);toast("Formulario completo ✓ Guardado en este dispositivo")}
vf.onclick=e=>{const t=e.target.closest("button");if(!t)return;
if(t.dataset.v!=null){fv=+t.dataset.v;menu()}
else if(t.id==="fNew"){cur={id:"F"+Date.now(),done:false,ts:Date.now(),ans:{P2:new Date().toISOString().slice(0,10)}};save(cur.ans);fill()}
else if(t.dataset.o){cur=ld().find(x=>x.id===t.dataset.o);fill()}
else if(t.dataset.p)pdf(ld().find(x=>x.id===t.dataset.p));
else if(t.dataset.d){if(confirm("¿Borrar este formulario de este dispositivo?")){sv(ld().filter(x=>x.id!==t.dataset.d));menu()}}
else if(t.id==="fBack"){save(prog());cur=null;menu()}
else if(t.id==="fPdf"){save(prog());pdf(cur)}
else if(t.id==="fEnd")fin()};
const auto=ev=>{if(!cur||!ev.target.closest("#fBody"))return;const a=prog();clearTimeout(tm);tm=setTimeout(()=>save(a),600)};
vf.addEventListener("input",auto);vf.addEventListener("change",auto);
$("#vDra .hero").insertAdjacentHTML("afterend",`<button type="button" class="card fcard" id="openForms"><div><b>Llenar formulario</b> <span class="tag co">Piloto</span><p class="mu">Elige la visita y llena el cuestionario en pantalla. Guarda borradores y genera el PDF.</p></div><span class="sp"></span><span class="chev" style="transform:rotate(-90deg)">${ic("chev")}</span></button>`);
$("#openForms").onclick=()=>{$("#vDra").hidden=true;vf.hidden=false;cur=null;menu();scrollTo({top:0,behavior:"smooth"})};
document.querySelectorAll("[data-dratab]").forEach(b=>b.addEventListener("click",()=>{vf.hidden=true}));
})();
