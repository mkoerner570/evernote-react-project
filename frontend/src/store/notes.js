import { csrfFetch } from "./csrf";

const LOAD_NOTE = "session/loadnote"


const loadnote = (note) => {
    return{
        type: LOAD_NOTE,
        note,
    }
}

export const writeNote = (note) => async(dispatch) => {
    const {title,content} = note;
    const response = await csrfFetch("/api/notes", {
        method:"POST",
        body: JSON.stringify({
            title,
            content
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
      case LOAD_NOTE:
        newState = Object.assign({}, state)
        return newState
      default:
        return state;
    }
};


export default noteReducer;
