// Define a senha correta. Você pode mudar esta senha.
const senhaCorreta = "220419";

// Pega o campo de senha pelo seu ID
const campoSenha = document.getElementById("password");

// Adiciona um "ouvinte" para cada vez que uma tecla é digitada no campo de senha
campoSenha.addEventListener("input", function() {
    // Pega o valor que o usuário digitou
    const senhaDigitada = campoSenha.value;

    // Verifica se a senha digitada é igual à senha correta
    if (senhaDigitada === senhaCorreta) {
        // Se a senha estiver correta, redireciona o usuário para a próxima página
        window.location.href = "pagsec.html";
    }
});