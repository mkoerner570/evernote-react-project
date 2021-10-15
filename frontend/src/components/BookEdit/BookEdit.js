import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { deleteNote, getOneNote } from "../../store/notes";
import { useHistory, useParams } from 'react-router';
import { editNotebook } from '../../store/notebooks';

const BookEdit = ({ notes }) => {
    const bookId = useParams()
    const dispatch = useDispatch();
    const currentNotebook = useSelector((state) => state.notebooks.currentNotebook);

    const history = useHistory()

    const test = {};
    if(currentNotebook !== undefined){
        currentNotebook.forEach(ele => {
            test[ele.id] = ele
        });
    }
    const titles = test[+bookId.Id]?.title
    const content = test[+bookId.Id]?.contents
    const notess = test[+bookId.Id]?.id

    const[editedTitle,setEditedTitle] = useState(titles);

    useEffect(() => {
        if(titles) setEditedTitle(titles)
    },[titles, content])

    const handleEdit = (e) => {
        e.preventDefault();

        let editedNote = dispatch(editNotebook(notess,editedTitle))
        if(editedNote){
            history.push(`/notebook`)
        }
    }

    return(
        <form className="noteForm" onSubmit={handleEdit}>
            <label>
                <h2>Edit your NoteBook</h2>
                <input
                    id='title'
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}

export default BookEdit
