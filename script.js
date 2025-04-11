document.addEventListener('DOMContentLoaded', function () {  // Aguardando o carregamento completo do DOM
    const formulario = document.getElementById('formulario');  

    // Preenche automaticamente os dados salvos temporariamente no formulário  
    const dadosSalvos = JSON.parse(localStorage.getItem('dadosTemporarios'));  
    if (dadosSalvos) {  
        document.getElementById('nome').value = dadosSalvos.nome || '';  
        document.getElementById('nascimento').value = dadosSalvos.nascimento || '';  
        document.getElementById('cpf').value = dadosSalvos.cpf || '';  
        document.getElementById('email').value = dadosSalvos.email || '';  
        document.getElementById('telefone').value = dadosSalvos.telefone || '';  
        document.getElementById('usuarioId').value = dadosSalvos.id || '';   
        document.getElementById('senha').value = dadosSalvos.senha || '';  

        alert('Os dados salvos anteriormente foram preenchidos automaticamente!');  
    }  

    // Salvar temporariamente os dados no LocalStorage ao clicar no botão "Salvar Temporariamente"  
    document.getElementById('salvarTemporario').addEventListener('click', function () {  
        const nome = document.getElementById('nome').value;  
        const nascimento = document.getElementById('nascimento').value;  
        const cpf = document.getElementById('cpf').value;  
        const email = document.getElementById('email').value;  
        const telefone = document.getElementById('telefone').value;  
        const idUsuario = document.getElementById('usuarioId').value;   
        const senha = document.getElementById('senha').value;  

        const dadosTemporarios = {  
            nome: nome,  
            nascimento: nascimento,  
            cpf: cpf,  
            email: email,  
            telefone: telefone,  
            id: idUsuario,  
            senha: senha  
        };  

        localStorage.setItem('dadosTemporarios', JSON.stringify(dadosTemporarios));  // Salva os dados temporariamente no LocalStorage

        alert('Os dados foram salvos temporariamente! Você ainda pode continuar preenchendo.');  
    });  

    // Ação ao enviar o formulário  
    formulario.addEventListener('submit', function (event) {  
        event.preventDefault(); // Impedir o envio padrão do formulário para evitar recarregamento da página 

        const nome = document.getElementById('nome').value;  
        const nascimento = document.getElementById('nascimento').value;  
        const cpf = document.getElementById('cpf').value;  
        const email = document.getElementById('email').value;  
        const telefone = document.getElementById('telefone').value;  
        const idUsuario = document.getElementById('usuarioId').value;   
        const senha = document.getElementById('senha').value;  

        let isValid = true;  //se isValid for false, o formulário não será enviado

        // Limpa mensagens de erro anteriores  
        limpaErros();  

        // Validações  
        if (!nome.trim()) {  // se o nome estiver vazio ou apenas espaços em branco
            exibeErro('nome', 'Por favor, preencha o nome.');  
            isValid = false;  
        }  

        if (!nascimento) {  // se a data de nascimento estiver vazia
            exibeErro('nascimento', 'Por favor, preencha a data de nascimento.');  
            isValid = false;  
        }  

        if (!validaCPF(cpf)) {  // se o CPF não for válido
            exibeErro('cpf', 'CPF inválido. Certifique-se de inserir um CPF válido com 11 números.');  
            isValid = false;  
        }  

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Regex para validar o formato do e-mail
        if (!emailRegex.test(email)) {  // se o e-mail não for válido
            exibeErro('email', 'Por favor, insira um e-mail válido.');  
            isValid = false;  
        }  

        const telefoneRegex = /^\d{10,11}$/;  // Regex para validar o formato do telefone (10 ou 11 dígitos)
        if (!telefoneRegex.test(telefone)) {  // se o telefone não for válido
            exibeErro('telefone', 'O telefone deve conter 10 ou 11 números.');  
            isValid = false;  
        }  

        if (!idUsuario.trim()) {  // se o ID do usuário estiver vazio ou apenas espaços em branco
            exibeErro('usuarioId', 'Por favor, crie um ID de usuário.');  
            isValid = false;  
        }  

        if (senha.length < 6) {  // se a senha tiver menos de 6 caracteres
            exibeErro('senha', 'A senha deve ter no mínimo 6 caracteres.');  
            isValid = false;  
        }  

        // Interrompe o envio se houver erros  
        if (!isValid) {  // se isValid for false, o formulário não será enviado
            return;  
        }  

        // Criar objeto para salvar os dados do formulário  
        const dadosUsuario = {  
            nome: nome,  
            nascimento: nascimento,  
            cpf: cpf,  
            email: email,  
            telefone: telefone,  
            id: idUsuario,  
            senha: senha  
        };  

        // Salvar os dados completos no LocalStorage  
        localStorage.setItem('dadosUsuario', JSON.stringify(dadosUsuario));  

        alert('Inscrição realizada com sucesso!');  
        window.location.href = 'login.html'; // Redireciona para a tela de login  
    });  

    // Exibe mensagens de erro nos campos  
    function exibeErro(idCampo, mensagem) {  
        const campo = document.getElementById(idCampo);  
        const erro = document.createElement('span');  
        erro.className = 'erro';  
        erro.textContent = mensagem;  
        campo.insertAdjacentElement('afterend', erro);  
    }  

    // Limpa mensagens de erro  
    function limpaErros() {  
        const erros = document.querySelectorAll('.erro');  
        erros.forEach(erro => erro.remove());  
    }  

    // Valida o CPF usando a lógica de validação oficial  
    function validaCPF(cpf) {  
        cpf = cpf.replace(/\D/g, '');  

        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {  
            return false;  
        }  

        let soma = 0;  
        let resto;  

        for (let i = 1; i <= 9; i++) {  
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);  
        }  
        resto = (soma * 10) % 11;  
        if (resto === 10 || resto === 11) resto = 0;  
        if (resto !== parseInt(cpf.substring(9, 10))) return false;  

        soma = 0;  

        for (let i = 1; i <= 10; i++) {  
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);  
        }  
        resto = (soma * 10) % 11;  
        if (resto === 10 || resto === 11) resto = 0;  
        return resto === parseInt(cpf.substring(10, 11));  
    }  
});