/* ======================================================
   CONTROLE DOS DROPDOWNS DO MENU LATERAL
   - Abre o menu clicado
   - Fecha os outros menus abertos
====================================================== */
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
/* ======================================================
   CONTROLE DAS TELAS DAS CALCULADORAS
   - Esconde todas as telas
   - Mostra apenas a selecionada no submenu
====================================================== */
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
/* ======================================================
   CALCULADORA DE RPM
   Fórmula: RPM = (Vc × 1000) / (π × D)
====================================================== */
const btnCalcular = document.querySelector('#btnCalcular');

btnCalcular.addEventListener('click', () => {
    let containerCalculadoraRpm = document.getElementById('containerCalculadoraRpm');

    let velocidadeCorte = Number(document.getElementById('calcRpm').value);
    let diametro = Number(document.getElementById('calcD').value);

    if (velocidadeCorte > 0 && diametro > 0) {
        let rpm = (velocidadeCorte * 1000) / (Math.PI * diametro);

        let resultadoAntigo = document.querySelector('.resultado');
        if (resultadoAntigo) {
            resultadoAntigo.remove();
        }

        const resultado = document.createElement('div');
        resultado.setAttribute('class', 'resultado');

        resultado.innerHTML = `Cálculo Finalizado: A rotação ideal calculada para este diâmetro e velocidade de corte é de <strong>${rpm.toFixed(0)} RPM.</strong>`;

        containerCalculadoraRpm.appendChild(resultado);
    } else {
        alert("Por favor, insira valores válidos para Velocidade e Diâmetro.");
    }
});

/* ======================================================
   CALCULADORA DE VELOCIDADE DE CORTE
   Fórmula: (Diametro * PI *Rpm)/1000
====================================================== */
const btnCalcularVelocidadeCorte = document.querySelector('#btnCalcularVc');

btnCalcularVelocidadeCorte.addEventListener('click', () => {
    let containerCalculadoraVelocidadeCorte = document.getElementById('containerVelocidadeCorte');

    let diametro = Number(document.getElementById('vcDiametro').value);
    let rpm = Number(document.getElementById('vcRpm').value);

    let resultadoAntigo = document.querySelector('.resultado');
    if (resultadoAntigo) {
        resultadoAntigo.remove();
    }

    if (diametro > 0 && rpm > 0) {
        let velocidadeCorte = (diametro * Math.PI * rpm) / 1000;

        const resultado = document.createElement('div');
        resultado.setAttribute('class', 'resultado');

        resultado.innerHTML = `Cálculo Finalizado: <br> Velocidade de Corte = <strong>${velocidadeCorte.toFixed(2)} m/min</strong>`;

        containerCalculadoraVelocidadeCorte.appendChild(resultado)

    } else {
        alert("Por favor, insira valores válidos para Rpm e Diâmetro.");
    }
})
/* ======================================================
   CALCULADORA DE Avanço de Mesa
   Fórmula: fz * RPM * Z
====================================================== */
const btnCalcularAvanco = document.querySelector('#btnCalcularAvanco');

btnCalcularAvanco.addEventListener('click', () => {
    let containerAvanco = document.getElementById('containerAvancoMesa');

    let fz = Number(document.getElementById('avancoDente').value);
    let rpm = Number(document.getElementById('rpmAvancoMesa').value);
    let z = Number(document.getElementById('arestaCorte').value);


    let resultadoAntigo = containerAvanco.querySelector('.resultado');
    if (resultadoAntigo) {
        resultadoAntigo.remove();
    }

    if (fz > 0 && rpm > 0 && z > 0) {
        let avancoMesa = fz * rpm * z;

        const resultado = document.createElement('div');
        resultado.setAttribute('class', 'resultado');

        resultado.innerHTML = `Cálculo Finalizado: <br> Avanço de Mesa (Vf) = <strong>${avancoMesa.toFixed(0)} mm/min</strong>`;

        containerAvanco.appendChild(resultado);
    } else {
        alert("Por favor, preencha todos os campos com valores maiores que zero.");
    }
});
/* ======================================================
   CALCULADORA DE Rosca Métrica
====================================================== */
const btnCalcularMetrica = document.querySelector('#btnCalcularMetrica');

btnCalcularMetrica.addEventListener('click', () => {
    let container = document.getElementById('containerRoscaMetrica');
    let D = Number(document.getElementById('roscaM_D').value);
    let P = Number(document.getElementById('roscaM_P').value);

    let resultadoAntigo = container.querySelector('.resultado');
    if (resultadoAntigo) { resultadoAntigo.remove(); }

    if (D > 0 && P > 0) {
        let broca = D - P;
        let h = 0.6134 * P;

        const resultado = document.createElement('div');
        resultado.setAttribute('class', 'resultado');

        resultado.innerHTML = `
            BROCA DE PRÉ-FURO: <strong>${broca.toFixed(2)} mm</strong><br>
            Altura do Filete (h): <strong>${h.toFixed(3)} mm</strong>
        `;

        container.appendChild(resultado);
    } else {
        alert("Preencha o Diâmetro e o Passo corretamente.");
    }
});
/* ======================================================
   CALCULADORA DE Rosca Polegada (UNC/UNF) - CORRIGIDA
====================================================== */
const btnCalcularPol = document.querySelector('#btnCalcularPol');

btnCalcularPol.addEventListener('click', () => {
    let container = document.getElementById('containerRoscaPol');
    let textoDigitado = document.getElementById('roscaP_D').value.replace(',', '.').trim();
    let TPI = Number(document.getElementById('roscaP_TPI').value);

    let resultadoAntigo = container.querySelector('.resultado-final');
    if (resultadoAntigo) { resultadoAntigo.remove(); }

    if (textoDigitado !== "" && TPI > 0) {
        let diametroFinal;

        if (textoDigitado.includes('/')) {
            let partes = textoDigitado.split(' ');
            if (partes.length > 1) {
                let inteiro = parseFloat(partes[0]);
                let fracao = partes[1].split('/');
                diametroFinal = (inteiro + (fracao[0] / fracao[1])) * 25.4;
            } else {
                let fracao = partes[0].split('/');
                diametroFinal = (fracao[0] / fracao[1]) * 25.4;
            }
        } else {
            let valorNum = parseFloat(textoDigitado);
            diametroFinal = (valorNum > 5) ? valorNum : valorNum * 25.4;
        }

        let passo = 25.4 / TPI;
        let h = 0.6134 * passo; 
        let broca = diametroFinal - passo;

        const resultado = document.createElement('div');
        resultado.classList.add('resultado-final');

        resultado.innerHTML = `
            <h3>Cálculo Finalizado:</h3>
            Diâmetro: <strong>${diametroFinal.toFixed(2)} mm</strong><br>
            Fios por Pol. (TPI): <strong>${TPI}</strong><br>
            Passo: <strong>${passo.toFixed(3)} mm</strong><br>
            Altura do dente (h): <strong>${h.toFixed(3)} mm</strong><br>
            <span class="destaque-broca">FURO DA BROCA: <strong>${broca.toFixed(2)} mm</strong></span>
        `;
        
        container.appendChild(resultado);

    } else {
        alert("Preencha os campos corretamente, meu parceiro!");
    }
});