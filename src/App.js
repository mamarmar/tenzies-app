import React from "react"
import Die from "./components/Die"
import { nanoid } from 'nanoid'

function App() {
  const [dice, setDice] = React.useState(allNewDice())

  function allNewDice() {
    const numArray =[]
    for (let i =0; i < 10; i++) {
      let dieObject = {
        value: Math.ceil((Math.random() * 6)),
        isHeld: false,
        id: nanoid()
      }
      numArray.push(dieObject)
    }
    return numArray
  }

  function rollDice() {
    setDice(allNewDice())
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
