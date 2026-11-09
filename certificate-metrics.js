/* Counts save-button use only. No climb ID, serial number, name or email is sent. */
(function(){
 'use strict';
 var endpoint='https://fujiko-enmusubi.dorobouhige.chatgpt.site/api/tagoyama/events';
 var visitorKey='tgf168_metrics_visitor',prefix='tgf168_metrics_event_',memory=[],busy=false,visitor;
 var uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
 function id(){return crypto.randomUUID();}
 function visitorId(){if(visitor)return visitor;try{visitor=localStorage.getItem(visitorKey);if(!uuid.test(visitor||'')){visitor=id();localStorage.setItem(visitorKey,visitor);}}catch(e){visitor=id();}return visitor;}
 function pending(){var out=memory.slice();try{for(var i=0;i<localStorage.length;i++){var key=localStorage.key(i);if(!key||key.indexOf(prefix)!==0)continue;try{var event=JSON.parse(localStorage.getItem(key));if(Date.parse(event.occurredAt)<Date.now()-7*86400000){localStorage.removeItem(key);i--;continue;}out.push(event);}catch(e){}}}catch(e){}return out.slice(0,50);}
 function remove(event){memory=memory.filter(function(e){return e.eventId!==event.eventId;});try{localStorage.removeItem(prefix+event.eventId);}catch(e){}}
 async function flush(){if(busy)return;busy=true;try{var events=pending();for(var i=0;i<events.length;i++){
  var event=events[i];try{var response=await fetch(endpoint,{method:'POST',mode:'cors',credentials:'omit',headers:{'Content-Type':'application/json'},body:JSON.stringify(event),keepalive:true});
   if(response.ok){var result=await response.json();if(result.ok)remove(event);}else if(response.status===400||response.status===413){remove(event);}else break;
  }catch(e){break;}
 }}finally{busy=false;}}
 function recordSave(options){try{var event={eventId:id(),visitorId:visitorId(),occurredAt:new Date().toISOString(),test:Boolean(options&&options.test)};
  try{localStorage.setItem(prefix+event.eventId,JSON.stringify(event));}catch(e){memory.push(event);}void flush();
 }catch(e){/* A counting failure must never prevent saving the image. */}}
 window.TagoyamaMetrics={recordSave:recordSave};
 window.addEventListener('load',flush);window.addEventListener('online',flush);
 document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible')void flush();});
})();
