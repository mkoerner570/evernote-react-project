import React, { useState } from "react";
import * as notesAction from "../../store/notes";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";


function NotesForm({ hideForm }) {
    const dispatch = useDispatch()
    const currentNotebook = useSelector((state) => state.notebooks.currentNotebook);
    const [title,setTitle] = useState("");
    const [contents,setContent] = useState("")
    const [noteBookId,setNoteBookId] = useState(0)
    const history = useHistory()

    const test = {};
    if(currentNotebook !== undefined){
        currentNotebook.forEach(ele => {
            test[ele.id] = ele
        });
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let newNote = dispatch(notesAction.writeNote({ noteBookId, title, contents}))
        if(newNote){
            history.push(`/`)
        }
    }

    return (
        <form className="noteForm" onSubmit={handleSubmit}>
            <label className="noteForms">
                <input
                    id='title'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title..."
                    required
                />
                <textarea
                    id='note'
                    type="textarea"
                    value={contents}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Your note here"
                />
                <select value={noteBookId} onChange={(e) => setNoteBookId(e.target.value)}>
                    {currentNotebook?.map(book => (
                        <option key={book.id} value={book.id}> {book.title} </option>
                    ))}
                </select>
            </label>
            <button id="submit" type="submit">Submit</button>
        </form>
    )
}


export default NotesForm;
