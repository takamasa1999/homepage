function adjustContentPadding() {
    const floating = document.querySelector('.floating-bottom');
    const main = document.querySelector('main');
    if (floating && main) {
        const height = floating.offsetHeight;
        main.style.paddingBottom = `${height}px`;
    }
}

window.addEventListener('load', adjustContentPadding);
window.addEventListener('resize', adjustContentPadding);