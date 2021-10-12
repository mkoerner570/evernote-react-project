import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getNote } from "../../store/notes";


const NoteDetail = () => {
    const userId = useSelector(state => state.session.user.id)
    // const note = useSelector(state => state.notes)

    // const noteId  = useParams();
    const dispatch = useDispatch();

    console.log(userId)
    // console.log("//////////////",note)
    // console.log(noteId)

    useEffect(() => {
        dispatch(getNote(userId));
        // setShowEditPokeForm(false);
        // setEditItemId(null);
    }, [userId,dispatch]);

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
