/* Post-card engine: draws each post to a canvas so it can be downloaded or shared as an image. */
(function(){
var SIZES={"4:5":[1080,1350],"1:1":[1080,1080],"9:16":[1080,1920]};
var T={lime:{bg:"#B6F500",fg:"#0B0B0A",mut:"rgba(11,11,10,.72)",pill:"#0B0B0A",pf:"#B6F500",dot:"rgba(11,11,10,.08)"},
ink:{bg:"#0B0B0A",fg:"#FFFFFF",mut:"rgba(255,255,255,.74)",pill:"#B6F500",pf:"#0B0B0A",dot:"rgba(182,245,0,.18)"},
paper:{bg:"#F6F6F0",fg:"#0B0B0A",mut:"#55554F",pill:"#B6F500",pf:"#0B0B0A",dot:"#B6F500"}};
var FF='"Inter","Hind Siliguri",system-ui,sans-serif';
function wrap(c,t,w){var o=[];t.split("\n").forEach(function(p){var l="";p.split(/\s+/).forEach(function(x){var n=l?l+" "+x:x;if(c.measureText(n).width>w&&l){o.push(l);l=x}else l=n});o.push(l)});return o}
function rr(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function draw(cv,p,cfg,size,logo){
 var W=size[0],H=size[1],t=T[p.theme]||T.lime,P=88,c=cv.getContext("2d");cv.width=W;cv.height=H;
 c.fillStyle=t.bg;c.fillRect(0,0,W,H);
 c.fillStyle=t.dot;c.beginPath();c.arc(W,H,420,0,7);c.fill();
 if(logo){c.save();rr(c,P,P,84,84,22);c.clip();c.drawImage(logo,P,P,84,84);c.restore()}
 c.textBaseline="alphabetic";c.fillStyle=t.fg;c.font="800 40px "+FF;c.fillText(cfg.brand,P+(logo?104:0),P+56);
 var y=Math.round(H*.23)+40;
 c.font="800 30px "+FF;var pw=c.measureText(p.tag).width+48;
 c.fillStyle=t.pill;rr(c,P,y-34,pw,56,28);c.fill();c.fillStyle=t.pf;c.fillText(p.tag,P+24,y+5);
 y+=96;var maxW=W-P*2,s=112,L;
 for(;s>=48;s-=4){c.font="800 "+s+"px "+FF;L=wrap(c,p.title,maxW);if(L.length<=(H>1500?6:4))break}
 c.fillStyle=t.fg;L.forEach(function(l,i){c.fillText(l,P,y+s*.9+i*s*1.08)});y+=L.length*s*1.08+36;
 var b=42;c.font="500 "+b+"px "+FF;c.fillStyle=t.mut;
 wrap(c,p.body,maxW).forEach(function(l,i){c.fillText(l,P,y+b+i*b*1.5)});
 c.fillStyle=t.fg;c.font="700 34px "+FF;c.fillText(cfg.url,P,H-P);
 if(cfg.cta){c.textAlign="right";c.fillText(cfg.cta,W-P,H-P);c.textAlign="left"}
}
window.renderPosts=function(cfg){
 var grid=document.getElementById("grid"),size=SIZES["4:5"],cards=[],logo=null;
 function all(){cards.forEach(function(k){draw(k.cv,k.p,cfg,size,logo)})}
 cards=cfg.posts.map(function(p){
  var a=document.createElement("article");a.className="post";
  var cv=document.createElement("canvas");cv.setAttribute("role","img");cv.setAttribute("aria-label",p.title);
  var cap=document.createElement("p");cap.className="cap";cap.textContent=p.caption;
  var ac=document.createElement("div");ac.className="acts";
  function mk(txt,cls,fn){var b=document.createElement("button");b.type="button";b.className="btn "+cls;b.textContent=txt;b.onclick=function(){fn(b,txt)};ac.appendChild(b);return b}
  function blob(cb){try{cv.toBlob(cb,"image/png")}catch(e){alert("Image export needs the site to be opened from the web (not a local file).")}}
  mk("Download","btn-lime",function(){blob(function(bl){if(!bl)return;var u=URL.createObjectURL(bl),l=document.createElement("a");l.href=u;l.download=(cfg.slug||"post")+"-"+p.id+"-"+Object.keys(SIZES).filter(function(k){return SIZES[k]===size})[0].replace(":","x")+".png";l.click();setTimeout(function(){URL.revokeObjectURL(u)},4000)})});
  mk("Copy caption","",function(b,t){function ok(m){b.textContent=m;setTimeout(function(){b.textContent=t},1600)}try{navigator.clipboard.writeText(p.caption).then(function(){ok("Copied")},function(){ok("Select text")})}catch(e){ok("Select text")}});
  if(navigator.share&&navigator.canShare)mk("Share","",function(){blob(function(bl){if(!bl)return;var f=new File([bl],p.id+".png",{type:"image/png"});if(navigator.canShare({files:[f]}))navigator.share({files:[f],text:p.caption}).catch(function(){})})});
  a.append(cv,ac,cap);grid.appendChild(a);return{cv:cv,p:p}});
 var seg=document.getElementById("sizes");
 Object.keys(SIZES).forEach(function(k){var b=document.createElement("button");b.type="button";b.textContent=k+(k=="4:5"?" Post":k=="1:1"?" Square":" Story");b.setAttribute("aria-pressed",k=="4:5");b.onclick=function(){size=SIZES[k];Array.prototype.forEach.call(seg.children,function(x){x.setAttribute("aria-pressed",x===b)});all()};seg.appendChild(b)});
 var fonts=document.fonts?Promise.all(["800 40px Inter","500 40px Inter","800 40px 'Hind Siliguri'","500 40px 'Hind Siliguri'"].map(function(f){return document.fonts.load(f,"Aঅ")})).catch(function(){}):Promise.resolve();
 var img=new Image();var ld=new Promise(function(r){img.onload=function(){logo=img;r()};img.onerror=r;img.src="logo.jpg"});
 Promise.all([fonts,ld]).then(all);
};
})();
