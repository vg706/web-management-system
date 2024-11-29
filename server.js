// ACESSAR SERVIDOR PELA URL: http://localhost:5000/
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const uri = 'mongodb+srv://AdminHumanTech:UniforProject@cluster0.lqybr.mongodb.net/HumanTech';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, '/Pages/LandingPage/assets')))

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Erro ao conectar ao MongoDB Atlas', err));

const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    senha: { type: String, required: true },
    isGestor: {type: Boolean, default: false},
});

const User = mongoose.model('User', UserSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/Pages/LandingPage/index.html'));
})

app.get('/register', async (req, res) => {
    res.sendFile(path.join(__dirname, '/Pages/RegisterPage/index.html'));
});

app.get('/login', async (req, res) => {
    res.sendFile(path.join(__dirname, '/Pages/LoginPage/index.html'));
});

app.get('/admin', async (req, res) => {
    res.sendFile(path.join(__dirname, '/Pages/AdminPage/index.html'));
})

app.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.post('/login', async (req, res) => {
    console.log('Tentativa de login com:', req.body);
    const {email, senha} = req.body;
    const user = await User.findOne({email, senha});
    if (user) {
        if (user.senha === senha) {
            if (user.isGestor) {
                res.status(200).send({ user, message: 'Login bem-sucedido como Gestor' });
            } else {
                res.status(200).send({ user, message: 'Login bem-sucedido como Usuário' });
            }
        } else {
            res.status(401).send({ message: 'Credenciais inválidas' });
        }
    } else {
        res.status(401).send({ message: 'Credenciais inválidas' });
    }
});


app.put('/users/id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!user) return res.status(404).send({message: 'Usuário não encontrado'});
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));