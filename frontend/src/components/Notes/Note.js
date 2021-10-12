import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getOneNote } from "../../store/notes";
import { Route } from 'react-router';
import Detail from "../Detail/Detail"


const NoteDetail = () => {
    const userId = useSelector((state) => state.session.user?.id);
    const currentNote = useSelector((state) => state.notes.currentNote);
    const [selected, SetSelected] = useState("")
    const dispatch = useDispatch();

    useEffect(() => {
        if (userId) {
            dispatch(getOneNote(userId));
        }
    }, [userId,dispatch]);

    return (
        <div className="note">
            <div className="noteTitle">
                <div>
                    {currentNote?.map( note => (
                        <NavLink to={`/note/${note.id}`}> ({note.title}) </NavLink>
                    ))}
                </div>
            </div>
            <Route path="/note/:id">
                <Detail notes={currentNote}/>
            </Route>
        </div>
    )
}

export default NoteDetail;
