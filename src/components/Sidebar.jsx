export default function Sidebar(props) {

  const notesElem = props.notes.map(note => {
    return (
      <div
        key={note.id}
        className={`notes-list ${note.id === props.currentNoteId ? "active" : ""}`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h3 className="notes-list--text">{note.body.split("\n")[0]}</h3>
        <button
          className="note-list--delete-btn"
          onClick={() => props.deleteNote(note.id)}
        >
          <i className="icon-delete"></i>
        </button>
      </div>
    )

  })


  return (
    <div className="sidebar">
      <div className="sidebar--header">
          <h2 className="sidebar--title">Notes</h2>
          <button
            className="sidebar--new-button"
            onClick={props.createNewNote}
          > + </button>
      </div>
      <div className="sidebar--body">
        {notesElem}
      </div>
    </div>
  )
}
