import { useEffect, useState } from 'react';
import personService from './services/persons';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const person = persons.find((person) => person.name === newName);

    if (
      person &&
      window.confirm(
        `${person.name} is already added to the phonebook, replace the old number with a new one?`
      )
    ) {
      const updatedObject = { ...person, number: newNumber };

      personService.update(person.id, updatedObject).then((updatedPerson) => {
        setPersons(persons.map((p) => (p.id === updatedPerson.id ? updatedPerson : p)));
        setNewName('');
        setNewNumber('');
      });
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const removePerson = (person) => {
    if (window.confirm(`Remove ${person.name}?`)) {
      personService.remove(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
      });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} removePerson={removePerson} />
    </div>
  );
};

export default App;
