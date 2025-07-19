import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim() && editText.trim() !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleEditCancel();
    }
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-md bg-white text-black dark:bg-gray-900 dark:text-white">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={(checked) => onToggle(todo.id, checked)}
            id={`todo-${todo.id}`}
            className="h-5 w-5  border-2  border-gray-400 rounded-sm data-[state=checked]:bg-black data-[state=checked]:text-white   dark:border-gray-300  dark:data-[state=checked]:bg-white dark:data-[state=checked]:text-black"
          />

          <div className="flex-1">
            {isEditing ? (
              <form onSubmit={handleEditSubmit} className="flex gap-2">
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                  autoFocus
                  maxLength={100}
                />
                <Button type="submit" size="sm" variant="outline" className="dark:bg-green-300 dark:text-black bg-green-500">
                  Save
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={handleEditCancel}
                   className="bg-red-500"
                >
                  Cancel
                </Button>
              </form>
            ) : (
              <div
                className={`flex-1 ${todo.completed ? "line-through text-gray-500" : ""
                  }`}
                onDoubleClick={() => setIsEditing(true)}
              >
                <span className="cursor-pointer select-none">{todo.text}</span>
                <span className="text-xs text-gray-400 ml-2">
                  (double-click to edit)
                </span>
              </div>
            )}
            {!isEditing && (
              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="dark:bg-green-300 dark:text-black bg-green-500"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(todo.id)}
                  className="dark:bg-red-600"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-2">
          Created: {new Date(todo.createdAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};


export default TodoItem;
