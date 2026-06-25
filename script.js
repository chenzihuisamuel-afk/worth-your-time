const intro=document.getElementById('intro');
const main=document.getElementById('main');

setTimeout(()=>{
 intro.classList.remove('active');
 main.classList.add('active');
},2000);

const no=document.getElementById('no');
const yes=document.getElementById('yes');

function moveButton(){
 const w=window.innerWidth-no.offsetWidth-20;
 const h=window.innerHeight-no.offsetHeight-20;
 no.style.position='fixed';
 no.style.left=Math.random()*w+'px';
 no.style.top=Math.random()*h+'px';
}

no.addEventListener('mouseenter',moveButton);
no.addEventListener('click',moveButton);

yes.addEventListener('click',()=>{
 document.querySelector('.buttons').style.display='none';
 document.getElementById('success').classList.remove('hidden');
});
