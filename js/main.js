// 1. Pegamos o elemento do link na memória do PC
const btnCalculadoras = document.querySelector('.menu-link');
const caixaPai = document.querySelector('.menu-item');

// 2. Criamos o "Ouvinte" (EventListener)
// Quando o botão sofrer um 'click', ele executa a função depois da seta =>
btnCalculadoras.addEventListener('click', () => {
    caixaPai.classList.toggle('active');
});