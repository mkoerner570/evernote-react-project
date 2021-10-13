import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getOneNote } from "../../store/notes";
import { Route, useHistory } from 'react-router';
import Detail from "../Detail/Detail"
import Edit from '../Edit/Edit';


const NoteDetail = () => {
    const userId = useSelector((state) => state.session.user?.id);
    const currentNote = useSelector((state) => state.notes.currentNote);
    const [selected, SetSelected] = useState(null)
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        if (userId) {
            dispatch(getOneNote(userId));
        }
    }, [userId,dispatch]);

    function handleChange(value){
        history.push(`/note/${value}`)
    }

    return (
        <div className="note">
            <div className="noteTitle">
                {/* <div>
                    {currentNote?.map( note => (
                        <Link to={`/note/${note.id}`}> ({note.title}) </Link>
                    ))}
                </div> */}
                <select className="selector" value={selected} onChange={(e) => handleChange(e.target.value)}>
                    <option>Select a note</option>
                    {currentNote?.map(note => (
                        <option key={note.id} value={note.id}> {note.title} </option>
                    ))}
                </select>
            </div>
            <Route path="/note/:Id">
                <Detail notes={currentNote}/>
            </Route>
            <Route path="/note/:Id/edit">
                <Edit notes={currentNote}/>
            </Route>
        </div>
    )
}

export default NoteDetail;
