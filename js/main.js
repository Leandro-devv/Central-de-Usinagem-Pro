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
   CONTROLE DAS TELAS 
   - Esconde todas as telas
   - Mostra apenas a selecionada no submenu
====================================================== */
const linksSubmenu = document.querySelectorAll('.submenu-link');
const todasTelas = document.querySelectorAll('.calc-container, #home-content');

linksSubmenu.forEach(link => {
    link.addEventListener('click', () => {

        todasTelas.forEach(tela => {
            tela.classList.add('hidden');
        });

        const idAlvo = link.getAttribute('data-subMenu');

        const elementoParaAbrir = document.getElementById(idAlvo);

        if (elementoParaAbrir) {

            elementoParaAbrir.classList.remove('hidden');

            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            console.error("O ID '" + idAlvo + "' não foi encontrado no HTML.");
        }
    });
});
/* ======================================================
   CONTROLE DO MENU MOBILE (Hambúrguer)
   - Abre/Fecha a barra lateral no celular
   - Fecha a barra ao selecionar uma calculadora
====================================================== */
const btnMenuMobile = document.getElementById('btnMenuMobile');
const sidebar = document.querySelector('.sidebar');
const home = document.getElementById('home-content');

if (btnMenuMobile && sidebar) {
    btnMenuMobile.addEventListener('click', () => {

        
        sidebar.classList.toggle('active');
        
        const icone = btnMenuMobile.querySelector('i');
        icone.classList.toggle('fa-bars');
        icone.classList.toggle('fa-xmark');
    });
}

linksSubmenu.forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('active');
        // Volta o ícone para as barrinhas
        const icone = btnMenuMobile.querySelector('i');
        if(icone) {
            icone.classList.add('fa-bars');
            icone.classList.remove('fa-xmark');
        }
    });
});
/* ======================================================
   CALCULADORA DE RPM
   Fórmula: RPM = (Vc × 1000) / (π × D)
====================================================== */
const btnCalcular = document.getElementById('btnCalcular');

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
const btnCalcularVelocidadeCorte = document.getElementById('btnCalcularVc');

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
const btnCalcularAvanco = document.getElementById('btnCalcularAvanco');

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
const btnCalcularMetrica = document.getElementById('btnCalcularMetrica');

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
const btnCalcularPol = document.getElementById('btnCalcularPol');

btnCalcularPol.addEventListener('click', () => {
    let container = document.getElementById('containerRoscaPol');
    let textoDigitado = document.getElementById('roscaP_D').value.replace(',', '.').trim();
    let TPI = Number(document.getElementById('roscaP_TPI').value);

    let resultadoAntigo = container.querySelector('.resultado-final');
    if (resultadoAntigo) {
        resultadoAntigo.remove();

    }

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
        alert("Preencha os campos corretamente");
    }
});
/* ======================================================
   CALCULADORA DE ENGRENAGENS 
====================================================== */
const btnCalculcarEngrenagem = document.getElementById('btnCalculcarEngrenagem');

btnCalculcarEngrenagem.addEventListener('click', () => {
    const container = document.getElementById('containerEngenhariaCalcEngrenagens');
    let modulo = parseFloat(document.getElementById('modulo').value);
    let numeroDente = Number(document.getElementById('numeroDente').value);

    let resultadoAntigo = document.querySelector('.resultado');
    if (resultadoAntigo) {
        resultadoAntigo.remove();
    }

    if (modulo > 0 && numeroDente > 0) {
        let diametroPrimitivo = modulo * numeroDente;
        let diametroExterno = modulo * (numeroDente + 2);
        let alturaDente = 2.166 * modulo;

        const resultado = document.createElement('div');
        resultado.setAttribute('class', 'resultado');

        resultado.innerHTML = `
            <p><strong>Diâmetro Externo:</strong> ${diametroExterno.toFixed(2)} mm</p>
            <p><strong>Diâmetro Primitivo:</strong> ${diametroPrimitivo.toFixed(2)} mm</p>
            <p><strong>Altura do Dente:</strong> ${alturaDente.toFixed(2)} mm</p>
        `;

        container.appendChild(resultado);

    } else {
        alert("Preencha os campos corretamente");
    }
})
/* ======================================================
   CONVERSOR DE DUREZA
====================================================== */
const btnConverter = document.getElementById('btnConverterDureza');

btnConverter.addEventListener('click', () => {
    const container = document.getElementById('containerEngenhariaConversorDureza');
    const tipo = document.getElementById('tipoDureza').value;
    const valor = parseFloat(document.getElementById('valorDureza').value);

    if (valor > 0) {

        let hrc, hb, hv;

        let resultadoAntigo = document.querySelector('.resultado');
        if (resultadoAntigo) {
            resultadoAntigo.remove();
        }
    
        if (tipo === "HRC") {
            hrc = valor;
            hb = valor / 0.11; 
            
            hb = (valor * 10); 
            hv = hb;
        } else if (tipo === "HB") {
            hb = valor;
            hrc = (valor / 10);
            hv = hb;
        } else {
            hv = valor;
            hb = valor;
            hrc = (valor / 10);
        }

        const resultado = document.createElement('div');
        resultado.setAttribute('class', 'resultado');

        resultado.innerHTML = `
            <p><strong>Rockwell C:</strong> ~${hrc.toFixed(1)} HRC</p>
            <p><strong>Brinell:</strong> ~${hb.toFixed(0)} HB</p>
            <p> <strong>Vickers:</strong> ~${hv.toFixed(0)} HV</p>
            <small >* Valores aproximados para aços carbono e liga.</small>
        `;
        container.appendChild(resultado);
    }else{
        alert("Digite um valor válido");
    }
});
/* ======================================================
   CALCULADORA DE PESO DE MATERIAL
====================================================== */
const btnCalcularPesoMaterial = document.getElementById('btnCalcularPesoMaterial');

btnCalcularPesoMaterial.addEventListener('click', () => {
    const container = document.getElementById('containerEngenhariaCalcPesoMaterial');
    const tipoMaterial = document.getElementById('tipoMaterial').value;
    const tipoBarra = document.getElementById('tipoBarra').value;
    let comprimento = parseFloat(document.getElementById('comprimentoBarra').value);
    let comprimentoMM = comprimento * 1000;
    let diametroLado = parseFloat(document.getElementById('diametroLado').value)

    let densidade, pesoFinal;



    if(comprimento > 0 && diametroLado > 0){
        
        let resultadoAntigo = document.querySelector('.resultado');
        if (resultadoAntigo) {
            resultadoAntigo.remove();
        }

        if(tipoMaterial === "aluminio" ){
                densidade = 2.70;
        }else if(tipoMaterial === "acoCarbono"){
                densidade = 7.85;
        }else if(tipoMaterial === "latao"){
                densidade = 8.50;
        }else if(tipoMaterial === "acoInox"){
                densidade = 8.00;
        };

        if( tipoBarra === "cilindrica"){
            let raio = diametroLado/2;
            pesoFinal = (Math.PI * Math.pow(raio, 2) * comprimentoMM * densidade)/1000000;
        }else if(tipoBarra === "quadrada"){
            pesoFinal = (diametroLado * diametroLado * comprimentoMM * densidade)/1000000
        }
        
        const resultado = document.createElement('div');
        resultado.setAttribute('class', 'resultado');

        resultado.innerHTML = `<p><strong>Peso Estimado:</strong> ${pesoFinal.toFixed(3)} Kg</p>`;

        container.appendChild(resultado);


    }else{
        alert("Digite um valor válido");
    }


});