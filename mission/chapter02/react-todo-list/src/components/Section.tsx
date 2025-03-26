import { TTodo } from "../types/todo";

interface SectionProps {
    title: string;
    todos: TTodo[];
    onClick?: (todo: TTodo) => void;
    backgroundColor: string;
    button_name: string;
};
// Map 사용 시, Key prop을 전달해야함, 리액트가 Key를 기준으로 rendering이 이뤄지기 때문이다!
const Section = ({title, todos, onClick, backgroundColor, button_name}: SectionProps) => {
  return (
    <div className='render-container__section'>
        <h2 className="render-container__title">{title}</h2>
        <ul id='todo-list' className="render-container__list">
            {todos.map((todo) =>(
                <li key={todo.id} className="render-container__item">
                    <span className="render-container__item-text">{todo.text}</span>
                    <button onClick={() => onClick && onClick(todo)} style={{backgroundColor}} className="render-container__item-button">{button_name}</button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Section