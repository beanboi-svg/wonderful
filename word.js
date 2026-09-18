(async function renderRandomWord() {
    const svg = document.getElementById('dynamic-word');
    const textEl = document.getElementById('dynamic-word-text');
    if (!svg || !textEl) return;

    const n = Math.floor(Math.random() * 4) + 1; // 1-4
    const path = `assets/v${n}.txt`;

    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
        const word = (await res.text()).trim();

        textEl.textContent = word;
        svg.setAttribute('aria-label', word);

        requestAnimationFrame(() => {
            const bbox = textEl.getBBox();
            const width = Math.ceil(bbox.width + bbox.x);
            svg.setAttribute('viewBox', `0 0 ${width} 9`);
            svg.setAttribute('width', width);
        });
    } catch (err) {
        console.error('Could not load random word:', err);
    }
})();