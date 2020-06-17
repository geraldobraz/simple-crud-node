const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  res.status(200).send(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }
  repositories.push(repo);

  res.status(200).send(repo);
});

app.put("/repositories/:id", (req, res) => { 
  const { id } = req.params;
  const { title, url, techs } = req.body;

  repositories.map(r => {
    if (r.id === id) {
      r.title = title? title : r.title;
      r.url = url? url : r.url;
      r.techs = techs? techs : r.techs;
      return res.status(200).send(r);
    }
  });

  res.status(400).send(repo);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  repositories.map(r => {
    if (r.id === id) {
      const idx = repositories.indexOf(r);
      
      repositories.splice(idx, 1);
      return res.status(204).send();
    }
  });
  res.status(400).send();
  
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  repositories.map(r => {
    if (r.id === id) {
      r.likes +=1;
      return res.status(200).send({likes: r.likes});
    }
  });
  res.status(400).send();
});

module.exports = app;
