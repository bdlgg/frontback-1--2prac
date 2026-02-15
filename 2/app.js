const express = require('express');
const app = express();
const port = 3000;

let items = [
    {id: 1, name: "Iphone", cost: 70000},
    {id: 2, name: "Zphone", cost: 100000},
    {id: 3, name: "Poco", cost: 1000000},
]

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Главная страница")
});

//CRUD
app.post('/items', (req, res) => {
    const {name, cost} = req.body;
    const newItem = {
        id: Date.now(),
        name,
        cost,
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/items/:id', (req, res) => {
    const id = Number(req.params.id);
    let item = items.find(i => i.id === id);
    res.json(item);
});

app.patch('/items/:id', (req, res) => {
    const id = Number(req.params.id);
    const item = items.find(i => i.id === id);
    const {name, cost} = req.body;
    if (name !== undefined) item.name = name;
    if (cost !== undefined) item.cost = cost;
    res.json(item);
});

app.delete('/items/:id', (req, res) => {
    const id = Number(req.params.id);
    items = items.filter(i => i.id !== id);
    res.send('Ok')
})

app.listen(port, () => {
    console.log(`Server started on http:localhost:${port}`);
})