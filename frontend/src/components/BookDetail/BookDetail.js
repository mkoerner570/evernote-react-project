import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { deleteNotebook, getOneNotebook } from "../../store/notebooks";
import { getNotes } from '../../store/notebooks';
import { useHistory, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
// import Edit from '../Edit/Edit';
// import { Route } from 'react-router';
// import { Dispatch } from 'react';


const BookDetail = ({ books }) => {
    const bookId = useParams()
    const dispatch = useDispatch();
    const currentNotebook = useSelector((state) => state.notebooks.currentNotebook);
    const currentNotes = useSelector(state => state.notes)
    const [deleteRequest,setDeleteRequest] = useState(false)
    const [editRequest, setEditRequest] = useState(false)
    const history = useHistory()

    const test = {};
    if(currentNotebook !== undefined){
        currentNotebook.forEach(ele => {
            test[ele.id] = ele
        });
    }

    // const content = test[+noteId.Id]?.contents
    const Name = test[+bookId.Id]?.title
    const id = test[+bookId.Id]?.id
    // console.log("dispatch",dispatch(getNotes(id)))

    useEffect(() => {
        if (bookId.id) {
            dispatch(getOneNotebook(id));
        }
    }, [bookId.id,dispatch]);

    useEffect(() => {
        dispatch(getNotes(id))
    },[id])

    const test2 = Object.entries(currentNotes)
    const allNotes = test2[0]
    const things = allNotes[1]
    const notesInCurrent = things.filter(note => note.noteBookId === id)

    useEffect(() => {
        if(deleteRequest){
            dispatch(deleteNotebook(bookId.Id));
            history.push('/notes')
        }
    }, [deleteRequest]);

    useEffect(() => {
        if (editRequest) {
            history.push(`/notebook/${id}/edit`)
        }
    }, [editRequest]);

    return (
        <div className="notesInBook">
            <h2>{Name}</h2>
            {notesInCurrent.map(note => (
                <ul>
                    <NavLink key={note.id} to={`/note/${note.id}`}>{note.title}</NavLink>
                </ul>
            ))}
            <div>
                <button onClick={() => setEditRequest(true)}>Edit Note</button>
                <button onClick={() => setDeleteRequest(true)}>Delete Note</button>
            </div>
        </div>

    )
}

export default BookDetail;
