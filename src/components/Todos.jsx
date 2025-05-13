import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, updateTodo } from '../features/todo/todoSlice'

function Todos() {
  const todos = useSelector((state) => state.todos)
  const dispatch = useDispatch()

  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState("")

  const handleUpdate = (id) => {
    if (editText.trim()) {
      dispatch(updateTodo({ id, text: editText }))
      setEditId(null)
      setEditText("")
    }
  }

  return (
    <>
      <div>Todos</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            {editId === todo.id ? (
              <input
                className="text-white px-2 py-1 rounded w-full mr-2"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <div className="text-white">{todo.text}</div>
            )}

            <div className="flex gap-2 ml-2">
              {editId === todo.id ? (
                <>
                  <button
                    onClick={() => handleUpdate(todo.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditId(null)
                      setEditText("")
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditId(todo.id)
                      setEditText(todo.text)
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(removeTodo(todo.id))}
                    className="text-white bg-red-500 border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded"
                  >
                    🗑️
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Todos
