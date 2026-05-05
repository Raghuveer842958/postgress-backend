const express = require('express');
const initTables = require('./src/models/initTable');
const app = express();


// routes
const userRoutes = require("./src/routes/userRoutes")

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API');
});

app.use("/api/v1/user", userRoutes);

app.listen(8080, async () => {
  console.log('Server running on port 8080');
  await initTables();
});