import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import AddTodo from './TodoForm/AddTodo'
import TodoList from './TodoList/TodoList'
import UseTodo from './Hooks/UseTodo'
import DarkModeToggle from './DarkMode/DarkModeToggle'


export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = UseTodo()
  const [showCompleted, setShowCompleted] = useState(true)

  const clearCompleted = () => {
    todos.filter(todo => todo.completed).forEach(todo => {
      deleteTodo(todo.id)
    })

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])
  }



  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + Enter to add new todo (when focused on input)
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        // Focus on the add todo input
        document.querySelector('input[placeholder="What needs to be done?"]')?.focus()
      }

      // Escape to clear all selections
      if (e.key === 'Escape') {
        document.activeElement?.blur()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])


  const markAllComplete = () => {
    todos.forEach(todo => {
      if (!todo.completed) {
        toggleTodo(todo.id, true)
      }
    })
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const hasCompletedTodos = completedCount > 0

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white py-8">
     
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <DarkModeToggle/>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              My Todo App
            </CardTitle>
            <p className="text-center text-gray-600">
              Stay organized and get things done!
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Add Todo Form */}
            {/* <AddTodoForm onAddTodo={addTodo} /> */}
            <AddTodo onAddTodo={addTodo} />

            {/* Bulk Actions */}
            {todos.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllComplete}
                  disabled={todos.every(todo => todo.completed)}
                >
                  Mark All Complete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCompleted}
                  disabled={!hasCompletedTodos}
                >
                  Clear Completed ({completedCount})
                </Button>
              </div>
            )}

            {/* Todo List */}
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm mt-8">
          <p>Built with React and shadcn/ui</p>
          <p className="mt-2">
            💡 Pro tip: Double-click any todo to edit it quickly!
          </p>
        </footer>
      </div>
    </div>
  )
}
