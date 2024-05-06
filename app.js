const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./backend/routes/userRoutes');
const houseRoutes = require('./backend/routes/houseRoutes');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://mcswordyt:1234@cluster0.vgkl87j.mongodb.net/potolok?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });

app.use(cors())
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/houses', houseRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    next();
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
