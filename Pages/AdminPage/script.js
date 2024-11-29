window.onload = async () => {
    try {
        const response = await axios.get('http://localhost:5000/users');
        const users = response.data;

        const container = document.querySelector('.container .row');
        users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'card text-white bg-primary mb-3';
        card.innerHTML = `
            <div class="card-header">${user.nome}</div>
            <div class="card-body">
            <p class="card-text">${user.email}</p>
            <button class="btn btn-warning" onclick="editUser('${user._id}')">Editar</button>
            </div>
        `;
        container.appendChild(card);
        });
    } catch (err) {
        console.error(err);
    }
};

async function editUser(id) {
    const novoNome = prompt('Digite o novo nome:');
    if (novoNome) {
      try {
        await axios.put(`http://localhost:5000/users/${id}`, { nome: novoNome });
        alert('Usuário atualizado');
        location.reload();
      } catch (err) {
        alert('Erro ao atualizar usuário');
      }
    }
  }