// ===== Voltix Energy – GSAP animation =====
// Images (your can art + fruit cut-outs)
var IMG={
 "pine": {
  "can": "assets/pine-can.webp",
  "fruit": "assets/pine-fruit.webp"
 },
 "berry": {
  "can": "assets/berry-can.webp",
  "fruit": "assets/berry-fruit.webp"
 },
 "dragon": {
  "can": "assets/dragon-can.webp",
  "fruit": "assets/dragon-fruit.webp"
 }
};

var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var scene=$('#scene'),word=$('#word'),stage=$('#stage'),canw=$('#canw'),canEl=$('#can'),pa=$('#pa'),pb=$('#pb'),chips=$$('.chip');
var T=[{k:'pine',w:'PINEAPPLE',name:'Pineapple Pop',desc:'Instant energy, sharper focus.',c1:'#FFD23F',c2:'#FF9A1A',acc:'#FF5A00'},
{k:'berry',w:'BERRY',name:'Berry Bliss',desc:'Longer stamina, pure berry rush.',c1:'#2F9BFF',c2:'#0A2FA8',acc:'#7DF9FF'},
{k:'dragon',w:'DRAGONFRUIT',name:'Drazon Zing',desc:'Dragon-fruit fire, zero chill.',c1:'#FF4B6E',c2:'#9B0F38',acc:'#FFD23F'}];
var KIND=['s','b','s','s','b','s','b','s'],SW={pine:.55,berry:.85,dragon:.78},BOLT='<svg viewBox="0 0 24 32"><defs><linearGradient id="bg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" style="stop-color:var(--acc)"/></linearGradient></defs><path d="M14 0L2 18h8l-3 14L22 12h-8z" fill="url(#bg1)" stroke="#fff" stroke-opacity=".6" stroke-width=".8" stroke-linejoin="round"/></svg>';
var SZ=[6,3,3.9,5.3,2.5,3.7,3.2,5.5],RX=17,RY=6.5,DUR=5,cur=0,busy=true,E=14,H=600,fr=[],prog;
function metrics(){var W=scene.clientWidth,h=scene.clientHeight,fs=W<600?Math.min(W/46,h/62):Math.min(W/64,h/40);scene.style.fontSize=Math.max(7,Math.min(fs,20))+'px';E=parseFloat(getComputedStyle(scene).fontSize);H=scene.clientHeight}
function fit(){var W=scene.clientWidth;word.style.fontSize='10px';var w=$('.wi',word).offsetWidth||1;word.style.fontSize=Math.min(10*W*.94/w,W*.34,H*.72)+'px'}
function mkFruits(n){
 fr.forEach(function(f){f.el.remove()});fr=[];var t=T[n];
 KIND.forEach(function(k,i){var el=document.createElement('div'),sp=k=='s',m=sp?SW[t.k]:1;el.className='fr';
  el.innerHTML=sp?'<img src="'+IMG[t.k].fruit+'" alt="">':BOLT;el.style.width=SZ[i]*E*m+'px';stage.appendChild(el);
  fr.push({el:el,s:SZ[i],m:m,sp:sp,a:i*360/8,k:i%3==2?.62:1,v:(i%2?-1:1)*(13+(i*5)%11)*(i%3==2?1.5:1),r:0,fy:0,o:0})});
}
gsap.ticker.add(function(t,dt){var d=dt/1000;fr.forEach(function(f){f.a+=f.v*d;var rad=f.a*Math.PI/180,sn=Math.sin(rad),x=Math.cos(rad)*RX*E*f.r*f.k,y=sn*RY*E*f.r*f.k-1.5*E+f.fy,sc=.72+.4*(sn+1)/2;
 f.el.style.transform='translate('+x+'px,'+y+'px) translate(-50%,-50%) scale('+sc+') rotate('+(f.sp?Math.sin(rad)*16:f.a*1.4)+'deg)';f.el.style.opacity=f.o;f.el.style.zIndex=sn>0?9:2})});
