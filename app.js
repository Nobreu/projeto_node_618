import express from 'express';
import dotenv from 'dotenv';
import pool from './config/db.js';
import multer from 'multer';
import path from 'path';

dotenv.config();
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Configuração do multer: Irá permitir upload de imagens e salva-las
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Página inicial (Obs: )
app.get('/', (req, res) => {
    res.render('index');
});

// Formulário de cadastro
app.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

// Cadastrar um novo cliente
app.post('/cadastro', upload.single('foto'), async (req, res) => {
    const { nome, email, telefone, rua, bairro, estado, numero, complemento } = req.body;
    const foto = req.file ? `/uploads/${req.file.filename}` : null;
    await pool.query(
        `INSERT INTO clientes (nome, email, telefone, rua, bairro, estado, numero, complemento, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [nome, email, telefone, rua, bairro, estado, numero, complemento, foto]
    );
    res.redirect('/cadastros');
});

// Mostrar todos os cadastros
app.get('/cadastros', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM clientes');
    res.render('lista', { clientes: rows });
});

// Tela de detalhamento do cliente
app.get('/cadastro/:id', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [req.params.id]);
    res.render('detalhe', { cliente: rows[0] });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
