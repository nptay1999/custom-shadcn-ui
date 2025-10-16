import { useState } from 'react'
import Button from '@ui/Button'

function App() {
  const [state] = useState('test')

  return (
    <>
      <h1 className="text-blue-500">Hello world, {state}</h1>
      <div className="flex items-center gap-4 p-4">
        <Button variant="default">Button</Button>
        <Button variant="destructive">Button</Button>
        <Button variant="ghost">Button</Button>
        <Button variant="link">Button</Button>
        <Button variant="secondary">Button</Button>
      </div>
    </>
  )
}

export default App
