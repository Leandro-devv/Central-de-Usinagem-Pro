
const dropdowns = document.querySelectorAll('.has-dropdown');

dropdowns.forEach(item => {
    const link = item.querySelector('.menu-link');
    
    link.addEventListener('click', () => {
        dropdowns.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        item.classList.toggle('active');
    });
});