function land(){
 var fl=14.2*E;
 for(var i=0;i<24;i++){var d=document.createElement('div'),s=gsap.utils.random(.35,.95),a=gsap.utils.random(-165,-15)*Math.PI/180,dist=gsap.utils.random(5,14)*E;
  d.className='drop';d.style.width=d.style.height=s+'em';stage.appendChild(d);gsap.set(d,{xPercent:-50,yPercent:-50,x:0,y:fl});
  gsap.timeline({onComplete:function(){this.targets()[0].remove()}}).to(d,{x:Math.cos(a)*dist,y:fl+Math.sin(a)*dist*.9,duration:.4,ease:'power2.out'}).to(d,{x:'+='+Math.cos(a)*dist*.3,y:fl+2*E,opacity:0,duration:.55,ease:'power2.in'})}
 [0,.14,.28].forEach(function(dl){var r=document.createElement('div');r.className='shock';stage.appendChild(r);gsap.fromTo(r,{scale:.4,opacity:.9},{scale:3.4,opacity:0,duration:.9,delay:dl,immediateRender:false,ease:'power2.out',onComplete:function(){r.remove()}})});
 gsap.fromTo(word,{y:0},{y:H*.03,duration:.06,repeat:5,yoyo:true,ease:'power1.inOut'});
 gsap.fromTo('.flash',{opacity:.35},{opacity:0,duration:.4,ease:'power2.out'});
 gsap.fromTo('#halo',{scale:1},{scale:1.3,duration:.35,yoyo:true,repeat:1,ease:'power2.out'});
 gsap.fromTo('#floor',{scale:1},{scale:1.15,duration:.2,yoyo:true,repeat:1});
}
function streaks(col){for(var i=0;i<18;i++){var d=document.createElement('i'),w=gsap.utils.random(.25,.7),h=gsap.utils.random(5,16);d.className='streak';
 d.style.cssText='left:'+gsap.utils.random(2,98)+'%;width:'+w+'em;height:'+h+'em;background:linear-gradient(to bottom,transparent,'+col+')';scene.appendChild(d);
 gsap.fromTo(d,{y:-h*E-20},{y:H+20,duration:gsap.utils.random(.7,1.2),delay:gsap.utils.random(0,.5),ease:'power2.in',onComplete:function(){this.targets()[0].remove()}})}}
function mark(){chips.forEach(function(c,j){c.classList.toggle('on',j===cur)})}
function startProg(){chips.forEach(function(c){gsap.set($('.fill',c),{scaleX:0})});prog=gsap.to($('.fill',chips[cur]),{scaleX:1,duration:DUR,ease:'none',onComplete:function(){go(cur+1)}})}
function enter(n,first){
 var t=T[n];scene.dataset.t=t.k;mark();
 $('.brand').textContent=n==2?'DRAZON':'VOLTIX';$('#idx').textContent='0'+(n+1);$('#ttl').textContent=t.name;$('#dsc').textContent=t.desc;
 word.innerHTML='<span class="wi">'+t.w.split('').map(function(c){return'<span>'+c+'</span>'}).join('')+'</span>';fit();
 canEl.src=IMG[t.k].can;mkFruits(n);
 var dropY=-(stage.offsetTop+17*E);
 var tl=gsap.timeline({onComplete:function(){busy=false;startProg()}});
 tl.fromTo(canw,{y:dropY,rotation:-18,scaleX:1,scaleY:1},{y:0,rotation:6,duration:.62,ease:'power2.in'},.05)
  .add(land)
  .to(canw,{scaleX:1.15,scaleY:.82,duration:.09,ease:'power1.out'})
  .to(canw,{scaleX:1,scaleY:1,duration:1,ease:'elastic.out(1,.35)'})
  .fromTo($$('.wi span',word),{yPercent:120,opacity:0,rotation:8},{yPercent:0,opacity:1,rotation:0,duration:.8,stagger:.04,ease:'back.out(1.7)'},.1)
  .fromTo(['#halo','#rw','#floor'],{opacity:0,scale:.5},{opacity:1,scale:1,duration:.9,ease:'power3.out'},.45)
  .fromTo(fr,{r:0,o:0,fy:0},{r:1,o:1,duration:1.3,ease:'back.out(1.4)',stagger:.07},.7)
  .fromTo('.gc',{y:-70,opacity:0,scale:.6},{y:0,opacity:1,scale:1,duration:.85,ease:'back.out(1.8)',stagger:.15},.95)
  .fromTo('.ln span',{yPercent:110},{yPercent:0,duration:.8,stagger:.1,ease:'power3.out'},.9);
 if(first)tl.from('.ctrl,#fs,.brand',{y:24,opacity:0,duration:.7,stagger:.08,ease:'power3.out'},1.2);
}
function go(n){
 n=(n+3)%3;if(busy||n===cur)return;busy=true;if(prog)prog.kill();
 chips.forEach(function(c){gsap.set($('.fill',c),{scaleX:0})});
 var t=T[n];pa.style.setProperty('--acc',t.acc);pb.style.setProperty('--c1',t.c1);pb.style.setProperty('--c2',t.c2);
 gsap.timeline()
  .to(canw,{y:H*1.2,rotation:'+=300',duration:.75,ease:'power3.in'},0)
  .to(fr,{fy:H*1.1,o:0,duration:.6,ease:'power2.in',stagger:.03},0)
  .to($$('.wi span',word),{yPercent:130,opacity:0,stagger:.02,duration:.4,ease:'power2.in'},0)
  .to(['.gc','#rw','#halo','#floor'],{opacity:0,duration:.35},0)
  .to('.ln span',{yPercent:110,duration:.4,ease:'power2.in'},0)
  .fromTo(pa,{yPercent:-112},{yPercent:0,duration:.8,ease:'power2.inOut'},.08)
  .fromTo(pb,{yPercent:-112},{yPercent:0,duration:.85,ease:'power2.inOut'},.26)
  .add(function(){streaks(t.acc)},.12)
  .add(function(){cur=n;gsap.set([pa,pb],{yPercent:-112});enter(n)},1.15);
}
chips.forEach(function(c,j){c.onclick=function(){go(j)}});
$('#fs').onclick=function(){document.body.classList.toggle('full');setTimeout(layout,80)};
function layout(){metrics();fit();fr.forEach(function(f){f.el.style.width=f.s*E*f.m+'px'})}
var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(layout,150)});

