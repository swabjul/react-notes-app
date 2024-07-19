import Split from "react-split";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import { notesCollection, db } from "./utils/firebase";
import { addDoc, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import './styles/App.css'


export default function App() {

  const [notes, setNotes] = useState([])
  const [currentNoteId, setCurrentNoteId] = useState("")
  const [tempNoteText, setTempNoteText] = useState("")

  const currentNote = notes.find(note => note.id === currentNoteId)
  const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt)


  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, snapshot => {

      const newArray = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      setNotes(newArray)

    })

    return unsubscribe
  }, [])

  useEffect(() => {
    if (!currentNoteId) {
      setCurrentNoteId(notes[0]?.id)
    }
  }, [notes])

  useEffect(() => {
    if(currentNote) {
      setTempNoteText(currentNote?.body)
    }
  }, [currentNote])


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (tempNoteText !== currentNote?.body) {
        updateNote(tempNoteText)
      }
    }, 500)
    return ()=> clearTimeout(timeoutId)
  }, [tempNoteText])



  async function createNewNote() {
    const newNote = {
      body: "# Type your markdown note's title here",
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    const newNoteRef = await addDoc(notesCollection, newNote)
    setCurrentNoteId(newNoteRef.id)
  }

   async function deleteNote(noteId) {
    console.log(noteId)
    const docRef = doc(db, "notes", noteId)
    console.log(docRef)
    await deleteDoc(docRef)
  }

  async function updateNote(text) {
    console.log(text)
    const docRef = doc(db, "notes", currentNoteId)
    await setDoc(docRef, {body: text, updatedAt: Date.now()}, {merge: true})
  }


  return (
    <main>
      {notes.length > 0
      ?
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
            notes={sortedNotes}
            currentNoteId={currentNoteId}
            createNewNote={createNewNote}
            deleteNote={deleteNote}
            setCurrentNoteId={setCurrentNoteId}
          />
          <Editor 
            tempNoteText={tempNoteText}
            setTempNoteText={setTempNoteText}
          />
        </Split>
      :
        <div className="intro">
          <h2>You have no notes</h2>
          <button onClick={createNewNote}>Create one now</button>
        </div>
      }



    </main>
  )



}




































// import { useState, useId, useEffect } from "react";
// import Editor from "./components/Editor";
// import Sidebar from "./components/Sidebar";
// import Split from "react-split";
// import "./styles/App.css"
// import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
// import { notesCollection, db } from "./utils/firebase";

// export default function App() {


//   const [notes, setNotes] = useState([])

//   const [currentNoteId, setCurrentNoteId] = useState("")

//   const [currentNote, setCurrentNote] = useState("")

//   useEffect(() => {
//     const unsubscribe = onSnapshot(notesCollection, snapshot => {
//       const notesArray = snapshot.docs.map(doc => ({
//         ...doc.data(),
//         id: doc.id
//       }))
//       setNotes(notesArray)
//     })

//     return unsubscribe
//   },[])

//   useEffect(() => {
//     if(!currentNoteId) {
//       setCurrentNoteId(notes[0]?.id)
//     }
//   },[notes])


//   useEffect(() => {
//     if (!setCurrentNote) {
//       setCurrentNote(notes[0])
//     }
//     // setCurrentNote(notes.find(note => note.id === currentNoteId))
//     // console.log("CHANGEE")
//   }, [])


//   async function createNewNote() {
//     const newNote = {
//       body: `# Type your markdown note's title here ${notes.length + 1}`
//     }

//     const newNoteRef = await addDoc(notesCollection, newNote)
//     setCurrentNoteId(newNoteRef.id)
//   }

//   async function deleteNote(noteId) {
//     const docRef = doc(db, "notes", noteId)
//     await deleteDoc(docRef)
//   }



//   const textareaElem = document.querySelector(".editor-txt-area");

//   function onChangeText(event) {
//     const docRef = doc(db, "notes", currentNoteId)
//     setDoc(docRef, {body: event.target.value}, {merge: true})
//   }



//   return (
//     <main>
//       <Split
//         sizes={[25, 75]}
//         minSize={100}
//         expandToMin={false}
//         gutterSize={10}
//         gutterAlign="center"
//         snapOffset={30}
//         dragInterval={1}
//         direction="horizontal"
//         cursor="col-resize"
//         className="split"
//       >
//         <Sidebar 
//           notes={notes}
//           createNewNote={createNewNote}
//           deleteNote={deleteNote}
//           currentNoteId={currentNoteId}
//           setCurrentNoteId={setCurrentNoteId}
//         />
//         <Editor 
//           onChangeText={onChangeText}
//           currentNote={currentNote}
//         />
//       </Split>

//     </main>
//   )
// }
















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
