import { useState } from "react";

const WarningNotUsed = () => {
    return <h2>List of clicks empty</h2>
}

const ListOfCLicks = ({ clicks }) => {
    return <p>{clicks.join(", ")}</p>
}
const INITIAL_COUNTERS_STATE = {
    left:0,
    right:0,
    message : 'Message from INITIAL STATE'
}
const Old2App = () => {
    const [counters, setCounters] = useState({      //const [left, setLeft] = useState(0);
        left: 0,                                    //const [right, setRight] = useState(0);
        right: 0,
        message: 'Message from state'
    })

    const [clicks, setClicks] = useState([])

    const handleLeftClick = () => {
        const newCountersState = {
            ...counters,
            left: counters.left + 1
        }
        setCounters(newCountersState)
        setClicks((prevCLicks) => [...prevCLicks, "L"])
    }

    const handleRightClick = () => {
        setCounters({
            ...counters,
            right: counters.right + 1,
        });
        setClicks((prevClicks) => [...prevClicks, "R"])
    }
    const handleReset = () => {
        setCounters(INITIAL_COUNTERS_STATE)
        setClicks([])
    }

    
    return (
        <div>
            <h1> L/R Counter</h1>
            {counters.left}
            <button onClick={handleLeftClick}>Left</button>
            <button onClick={handleRightClick}>Right</button>
            {counters.right}
            <p>
                <button onClick={handleReset}>Reset</button>
            </p>
            <p>Total Clicks : {clicks.length}</p>
            <p>{counters.message}</p>
            {clicks.length === 0 ?
                <WarningNotUsed /> :
                <ListOfCLicks clicks={clicks} />}
        </div>
    )
}

export default Old2App;