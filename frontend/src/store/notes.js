import { csrfFetch } from "./csrf";

const LOAD = 'notes/LOAD';
const LOAD_NOTE = "notes/loadnote"
const ADD_ONE = 'notes/ADD_ONE';
const REMOVE_NOTE = "notes/REMOVE_NOTE";
const UPDATE_NOTE = "notes/UPDATE_NOTE";

const load = list => ({
    type: LOAD,
    list,
});

const loadnote = (note) => {
    return{
        type: LOAD_NOTE,
        note,
    }
}

const addOneNote = note => ({
    type: ADD_ONE,
    note,
});

const remove = (noteId) => ({
    type: REMOVE_NOTE,
    noteId,
});

const update = (noteId) => ({
    type: UPDATE_NOTE,
    noteId,
});

export const getNotes = () => async dispatch => {
    const response = await fetch(`/api/notes`);
    if (response.ok) {
        const item = await response.json();
        dispatch(addOneNote(item));
    }
}

export const getOneNote = (id) => async dispatch => {
    const response = await fetch(`/api/notes/${id}`);
    if (response.ok) {
        const item = await response.json();
        dispatch(addOneNote(item));
    }
}

export const writeNote = (note) => async(dispatch) => {
    const {userId, title,contents} = note;
    const response = await csrfFetch("/api/notes", {
        method:"POST",
        body: JSON.stringify({
            userId,
            title,
            contents
        }),
    });
    const data = await response.json();
    dispatch(loadnote(data.note));
    return response;
}

export const editNote = (id, title, contents) => async dispatch => {
    let payload = {id, title, contents}
    console.log("testing payload==========",JSON.stringify(payload))
    const response = await csrfFetch(`/api/notes/${id}`,{
      method:'PUT',
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const item = await response.json();
      dispatch(update(item));
      return item
    }
};

export const deleteNote = (noteId) => async dispatch => {
    const response = await csrfFetch(`/api/notes/${noteId}`,{
        method:'DELETE',
        headers: {'Content-Type': 'application/json',},
        // body: JSON.stringify(noteId),
    })
    return response;
}


const initialState = {};

const noteReducer = (state = initialState, action) => {
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
            newState.currentNote = action.note
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


export default noteReducer;
