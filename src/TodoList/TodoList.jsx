import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import TodoItem from '@/TodoItem/TodoItem'


export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
    const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'

    // Filter todos based on current filter
    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed
        if (filter === 'completed') return todo.completed
        return true // 'all'
    })

    // Get counts for different states
    const totalTodos = todos.length
    const completedTodos = todos.filter(todo => todo.completed).length
    const activeTodos = totalTodos - completedTodos

    if (totalTodos === 0) {
        return (
            <Alert>
                <AlertDescription>
                    No todos yet. Add one above to get started!
                </AlertDescription>
            </Alert>
        )
    }

    return (
        <div className="space-y-4 bg-white text-black dark:bg-gray-900 dark:text-white">
            {/* Filter buttons */}
            <div className="flex gap-2 flex-wrap">
                <Button
                    variant={filter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('all')}
                >
                    All ({totalTodos})
                </Button>
                <Button
                    variant={filter === 'active' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('active')}
                >
                    Active ({activeTodos})
                </Button>
                <Button
                    variant={filter === 'completed' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('completed')}
                >
                    Completed ({completedTodos})
                </Button>
            </div>

            {/* Todo items */}
            <div className="space-y-2">
                {filteredTodos.length === 0 ? (
                    <Alert>
                        <AlertDescription>
                            No {filter} todos found.
                        </AlertDescription>
                    </Alert>
                ) : (
                    filteredTodos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))
                )}
            </div>

            {/* Summary */}
            {totalTodos > 0 && (
                <div className="text-sm text-gray-500 text-center">
                    {completedTodos} of {totalTodos} tasks completed
                </div>
            )}
        </div>
    )
}
