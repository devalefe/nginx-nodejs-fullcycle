const express = require("express");
const Database = require("./database");

const app = express();
const port = 3000;

const db = new Database({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const { name } = req.query;

    if (name) {
      await db.query(`INSERT INTO people(name) VALUES ('${name}')`);
    }

    const result = await db.query("SELECT * FROM people");

    return res.status(200).send(`
      <h1>Full Cycle Rocks!</h1>
      <hr>
      <ul style='list-style: none; font-size: 22px;'>
      ${result.map(person => (
        `<li>${person.id} - ${person.name}</li>`
        )).join('')
      }
      </ul>
    `);
  } catch (error) {
    console.error(error);

    return res.status(500).send(`
      <h1>Oops! Something went wrong.</h1>
    `);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
