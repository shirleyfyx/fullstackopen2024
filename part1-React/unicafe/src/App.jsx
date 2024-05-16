/* eslint-disable react/prop-types */
import { useState } from 'react'

const Button = ({ handleClick, text} ) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr> 
)

const Statistics = ({good, neutral, bad, count, average, percentage}) => {
  if (count === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  
  return (
    <table>

      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={count} />
      <StatisticLine text="average" value ={average} />
      <StatisticLine text="positive" value={`${percentage.toFixed(1)}%`} />
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [score, setScore] =useState(0)
  const [count, setCount] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodFeedback = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setScore(score + 1)
    setCount(count + 1)
    setPositive(positive + 1)
    console.log(updatedGood)
  }

  const handleNeutralFeedback = () => {
    const updatedNeutral = neutral + 1
    setCount(count + 1)
    setNeutral(updatedNeutral)
    console.log(updatedNeutral)
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
    setScore(score - 1)
    setCount(count + 1)
    console.log(bad + 1)
  }

  const average = score / count
  const percentage = positive / count * 100

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodFeedback} text='good' />
      <Button handleClick={handleNeutralFeedback} text='neutral' />
      <Button handleClick={handleBadFeedback} text='bad' />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} count={count} average={average} percentage={percentage} />
    </div>
  )
}

export default App