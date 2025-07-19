import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'


const AddTodo = ({onAddTodo}) => {

    const [inputValue,setInputValue] = useState("")

    const [error,setError] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()

        // Validate Input 
        if(!inputValue.trim()) {
            setError("Please Enter a Todo Item")
            return
        }

        if (inputValue.trim().length >100){
            setError("Todo Must be Less Than 100 Characters")
            return
        }

        // Add the Todo
        onAddTodo(inputValue)

        // Clear Form
        setInputValue('')
        setError('')

      
    }

      const handleInputChange = (e) => {
            setInputValue(e.target.value)
            if(error) setError('') //Clear error when user types
        }

  return (
    <form 
    onSubmit={onSubmit}
    className='space-y-4 bg-white text-black dark:bg-gray-900 dark:text-white'>
        <div 
        className='flex gap-2'
        >
            <Input
            type="text"
            placeholder = "What needs to be done?"
            value={inputValue}
            onChange={handleInputChange}
            className={error ? 'border-red-500' : ''}
            maxLength={100}
            />

            <Button
            type="submit"
            // disabled = {!inputValue.trim()}
            className="bg-black text-white dark:bg-black dark:text-white"
            >
                Add Todo
            </Button>
        </div>
        {error && (
            <p className='text-sm text-red-500 mt-1'>{error}</p>
        )}
    </form>
    
  )
}

export default AddTodo