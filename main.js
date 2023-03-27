(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){e.classList.add("popup_opened"),document.addEventListener("keydown",(function(t){r(t,e)}))}function n(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",(function(e,t){r(e,t)}))}function r(e,t){"Escape"===e.key&&n(t)}function o(e,t,n,r){e.textContent=t?r:n}e.d({},{i8:()=>p,ri:()=>U,wg:()=>T,Dr:()=>k,Rm:()=>g,eq:()=>A,yH:()=>C,DG:()=>M,bj:()=>v,td:()=>x,KM:()=>L,O9:()=>m,AD:()=>j,jN:()=>y,sj:()=>D,Ph:()=>h,X7:()=>N,Vu:()=>q,E3:()=>B});var c={baseUrl:"https://mesto.nomoreparties.co/v1/plus-cohort-22",headers:{authorization:"9f08c228-ad32-46bd-930f-3baca199438b","Content-Type":"application/json"}};function a(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function i(e){console.log("Ошибка: ".concat(e))}function u(e,n,r,o,u,l){var s=k.querySelector(".element").cloneNode(!0),d=s.querySelector(".element__delete"),f=s.querySelector(".element__image"),m=s.querySelector(".element__like"),v=s.querySelector(".element__like-count");return function(e,t,n){t!==n&&(e.classList.add("element__delete_disabled"),e.disabled=!0)}(d,o,l),d.addEventListener("click",(function(){(function(e){return fetch("".concat(c.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:c.headers}).then(a)})(u).then((function(){s.remove()})).catch(i)})),f.src=e,f.alt=n,s.querySelector(".element__title").textContent=n,function(e,n,r){e.querySelector(".element__overlay").addEventListener("click",(function(){t(y),C.src=n,C.alt=r,A.textContent=r}))}(s,e,n),function(e,t,n,r,o){var u=e.length;0!=u&&(n.classList.add("element__like-count_active"),n.textContent=u),e.forEach((function(e){e._id===o&&t.classList.add("element__like_active")})),t.addEventListener("click",(function(e){0===u&&n.classList.add("element__like-count_active"),e.target.classList.contains("element__like_active")?function(e){return fetch("".concat(c.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:c.headers}).then(a)}(r).then((function(t){e.target.classList.remove("element__like_active"),n.textContent=t.likes.length})).catch(i):function(e){return fetch("".concat(c.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:c.headers}).then(a)}(r).then((function(t){e.target.classList.add("element__like_active"),n.textContent=t.likes.length})).catch(i),0===u&&n.classList.remove("element__like-count_active")}))}(r,m,v,u,l),s}function l(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var d,f=document.forms["profile-form"],m=document.querySelector("input[name=name]"),v=document.querySelector("input[name=job]"),h=document.querySelector(".profile-popup"),p=document.querySelector(".add-popup"),y=document.querySelector(".picture-popup"),_=document.querySelector(".profile__edit-button"),b=document.querySelector(".profile__add-button"),S=document.querySelectorAll(".form__close-button"),g=document.querySelector(".elements"),q=document.querySelector("input[name=name-place]"),L=document.querySelector("input[name=link]"),E=document.forms["card-form"],k=document.querySelector("#element").content,C=document.querySelector(".figure__image"),A=document.querySelector(".figure__caption"),j=document.querySelector(".profile__heading-name"),x=document.querySelector(".profile__job"),w=document.querySelectorAll(".popup"),O=document.querySelector(".profile__avatar-container"),U=document.querySelector(".profile__avatar"),P=document.forms.update,D=document.querySelector(".popup-update"),T=D.querySelector(".form__input"),B={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__submit-button",inactiveButtonClass:"form__submit-button_type_error",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"},M=Array.from(E.querySelectorAll(B.inputSelector)),N=E.querySelector(B.submitButtonSelector);_.addEventListener("click",(function(){t(h),m.value=j.textContent,v.value=x.textContent})),b.addEventListener("click",(function(){return t(p)})),S.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return n(t)}))})),O.addEventListener("click",(function(){t(D)})),f.addEventListener("submit",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Сохранить",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";e.preventDefault();var u,l,s=e.submitter;o(s,!0,t,r),(u=m.value,l=v.value,fetch("".concat(c.baseUrl,"/users/me"),{method:"PATCH",headers:c.headers,body:JSON.stringify({name:u,about:l})}).then(a)).then((function(){j.textContent=m.value,x.textContent=v.value,n(h)})).catch(i).finally((function(){o(s,!1,t,r)}))})),E.addEventListener("submit",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Создать",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";e.preventDefault();var s,d,f=e.submitter;o(f,!0,t,r),(s=q.value,d=L.value,fetch("".concat(c.baseUrl,"/cards"),{method:"POST",headers:c.headers,body:JSON.stringify({name:s,link:d})}).then(a)).then((function(t){g.prepend(u(t.link,t.name,t.likes,t.owner._id,t._id,t.owner._id)),e.target.reset(),l(M,N,B),n(p)})).catch(i).finally((function(){o(f,!1,t,r)}))})),P.addEventListener("submit",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Сохранить",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";e.preventDefault();var u,s=e.submitter;o(s,!0,t,r),(u=T.value,fetch("".concat(c.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:c.headers,body:JSON.stringify({avatar:u})}).then(a)).then((function(){U.src=T.value,e.target.reset(),l(Array.from(T),s,B),n(D)})).catch(i).finally((function(){o(s,!1,t,r)}))})),Promise.all([fetch("".concat(c.baseUrl,"/users/me"),{headers:c.headers}).then(a),fetch("".concat(c.baseUrl,"/cards"),{headers:c.headers}).then(a)]).then((function(e){var t=function(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(e,2),n=t[0],r=t[1];j.textContent=n.name,x.textContent=n.about,U.src=n.avatar,d=n._id;for(var o=0;o<r.length;o++)g.append(u(r[o].link,r[o].name,r[o].likes,r[o].owner._id,r[o]._id,d))})).catch(i),w.forEach((function(e){e.addEventListener("mousedown",(function(e){n(e.target)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);l(n,r,t),n.forEach((function(e){e.addEventListener("input",(function(){(function(e,t){e.validity.patternMismatch?e.setCustomValidity(e.dataset.error):e.value.length?e.setCustomValidity(""):e.setCustomValidity(e.dataset.errorMessage),e.validity.valid?function(e,t){var n=document.querySelector(".".concat(e.id,"-error"));n.classList.remove(t.errorClass),n.textContent="",e.classList.remove(t.inputErrorClass)}(e,t):function(e,t,n){var r=document.querySelector(".".concat(e.id,"-error"));r.classList.add(n.errorClass),r.textContent=t,e.classList.add(n.inputErrorClass)}(e,e.validationMessage,t)})(e,t),l(n,r,t)}))}))}(t,e)}))}(B)})();