const Header = (props) => {
    console.log(props)
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
}
  
const Part = (props) => {
    console.log(props)
    return (
      <div>
        <p> {props.part} {props.exercise} </p>
      </div>
    )
}
  
const Content = ({parts}) => {
    console.log(parts)
    return (
      <div>
        {parts.map(part => (
            <Part key = {part.id} part = {part.name} exercise = {part.exercises}/>
        ))
        }
      </div>
    )
}
  
const Total = ({parts}) => {
    const total = 
        parts.reduce((sum, parts) => sum + parts.exercises, 0)
    return (
        <div>
        <p> Number of exercises {total}</p>
        </div>
    )
}
  
const Course = ({course}) => {
    return (
        <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
    )
}

export default Course