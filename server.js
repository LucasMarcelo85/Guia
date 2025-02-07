const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const filePath = path.join(__dirname, 'data.json');

// Verifica se o arquivo data.json existe, se não, cria um vazio
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}));
}

// Função para carregar os dados do arquivo JSON
const loadData = () => {
    try {
        const rawData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
        return {};
    }
};

// Função para salvar os dados no arquivo JSON
const saveData = (data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Erro ao salvar JSON:", error);
    }
};

// Rota para carregar os dados
app.get('/load', (req, res) => {
    res.json(loadData());
});

// Rota para salvar os dados
app.post('/save', (req, res) => {
    saveData(req.body);
    res.json({ message: 'Dados salvos com sucesso!' });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
