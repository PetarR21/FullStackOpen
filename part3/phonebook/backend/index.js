const express = require("express");
const app = express();
const morgan = require("morgan");

morgan.token("body", (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return null;
});

app.use(express.static("dist"));

app.use(express.json());
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens["body"](req, res),
    ].join(" ");
  })
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (request, response) => {
  response.send(
    `<div>
    <p>Phonebook has info for ${persons.length} ${
      persons.length == 1 ? "person" : "people"
    } </p>
      <p>${new Date()}</p>
      </div>`
  );
});

app.get("/info", (request, response) => {
  response.send(
    `<div>
            <p>Phonebook has info for ${persons.length} ${
      persons.length === 1 ? "person" : "people"
    }</p>
            <p>${new Date()}</p>
        </div>`
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const person = persons.find((p) => p.id === request.params.id);

  if (person) {
    response.json(person);
  } else {
    response.sendStatus(404);
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const person = persons.find((p) => p.id === request.params.id);

  if (person) {
    persons = persons.filter((p) => p.id !== person.id);
    response.sendStatus(204);
  } else {
    response.sendStatus(404);
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: "name or number missing" });
  }

  if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const person = {
    id: Math.floor(Math.random() * 100000).toString(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
