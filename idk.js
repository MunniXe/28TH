const expectedPassword = 'precious';
const lockScreen = document.querySelector('#lock-screen');
const siteContent = document.querySelector('#site-content');
const unlockForm = document.querySelector('#unlock-form');
const passwordInput = document.querySelector('#password');
const passwordError = document.querySelector('#password-error');

unlockForm.addEventListener('submit', (event) => {
	event.preventDefault();
	if (passwordInput.value.trim().toLowerCase() !== expectedPassword) {
		passwordError.textContent = 'That is not the secret. Try again.';
		passwordInput.select();
		return;
	}
	lockScreen.remove();
	siteContent.classList.remove('is-hidden');
});

const quotes = [
	{ text: 'Ourlationship', comment: 'One of your classics.' },
	{ text: 'Had I known', comment: 'The beginning of a thought I still remember.' },
	{ text: 'Kilomene', comment: 'A word that could only belong to you.' },
	{ text: 'You never asked', comment: 'Fair point. I should have.' },
	{ text: "It's not important", comment: 'You say this, and somehow it becomes important.' },
	{ text: 'I guess bro', comment: 'The official soundtrack to accepting the situation.' },
	{ text: "I'll bite you", comment: 'Affection, Precious-style.' },
	{ text: 'I pity your future wife', comment: 'A warning I choose to treasure.' },
	{ text: 'Nothing for you', comment: 'The answer is always somehow something.' },
	{ text: 'Bia', comment: 'One word. Immediate attention.' },
	{ text: "Let's make a bet", comment: 'You never make just one bet.' },
	{ text: "Let's make another bet", comment: 'And there it is.' },
	{ text: "It's morning", comment: 'A whole mood in two words.' },
	{ text: 'Pick my nails', comment: 'An honour I do not take lightly.' },
	{ text: "Don't worry about my nails", comment: 'Noted. Still worrying a little.' },
	{ text: "Chai you're suffering", comment: 'The sympathy is real. The delivery is unforgettable.' },
	{ text: 'Fra boy', comment: 'A diagnosis, probably.' },
	{ text: 'Fine boy you like strawberries ew', comment: 'The judgment arrived before the explanation.' },
	{ text: 'Now we know the past what do you want to do about the future', comment: 'The question I keep coming back to.' }
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

document.querySelector('#download-letter').addEventListener('click', () => {
	const letter = `The Nightmare Experience of Pain\n\nFor Precious, on the 28th September\n\nHappy birthday.\n\nThis is a small letter for all the things I never want to leave unsaid. Thank you for the words you give me, the laughter you leave behind, and the way you make even the difficult days feel survivable.\n\nWith all my feeling.\n`;
	const blob = new Blob([letter], { type: 'text/plain;charset=utf-8' });
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = 'Nightmare Experience of Pain.txt';
	link.click();
	URL.revokeObjectURL(link.href);
	document.querySelector('#letter-status').textContent = 'Your letter is on its way.';
});
