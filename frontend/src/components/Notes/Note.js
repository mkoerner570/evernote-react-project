import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNote } from "../../store/notes";


const NoteDetail = () => {
    const userId = useSelector((state) => state.session.user?.id);
    // const note = useSelector(state => state.notes)

    // const noteId  = useParams();
    const dispatch = useDispatch();

    // console.log(userId)
    // console.log("//////////////",note)
    // console.log(noteId)

    useEffect(() => {
        dispatch(getNote(userId));
        // setShowEditPokeForm(false);
        // setEditItemId(null);
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