// ambient life: wave motion, idle float, sparkles, bubbles, parallax
gsap.to('.pw',{x:'6%',duration:.7,yoyo:true,repeat:-1,ease:'sine.inOut'});
gsap.to(canEl,{y:-10,rotation:-3,duration:2.2,yoyo:true,repeat:-1,ease:'sine.inOut'});
gsap.set(canw,{xPercent:-50,yPercent:-50,transformOrigin:'50% 100%'});gsap.set(word,{yPercent:-50});gsap.set([pa,pb],{yPercent:-112});
[[-9,-15],[10,-9],[-15,3],[14,13],[3,-18],[-6,12]].forEach(function(p){var s=document.createElement('div');s.className='spk';s.style.cssText='--x:'+p[0]+';--y:'+p[1];
 s.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 0C13 8 16 11 24 12 16 13 13 16 12 24 11 16 8 13 0 12 8 11 11 8 12 0Z" fill="#fff"/></svg>';stage.appendChild(s);
 gsap.fromTo(s,{scale:0,rotation:0,opacity:0},{scale:gsap.utils.random(.6,1.2),rotation:90,opacity:1,duration:.8,yoyo:true,repeat:-1,repeatDelay:gsap.utils.random(.5,2.5),delay:gsap.utils.random(0,3),ease:'sine.inOut'})});
for(var b=0;b<9;b++){var e=document.createElement('div'),sz=gsap.utils.random(.5,1.5);e.className='bub';e.style.cssText='width:'+sz+'em;height:'+sz+'em;left:'+gsap.utils.random(3,97)+'%;top:0';scene.appendChild(e);
 gsap.fromTo(e,{y:600,opacity:0},{y:-60,opacity:.8,duration:gsap.utils.random(8,15),delay:gsap.utils.random(0,8),repeat:-1,ease:'none'});gsap.to(e,{x:gsap.utils.random(-30,30),duration:gsap.utils.random(2,4),yoyo:true,repeat:-1,ease:'sine.inOut'})}
(function flick(){var m=$('#mb');gsap.timeline({delay:gsap.utils.random(.7,2.2),onComplete:flick}).to(m,{opacity:.75,duration:.05}).to(m,{opacity:.2,duration:.05}).to(m,{opacity:.85,duration:.06}).to(m,{opacity:.35,duration:.35})})();
var qx=gsap.quickTo(stage,'x',{duration:.9,ease:'power3'}),qy=gsap.quickTo(stage,'y',{duration:.9,ease:'power3'}),wx=gsap.quickTo(word,'x',{duration:.9,ease:'power3'}),ox=gsap.quickTo('#o1','x',{duration:1.2}),oy=gsap.quickTo('#o2','y',{duration:1.2});
gsap.set(canEl,{transformPerspective:900});
var qry=gsap.quickTo(canEl,'rotationY',{duration:.8,ease:'power3'}),qrx=gsap.quickTo(canEl,'rotationX',{duration:.8,ease:'power3'});
gsap.fromTo('.sweep',{left:'-30%'},{left:'130%',duration:1.6,ease:'power2.inOut',repeat:-1,repeatDelay:2.6});
scene.addEventListener('mousemove',function(e){var r=scene.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;qx(px*-28);qy(py*-20);wx(px*26);ox(px*60);oy(py*-50);qry(px*28);qrx(py*-18)});
metrics();document.fonts&&document.fonts.ready.then(function(){metrics();fit()});
enter(0,true);

