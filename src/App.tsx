import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [citations, setCitations] = useState<Array<{ id: number, text: string }>>([{ id: 0, text: '' }])
  const appVersion = import.meta.env.VITE_APP_VERSION

  useEffect(() => {
    const fetchCitation = async () => {
      try {
        const response = await fetch('/api/random')
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération de la citation')
        }
        const data = await response.json()
        setCitations(data)
      } catch (error) {
        console.error(error)
        setCitations([{ id: 0, text: 'Erreur lors du chargement de la citation.' }])
      }
    }

    fetchCitation()
  }, [])

  return (
    <>
      <div className='bg-blue-200 p-16 rounded-xl shadow-xl'>
        <h1>{citations[0].text}</h1>
      </div>

      <br />
      <br />
      <br />

      <h4>App version: {appVersion} </h4>

    </>
  )
}

export default App
