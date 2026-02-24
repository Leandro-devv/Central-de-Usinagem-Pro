
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


const linksSubmenu = document.querySelectorAll('.submenu-link');
const todasTelas = document.querySelectorAll('.calc-container, #home-content');

linksSubmenu.forEach(link => {
    link.addEventListener('click', () => {
        todasTelas.forEach(tela => tela.classList.add('hidden'));

        const idCalculadora = link.getAttribute('data-calculadora');

        const calculadoraParaAbrir = document.getElementById(idCalculadora);
        if (calculadoraParaAbrir) {
            calculadoraParaAbrir.classList.remove('hidden');
        }
    });
});



const btnCalcular = document.querySelector('#btnCalcular');

btnCalcular.addEventListener('click',() =>{
    let containerCalculadoraRpm = document.getElementById('containerCalculadoraRpm');

    let velocidadeCorte = Number(document.getElementById('calcRpm').value); 
    let diametro = Number(document.getElementById('calcD').value);

    if(velocidadeCorte > 0 && diametro > 0){
        let rpm = (velocidadeCorte * 1000) / (3.14 * diametro);

        let resultadoAntigo = document.querySelector('.resultado');
        if (resultadoAntigo) {
            resultadoAntigo.remove();
        }

        const resultado = document.createElement('div');
        resultado.setAttribute('class','resultado');

        resultado.innerHTML = `Cálculo Finalizado: A rotação ideal calculada para este diâmetro e velocidade de corte é de <strong>${rpm.toFixed(0)} RPM.</strong>`;

        containerCalculadoraRpm.appendChild(resultado);
    }else{
        alert("Por favor, insira valores válidos para Velocidade e Diâmetro.");
    }
    
});
