const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
const feedbacks = [];

app.post("/feedbacks/enviar", (req, res) => {
  const { nome, comentario } = req.body;
  feedbacks.push({ nome, comentario });
  res.redirect("/feedbacks/lista");
});
app.post("/feedbacks/remover", (req, res) => {
  const index = req.body.index;
  feedbacks.splice(index, 1);
  res.redirect("/feedbacks/lista");
});

app.get("/", (req, res) => {
  res.send(`
        <h1>Enviar Feedback</h1>
        <form action="/feedbacks/enviar" method="POST">
            <label>Nome:</label><br>
            <input type="text" name="nome"><br><br>
            <label>Comentário:</label><br>
            <textarea name="comentario"></textarea><br><br>
            <button type="submit">Enviar</button>
        </form>
    `);
});

app.get("/feedbacks/lista", (req, res) => {
  const itens = feedbacks
    .map(
      (feedback, index) => `
        <li>
            <strong>${feedback.nome}</strong>: ${feedback.comentario}
            <form action="/feedbacks/remover" method="POST">
                <input type="hidden" name="index" value="${index}">
                <button type="submit">Remover</button>
            </form>
        </li>
    `,
    )
    .join("");

  res.send(`
        <h1>Lista de Feedbacks</h1>
        <ul>${itens}</ul>
        <a href="/">Enviar novo feedback</a>
    `);
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
