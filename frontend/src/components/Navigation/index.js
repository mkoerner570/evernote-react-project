import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import NotesForm from '../NotesForm/NotesForm';
import './Navigation.css';
import NoteDetail from '../Notes/Note';

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
      <img id="icon" src="https://www.clipartmax.com/png/small/202-2023602_dumbbell-physical-fitness-bodybuilding-icon-mancuernas-vector.png" alt="Dumbbell Physical Fitness Bodybuilding Icon - Mancuernas Vector @clipartmax.com">
        </img>
      </NavLink>
      <div className="user">
        {isLoaded && sessionLinks}
      </div>
      <NavLink to="/NotesForm">Notes</NavLink>
      <NoteDetail />
    </nav>
  );
}

export default Navigation;
