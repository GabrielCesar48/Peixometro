function calcularPeixes() {
    // Obtém os valores do formulário
    const densidadePeixes = parseFloat(document.getElementById('especie').value);
    const comprimento = parseFloat(document.getElementById('comprimento').value);
    const largura = parseFloat(document.getElementById('largura').value);

    // Verifica se todos os campos estão preenchidos e válidos
    if (isNaN(densidadePeixes) || isNaN(comprimento) || isNaN(largura) || comprimento <= 0 || largura <= 0) {
        alert("Por favor, selecione uma espécie e insira valores válidos para comprimento e largura.");
        return; // Interrompe a função se houver campos inválidos
    }

    // Calcula a área do açude
    const area = comprimento * largura;

    // Calcula o número ideal de peixes
    const quantidadePeixes = densidadePeixes * area;

    // Exibe o resultado
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<div class="alert alert-success mt-3" role="alert">
        Para um açude de ${area} m², você pode ter aproximadamente <strong>${quantidadePeixes.toFixed(0)} peixes</strong> desta espécie.
    </div>`;
}
