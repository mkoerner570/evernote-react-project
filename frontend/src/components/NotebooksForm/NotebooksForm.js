import React, { useState } from "react";
import * as notesAction from "../../store/notebooks";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';


function NotesBooksForm({ hideForm }) {
    const dispatch = useDispatch()
    const[title,setTitle] = useState("");
    // const[contents,setContent] = useState("")
    const history = useHistory()

    // const handleCancelClick = (e) => {
    //     e.preventDefault();
    //     hideForm();
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        // const payload = {
        //     title
        // }
        let newNotebook = dispatch(notesAction.makeNotebook({ title }))
        if(newNotebook){
            history.push(`/`)
        }
        // return dispatch(notesAction.writeNote({ title, contents })
    }

    return (
        // <div>
        //     <p>Things</p>
        // </div>
        <form className="noteForm" onSubmit={handleSubmit}>
            <label className="noteForms">
                <input
                    id='book'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title..."
                    required
                />
            </label>
            <button id="book" type="submit">Submit</button>
        </form>
    )
}


export default NotesBooksForm;
