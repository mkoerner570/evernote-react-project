import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneNote } from "../../store/notes";


const NoteDetail = () => {
    const userId = useSelector((state) => state.session.user?.id);
    const currentNote = useSelector((state) => state.notes.currentNote);

    const dispatch = useDispatch();

    console.log(currentNote)

    useEffect(() => {
        if (userId) {
            dispatch(getOneNote(userId));
        }
    }, [userId,dispatch]);

    return (
        <div className="note">
            <div className="noteTitle">
                <p>things</p>
            </div>
        </div>
    )
}

export default NoteDetail;
