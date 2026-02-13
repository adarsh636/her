const unlockBtn = document.getElementById("unlockBtn");
const letter = document.getElementById("letter");
const typedText = document.getElementById("typedText");
const nextBtn = document.getElementById("nextBtn");
const gallery = document.getElementById("gallery");
const proposal = document.getElementById("proposal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const heartsRoot = document.querySelector('.hearts');
const flowersRoot = document.querySelector('.flowers');

const lines = [
"You are my universe, my peace, my forever.",
"Every moment with you feels like magic.",
"I don't just love you... I choose you every single day.",
"And I want to choose you for the rest of my life."
];

let index=0;
let ambientInterval = null;

/* Unlock */
unlockBtn.onclick=()=>{
	// visual feedback
	unlockBtn.classList.add('ring');
	setTimeout(()=>unlockBtn.classList.remove('ring'),900);

	document.querySelector(".unlock").style.display="none";
	// reveal letter with smooth animation
	letter.classList.remove("hidden");
	letter.classList.add('show');
	spawnHearts(8);
	startAmbientHearts();
	typeLine();
};

// show more toggle
const showMoreBtn = document.getElementById('showMoreBtn');
const extraLinesEl = document.getElementById('extraLines');
showMoreBtn && showMoreBtn.addEventListener('click', ()=>{
	extraLinesEl.classList.toggle('hidden');
	showMoreBtn.textContent = extraLinesEl.classList.contains('hidden') ? 'Show more' : 'Show less';
});

// propose button opens modal
const proposeBtn = document.getElementById('proposeBtn');
proposeBtn && proposeBtn.addEventListener('click', ()=>{
	proposal.classList.remove('hidden');
});

/* Typewriter */
function typeLine(){
	typedText.innerHTML="";
	let text=lines[index];
	let i=0;
	let typing=setInterval(()=>{
		typedText.innerHTML+=text[i]||'';
		i++;
		if(i>=text.length) clearInterval(typing);
	},32);

	// when we reach the end of the script, reveal gallery and proposal after a delay
	if(index===lines.length-1){
		setTimeout(()=>{
			gallery.classList.remove("hidden");
			proposal.classList.remove("hidden");
			// style proposal buttons
			const card = document.createElement('div'); card.className='card';
			while (proposal.firstChild) {} // keep markup as-is; we style via CSS
		},1000);
	}
}

nextBtn.onclick=()=>{
index=(index+1)%lines.length;
typeLine();
};

/* Funny No */
noBtn.onmouseover=()=>{
	// playful dodge + small shake
	noBtn.style.position="absolute";
	noBtn.style.left=(10 + Math.random()*70)+"%";
	noBtn.style.top=(10 + Math.random()*70)+"%";
	noBtn.animate([{transform:'translateY(-6px)'},{transform:'translateY(0)'}],{duration:300});
};

/* Yes hearts */
yesBtn.onclick=()=>{
	// big celebration
	spawnHearts(40);
	// extra burst with varied sizes
	for(let i=0;i<12;i++){
		spawnHearts(1, 14 + Math.random()*16);
	}
};

// spawn flower petals inside proposal
function spawnFlowers(count=8){
	if(!flowersRoot) return;
	for(let i=0;i<count;i++){
		const f = document.createElement('div');
		f.className = 'flower';
		f.innerText = ['🌸','🌺','🌷'][Math.floor(Math.random()*3)];
		f.style.left = (20 + Math.random()*60) + '%';
		f.style.animationDuration = (2.4 + Math.random()*1.6) + 's';
		f.style.fontSize = (14 + Math.random()*18) + 'px';
		flowersRoot.appendChild(f);
		f.addEventListener('animationend', ()=>f.remove());
	}
}

// when user accepts proposal
yesBtn.addEventListener('click', ()=>{
	// animate ring
	const ring = document.getElementById('ringGroup');
	if(ring) ring.classList.add('ring-spin');
	spawnFlowers(16);
	spawnHearts(40);
	stopAmbientHearts();
	// show final message after short delay
	setTimeout(()=>{
		const h = document.createElement('div');
		h.className='final';
		h.textContent = 'She said YES! 💍❤️';
		const card = proposal.querySelector('.card');
		if(card) card.appendChild(h);
	},900);
});

// if user tries to click NO we already dodge, but allow click fallback
noBtn.addEventListener('click', ()=>{
	// playful redirect: open a small note instead
	proposal.classList.add('hidden');
	alert('Maybe later — but my heart waits for Vanshita ❤️');
});

function spawnHearts(count=6, size=22){
	for(let i=0;i<count;i++){
		const h = document.createElement('div');
		h.className = 'floating-heart';
		h.innerText = '❤️';
		const left = Math.random()*100;
		const tx = (Math.random()*120 - 60) + 'px';
		h.style.left = left + 'vw';
		h.style.bottom = (-10 - Math.random()*20) + 'px';
		h.style.fontSize = size + 'px';
		h.style.setProperty('--tx', tx);
		h.style.animationDuration = (3 + Math.random()*3) + 's';
		heartsRoot.appendChild(h);
		h.addEventListener('animationend', ()=>h.remove());
	}
}

function startAmbientHearts(){
	if(ambientInterval) return;
	ambientInterval = setInterval(()=>{
		spawnHearts(1, 14 + Math.random()*8);
	}, 1200);
}

function stopAmbientHearts(){
	if(!ambientInterval) return;
	clearInterval(ambientInterval); ambientInterval = null;
}
