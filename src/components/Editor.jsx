export default function Editor(props) {

  return (
    <textarea
      className="editor-txt-area"
      value={props.tempNoteText}
      onChange={(event) => props.setTempNoteText(event.target.value)}
    ></textarea>
  )
}
