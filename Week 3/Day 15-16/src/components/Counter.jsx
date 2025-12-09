import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount, reset } from '../store/slices/counterSlice'
import { useState } from 'react'
import './Counter.css'

function Counter() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    const [amount, setAmount] = useState(5)

    return (
        <div className="counter-container">
            <h2>Counter</h2>
            <div className="counter-display">
                <span className="count-value">{count}</span>
            </div>
            <div className="counter-buttons">
                <button onClick={() => dispatch(decrement())} className="btn">−</button>
                <button onClick={() => dispatch(reset())} className="btn">Reset</button>
                <button onClick={() => dispatch(increment())} className="btn">+</button>
            </div>
            <div className="counter-custom">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="amount-input"
                />
                <button onClick={() => dispatch(incrementByAmount(amount))} className="btn">
                    Add Amount
                </button>
            </div>
        </div>
    )
}

export default Counter
