import { ChangeEvent, FormEvent } from "react";

interface FormProps {
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
    input: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    text: string;
}

const Form = ({onSubmit, input, onChange, text}: FormProps) => {
  return (
    <>
        <form onSubmit={onSubmit} className='todo-container__form'>
            <input value={input} 
                onChange={onChange}
                type='text'
                className='todo-container__input'
                placeholder='할 일 입력'
                required />
            <button type='submit' className='todo-container__button'>{text}</button>
        </form>
    </>
  )
}

export default Form