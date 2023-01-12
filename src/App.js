import React from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Popularfeed } from './Popularfeed/Popularfeed';
import { Post } from './Post/Post';
import { Subreddit } from './Subreddit/Subredditfeed';


function App() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search");
  }
  return (
    <div className="App">
      <header>
        <h1>
          Minireddit
          <img src={require('./resources/reddit-logo.png')} alt="reddit logo" />
        </h1>
        <nav>
          <NavLink to="/" className="nav-link" style={({isActive}) => isActive? {backgroundColor: "black", color: "white"}: undefined} >
            <span className='only-desktop'>Home</span>
            <span className="material-symbols-outlined">
              home
            </span>
          </NavLink>
          <NavLink to="/about" className="nav-link" style={({isActive}) => isActive? {backgroundColor: "black", color: "white"}: undefined} >
            <span className='only-desktop'>About</span>
            <span className="material-symbols-outlined">
              info
            </span>
          </NavLink>
          <NavLink to="/favorites" className="nav-link" style={({isActive}) => isActive? {backgroundColor: "black", color: "white"}: undefined} >
            <span className='only-desktop'>Favorites</span>
            <span className="material-symbols-outlined">
              bookmark
            </span>
          </NavLink>
          <form onSubmit={handleSubmit}>
            <input type="text" />
            <input type="submit" className="material-symbols-outlined" value="search" />
          </form>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Popularfeed />} />
          <Route path='/subreddit/:subredditname' element={
            <Subreddit />
          } />
          <Route path='/post/:postname' element={
            <Post />
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
