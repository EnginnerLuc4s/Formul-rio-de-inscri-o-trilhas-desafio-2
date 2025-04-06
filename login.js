document.addEventListener("DOMContentLoaded", function () {  
    const formLogin = document.getElementById("formLogin"); // ID correto do formulário no HTML  

    if (!formLogin) {  
        console.error("Erro: O formulário de login 'formLogin' não foi encontrado no DOM.");  
        return;  
    }  

    // Evento de envio do formulário (login)  
    formLogin.addEventListener("submit", function (event) {  
        event.preventDefault(); // Impedir o envio padrão do formulário  

        // Captura o ID do usuário e a senha preenchidos no formulário  
        const idUsuario = document.getElementById("usuarioId").value.trim(); // Alinhado ao ID correto no HTML  
        const senhaUsuario = document.getElementById("senha").value;  

        // Recupera os dados cadastrados (salvos no LocalStorage)  
        const dadosCadastrados = JSON.parse(localStorage.getItem("dadosUsuario"));  

        // Se não houver dados cadastrados  
        if (!dadosCadastrados) {  
            alert("Nenhum usuário foi encontrado. Por favor, realize o cadastro!");  
            return;  
        }  

        // Valida as credenciais (ID e senha)  
        if (dadosCadastrados.id === idUsuario && dadosCadastrados.senha === senhaUsuario) {  
            // Login bem-sucedido  
            alert("Login bem-sucedido!");  
            window.location.href = "pagina-principal.html"; // Redireciona para a página principal  
        } else {  
            // Credenciais inválidas  
            alert("ID ou senha incorretos. Tente novamente!");  
        }  
    });  
});
