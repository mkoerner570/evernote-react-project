import { csrfFetch } from "./csrf";

const LOAD = 'notes/LOAD';
const LOAD_NOTE = "notes/loadnote"
const ADD_ONE = 'notes/ADD_ONE';

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

export const getNotes = () => async dispatch => {
    const response = await fetch(`/api/notes`);
    if (response.ok) {
        const item = await response.json();
        dispatch(addOneNote(item));
    }
}

export const getOneNote = (id) => async dispatch => {
    const response = await fetch(`/api/notes/${id}`);
    console.log("=====================================",response)
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
    console.log("++++++++++++++++++++++++++++++++++++++++++++++",state)
    switch (action.type) {
        case LOAD: {
            const allNotes = {};
            action.list.forEach(notes => {
              allNotes[notes.id] = notes;
            });
            console.log("77777777777777", allNotes)
            return {
              allNotes,
            };
        }
        case LOAD_NOTE:
            newState = Object.assign({}, state)
            console.log("77777777777777", newState)
            return newState
        case ADD_ONE:
            newState = Object.assign({}, state)
            newState.currentNote = action.note
            console.log("77777777777777", newState)
            return newState
        default:
            console.log("77777777777777", state)
            return state;
    }
};


export default noteReducer;
