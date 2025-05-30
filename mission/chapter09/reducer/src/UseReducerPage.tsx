import React, { useReducer, useState } from 'react'

// 1. state에 대한 interface
interface IState {
    counter: number;
}
// 2. reducer에 대한 interface
interface IAction {
    type: 'INCREASE' | 'DECREASE' | 'RESET_TO_ZERO';
    payload?: number;
}

function reducer(state: IState, action: IAction) {
    const { type } = action;

    switch (type) {
        case 'INCREASE':
            return {
                // 원본 배열을 바로 업데이트 하는 것이 아니라, 스프레드 연산자 사용 후 수정해야함!
                // 특정 값을 잃어버릴 가능성이 존재함(원본 값을 유지시키는 게 중요).
                ...state,
                counter: state.counter + 1,
            }
        case 'DECREASE':
            return {
                ...state,
                counter: state.counter - 1,
            }
        case 'RESET_TO_ZERO':
            return {
                ...state,
                counter: 0,
            }
        default:
            return state;
    }
}

export default function UseReducerPage() {
    // 1. useState
    const [count, setCount] = useState(0);

    // 2. useReducer
    const [state, dispatch] = useReducer(reducer, {
        counter: 0,
    })

    const handleIncrease = () => {
        setCount(count + 1);
    }

    return (
        <>
            <div className='flex flex-col justify-center gap-10'>
                <div>
                    <h3 className='text-3xl'>useState훅 사용 : {count}</h3>
                    <button onClick={handleIncrease}>Increase</button>
                </div>
                
                <div>
                    <h3>useState훅 사용 : {state.counter}</h3>
                    <button onClick={() => dispatch({
                        type: 'INCREASE',
                    })}>Increase</button>
                    <button onClick={() => dispatch({
                        type: 'DECREASE',
                    })}>Decrease</button>
                    <button onClick={() => dispatch({
                        type: 'RESET_TO_ZERO',
                    })}>Reset</button>
                </div>
            </div>
        </>
    );
}