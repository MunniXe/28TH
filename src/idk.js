const expectedPassword = 'precious';
const lockScreen = document.querySelector('#lock-screen');
const siteContent = document.querySelector('#site-content');
const unlockForm = document.querySelector('#unlock-form');
const passwordInput = document.querySelector('#password');
const passwordError = document.querySelector('#password-error');

unlockForm.addEventListener('submit', (event) => {
	event.preventDefault();
	if (passwordInput.value.trim().toLowerCase() !== expectedPassword) {
		passwordError.textContent = "It's not hard to guess, but that is not the secret. Try again.";
		passwordInput.select();
		return;
	}
	lockScreen.classList.add('unlocking');
	launchConfetti(28);
	setTimeout(() => {
		lockScreen.remove();
		siteContent.classList.remove('is-hidden');
	}, 650);
});

function launchConfetti(amount) {
	const layer = document.querySelector('#celebration-layer');
	const colors = ['#a74d35', '#25221f', '#bbc1a9', '#8fb8de', '#d9cbb8'];
	for (let index = 0; index < amount; index += 1) {
		const piece = document.createElement('span');
		piece.className = 'confetti-piece';
		piece.style.setProperty('--confetti-color', colors[index % colors.length]);
		piece.style.setProperty('--confetti-delay', `${Math.random() * 180}ms`);
		piece.style.setProperty('--confetti-x', `${(Math.random() - .5) * 90}vw`);
		piece.style.setProperty('--confetti-y', `${(Math.random() * 70 + 20) * -1}vh`);
		piece.style.setProperty('--confetti-rotate', `${Math.random() * 720 - 360}deg`);
		layer.appendChild(piece);
		setTimeout(() => piece.remove(), 1600);
	}
}

const quotes = [
	{ text: 'Ourlationship', comment: 'One of your classics.' },
	{ text: 'Had I known', comment: 'Wallahi, put the fries in the bag.' },
	{ text: 'Kilomene', comment: 'Kilolo 😭' },
	{ text: 'You never asked', comment: 'Fair point but nahhhh' },
	{ text: "It's not important", comment: 'Words I can never believe from anyone.' },
	{ text: 'I guess bro', comment: 'The official soundtrack to accepting the situation.' },
	{ text: "I'll bite you", comment: 'Come and bite me na 😡' },
	{ text: 'I pity your future wife', comment: 'A warning I choose to treasure.' },
	{ text: 'Nothing for you', comment: 'The answer is always somehow something.' },
	{ text: 'Bia', comment: 'Maaaaaa :)' },
	{ text: "Let's make a bet", comment: 'You never make just one bet.' },
	{ text: "Let's make another bet", comment: 'And there it is.' },
	{ text: "It's morning", comment: 'Timezones are weird I always forget.' },
	{ text: 'Pick my nails', comment: 'An honour I do not take lightly.' },
	{ text: "Don't worry about my nails", comment: 'Noted.' },
	{ text: "Chai you're suffering", comment: "Nbl, This isn't the life I had in mind." },
	{ text: 'Fra boy', comment: 'Fra girl.' },
	{ text: 'Fine boy you like strawberries ew', comment: 'You like chocolate icecream, Opinion Invalidated.' },
	{ text: 'Now we know the past what do you want to do about the future', comment: "two twos my poo poos fam, you're a Gerbert" }
];
let quoteIndex = 0;
const quoteCard = document.querySelector('#quote-card');
const quoteText = document.querySelector('#quote-text');
const quoteComment = document.querySelector('#quote-comment');
const quoteNumber = document.querySelector('#quote-number');
const quoteDots = document.querySelector('#quote-dots');

function renderQuote(index) {
	quoteIndex = (index + quotes.length) % quotes.length;
	const quote = quotes[quoteIndex];
	quoteCard.style.animation = 'none';
	requestAnimationFrame(() => { quoteCard.style.animation = ''; });
	quoteText.textContent = quote.text;
	quoteComment.textContent = quote.comment;
	quoteNumber.textContent = `${String(quoteIndex + 1).padStart(2, '0')} / ${String(quotes.length).padStart(2, '0')}`;
	quoteDots.innerHTML = quotes.map((_, dotIndex) => `<button class="dot ${dotIndex === quoteIndex ? 'active' : ''}" type="button" aria-label="Show quote ${dotIndex + 1}" data-quote="${dotIndex}"></button>`).join('');
}

document.querySelector('#previous-quote').addEventListener('click', () => renderQuote(quoteIndex - 1));
document.querySelector('#next-quote').addEventListener('click', () => renderQuote(quoteIndex + 1));
quoteDots.addEventListener('click', (event) => {
	const dot = event.target.closest('[data-quote]');
	if (dot) renderQuote(Number(dot.dataset.quote));
});
renderQuote(0);

let touchStartX = 0;
quoteCard.addEventListener('touchstart', (event) => {
	touchStartX = event.changedTouches[0].screenX;
}, { passive: true });
quoteCard.addEventListener('touchend', (event) => {
	const distance = event.changedTouches[0].screenX - touchStartX;
	if (Math.abs(distance) > 45) renderQuote(quoteIndex + (distance < 0 ? 1 : -1));
}, { passive: true });

document.querySelector('#download-letter').addEventListener('click', () => {
	const letter = `The Nightmare Experience of Pain\n\nFor Precious, on the 28th September\n\nHappy birthday.\n\nThis is a small letter for all the things I never want to leave unsaid. Thank you for the words you give me, the laughter you leave behind, and the way you make even the difficult days feel survivable.\n\nWith all my feeling.\n`;
	const blob = new Blob([letter], { type: 'text/plain;charset=utf-8' });
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = 'Nightmare Experience of Pain.txt';
	link.click();
	URL.revokeObjectURL(link.href);
	launchConfetti(16);
	document.querySelector('#letter-status').textContent = 'Your letter is on its way.';
});

const closingScreen = document.querySelector('.closing-screen');
const closingObserver = new IntersectionObserver(([entry]) => {
	if (entry.isIntersecting) {
		closingScreen.classList.add('is-visible');
		closingObserver.disconnect();
	}
}, { threshold: 0.35 });
closingObserver.observe(closingScreen);
