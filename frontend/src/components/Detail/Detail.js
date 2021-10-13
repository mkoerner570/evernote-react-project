import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteNote, getOneNote } from "../../store/notes";
import { useHistory, useParams } from 'react-router';
import { Dispatch } from 'react';


const Detail = ({ notes }) => {
    const noteId = useParams()
    const dispatch = useDispatch();
    const currentNote = useSelector((state) => state.notes.currentNote);
    const [deleteRequest,setDeleteRequest] = useState(false)
    const history = useHistory()

    const test = {};
    if(currentNote !== undefined){
        currentNote.forEach(ele => {
            test[ele.id] = ele
        });
    }

    const content = test[+noteId.Id]?.contents

    useEffect(() => {
        if (noteId.id) {
            dispatch(getOneNote(noteId.id));
        }
    }, [noteId.id,dispatch]);

    useEffect(() => {
        if(deleteRequest){
            console.log(noteId.Id)
            dispatch(deleteNote(noteId.Id));
            // history.push('/')
        }
    }, [deleteRequest]);

    // useEffect(() => {
    //     if (noteId.id) {
    //         dispatch(getOneNote(noteId.id));
    //     }
    // }, [noteId.id,dispatch]);

    return (
        <div className="content">
            <p>{content}</p>
            <div>
                <button >Edit Note</button>
                <button onClick={() => setDeleteRequest(true)}>Delete Note</button>
            </div>
        </div>

    )
}

export default Detail;
