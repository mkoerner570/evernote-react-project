import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { deleteNotebook, getOneNotebook } from "../../store/notebooks";
import { useHistory, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import Edit from '../Edit/Edit';
import { Route } from 'react-router';
// import { Dispatch } from 'react';


const BookDetail = ({ books }) => {
    const bookId = useParams()
    const dispatch = useDispatch();
    const currentNotebook = useSelector((state) => state.notebooks.currentNotebook);    const [deleteRequest,setDeleteRequest] = useState(false)
    const [editRequest, setEditRequest] = useState(false)
    const history = useHistory()

    const test = {};
    if(currentNotebook !== undefined){
        currentNotebook.forEach(ele => {
            test[ele.id] = ele
        });
    }

    // const content = test[+noteId.Id]?.contents
    const Name = test[+bookId.Id]?.title
    const id = test[+bookId.Id]?.id

    useEffect(() => {
        if (bookId.id) {
            dispatch(getOneNotebook(id));
        }
    }, [id,dispatch]);

    useEffect(() => {
        if(deleteRequest){
            dispatch(deleteNotebook(bookId.Id));
            history.push('/notes')
        }
    }, [deleteRequest]);

    useEffect(() => {
        if (editRequest) {
            console.log("things")
            history.push(`/notebook/${id}/edit`)
        }
    }, [editRequest]);

    return (
        <div className="notesInBook">
            <p>things and stuff</p>
            <p>{id}</p>
            <p>{Name}</p>
            {/* <h2>{Name}</h2>
            <p>{content}</p> */}
            <div>
                <button onClick={() => setEditRequest(true)}>Edit Note</button>
                <button onClick={() => setDeleteRequest(true)}>Delete Note</button>
            </div>
        </div>

    )
}

export default BookDetail;
