import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOneNote } from "../../store/notes";
import { useParams } from 'react-router';
import { Dispatch } from 'react';


const Detail = ({ notes }) => {
    const noteId = useParams()
    const dispatch = useDispatch();
    const currentNote = useSelector((state) => state.notes.currentNote);

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

    return (
        <div className="content">
            <p>{content}</p>
        </div>
    )
}

export default Detail;
