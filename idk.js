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
	{ text: 'You cannot pour from an empty cup.', comment: 'You say this like a reminder, but I hear it as permission to rest.' },
	{ text: 'It is what it is, but it will not always be this way.', comment: 'The most Precious kind of optimism: honest enough to name the hard thing, hopeful enough to stay.' },
	{ text: 'Do it scared.', comment: 'You make bravery sound less like a performance and more like a Tuesday afternoon.' },
	{ text: 'Everything will make sense later.', comment: 'I borrow this one on the days that feel like loose pages.' }
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
