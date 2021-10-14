import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import NotesForm from '../NotesForm/NotesForm';
import NotesBooksForm from '../NotebooksForm/NotebooksForm'
import './Navigation.css';
import NoteDetail from '../Notes/Note';
import Search from '../Search/Search';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <nav className="nav">
      <NavLink className="homename" exact to="/">
      <img id="icon" src="https://res.cloudinary.com/duqceaiyi/image/upload/v1634239823/dumbbell-64_ran5ph.png">
        </img>
      </NavLink>
      <div className="user">
        {isLoaded && sessionLinks}
      </div>
      <Search />
      <NavLink to="/NotesForm">Notes</NavLink>
      <NavLink to="/NotesBooksForm">Create a New NoteBook?</NavLink>
      {/* <NoteDetail /> */}
    </nav>
  );
}

export default Navigation;
