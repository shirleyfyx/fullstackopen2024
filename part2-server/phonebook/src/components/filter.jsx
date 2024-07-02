/* eslint-disable react/prop-types */

const Filter = ({persons, filterName, deletePerson}) => {
    const personToShow = filterName ? persons.filter(person => person.name.toLowerCase().includes(filterName.toLocaleLowerCase())) : persons

    return (
        <ul>
        {personToShow.map(person => 
          <div key={person.id}>
            {person.name}
            {person.number}
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </div>
        )}
      </ul>
    )
}

export default Filter