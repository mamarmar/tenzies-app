import React from "react"
import Die from "./components/Die"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls, setRolls] = React.useState(0)

  React.useEffect(()=> {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue  = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
    }
  },[dice])

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}
  
  function allNewDice() {
    const numArray =[]
    for (let i =0; i < 10; i++) {
        numArray.push(generateNewDie())
    }
    return numArray
  }

  function rollDice() {
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? 
      die : 
      generateNewDie()
    }))
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  function startNewGame() {
    setDice(allNewDice())
    setTenzies(false)
    setRolls(0)
}

  function countRoll() {
    setRolls(prevRoll => prevRoll + 1)
  }

  function handleRoll() {
    rollDice()
    countRoll()
  }
  
  const diceElements = dice.map (die => { 
  return (
    <Die 
      key={die.id} 
      id ={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={()=>holdDice(die.id)}
    />)
  })

  const buttonText = tenzies ? "New Game" : "Roll" 

  return (
    <main className="App">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
        {diceElements}
      </div>
      <div className="performance-metrics">
        <p>Roll Count: {rolls}</p>
        <p>Timer: {rolls}</p>
      </div>
      
      <button 
        className="roll-btn"
        onClick={tenzies ? startNewGame : handleRoll}
        >
          {buttonText}
      </button>
      
    </main>
  );
}

export default App;
