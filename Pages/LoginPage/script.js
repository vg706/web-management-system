document.querySelector('form').onsubmit = async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await axios.post('http://localhost:5000/login', {email, senha});
        const user = response.data;
        if (user.isGestor) {
            window.location.href = '/admin';
        } else {
            alert('Login realizado com sucesso');
            window.location.href = '/'
        }
    } catch (err) {
        alert('Erro: Credenciais inválidas');
    }
};