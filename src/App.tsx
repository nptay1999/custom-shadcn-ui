import { useState } from 'react'

function App() {
  const [state] = useState('test')

  return (
    <>
      <h1 className="text-blue-500">Hello world, {state}</h1>
    </>
  )
}

export default App
