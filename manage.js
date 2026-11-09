(function(){'use strict';
const API='https://fujiko-enmusubi.dorobouhige.chatgpt.site/api/tagoyama',KEY='tgf168_stats_session';
const $=id=>document.getElementById(id),range=$('range'),refresh=$('refresh');let session;
try{session=JSON.parse(localStorage.getItem(KEY)||'null');if(!session||session.expiresAt<=Date.now())session=null;}catch{session=null;}
const dateTime=iso=>new Intl.DateTimeFormat('ja-JP',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(new Date(iso));
const number=n=>new Intl.NumberFormat('ja-JP').format(n);
function showLogin(message){session=null;try{localStorage.removeItem(KEY);}catch{}$('dashboard').hidden=true;$('login-panel').hidden=false;$('login-status').textContent=message||'';}
function row(values){const tr=document.createElement('tr');for(const value of values){const td=document.createElement('td');td.textContent=value;tr.append(td);}return tr;}
async function load(){if(!session)return;refresh.disabled=true;$('status').textContent='利用状況を確認しています…';try{
 const response=await fetch(API+'/stats?range='+encodeURIComponent(range.value),{headers:{Authorization:'Bearer '+session.token},credentials:'omit',cache:'no-store'});
 const data=await response.json();if(response.status===401){showLogin('管理用の6桁でログインしてください。');return;}if(!response.ok)throw Error(data.error||'利用状況を取得できませんでした。');
 $('login-panel').hidden=true;$('dashboard').hidden=false;$('clicks').textContent=number(data.total);$('people').textContent=number(data.people);$('today').textContent=number(data.todayTotal);$('all').textContent=number(data.allTotal);$('all-people').textContent=number(data.allPeople);
 $('daily').replaceChildren(...data.daily.map(d=>row([d.day.replaceAll('-','/'),number(d.clicks)+'回',number(d.people)+'人'])));$('daily-empty').hidden=Boolean(data.daily.length);
 $('recent').replaceChildren(...data.recent.map(r=>{const li=document.createElement('li');li.textContent=dateTime(r.occurredAt);return li;}));$('recent-empty').hidden=Boolean(data.recent.length);
 $('updated').textContent=dateTime(data.updatedAt)+' 更新（日本時間）';$('status').textContent=data.total?'最新の利用状況です。':'この期間の利用記録は、まだありません。';
 }catch(error){const message='通信を確認して、もう一度お試しください。';$('status').textContent=message;$('login-status').textContent=message;}finally{refresh.disabled=false;}}
$('pin').addEventListener('input',()=>{$('pin').value=$('pin').value.replace(/[^0-9]/g,'').slice(0,6);});
$('metrics-login').addEventListener('submit',async event=>{event.preventDefault();const pin=$('pin').value;if(!/^\d{6}$/.test(pin))return;$('login-button').disabled=true;$('login-status').textContent='確認しています…';try{
 const response=await fetch(API+'/auth',{method:'POST',credentials:'omit',headers:{'Content-Type':'application/json'},body:JSON.stringify({pin})});const data=await response.json();$('pin').value='';if(!response.ok){$('login-status').textContent=data.error||'ログインできませんでした。';return;}
 session={token:data.token,expiresAt:data.expiresAt};try{localStorage.setItem(KEY,JSON.stringify(session));}catch{}$('login-status').textContent='';await load();
 }catch{$('pin').value='';$('login-status').textContent='通信を確認して、もう一度お試しください。';}finally{$('login-button').disabled=false;}});
$('logout').addEventListener('click',()=>showLogin('管理画面を閉じました。'));refresh.addEventListener('click',load);range.addEventListener('change',load);if(session)load();
})();
