const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
} else {
  const password = process.argv[2];
  const url = `mongodb+srv://fullstack:${password}@cluster0.k0kw7ql.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

  mongoose.connect(url).then(() => {
    console.log("connected to MongoDB");
  });

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Person = mongoose.model("Person", personSchema);

  if (process.argv.length == 3) {
    Person.find({}).then((result) => {
      console.log("phonebook:");
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });
  } else {
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({
      name,
      number,
    });

    person.save().then((result) => {
      console.log("person saved");
      mongoose.connection.close();
    });
  }
}
