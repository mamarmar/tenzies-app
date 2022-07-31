import React from "react"
import Die from "./components/Die"
import { nanoid } from 'nanoid'

function App() {
  const [dice, setDice] = React.useState(allNewDice())

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

  return (
    <main className="App">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
        {diceElements}
      </div>
      <button 
        className="roll-btn"
        onClick={rollDice}
        >
          Roll
      </button>
    </main>
  );
}

export default App;
