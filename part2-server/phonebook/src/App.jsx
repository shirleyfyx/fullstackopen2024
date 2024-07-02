import { useState, useEffect } from 'react'
import Filter from './components/filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('add new contacts...')
  const [newNumber, setNewNumber] = useState('add new numbers...')
  const [filterName, setFilterName] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, "numbers")

  const addNewNames = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {...existingPerson, number: newNumber };
        
        personService
          .updatePerson(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
            setNotification(
              `Update '${returnedPerson.name}'`
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
        })
        .catch(error => {
          console.error('Error updating person:', error);
          window.alert(`Failed to update ${existingPerson.name}. They may have already been removed.`);
        });
    }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification(
            `Add '${returnedPerson.name}'`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const deletePersons = (id) => {
    const personID = persons.find(person => person.id === id);
    if (personID && window.confirm(`Delete ${personID.name}?`)) {
      personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => {
        console.error('Error deleting person:', error);
      });
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <form onSubmit={addNewNames}>
        <div>
          filter shown with <input value={filterName} onChange={handleFilterChange}/>
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addNewNames}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Filter persons={persons} filterName={filterName} deletePerson={deletePersons}/>
    </div>
  )
}

export default App