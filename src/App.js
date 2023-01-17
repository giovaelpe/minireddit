import React, { useState } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Favorites } from './Favorites/Favorites';
import { Popularfeed } from './Popularfeed/Popularfeed';
import { Post } from './Post/Post';
import { Search } from './Search/Search';
import { Subreddit } from './Subreddit/Subredditfeed';


function App() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search?q="+search);
    setSearch("");
  }
  const handleType = ({target}) => {
    setSearch(target.value);
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
            <input type="text" onChange={handleType} value={search} required />
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
          <Route path='/favorites' element={
            <Favorites />
          } />
          <Route path='/search' element={<Search />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
