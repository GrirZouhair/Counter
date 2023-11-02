import { toBeDisabled } from "@testing-library/jest-dom/matchers";
import React from "react";
import "./App.css";
export default function App() {
  // get value from localStorage
  const storedCount = parseInt(window.localStorage.getItem('count')) || 0;

  const [count, setCount] = React.useState(storedCount);
  const [autoIncrement, setAutoIncrement] = React.useState(null);

  const [isAutoCounting, setIsAutoCounting] = React.useState(false);


  const maxLimit = 10;
  const minLimit = -10;

  const Increment = () => {
    if (count < maxLimit) {
      setCount(prev => prev + 1);
    } else {
      const max = document.getElementById("max");
      max.newProperty = toBeDisabled;
    }

  }
  const Decrement = () => {
    if (count > minLimit) {
      setCount(prev => prev - 1);
    } else {
      const min = document.getElementById("min");
      min.newProperty = toBeDisabled;
    }
  }


  const incAuto = () => {
    let autoIncrement;
    if (!isAutoCounting) {
      setIsAutoCounting(true);
      autoIncrement = setInterval(() => {
        setCount(prev => {
          if (prev >= maxLimit) {
            clearInterval(autoIncrement);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      setAutoIncrement(autoIncrement);
    }
  }


  const decAuto = () => {
    let autoDecrement;
    if (!isAutoCounting) {
      setIsAutoCounting(true);
      autoDecrement = setInterval(() => {
        setCount(prev => {
          if (prev <= minLimit) {
            clearInterval(autoDecrement);
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
      setAutoIncrement(autoDecrement);
    }
  }
  const Reset = () => {
    // to stop when counting auto
    if (autoIncrement !== null) {
      clearInterval(autoIncrement);
    }
    setCount(0);
    clearLocalStorage();
  }

  React.useEffect(() => {
    window.localStorage.setItem('count', count);
  }, [count]);
  //clear data from your browser
  const clearLocalStorage = () => {
    window.localStorage.removeItem("count");
    setCount(0);
  }

  return (
    <>
      <div className="container">
        <div className="first">
          <div>
            <h1>{count}</h1>
          </div>
          <button onClick={Reset} id="min">Reset</button>
        </div>
        <div className="second">
          <button onClick={Increment} id="max">increment</button>
          <button onClick={Decrement}>Decrement</button>
          <button onClick={incAuto}>Increment Automactly</button>
          <button onClick={decAuto}>Decrement Automactly</button>
        </div>

      </div>
    </>
  )
}
