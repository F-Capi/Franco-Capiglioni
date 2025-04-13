let finished = false;
window.addEventListener('load', () => {
    router();
    startPresentation();
    setupCardClickHandlers();

});

let currentBreakpoint = getBreakpoint(window.innerWidth);

window.addEventListener('resize', () => {
    const newBreakpoint = getBreakpoint(window.innerWidth);
    if (newBreakpoint !== currentBreakpoint) {
        location.reload();
    }
    currentBreakpoint = newBreakpoint;
});

function getBreakpoint(width) {
    if (width <= 550) return 'mobile';
    if (width <= 1200) return 'tablet';
    return 'desktop';
}


function setupCardClickHandlers() {
    const isMobile = window.innerWidth <= 550;

    document.querySelectorAll('.project-card').forEach(card => {
        const newCard = card.cloneNode(true);
        card.replaceWith(newCard);

        const blocks = newCard.querySelectorAll('.project-block');
        const isExpandable = blocks.length > 1;

        // Asegurar que se reinicia el estado visual
        newCard.classList.remove('open');
        newCard.style.maxHeight = null;

        if (!isMobile && isExpandable) {
            newCard.addEventListener('click', () => {
                const isOpen = newCard.classList.contains('open');

                if (isOpen) {
                    newCard.classList.remove('open');
                    newCard.style.maxHeight = null;
                } else {
                    newCard.classList.add('open');
                    // Forzar layout antes de asignar altura para transiciones suaves
                    void newCard.offsetHeight;
                    newCard.style.maxHeight = newCard.scrollHeight + 'px';
                }
            });
        }
    });
}

async function router(route = 'hello') {
    const views = document.querySelectorAll('.view');

    views.forEach(view => {
        view.classList.remove('active');
    });

    const target = document.getElementById(route);
    if (target) {
        target.classList.add('active');
    }

    if (finished) {
        activateBorder();
    }

    document.querySelector('main').scrollTo({ top: 0, behavior: 'auto' });
}


document.querySelectorAll('nav a[data-route]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const route = link.getAttribute('data-route');
        router(route);
    });
});





function typing() {
    let text = "HELLO";
    type(text, document.getElementById('salute'), "cursor", 200);
    setTimeout(() => {
        startPresentation();
    }, 4000)
}

function wait(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

function activateBorder() {
    const nav = document.querySelector("nav");
    if (nav.classList.contains("animate-border")) {
        nav.classList.remove("animate-border");
        void nav.offsetWidth;
        nav.classList.add("animate-border");
    } else {
        nav.classList.add("animate-border");
    }
}
async function startPresentation() {
    if (getBreakpoint(window.innerWidth) != "mobile") {
        let text = "HELLO";
        await type(text, document.getElementById('salute'), "cursor", 200);
        await wait(2500);
    }

    let navlinks = document.querySelectorAll(".navItem");
    for (let i = 0; i < navlinks.length; i++) {
        await activateLink(navlinks[i], "slideInLinkItem");
    }

    await wait(1500);

    const elements = document.querySelectorAll('[data-typing]');
    let data = [];
    elements.forEach((element) => {
        data.push(element.innerHTML);
        element.innerHTML = "";
        if (element.classList.contains("hidden")) {
            element.classList.remove("hidden");
        }
    });

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].tagName === "H1") {
            await type(data[i], elements[i], "smallCursor", 150);
            elements[i].innerHTML = "FRANCO CAPIGLI<span class='on'>ON</span>I";
            activateBorder();
            finished = true;
            await wait(700);
        } else if (elements[i].tagName === "H2") {
            await type(data[i], elements[i], "smallCursor", 150);
        } else {
            await type(data[i], elements[i], "smallCursor", 10);
        }

    }


    let links = document.querySelectorAll("[contact-link]");
    for (let i = 0; i < links.length; i++) {
        await activateLink(links[i], "contact-placed");
    }

}
function activateLink(link, clss) {
    return new Promise((resolve) => {
        setTimeout(() => {
            link.classList.add(clss);
            resolve();
        }, 500);
    });
}

function type(text, typingContainer, cursorClass, time) {
    return new Promise((resolve) => {
        const textSpan = document.createElement("span");
        textSpan.className = "typed-text";

        const cursorSpan = document.createElement("span");
        cursorSpan.className = cursorClass;

        typingContainer.innerHTML = "";
        typingContainer.appendChild(textSpan);
        typingContainer.appendChild(cursorSpan);

        let index = 0;
        function typeLetter() {
            if (index < text.length) {
                textSpan.innerHTML = text.substring(0, index + 1);
                index++;
                setTimeout(typeLetter, time);
            } else {
                cursorSpan.remove();
                resolve();
            }
        }

        typeLetter();
    });
}