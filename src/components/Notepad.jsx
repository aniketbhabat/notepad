
import React from 'react';
 import MDEditor from "@uiw/react-md-editor"; 
import { useEffect, useState } from "react"; 
import AddCircleIcon from '@mui/icons-material/AddCircle'; 
import Note from "./Note";
import './Notepad.css'; 

function Notepad() {
  const [currentNote, setCurrentNote] = useState(0);

  // State to keep track of all notes, initially getting from localStorage if available
  const [notes, setNotes] = useState(
    localStorage.getItem("notes") === null 
    ? [{ title: "# Enter title here", content: "# Enter title here" }] 
    : JSON.parse(localStorage.getItem("notes"))
  );

  // Function to add a new note
  function addNote() {
    setNotes([...notes, {
      title: "# Enter title here",
      content: "# Enter title here",
    }]);
  }

  // Function to delete a note based on its index
  function deleteNote(e, idx) {CDATASection
    e.stopPropagation(); // Prevents triggering the changeCurrentNote function
    const copyNote = [...notes]; // Create a copy of the notes array
    copyNote.splice(idx, 1); // Remove the note at the given index
    setNotes(copyNote); // Update the notes state
    if (currentNote === idx && notes.length > 1) {
      setCurrentNote(0); // Reset to the first note if the current note is deleted
    } else if (currentNote > idx) {
      setCurrentNote(currentNote - 1); // Adjust current note index if necessary
    }
  }

  // Function to change the currently selected note
  function changeCurrentNote(e, index) {
    setCurrentNote(index);
  }

  // Function to handle changes in the content of the note
  function changesToNoteContent(text) {
    let copyNote = [...notes]; // Create a copy of the notes array
    copyNote[currentNote].content = text; // Update the content of the current note
    copyNote[currentNote].title = text.split("\n")[0]; // Set the title to the first line of the content
    setNotes(copyNote); // Update the notes state
  }

  // useEffect hook to save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  return (
    <>
      <div className="container">
        <div className="left">
          <div className="heading">
            <h2>Notes</h2>
            <AddCircleIcon style={{ cursor: "pointer" }} onClick={addNote} />
          </div>
          <div className="notes-container">
            {notes.map((note, index) => (
              <Note
                key={index}
                deleteNote={deleteNote}
                id={index}
                changeCurrentNote={changeCurrentNote}
                title={note.title}
              />
            ))}
          </div>
        </div>
        <div className="right" data-color-mode="light">
          <MDEditor
            height={"80vh"}
            value={notes[currentNote].content}
            onChange={(value) => changesToNoteContent(value)}
            autoFocus
          />
        </div>
      </div>
    </>
  );
}

export default Notepad;