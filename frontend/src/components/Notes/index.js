import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getNotes } from '../../store/notes';

const NoteBrowser = () => {
  const { noteId } = useParams();
  const notes = Object.values(useSelector(state => state.notes))
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes())
  }, [dispatch])

  return (
    <main>
      <nav>
        {notes.map((note) => {
          return (
            <NavLink key={note.name} to={`/song/${note.id}`}>
              <div
                className={
                  Number.parseInt(noteId) === notes.id
                    ? "nav-entry is-selected"
                    : "nav-entry"
                }>

                <div>
                  <div className="primary-text">
                      {notes.title}
                  </div>
                  <div className="secondary-text">
                    {notes.userId}
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })}
      </nav>
    </main>
  );
};

export default NoteBrowser;
