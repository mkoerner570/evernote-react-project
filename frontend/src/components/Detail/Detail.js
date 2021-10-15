import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { deleteNote, getOneNote } from "../../store/notes";
import { useHistory, useParams } from 'react-router';
// import { NavLink } from 'react-router-dom';
// import Edit from '../Edit/Edit';
// import { Route } from 'react-router';
// import { Dispatch } from 'react';


const Detail = ({ notes }) => {
    const noteId = useParams()
    const dispatch = useDispatch();
    const currentNote = useSelector((state) => state.notes.currentNote);
    const currentNotebook = useSelector((state) => state.notebooks.currentNotebook);
    const [deleteRequest,setDeleteRequest] = useState(false)
    const [editRequest, setEditRequest] = useState(false)
    const history = useHistory()

    const test = {};
    if(currentNote !== undefined){
        currentNote.forEach(ele => {
            test[ele.id] = ele
        });
    }

    const test2 = {}
    if(currentNotebook !== undefined){
        currentNotebook.forEach(ele => {
            test2[ele.id] = ele
        });
    }

    const content = test[+noteId.Id]?.contents
    const Name = test[+noteId.Id]?.title
    const id = test[+noteId.Id]?.id
    const book = test[+noteId.Id]?.noteBookId
    const book2 = Object.values(test2);
    const theBook = book2.find(note => note.id === book)

    useEffect(() => {
        if (noteId.id) {
            dispatch(getOneNote(id));
        }
    }, [id,dispatch]);

    useEffect(() => {
        if(deleteRequest){
            dispatch(deleteNote(noteId.Id));
            history.push('/')
        }
    }, [deleteRequest]);

    useEffect(() => {
        if (editRequest) {
            history.push(`/note/${id}/edit`)
        }
    }, [editRequest]);

    return (
        <div className="content">
            <h2 id="noteName">{Name}</h2>
            <p id="theText">{content}</p>
            <h2 id="placement">In NoteBook:</h2>
            <h3 id="bookName">{theBook.title}</h3>
            <div className="change">
                <button id="setEdit" onClick={() => setEditRequest(true)}>Edit Note</button>
                <button id="setDelete" onClick={() => setDeleteRequest(true)}>Delete Note</button>
            </div>
        </div>

    )
}

export default Detail;
