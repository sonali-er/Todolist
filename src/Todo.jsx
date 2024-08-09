import React, { useState } from 'react';
import './Todo.css';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editValue, setEditValue] = useState('');

    const addTodo = () => {
        if (inputValue.trim() !== '') {
            const newTodo = {
                id: new Date().getTime(),
                text: inputValue,
            };
            setTodos([...todos, newTodo]);
            setInputValue('');
        }
    };

    const deleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const startEdit = (id, text) => {
        setIsEditing(true);
        setEditId(id);
        setEditValue(text);
    };

    const updateTodo = () => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === editId) {
                return {
                    ...todo,
                    text: editValue,
                };
            }
            return todo; // Corrected from `return todos;` to `return todo;`
        });

        setTodos(updatedTodos);
        setIsEditing(false);
        setEditId(null);
        setEditValue('');
    };

    return (
        <div className='todo-container'>
            <h2>To Do List</h2>
            <input
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={addTodo}>ADD</button>
            
            {isEditing && (
                <div>
                    <input
                        type='text'
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                    />
                    <button onClick={updateTodo}>Update</button>
                </div>
            )}

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.text}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                        <button onClick={() => startEdit(todo.id, todo.text)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;