var CODE={
HTML:"<div class=\"stage\" id=\"stage\">\n  <div class=\"halo\" id=\"halo\"></div>\n  <div class=\"floor\" id=\"floor\"></div>\n  <div class=\"canw\" id=\"canw\"><img class=\"can\" id=\"can\" alt=\"Voltix can\"></div>\n</div>\n<div class=\"copy\">\n  <h2 class=\"ln\"><span id=\"ttl\">Pineapple Pop</span></h2>\n</div>",
CSS:".chip{\n  padding:.7em 1.5em;\n  font:400 1.35em/1 Anton,Impact,sans-serif;\n  letter-spacing:.07em;\n  text-transform:uppercase;\n  transition:transform .28s cubic-bezier(.2,.9,.3,1.5),background .25s,box-shadow .25s\n}\n.chip:hover{\n  transform:scale(1.17) translateY(-.12em);\n  box-shadow:0 .9em 1.8em rgba(0,0,0,.35)\n}\n.canw{\n  width:11.5em;\n  z-index:5\n}\n.copy h2{\n  font:400 3.7em/1 Anton,Impact,sans-serif;\n  text-transform:uppercase;\n  transform:skewX(-8deg)\n}",
JS:"// 1) can drops, squashes, splashes\ntl.fromTo(canw,{y:dropY,rotation:-18,scaleX:1,scaleY:1},{y:0,rotation:6,duration:.62,ease:'power2.in'},.05)\n  .add(land)\n  .to(canw,{scaleX:1.15,scaleY:.82,duration:.09,ease:'power1.out'})\n  .to(canw,{scaleX:1,scaleY:1,duration:1,ease:'elastic.out(1,.35)'})\n\n// 2) juice pours down on flavor change\n.fromTo(pa,{yPercent:-112},{yPercent:0,duration:.8,ease:'power2.inOut'},.08)\n.fromTo(pb,{yPercent:-112},{yPercent:0,duration:.85,ease:'power2.inOut'},.26)\n\n// 3) fruits orbit the can\ngsap.ticker.add(function(t,dt){\n  var d=dt/1000;\n  fr.forEach(function(f){\n    f.a+=f.v*d;\n    var rad=f.a*Math.PI/180,sn=Math.sin(rad),\n    x=Math.cos(rad)*RX*E*f.r*f.k,"};
var RE=/("[^"\n]*"?|'[^'\n]*'?)|(\/\/[^\n]*)|(&lt;\/?[\w-]+)|\b(const|let|function|return|gsap|var)\b|([\w-]+)(?=\s*:)|(\b\d+(?:\.\d+)?(?:px|em|s|%)?)/g;
function hl(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(RE,function(m,a,b,c,d,e){return a?'<span class="s">'+m+'</span>':b?'<span class="c">'+m+'</span>':c?'<span class="g">'+m+'</span>':d?'<span class="k">'+m+'</span>':e?'<span class="p">'+m+'</span>':'<span class="n">'+m+'</span>'})}
var tabs=$$('.tab'),codeEl=$('#code'),ti=0,tt,auto=true;
function typeTab(n){clearTimeout(tt);ti=n;tabs.forEach(function(t,j){t.classList.toggle('on',j===n)});var raw=CODE[tabs[n].textContent],i=0;
 (function tick(){i+=3;codeEl.innerHTML=hl(raw.slice(0,i));codeEl.scrollTop=codeEl.scrollHeight;if(i<raw.length)tt=setTimeout(tick,16);else if(auto)tt=setTimeout(function(){typeTab((ti+1)%3)},3200)})()}
tabs.forEach(function(t,j){t.onclick=function(){auto=false;typeTab(j)}});
typeTab(0);
