import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteNote, getOneNote } from "../../store/notes";
import { useHistory, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import Edit from '../Edit/Edit';
import { Route } from 'react-router';
// import { Dispatch } from 'react';


const Detail = ({ notes }) => {
    const noteId = useParams()
    const dispatch = useDispatch();
    const currentNote = useSelector((state) => state.notes.currentNote);
    const [deleteRequest,setDeleteRequest] = useState(false)
    const [editRequest, setEditRequest] = useState(false)
    const history = useHistory()

    const test = {};
    if(currentNote !== undefined){
        currentNote.forEach(ele => {
            test[ele.id] = ele
        });
    }

    const content = test[+noteId.Id]?.contents
    const Name = test[+noteId.Id]?.title
    const id = test[+noteId.Id]?.id

    useEffect(() => {
        if (noteId.id) {
            dispatch(getOneNote(id));
        }
    }, [id,dispatch]);

    useEffect(() => {
        if(deleteRequest){
            console.log(noteId.Id)
            dispatch(deleteNote(noteId.Id));
            history.push('/notes')
        }
    }, [deleteRequest]);

    useEffect(() => {
        if (editRequest) {
            console.log("things")
            history.push(`/note/${id}/edit`)
        }
    }, [editRequest]);

    return (
        <div className="content">
            <h2>{Name}</h2>
            <p>{content}</p>
            <div>
                <button onClick={() => setEditRequest(true)}>Edit Note</button>
                <button onClick={() => setDeleteRequest(true)}>Delete Note</button>
            </div>
        </div>

    )
}

export default Detail;
