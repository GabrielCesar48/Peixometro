let area = 0;
let especies = [];

document.addEventListener("DOMContentLoaded", function () {
    const inputLargura = document.getElementById("input-largura");
    const tipoAcudeRadios = document.querySelectorAll("input[name='tipoAcude']");

    tipoAcudeRadios.forEach((radio) => {
        radio.addEventListener("change", function () {
            if (radio.value === "redondo") {
                inputLargura.style.display = "none";
            } else {
                inputLargura.style.display = "block";
            }
        });
    });
});

function calcularArea() {
    const tipoAcude = document.querySelector("input[name='tipoAcude']:checked").value;
    const comprimento = parseFloat(document.getElementById("comprimento").value);
    const largura = parseFloat(document.getElementById("largura").value);

    if (isNaN(comprimento) || comprimento <= 0) {
        alert("Por favor, insira um valor válido para o comprimento.");
        return;
    }

    if (tipoAcude === "retangular") {
        if (isNaN(largura) || largura <= 0) {
            alert("Por favor, insira um valor válido para a largura.");
            return;
        }
        area = comprimento * largura;
    } else if (tipoAcude === "redondo") {
        const raio = comprimento / 2;
        area = Math.PI * Math.pow(raio, 2);
    } else {
        area = comprimento * comprimento;
    }

    document.getElementById("especie-section").style.display = "block";
}

function adicionarEspecie() {
    const especieSelect = document.getElementById("especie");
    const densidadePeixes = parseInt(especieSelect.value);
    const especieNome = especieSelect.options[especieSelect.selectedIndex].text;

    if (isNaN(densidadePeixes)) {
        alert("Por favor, selecione uma espécie.");
        return;
    }

    // Cada espécie tem a capacidade total base de unidades de tilápia
    especies.push({
        nome: especieNome,
        densidade: densidadePeixes,
        capacidadeBase: area * densidadePeixes,
        proporcao: 100 / (especies.length + 1) // Dividir o slider igualmente inicialmente
    });

    // Ajustar as proporções para todas as espécies com base na nova adição
    atualizarProporcoes();
    atualizarResultado();
}

function atualizarResultado() {
    const resultadoSection = document.getElementById("resultado-section");
    resultadoSection.innerHTML = "";

    especies.forEach((especie, index) => {
        const quantidadeRecomendada = (especie.proporcao / 100) * especie.capacidadeBase;

        const especieDiv = document.createElement("div");
        especieDiv.className = "my-3";

        const especieLabel = document.createElement("label");
        especieLabel.innerText = `${especie.nome}: ${quantidadeRecomendada.toFixed(0)} peixes recomendados`;
        especieDiv.appendChild(especieLabel);

        const slider = document.createElement("input");
        slider.type = "range";
        slider.min = "0";
        slider.max = "100";
        slider.value = especie.proporcao;
        slider.className = "form-range mt-2";
        slider.oninput = function () {
            ajustarProporcao(index, parseFloat(slider.value));
        };
        especieDiv.appendChild(slider);

        const proporcaoLabel = document.createElement("div");
        proporcaoLabel.innerText = `${especie.proporcao.toFixed(1)}%`;
        proporcaoLabel.className = "proporcao-label";
        especieDiv.appendChild(proporcaoLabel);

        resultadoSection.appendChild(especieDiv);
    });
}

function ajustarProporcao(indexAlterado, novaProporcao) {
    let proporcaoRestante = 100 - novaProporcao;

    especies[indexAlterado].proporcao = novaProporcao;

    // Redistribuir a proporção restante para as outras espécies
    const outrasEspecies = especies.filter((_, index) => index !== indexAlterado);
    outrasEspecies.forEach((especie, i) => {
        especie.proporcao = proporcaoRestante / outrasEspecies.length;
    });

    atualizarResultado();
}

function atualizarProporcoes() {
    // Recalcula a proporção de cada espécie após adição de nova
    const proporcaoInicial = 100 / especies.length;
    especies.forEach((especie) => {
        especie.proporcao = proporcaoInicial;
    });
    atualizarResultado();
}
