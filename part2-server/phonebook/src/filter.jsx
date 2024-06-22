/* eslint-disable react/prop-types */

const Filter = ({persons, filterName}) => {
    const personToShow = filterName ? persons.filter(person => person.name.toLowerCase().includes(filterName.toLocaleLowerCase())) : persons

    return (
        <ul>
        {personToShow.map(person => 
          <div key={person.id}>{person.name} {person.number}</div>
        )}
      </ul>
    )
}

export default Filter