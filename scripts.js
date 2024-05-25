(function() {
    async function getRandomWord() {
        const response = await fetch('https://random-word-api.herokuapp.com/word?number=1');
        const data = await response.json();
        return data[0];
    }

    async function updateImages() {
        const images = document.querySelectorAll('img');
        for (const img of images) {
            const randomWord = await getRandomWord();
            img.alt = randomWord;
            img.style.border = '2px solid red';
        }
    }
    
    function handleImageClick(event) {
        const img = event.target;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = img.alt;
        input.style.position = 'absolute';
        input.style.top = img.offsetTop + 'px';
        input.style.left = img.offsetLeft + 'px';

        input.addEventListener('blur', function() {
            img.alt = input.value;
            document.body.removeChild(input);
        });

        document.body.appendChild(input);
        input.focus();
    }

    function addEventListenersToImages() {
        const images = document.querySelectorAll('img');
        for (const img of images) {
            img.addEventListener('click', handleImageClick);
        }
    }
    
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.tagName === 'IMG') {
                        node.addEventListener('click', handleImageClick);
                        updateImages();
                    } else if (node.querySelectorAll) {
                        const imgs = node.querySelectorAll('img');
                        imgs.forEach(img => img.addEventListener('click', handleImageClick));
                        updateImages();
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    updateImages();
    addEventListenersToImages();
})();