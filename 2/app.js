const express = require('express');
const {nanoid} = require('nanoid');
const app = express();
const port = 3000;
const cors = require('cors');

let items = [
    {id: nanoid(6), name: "Iphone", price: 70000, description: "Прекрасный айфон", category: "Электроника", stock: 5},
    {id: nanoid(6), name: "Zphone", price: 100000, description: "Непрекрасный айфон", category: "Электроника", stock: 10},
    {id: nanoid(6), name: "Poco", price: 1000000, description: "Бомбовый телефон", category: "Электроника", stock: 10},
    {id: nanoid(6), name: "4K", price: 120000, description: "Пушечный монитор с феноменальны разрешением", category: "Электроника", stock: 7},
    {id: nanoid(6), name: "Iphone", price: 70000, description: "Прекрасный айфон", category: "Электроника", stock: 5},
    {id: nanoid(6), name: "Zphone", price: 100000, description: "Непрекрасный айфон", category: "Электроника", stock: 10},
    {id: nanoid(6), name: "Poco", price: 1000000, description: "Бомбовый телефон", category: "Электроника", stock: 10},
    {id: nanoid(6), name: "4K", price: 120000, description: "Пушечный монитор с феноменальны разрешением", category: "Электроника", stock: 7},
    {id: nanoid(6), name: "Iphone", price: 70000, description: "Прекрасный айфон", category: "Электроника", stock: 5},
    {id: nanoid(6), name: "Zphone", price: 100000, description: "Непрекрасный айфон", category: "Электроника", stock: 10},
]

//middleware для парсинга json
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

//middleware для логирования запросов
app.use((req,res,next)=>{
    res.on('finish',()=>{
        console.log(`[${new Date().toISOString()}] [${req.method}] ${res.statusCode} ${req.path}`);
        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
            console.log('Body:', req.body);
        }
    });
    next();
});

//функция помощник для получения пользователя из списка
function findItemOr404(id, res) {
    const item = items.find(i => i.id === id);
    if (!item) {
        res.status(404).json({
            error: 'Item not Found'
        })
        return null;
    }
    return item;
}

//CRUD
app.post('/api/items', (req, res) => {
    const {name, category, description, price, stock} = req.body;
    const newItem = {
        id: nanoid(6),
        name: name.trim(),
        category: category.trim(),
        description: description.trim(),
        price: Number(price),
        stock: Number(stock)
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

app.get("/api/items", (req, res) => {
    res.json(items);
})

app.get("/api/items/:id", (req, res) => {
    const id = req.params.id;
    const item = findItemOr404(id, res);
    if (!item) return;
    res.json(item);
});

app.patch('/api/items/:id', (req, res) => {
    const id = req.params.id;
    const item = findItemOr404(id, res);
    if (!item) return;

    if (req.body?.name === undefined && req.body?.price === undefined && req.body?.description === undefined && req.body?.category === undefined && req.body?.stock === undefined) {
        res.status(404).json({
            error: 'Обновить нечего, сори'
        })
    }
    const {name, description, category, stock, price,} = req.body;
    if (name !== undefined) item.name = name.trim();
    if (description !== undefined) item.description = description.trim();
    if (category !== undefined) item.category = category.trim();
    if (stock !== undefined) item.stock = Number(stock);
    if (price !== undefined) item.price = Number(price);
    res.json(item);
});

app.delete('/api/items/:id', (req, res) => {
    const id = req.params.id;
    const exists = items.some((i) => i.id === id);
    if (!exists) return res.status(404).json({
        error: "Item Not Found"
    });
    items = items.filter((i) => i.id !== id);
    res.status(204).send();
});

//404 для всех остальных маршрутов
app.use((req, res) => {
    res.status(404).json({error: 'Not Found'});
});

//Глобальный обработчик ошибок чтобы сервер не падал
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: 'Internal Server Error' });
});



app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})