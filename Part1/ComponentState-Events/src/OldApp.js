import './App.css';
import {useState} from "react"


const Counter = ({number}) =>{
  console.log("Counter rendered");
  return <h1>Sudoku {number}</h1>
};

const OldApp= (porps) => {

  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    //setCount(prevCount => prevCount + 1);
  }

  const handleClickReset = () => {
    setCount(0);
  }

  const isEven =  count % 2 === 0;

  console.log("App rendered");

  return (
    <div className="App">
      <p>El valor del contador es:</p>
      <Counter number={count} />
      <p>{isEven ? 'Is even' : 'Is odd'}</p>
      <button
      onClick={handleClick}>
        Increment
      </button>
      <button
      onClick={handleClickReset}>
        Reset
      </button>
    </div>
  );
}

export default OldApp;
