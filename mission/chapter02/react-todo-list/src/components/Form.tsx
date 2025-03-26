import { useState } from "react";

interface FormProps {
    onSubmit?: () => void;
    onClick?: () => void;
    text: string;
}

const Form = ({onSubmit, onClick, text}: FormProps) => {
    const[input, setInput] = useState('');
  return (
    <>
        <form onSubmit={onSubmit} className='todo-container__form'>
            <input value={input} 
                onChange={(e) => setInput(e.target.value)}
                type='text'
                className='todo-container__input'
                placeholder='할 일 입력'
                required />
            <button type='submit' onClick={onClick} className='todo-container__button'>{text}</button>
        </form>
    </>
  )
}

export default Form