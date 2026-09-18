(function () {
    async function loadWord(folderPrefix, svgId, pathId) {
        const svg = document.getElementById(svgId);
        const pathEl = document.getElementById(pathId);
        if (!svg || !pathEl) return;

        const n = Math.floor(Math.random() * 4) + 1;
        const file = `assets/${folderPrefix}${n}.txt`;

        try {
            const res = await fetch(file);
            if (!res.ok) throw new Error(`Failed to load ${file}: ${res.status}`);
            const markup = (await res.text()).trim();

            const parsed = new DOMParser().parseFromString(markup, 'image/svg+xml');

            if (parsed.querySelector('parsererror')) {
                throw new Error(`${file} is not well-formed SVG/XML`);
            }

            const sourceSvg = parsed.querySelector('svg');
            const sourcePath = parsed.querySelector('path');

            if (!sourceSvg || !sourcePath) {
                throw new Error(`${file} did not contain a valid <svg><path> pair`);
            }

            const viewBox = sourceSvg.getAttribute('viewBox');
            const width = sourceSvg.getAttribute('width');
            const height = sourceSvg.getAttribute('height');
            const d = sourcePath.getAttribute('d');

            if (!viewBox || !width || !height || !d) {
                throw new Error(`${file} is missing required svg/path attributes`);
            }

            svg.setAttribute('viewBox', viewBox);
            svg.setAttribute('width', width);
            svg.setAttribute('height', height);
            pathEl.setAttribute('d', d);

        } catch (err) {
            console.error(`Could not load word for ${svgId}:`, err);
        }
    }

    loadWord('t', 'dynamic-word-top', 'dynamic-word-top-path');
    loadWord('v', 'dynamic-word-bottom', 'dynamic-word-bottom-path');
})();