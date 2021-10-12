import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getNote } from "../../store/notes";


const NoteDetail = () => {
    const userId = useSelector(user => user.session.user.id)
    const noteId = useSelector(notes => notes)

    // const noteId  = useParams();
    const dispatch = useDispatch();

    console.log("////////////",userId)
    console.log("////////////",noteId)

    // useEffect(() => {
    //     dispatch(getNote(note));
    //     // setShowEditPokeForm(false);
    //     // setEditItemId(null);
    // }, [note,dispatch]);

    // let content = null;

    return (
        <div className="note">
            <div className="noteTitle">
                <p>things</p>
            </div>
        </div>
    )
}

export default NoteDetail;
