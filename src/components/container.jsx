import React from 'react'
import { useState, useEffect } from 'react'
import './container.css'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CgAddR } from "react-icons/cg";
import { v4 as uuidv4 } from 'uuid';


const Container = () => {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    const todoString = localStorage.getItem("todos")
    if (todoString) {
      const todos = JSON.parse(todoString)
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (id) => {
    const t = todos.find(i => i.id === id)
    setTodo(t.todo)
    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
  }

  const handleDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
  }

  const handleAdd = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
      setTodo("")
    }
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    const id = e.target.name
    const newTodos = todos.map(item => {
      if (item.id === id) {
        item.isCompleted = !item.isCompleted
      }
      return item
    })
    setTodos(newTodos)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if(todo.length <= 3) {
        alert("Todo must be more than 3 characters")
        return
      }
      handleAdd()
    }
  }

  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit()
    }
  }

  return (
    <div className="container">
      <h1>Your Tasks, Our Priority</h1>
      <div className='inputContainer'>
        <h2>Add todos</h2>
        <div className='inputTodo'>
          <input onChange={handleChange} onKeyDown={handleKeyPress} value={todo} className='input' type="text" placeholder='Add Todo...' />
          <button onClick={handleAdd} disabled={todo.length <= 3}><CgAddR /></button>
        </div>
      </div>
      <div className="finishTodo">
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label>Show Finished</label>
      </div>
      <div className='border'></div>
      <h2>My Todos</h2>
      {todos.length === 0 ? <div className='noTodos'>No Todos to Display</div> : null}
      {todos.map(item => {
        return (showFinished || !item.isCompleted) && <div key={item.id} className="displayContainer">
          <div className="displayTodo">
            <input name={item.id} onChange={handleCheckbox} checked={item.isCompleted} type="checkbox" id="" />
            <div className={item.isCompleted ? "lineThrough" : ""}>{item.todo}</div>
          </div>
          <div className="editTodo">
            <button onClick={() => { handleEdit(item.id) }} onKeyDown={handleEditKeyPress}><FaEdit /></button>
            <button onClick={() => { handleDelete(item.id) }}><MdDelete /></button>
          </div>
        </div>
      })}
    </div>
  )
}

export default Container

