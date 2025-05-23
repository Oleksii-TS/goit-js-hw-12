import{a as S,S as B,i as c,P as R}from"./assets/vendor-Bc81j50v.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const $="50286619-c20e9afd7f4c04ec0a12478f1",I="https://pixabay.com/api/";async function h(s,r=1,o=15){const a={key:$,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:o};try{return(await S.get(I,{params:a})).data}catch(e){throw console.error("Error fetching images:",e),e}}const L=document.querySelector(".gallery");document.querySelector(".loader");let A=new B(".gallery a",{captionsData:"alt",captionDelay:250});function m(s){const r=s.map(({webformatURL:o,largeImageURL:a,tags:e,likes:t,views:l,comments:p,downloads:q})=>{const E=e.split(",").slice(0,5).join(", ");return`
      <li class="gallery-item">
        <a href="${a}" data-lightbox="gallery">
          <img class="gallery-image" src="${o}" alt="${E}" loading="lazy" />
        </a>
        <div class="info">
          <div class="image-info">
            <div class="info-item">
              <p class="info-title"><b>Likes:</b></p>
              <p class="info-value">${t}</p>
            </div>
            <div class="info-item">
              <p class="info-title"><b>Views:</b></p>
              <p class="info-value">${l}</p>
            </div>
            <div class="info-item">
              <p class="info-title"><b>Comments:</b></p>
              <p class="info-value">${p}</p>
            </div>
            <div class="info-item">
              <p class="info-title"><b>Downloads:</b></p>
              <p class="info-value">${q}</p>
            </div>
          </div>
        </div>
      </li>`}).join("");L.insertAdjacentHTML("beforeend",r),A.refresh()}function y(){document.getElementById("loader").hidden=!1}function v(){document.getElementById("loader").hidden=!0}function b(){L.innerHTML=""}const w=document.getElementById("pagination");let d=null;const g=15,P=document.querySelector(".form"),H=P.querySelector("input[name='search-text']"),n=document.querySelector(".load-more-btn");let i=1,f="",u=0;P.addEventListener("submit",async s=>{s.preventDefault();const r=H.value.trim();if(!r){c.warning({message:"Please enter a search query.",position:"topRight"});return}f=r,i=1,b(),n.hidden=!0,d&&(w.innerHTML="",d=null);try{y();const o=await h(f,i);if(u=o.totalHits,o.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),n.hidden=!0;return}m(o.hits),i*g<u?n.hidden=!1:n.hidden=!0,d=new R(w,{totalItems:u,itemsPerPage:g,visiblePages:5,page:i,centerAlign:!0}),d.on("afterMove",async a=>{const e=a.page;if(e!==i){i=e,n.hidden=!0,y();try{const t=await h(f,i);b(),m(t.hits),i*g<u?n.hidden=!1:(n.hidden=!0,c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}));const l=document.querySelectorAll(".gallery .gallery-item");if(l.length>0){const{height:p}=l[0].getBoundingClientRect();window.scrollBy({top:p*2,behavior:"smooth"})}}catch(t){c.error({message:`Error: ${t.message}`,position:"topRight"})}finally{v()}}})}catch(o){c.error({message:`Error: ${o.message}`,position:"topRight"})}finally{v()}});n.addEventListener("click",async()=>{i+=1,n.hidden=!0,y();try{const s=await h(f,i);m(s.hits);const r=document.querySelectorAll(".gallery .gallery-item");if(r.length>0){const{height:o}=r[0].getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}i*g>=u?(n.hidden=!0,c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):n.hidden=!1,d&&d.movePageTo(i)}catch(s){c.error({message:`Error: ${s.message}`,position:"topRight"})}finally{v()}});
//# sourceMappingURL=index.js.map
