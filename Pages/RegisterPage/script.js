document.querySelector('form').onsubmit = async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        await axios.post('http://localhost:5000/register', { nome, email, senha });
        alert('Usuário cadastrado com sucesso');
        window.location.href = '/login';
    } catch (err) {
        alert('Erro ao cadastrar usuário');
    } 
}