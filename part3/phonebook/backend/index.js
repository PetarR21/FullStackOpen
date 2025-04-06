require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const Person = require("./models/person");

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

app.get("/info", (request, response) => {
  Person.estimatedDocumentCount()
    .then((count) => {
      response.send(
        `<div>
          <p>Phonebook has info for ${count} ${
          count === 1 ? "person" : "people"
        } </p>
            <p>${new Date()}</p>
            </div>`
      );
    })
    .catch((error) => {
      console.error(error);
      response.status(500).send({ error: "Something went wrong" });
    });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
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

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
