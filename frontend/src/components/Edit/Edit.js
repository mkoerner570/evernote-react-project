import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, getOneNote } from "../../store/notes";
import { useHistory, useParams } from 'react-router';
import * as notesAction from "../../store/notes";

const Edit = ({ notes }) => {
    const noteId = useParams()
    const dispatch = useDispatch();
    const currentNote = useSelector((state) => state.notes.currentNote);
    const userId = useSelector((state) => state.session.user?.id);

    const history = useHistory()

    const test = {};
    if(currentNote !== undefined){
        currentNote.forEach(ele => {
            test[ele.id] = ele
        });
    }
    const titles = test[+noteId.Id]?.title
    const content = test[+noteId.Id]?.contents

    console.log("noteId",noteId.Id)
    console.log(currentNote)
    console.log(content)
    console.log("title.....", titles)

    const[editedTitle,setEditedTitle] = useState("");
    const[editContents,setEditContent] = useState("")

    const handleEdit = (e) => {
        e.preventDefault();
        const payload = {
            editedTitle,
            editContents
        }
        let editedNote = dispatch(notesAction.editNote(payload))
        console.log(editedNote)
        if(editedNote){
            history.push(`/note/${noteId.Id}`)
        }
        // return dispatch(notesAction.writeNote({ title, contents })
    }

    return(
        <form className="noteForm" onSubmit={handleEdit}>
            <label className="noteForms">
                <input
                    id='title'
                    type="text"
                    value={titles}
                    onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                    id='note'
                    type="textarea"
                    value={content}
                    onChange={(e) => setEditContent(e.target.value)}
                />
            </label>
            <button id="submit" type="submit">Submit</button>
        </form>
    )
}

export default Edit
