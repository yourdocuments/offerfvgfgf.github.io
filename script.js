const t=document.querySelector(".menu-toggle"),l=document.getElementById("navLinks");
t.addEventListener("click",()=>{const o=l.classList.toggle("open");t.setAttribute("aria-expanded",o)});
l.addEventListener("click",e=>{if(e.target.tagName==="A")l.classList.remove("open")});
document.querySelectorAll(".dl").forEach(b=>b.addEventListener("click",async()=>{
 const el=document.getElementById(b.dataset.target);
 const c=await html2canvas(el,{scale:2,backgroundColor:null});
 const a=document.createElement("a");a.download=b.dataset.target+".png";a.href=c.toDataURL("image/png");a.click();}));
