const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

//Product's db
const products = [{
        id: 1,
        name: 'Laptop'
    },
    {
        id: 2,
        name: 'Macbook'
    },
    {
        id: 3,
        name: 'Chromebook'
    }
];

//Settings
app.set('port', process.env.PORT || 3000);

//Middelwares
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

//Routes
app.get('/products', (req, res) => res.json(products));

app.post('/products', (req, res) => {
    const {
        name
    } = req.body;
    products.push({
        id: products.length + 1,
        name: name
    });
    res.json('Created');
});

app.put('/products/:id', (req, res) => {
    const {
        id
    } = req.params;
    const {
        name
    } = req.body;

    products.forEach((product, i) => {
        if (product.id == id) {
            product.name = name;
        }
    });
    res.json('Updated');
});

app.delete('/products/:id', (req, res) => {
    const {
        id
    } = req.params;
    product.forEach((product, i) => {
        if (product.id == id) {
            products.splice(i, 1);
        }
    });
    res.json('Updated');

});

//Static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`));