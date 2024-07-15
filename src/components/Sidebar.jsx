export default function Sidebar() {






  return (
    <div className="sidebar">
      <div className="sidebar--header">
          <h2 className="sidebar--title">Notes</h2>
          <button className="sidebar--new-button"> + </button>
      </div>
      <div className="sidebar--body">
        <div className="notes-list">
          <h3 className="notes-list--text">texxxxxxxxxxxxxxxt</h3>
          <button className="note-list--delete-btn"><i className="icon-delete"></i></button>
        </div>
        <div className="notes-list">
          <h3 className="notes-list--text">texxxxxxxxxxxxxxxt</h3>
          <button className="note-list--delete-btn"><i className="icon-delete"></i></button>
        </div>
      </div>
    </div>
  )
}