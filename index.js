const express = require('express');
const initTables = require('./src/models/initTable');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API');
});

// routes
const userRoutes = require("./src/routes/userRoutes")
const categoryRoutes = require("./src/routes/categoryRoutes")

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/category", categoryRoutes);

app.listen(8080, async () => {
  console.log('Server running on port 8080');
  await initTables();
});