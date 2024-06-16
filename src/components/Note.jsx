// src/components/Note.jsx
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the Delete icon from MUI
import './Note.css'; // Import CSS for styling

function Note({ deleteNote, id, changeCurrentNote, title }) {
  return (
    <div className="note" onClick={(e) => changeCurrentNote(e, id)}>
      <p>{title}</p>
      <DeleteIcon onClick={(e) => deleteNote(e, id)} />
    </div>
  );
}

export default Note;