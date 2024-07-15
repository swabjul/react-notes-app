import { useState, useId, useEffect } from "react";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import Split from "react-split";
import "./styles/App.css"
import { onSnapshot, addDoc, doc, deleteDoc } from "firebase/firestore";
import { notesCollection, db } from "./utils/firebase";

export default function App() {


  const [notes, setNotes] = useState([])

  const [currentNoteId, setCurrentNoteId] = useState("")

  onSnapshot

  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, snapshot => {
      const notesArray = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      setNotes(notesArray)
      console.log("Change")
    })

    return unsubscribe
  },[])

  useEffect(() => {
    if(!currentNoteId) {
      setCurrentNoteId(notes[0]?.id)
    }
  },[notes])


  async function createNewNote() {
    const newNote = {
      body: `# Type your markdown note's title here ${notes.length + 1}`
    }

    const newNoteRef = await addDoc(notesCollection, newNote)
    setCurrentNoteId(newNoteRef.id)
  }

  async function deleteNote(noteId) {
    const docRef = doc(db, "notes", noteId)
    await deleteDoc(docRef)
  }








  return (
    <main>
      <Split
        sizes={[25, 75]}
        minSize={100}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
        className="split"
      >
        <Sidebar 
          notes={notes}
          createNewNote={createNewNote}
          deleteNote={deleteNote}
          currentNoteId={currentNoteId}
          setCurrentNoteId={setCurrentNoteId}
        />
        <Editor />
      </Split>

    </main>
  )
}
















// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
