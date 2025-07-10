function buscarCEP() {
    const inputCep = document.getElementById('input-cep');
    const cep = inputCep.value.trim();
    const resultado = document.getElementById('texto-card-cep');

    if (!/^\d{8}$/.test(cep)) {
        resultado.innerHTML = renderMensagem("Por favor, informe um CEP válido.", "text-erro");
        return;
    }

    resultado.innerHTML = resultado.innerHTML = renderMensagem("Carregando...", "text-loading");


    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json();
        })
        .then(data => {
            if (data.erro) {
                resultado.innerHTML = renderMensagem("CEP não encontrado.", "text-erro");
                return;
            }

            resultado.innerHTML = `
                <div class="card">
                    <p><strong>CEP:</strong> ${data.cep}</p>
                    <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                    <p><strong>Bairro:</strong> ${data.bairro}</p>
                    <p><strong>Cidade:</strong> ${data.localidade}</p>
                    <p><strong>Estado:</strong> ${data.estado + " (" + data.uf + ")"}</p>
                    <p><strong>DDD:</strong> ${data.ddd}</p>
                </div>
            `;

            inputCep.value = '';
        })
        .catch(error => {
            resultado.innerHTML = renderMensagem("Erro ao buscar o CEP. Tente novamente.", "text-erro");
            console.error('Erro:', error);
        });
}

document.getElementById('input-cep').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        buscarCEP();
    }
});

document.querySelector('.btn-buscar').addEventListener('click', buscarCEP);

function renderMensagem(mensagem, classe) {
    return `
        <div class="${classe}">
            <p class="texto-${classe}"><strong>${mensagem}</strong></p>
        </div>
    `;
}