import React, { useState } from "react";
import * as notesAction from "../../store/notes";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';


function NotesForm({ hideForm }) {
    const dispatch = useDispatch()
    const[title,setTitle] = useState("");
    const[contents,setContent] = useState("")
    const history = useHistory()

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            title,
            contents
        }
        let newNote = dispatch(notesAction.writeNote({ title, contents }))
        console.log(newNote.id)
        if(newNote){
            history.push(`/`)
        }
        // return dispatch(notesAction.writeNote({ title, contents })
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
            </label>
            <button id="submit" type="submit">Submit</button>
        </form>
    )
}


export default NotesForm;
