import { csrfFetch } from "./csrf";

const LOAD = 'session/LOAD';
const LOAD_NOTE = "session/loadnote"
const ADD_ONE = 'session/ADD_ONE';

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

export const getNote = (id) => async dispatch => {
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


const initialState = {};

const noteReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD: {
            const allNotes = {};
            action.list.forEach(notes => {
              allNotes[notes.id] = notes;
            });
            return {
              ...allNotes,
              ...state,
            };
        }
        case LOAD_NOTE:
            newState = Object.assign({}, state)
            return newState
        case ADD_ONE:
            newState = Object.assign({}, state)
            newState.currentNote = action.note
            return newState
        default:
            return state;
    }
};


export default noteReducer;
