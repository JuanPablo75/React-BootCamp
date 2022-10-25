import { useState } from "react"

const Header = 'Give Feedback'

//const ListOfClicks = ({clicks}) => <p>{clicks.join(", ")}</p>
const WarningNotUsed = () => <h2>No feedback given</h2>    
const Feedback = ({counters}) => {
    return(
    <div>
    <p>Good: {counters.good}</p>
    <p>Bad: {counters.bad}</p>
    <p>Neutral: {counters.neutral}</p>
    <p>Total : {counters.good + counters.bad + counters.neutral}</p>
    </div>
    )
}
const INITIAL_COUNTERS_STATE = {
    good: 0,
    bad: 0,
    neutral: 0
}

const App = () => {
 
    //const [clicks, setClicks] = useState([])

    const[counters, setCounters] = useState({
        good: 0,
        bad: 0,
        neutral: 0
    })
     
    const handleGoodClick = () => {
        setCounters({
            ...counters,
            good: counters.good +1
        })
       // setClicks((prevClicks) => [...prevClicks, "G"])
    }
    const handleBadClick = () => {
        setCounters({
            ...counters,
            bad: counters.bad +1
        })
       // setClicks((prevClicks) => [...prevClicks, "B"])
    }
    const handleNeutralClick = () =>{
        setCounters({
            ...counters,
            neutral: counters.neutral +1
        })
        //setClicks((prevClicks) =>[...prevClicks, "N"])
    }
    const handleReset = () => {
        setCounters(INITIAL_COUNTERS_STATE)
        //setClicks([])
    }
    return (
        <div>
        <h1>{Header}</h1>
        <button onClick={handleGoodClick}>Good</button>
        <button onClick={handleBadClick}>Bad</button>
        <button onClick={handleNeutralClick}>Neutral</button>
        <p>
            <button onClick={handleReset}>Reset</button>
        </p>
        {counters === INITIAL_COUNTERS_STATE ?
        <WarningNotUsed /> :
        <Feedback counters={counters}/>
        }
        </div>
    )
}

export default App;