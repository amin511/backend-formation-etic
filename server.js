const express = require('express');
const db = require('./database');
const app = express();

app.use(express.json());

app.get("/users" , (req , res)=>{
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
})

app.get("/api/products" , (req , res)=>{

    res.send("products");
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID, name, email });
    }
  });
});





const PORT = 3000;

app.listen(PORT , ()=>console.log(`Server is running on port localhost:${PORT}`));