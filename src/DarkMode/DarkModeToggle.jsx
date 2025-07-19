import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)

  // Toggle dark mode and save preference
  const toggleDarkMode = () => {
    const newDark = !isDark
    setIsDark(newDark)
    localStorage.setItem('darkMode', newDark)
    document.documentElement.classList.toggle('dark', newDark)
  }

  // Check saved preference on load
  useEffect(() => {
    const savedDark = localStorage.getItem('darkMode') === 'true'
    setIsDark(savedDark)
    document.documentElement.classList.toggle('dark', savedDark)
  }, [])

  return (
    <Button
    //   variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      title="Toggle dark mode"
      className= "mx-10 flex align-middle"
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  )
}
