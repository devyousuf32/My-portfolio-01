document.addEventListener('DOMContentLoaded',()=>{
  const toggle=document.querySelector('.nav-toggle'), nav=document.querySelector('.nav');
  if(toggle&&nav){
    toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
  }
  const revealItems=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
    revealItems.forEach(el=>io.observe(el));
  }else revealItems.forEach(el=>el.classList.add('visible'));

  const filters=document.querySelectorAll('.filter'), cards=document.querySelectorAll('.gallery-card[data-category]');
  filters.forEach(btn=>btn.addEventListener('click',()=>{
    filters.forEach(b=>b.classList.remove('active'));btn.classList.add('active');
    const f=btn.dataset.filter;
    cards.forEach(card=>card.classList.toggle('hidden',f!=='all'&&!card.dataset.category.split(' ').includes(f)));
  }));

  const form=document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit',e=>{
      const name=form.elements.name.value.trim(), email=form.elements.email.value.trim(), project=form.elements.project.value, message=form.elements.message.value.trim();
      if(!name||!email||!message){e.preventDefault();alert('Please complete your name, email and project message.');return}
      const subject=encodeURIComponent('Portfolio project inquiry — '+project);
      const body=encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject: ${project}\n\nMessage:\n${message}`);
      form.action=`mailto:sharfarajyousuf@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});