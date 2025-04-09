window.addEventListener('load', () => {
    router();
    type();
    setupCardClickHandlers();

});

window.addEventListener('resize', setupCardClickHandlers);

function router(route = 'hello') {
    const views = document.querySelectorAll('.view');

    views.forEach(view => {
        view.classList.toggle('active', view.id === route);
    });
}

document.querySelectorAll('nav a[data-route]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const route = link.getAttribute('data-route');
        router(route);
    });
});


function setupCardClickHandlers() {
    const isMobile = window.innerWidth <= 550;

    document.querySelectorAll('.project-card').forEach(card => {
        const newCard = card.cloneNode(true);
        card.replaceWith(newCard);

        const blocks = newCard.querySelectorAll('.project-block');
        const isExpandable = blocks.length > 1;

        if (!isMobile && isExpandable) {
            newCard.addEventListener('click', () => {
                const isOpen = newCard.classList.contains('open');
                if (isOpen) {
                    newCard.style.maxHeight = newCard.scrollHeight + 'px';
                    requestAnimationFrame(() => {
                        newCard.classList.remove('open');
                    });
                } else {
                    newCard.classList.add('open');
                    newCard.style.maxHeight = newCard.scrollHeight + 'px';
                }
            });
        } else {
            newCard.classList.remove('open');
            newCard.style.maxHeight = null;
        }
    });
}



function type() {
    console.log("fra");
    const text = "hello";
    const typingContainer = document.getElementById('salute');
    let index = 0;
    let cursorHtml = '<span class="cursor">|</span>';
    function typeLetter() {
        if (index < text.length) {
            typingContainer.innerHTML = text.substring(0, index + 1) + cursorHtml;
            index++;
            setTimeout(typeLetter, 120);
        } else {
            typingContainer.innerHTML = text;
        }
    }

    typeLetter();
}