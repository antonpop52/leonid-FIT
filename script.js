const menu=document.querySelector('.menu'),nav=document.querySelector('nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню')}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню')});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();menu.focus()}});
window.matchMedia('(min-width:801px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
const form=document.querySelector('#booking'),status=form.querySelector('.status'),phone=form.elements.phone;
phone.addEventListener('input',()=>phone.setCustomValidity(''));
document.querySelectorAll('[data-plan]').forEach(a=>a.addEventListener('click',()=>{form.elements.plan.value=a.dataset.plan;status.hidden=true}));
form.addEventListener('submit',e=>{e.preventDefault();const digits=phone.value.replace(/\D/g,'');if(!/^(?:7|8)\d{10}$/.test(digits)){phone.setCustomValidity('Введите российский номер: 11 цифр, начиная с +7 или 8.');phone.reportValidity();return}if(form.elements.name.value.trim().length<2){form.elements.name.setCustomValidity('Укажите имя — минимум два символа.');form.elements.name.reportValidity();return}status.textContent='Готово! Вы выбрали '+form.elements.plan.value+'. Это демонстрация: заявка не отправлялась.';status.hidden=false});
form.elements.name.addEventListener('input',()=>form.elements.name.setCustomValidity(''));
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){nav.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id))}})},{rootMargin:'-20% 0px -55% 0px'});document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s))}
