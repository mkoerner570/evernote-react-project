import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import NotesForm from "./components/NotesForm/NotesForm";
import NoteDetail from "./components/Notes/Note";
import Detail from "./components/Detail/Detail"
import "./index.css"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
        {/* <NoteDetail /> */}
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
      <Route path="/NotesForm">
        <NotesForm />
      </Route>

    </>
  );
}

export default App;
