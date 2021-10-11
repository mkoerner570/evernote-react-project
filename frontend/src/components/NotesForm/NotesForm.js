import React, { useState } from "react";
import * as notesAction from "../../store/notes";
import { useDispatch } from "react-redux";



function NotesForm() {
    const dispatch = useDispatch()
    const[title,setTitle] = useState("");
    const[content,setContent] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(notesAction.writeNote({ title, content })
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title..."
                    required
                />
                <textarea
                    id='note'
                    type="textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Your note here"
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}


export default NotesForm;
