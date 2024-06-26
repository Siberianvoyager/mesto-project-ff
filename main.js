(()=>{"use strict";var e={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-17",headers:{authorization:"5579770b-6207-498a-98b4-8a0fcf966e62","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function n(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)}function o(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}function r(r,c,u){var a=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),i=a.querySelector(".card__image"),l=a.querySelector(".card__title"),s=a.querySelector(".card__like-button"),p=a.querySelector(".card__like-count"),d=a.querySelector(".card__delete-button");return i.src=r.link,i.alt=r.name,l.textContent=r.name,p.textContent=r.likes.length,r.likes.some((function(e){return e._id===c}))&&s.classList.add("card__like-button_active"),r.owner._id!==c?d.style.display="none":d.addEventListener("click",(function(){!function(n,o){var r=document.querySelector(".popup_type_confirm-delete"),c=r.querySelector(".popup__form");function u(c){c.preventDefault(),function(n,o){(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)})(n).then((function(){o.remove()})).catch((function(e){return console.log(e)}))}(n,o),window.closePopup(r)}c.removeEventListener("submit",u),c.addEventListener("submit",u),window.openPopup(r)}(r._id,a)})),s.addEventListener("click",(function(){return e=r._id,c=p,void((t=s).classList.contains("card__like-button_active")?o:n)(e).then((function(e){t.classList.toggle("card__like-button_active"),c.textContent=e.likes.length})).catch((function(e){return console.log(e)}));var e,t,c})),i.addEventListener("click",(function(){return u(r.link,r.name)})),a}function c(e){e.classList.add("popup_is-opened","popup_is-animated"),document.addEventListener("keydown",a)}function u(e){e.classList.remove("popup_is-opened","popup_is-animated"),document.removeEventListener("keydown",a)}function a(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&u(t)}}function i(e,t){var n=e.nextElementSibling,o=e.validity;o.valueMissing?l(e,n,"Вы пропустили это поле",t):"text"!==e.type||/^[A-Za-zА-Яа-яЁё\s\-]+$/.test(e.value)?"text"===e.type&&(o.tooShort||o.tooLong)?l(e,n,"Минимальное количество символов: ".concat(e.minLength,". Длина текста сейчас: ").concat(e.value.length," символ").concat(1===e.value.length?"":"ов","."),t):"url"===e.type&&o.typeMismatch?l(e,n,"Введите адрес сайта",t):s(e,n,t):l(e,n,"Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",t)}function l(e,t,n,o){e.classList.add(o.inputErrorClass),t.textContent=n,t.classList.add(o.errorClass),e.setAttribute("data-error-message",n)}function s(e,t,n){e.classList.remove(n.inputErrorClass),t.textContent="",t.classList.remove(n.errorClass),e.removeAttribute("data-error-message")}function p(e,t,n){var o=e.some((function(e){return!e.validity.valid}));t.disabled=o,t.classList.toggle(n.inactiveButtonClass,o)}function d(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));n.forEach((function(e){s(e,e.nextElementSibling,t)})),p(n,e.querySelector(t.submitButtonSelector),t)}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}window.openPopup=c,window.closePopup=u,document.addEventListener("DOMContentLoaded",(function(){var n,o=document.querySelector(".places__list"),a=document.querySelector(".popup_type_edit"),l=document.querySelector(".popup_type_new-card"),s=document.querySelector(".popup_type_image"),_=document.querySelector(".popup_type_update-avatar"),m=s.querySelector(".popup__image"),y=s.querySelector(".popup__caption"),v=a.querySelector(".popup__input_type_name"),h=a.querySelector(".popup__input_type_description"),S=document.querySelector(".profile__title"),b=document.querySelector(".profile__description"),q=document.querySelector(".profile__avatar"),g=document.querySelector(".profile__avatar-edit-icon"),E=a.querySelector('.popup__form[name="edit-profile"]'),C=l.querySelector(".popup__form"),L=_.querySelector(".popup__form"),k=L.querySelector(".popup__input_type_url"),x=C.querySelector(".popup__input_type_card-name"),A=C.querySelector(".popup__input_type_url");function w(e,t){m.src=e,m.alt=t,y.textContent=t,c(s)}document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){t.target===e&&u(e)}))})),document.querySelectorAll(".popup__close").forEach((function(e){e.addEventListener("click",(function(){u(e.closest(".popup"))}))})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){v.value=S.textContent,h.value=b.textContent,d(E,P),c(a)})),document.querySelector(".profile__add-button").addEventListener("click",(function(){C.reset(),d(C,P),c(l)})),g.addEventListener("click",(function(){L.reset(),d(L,P),c(_)})),E.addEventListener("submit",(function(n){n.preventDefault();var o,r,c=E.querySelector(".popup__button"),i=c.textContent;c.textContent="Сохранение...",(o=v.value,r=h.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:o,about:r})}).then(t)).then((function(e){S.textContent=e.name,b.textContent=e.about,u(a)})).catch((function(e){console.log(e)})).finally((function(){c.textContent=i}))})),C.addEventListener("submit",(function(c){c.preventDefault();var a,i,s=C.querySelector(".popup__button"),p=s.textContent;s.textContent="Сохранение...",(a=x.value,i=A.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:a,link:i})}).then(t)).then((function(e){var t=r(e,n,w);o.prepend(t),C.reset(),d(C,P),u(l)})).catch((function(e){console.log(e)})).finally((function(){s.textContent=p}))})),L.addEventListener("submit",(function(n){n.preventDefault();var o,r=L.querySelector(".popup__button"),c=r.textContent;r.textContent="Сохранение...",(o=k.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:o})}).then(t)).then((function(e){q.style.backgroundImage="url(".concat(e.avatar,")"),u(_)})).catch((function(e){console.log(e)})).finally((function(){r.textContent=c}))}));var U,P={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};U=P,Array.from(document.querySelectorAll(U.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(e){e.addEventListener("input",(function(){i(e,t),function(e,t){e.forEach((function(e){return i(e,t)}))}(n,t),p(n,o,t)}))})),p(n,o,t)}(e,U)})),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t).then((function(e){return e})).catch((function(e){throw e}))]).then((function(e){var t,c,u,a=(u=2,function(e){if(Array.isArray(e))return e}(c=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(o=c.call(n)).done)&&(a.push(o.value),a.length!==t);i=!0);}catch(e){l=!0,r=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw r}}return a}}(c,u)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(c,u)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=a[0],l=a[1];n=i._id,S.textContent=i.name,b.textContent=i.about,q.style.backgroundImage="url(".concat(i.avatar,")"),t=l,o.innerHTML="",t.forEach((function(e){var t=r(e,n,w);o.appendChild(t)}))})).catch((function(e){console.log(e)}))}))})();