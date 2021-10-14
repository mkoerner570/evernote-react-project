import { csrfFetch } from "./csrf";

const LOAD = 'notesbooks/LOAD';
const LOAD_NOTE = "notesbooks/loadnotebook"
const ADD_ONE = 'notesbooks/ADD_ONE';
const REMOVE_NOTE = "notesbooks/REMOVE_NOTE";
const UPDATE_NOTE = "notesbooks/UPDATE_NOTE";

const load = list => ({
    type: LOAD,
    list,
});

const loadnotebook = (notebook) => {
    return{
        type: LOAD_NOTE,
        notebook,
    }
}

const addOneNotebook = notebook => ({
    type: ADD_ONE,
    notebook,
});

const remove = (notebookId) => ({
    type: REMOVE_NOTE,
    notebookId,
});

const update = (notebookId) => ({
    type: UPDATE_NOTE,
    notebookId,
});

export const getNotes = () => async dispatch => {
    const response = await fetch(`/api/notebooks`);
    if (response.ok) {
        const item = await response.json();
        dispatch(addOneNotebook(item));
    }
}

export const getOneNotebook = (id) => async dispatch => {
    const response = await fetch(`/api/notebooks/${id}`);
    if (response.ok) {
        const item = await response.json();
        dispatch(addOneNotebook(item));
    }
}

export const makeNotebook = (notebook) => async(dispatch) => {
    const {userId, title,contents} = notebook;
    const response = await csrfFetch("/api/notebooks", {
        method:"POST",
        body: JSON.stringify({
            userId,
            title,
        }),
    });
    const data = await response.json();
    dispatch(loadnotebook(data.note));
    return response;
}

export const editNotebook = (id, title, contents) => async dispatch => {
    let payload = {id, title, contents}
    const response = await csrfFetch(`/api/notebooks/${id}`,{
      method:'PUT',
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const item = await response.json();
      dispatch(update(item));
      return item
    }
};

export const deleteNotebook = (notebookId) => async dispatch => {
    const response = await csrfFetch(`/api/notebooks/${notebookId}`,{
        method:'DELETE',
        headers: {'Content-Type': 'application/json',},
        // body: JSON.stringify(noteId),
    })
    return response;
}


const initialState = {};

const noteBookReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD: {
            const allNotes = {};
            action.forEach(notes => {
              allNotes[notes.id] = notes;
            });
            return {
              allNotes,
            };
        }
        case LOAD_NOTE:
            newState = Object.assign({}, state)
            return newState
        case ADD_ONE:
            newState = Object.assign({}, state)
            newState.currentNotebook = action.note
            return newState
        case UPDATE_NOTE: {
            return {
              ...state,
              [action.item.id]: action.item,
            };
        }
        case REMOVE_NOTE: {
            const newState = { ...state };
            delete newState[action.itemId];
            return newState;
        }
        default:
            return state;
    }
};


export default noteBookReducer;
