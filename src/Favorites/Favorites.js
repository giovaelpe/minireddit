import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Favorites.css"

export function Favorites(props) {
    const favPosts = useSelector(state => state.favorites.posts);
    const favSubs = useSelector(state => state.favorites.subs);
    const favExtras = useSelector(state => state.favorites.postExtras);
    return (
        <div className="favorites-container">
            <h2>Favorite Stuff</h2>
            <h3>Favorite subreddits</h3>
            <div className="subs">
                {favSubs.length === 0 ? "0 Items" : favSubs.map((item, index) => {
                    return <Link to={item} key={index} >{item}</Link>
                })}
            </div>
            <h3>Favorite posts</h3>
            <div className="posts">
                {favPosts.length === 0? "0 Items" : favPosts.map((item, index) => {
                    return <Link to={item} key={index} state={{link: favExtras[index]}} >{item}</Link>
                })}
            </div>
        </div>
    );
}