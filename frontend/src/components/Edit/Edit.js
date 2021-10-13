import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, getOneNote } from "../../store/notes";
import { useHistory, useParams } from 'react-router';
import { editNote } from '../../store/notes';

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
    const notess = test[+noteId.Id]?.id

    const[editedTitle,setEditedTitle] = useState(titles);
    const[editContents,setEditContents] = useState(content)

    useEffect(() => {
        if(titles) setEditedTitle(titles)
        if(content) setEditContents(content)
    },[titles, content])

    const handleEdit = (e) => {
        e.preventDefault();
        const payload = {
            notess,
            editedTitle,
            editContents
        }
        let editedNote = dispatch(editNote(notess, editedTitle,editContents))
        if(editedNote){
            history.push(`/note/${noteId.Id}`)
        }
    }

    return(
        <form className="noteForm" onSubmit={handleEdit}>
            <label className="noteForms">
                <input
                    id='title'
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                    id='note'
                    type="textarea"
                    value={editContents}
                    onChange={(e) => setEditContents(e.target.value)}
                />
            </label>
            <button id="submit" type="submit">Submit</button>
        </form>
    )
}

export default Edit
