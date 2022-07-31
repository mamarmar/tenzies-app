function Die(props) {
    return (
        <div 
            className={`die-face ${props.isHeld ? "isHeld" : ""}`}
            onClick={props.holdDice}
            >
            <h4 className="die-num">{props.value}</h4>
        </div>
    )
}

export default Die