const router = require("express").Router();
const People = require("../models/person");

router.get("/", (request, response, next) => {
  People.find({}).then((result) => response.json(result));
});

router.get("/:id", (request, response, next) => {
  const id = request.params.id;
  People.findById(id)
    .then((result) => {
      if (result) response.json(result);
      else response.status(404).end();
    })
    .catch((error) => next(error));
});

router.post("/", (request, response, next) => {
  const body = request.body;

  //error handling
  if (!body.name) return response.status(400).json({ error: "name missing" });
  if (!body.number)
    return response.status(400).json({ error: "number missing" });

  // creating and adding person
  const person = new People({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((saved) => response.json(saved))
    .catch((error) => next(error));
});

router.delete("/:id", (request, response, next) => {
  const id = request.params.id;
  People.findByIdAndRemove(id)
    .then((result) => response.status(204).end())
    .catch((error) => next(error));
});

router.put("/:id", (request, response, next) => {
  const body = request.body;
  const updatedPerson = {
    number: body.number,
  };
  People.findByIdAndUpdate(request.params.id, updatedPerson, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updated) => response.json(updated))
    .catch((error) => next(error));
});

module.exports = router;
