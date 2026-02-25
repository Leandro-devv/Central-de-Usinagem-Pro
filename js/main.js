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
   CALCULADORA DE Rosca Polegada (UNC/UNF)
====================================================== */
const btnCalcularPol = document.querySelector('#btnCalcularPol');

btnCalcularPol.addEventListener('click', () => {
    let container = document.getElementById('containerRoscaPol');
    
    // D_pol = Diâmetro nominal em polegada (ex: 0.5 para 1/2")
    // TPI = Fios por polegada
    let D_pol = Number(document.getElementById('roscaP_D').value);
    let TPI = Number(document.getElementById('roscaP_TPI').value);

    // Limpa resultado anterior
    let resultadoAntigo = container.querySelector('.resultado');
    if (resultadoAntigo) { resultadoAntigo.remove(); }

    if (D_pol > 0 && TPI > 0) {
        // 1. Converter Diâmetro para mm
        let D_mm = D_pol * 25.4;
        
        // 2. Calcular o Passo (P) em mm
        let passo_mm = 25.4 / TPI;
        
        // 3. Calcular a Broca (D - P)
        let broca = D_mm - passo_mm;
        
        // 4. Altura do filete (h) para 60°
        let h = 0.6134 * passo_mm;

        const resultado = document.createElement('div');
        resultado.setAttribute('class', 'resultado');
        
        resultado.innerHTML = `
            DIÂMETRO NOMINAL: <strong>${D_mm.toFixed(2)} mm</strong><br>
            PASSO CALCULADO: <strong>${passo_mm.toFixed(3)} mm</strong><br>
            BROCA DE PRÉ-FURO: <strong>${broca.toFixed(2)} mm</strong><br>
            ALTURA DO FILETE (h): <strong>${h.toFixed(3)} mm</strong>
        `;
        
        container.appendChild(resultado);
    } else {
        alert("Por favor, preencha o Diâmetro (decimal) e os Fios por Polegada (TPI).");
    }
});

