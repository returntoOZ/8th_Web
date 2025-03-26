import { FormEvent, useState } from "react"
import { TTodo } from "../types/todo";

const Todo = () => {
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
    const [input, setInput] = useState<string>('');
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const text = input.trim();
        console.log('동작함');
        if (text) {
            const newTodo: TTodo = { id: Date.now(), text };
            setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
            setInput('');
        }
    };

    const completeTodo = (todo: TTodo) => {
        setTodos(prevTodo => prevTodo.filter(t => t.id !== todo.id)); // 완료 버튼을 누르지 않은 todo들만 filtering!
        setDoneTodos(prevDoneTodo => [...prevDoneTodo, todo]);
    };

    const deleteTodo = (doneTodo: TTodo) => {
        setDoneTodos(prevDoneTodo => prevDoneTodo.filter(dt => dt.id !== doneTodo.id));
    }

    return (
        <div className='todo-container'>
            <h1 className='todo-container__header'>HWAN TODO</h1>
            <form onSubmit={handleSubmit} className='todo-container__form'>
                <input value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type='text'
                    className='todo-container__input'
                    placeholder='할 일 입력'
                    required />
                <button type='submit' className='todo-container__button'>
                    할 일 추가
                </button>
            </form>
            <div className='render-container'>
                <div className='render-container__section'>
                    <h2 className='render-container__title'>할 일</h2>
                    <ul id='todo-list' className='render-container__list'>
                        {/* Map 사용 시, Key prop을 전달해야함, 리액트가 Key를 기준으로 rendering이 이뤄지기 때문이다! */}
                        {todos.map((todo) => (
                            <li key={todo.id} className='render-container__item'>
                                <span className='render-container__item-text'>{todo.text}</span>
                                <button onClick={() => completeTodo(todo)} style={{ backgroundColor: '#28a745' }} className='render-container__item-button'>완료</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='render-container__section'>
                    <h2 className='render-container__title'>완료</h2>
                    <ul id='todo-list' className='render-container__list'>
                        {doneTodos.map((doneTodo) => (
                            <li key={doneTodo.id} className='render-container__item'>
                                <span className='render-container__item-text'>{doneTodo.text}</span>
                                <button onClick={() => deleteTodo(doneTodo)} style={{ backgroundColor: '#dc3545' }} className='render-container__item-button'>완료</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Todo