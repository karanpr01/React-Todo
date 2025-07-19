import { useState, useEffect } from "react";

export default function UseTodo() {
    // Initialize todos from localStorage or empty array
    const [todos, setTodos] = useState(() => {
        try {
            const savedTodos = localStorage.getItem("todos")
            return savedTodos ? JSON.parse(savedTodos) : []
        } catch (error) {
            console.error("Error lodaing Todos from localStorage:", error);
            return []
        }
    }
    )


    // Save todos to localStorage whenever todos change
    useEffect(() => {
        try {
            localStorage.setItem("todos", JSON.stringify(todos))
        } catch (error) {
            console.error("Error Saving Todos to localStorage:", error);

        }
    }, [todos])


    // Add new Todo
    const addTodo = (text) => {
        if (!text.trim()) return //Don't add empty todo

        const newTodo = {
            id: crypto.randomUUID(), //Genrates id
            text: text.trim(),
            completed: false,
            createdAt: new Date().toLocaleString()
        }

        setTodos(prev => [...prev, newTodo])


    }

    // Toggle todo completion status
    const toggleTodo = (id, checked) => {
        setTodos(prev =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: checked } : todo
            )
        );
    };



    // Delete a todo
    const deleteTodo = (id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id))
    }

    // Edit a todo
    const editTodo = (id, newText) => {
        if (!newText.trim()) return //Don't save empty text

        setTodos(prev =>
            prev.map(todo => todo.id === id ? { ...todo, text: newText.trim() } : todo
            )
        )
    }

 

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
     
    }
}

