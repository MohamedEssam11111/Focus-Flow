const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // عشان نقرأ JSON من الـ requests

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/test.html");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
