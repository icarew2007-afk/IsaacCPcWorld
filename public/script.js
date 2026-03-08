console.log("Hello from the Web App Dev lab!");

// Show a t popup when a flash param is present (added/cleared)
(function () {
	// milliseconds the notification remains visible before hiding
	const NOTIF_DISPLAY_MS = 7000;
	// animation duration for show/hide
	const NOTIF_ANIM_MS = 400;

	function showMessage(message, positive = true) {
		const msg = document.createElement('div');
		msg.className = `ui fixed tiny ${positive ? 'positive' : 'warning'} message`;
		msg.style.top = '1em';
		msg.style.left = '50%';
		msg.style.transform = 'translateX(-50%)';
		msg.style.zIndex = 1000;
		msg.innerHTML = `<div class="header">${message}</div>`;
		document.body.appendChild(msg);

		if (window.$ && typeof window.$ === 'function') {
			window.$(msg).transition({ animation: 'fade up', duration: 3000 });
		}

		setTimeout(() => {
			if (window.$ && typeof window.$ === 'function') {
				window.$(msg).transition({ animation: 'fade down', duration: 3000, onComplete: () => msg.remove() });
			} else {
				msg.remove();
			}
		}, NOTIF_DISPLAY_MS);
	}

	try {
		const params = new URLSearchParams(window.location.search);
		const flash = params.get('flash');
		if (flash) {
			if (flash === 'added') showMessage('Product added to favourites!');
			else if (flash === 'cleared') showMessage('Favourites cleared!');
			else if (flash === 'not-added') showMessage('Product already in favourites');

			// remove the flash param from the URL without reloading
			params.delete('flash');
			const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
			window.history.replaceState({}, document.title, newUrl);
		}
	} catch (e) {
		console.error(e);
	}

	// Delegate add-to-favourites button clicks and call the API so the page doesn't change
	document.addEventListener('click', async (ev) => {
		const btn = ev.target.closest && ev.target.closest('.add-favourite-button');
		if (!btn) return;
		ev.preventDefault();
		const id = btn.getAttribute('data-id');
		if (!id) return;

		try {
			// call the POST API we added
			const res = await fetch(`/api/favourites/add/${encodeURIComponent(id)}`, { method: 'POST', headers: { 'Accept': 'application/json' } });
			const j = await res.json();
			if (j && j.message) {
				showMessage(j.message, !!j.added);
			} else {
				showMessage('Action complete', true);
			}
		} catch (e) {
			console.error(e);
			showMessage('Could not add to favourites', false);
		}
	});
})();
