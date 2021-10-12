import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOneNote } from "../../store/notes";
import { useParams } from 'react-router';
import { Dispatch } from 'react';


const Detail = ({ notes }) => {
    const currentTitle = useSelector(state => state.notes.currentNote)
    // const selectedNote = notes.find()
    const noteId = useParams()
    const dispatch = useDispatch();
    console.log(noteId)
    console.log(notes)
    const display = notes.map(note => Object.values(note))
    console.log(display)
    
    useEffect(() => {
        if (noteId) {
            dispatch(getOneNote(noteId));
        }
    }, [noteId,dispatch]);

    return (
        <div>
            <p>thigns</p>
        </div>
    )
}

export default Detail;
