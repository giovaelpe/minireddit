import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadPost, quitPost } from "./postSlice";
import { Loader } from "../features/Loader"
import "./Post.css";
import { addPost, removePost } from "../Favorites/favoritesSlice";

export function Post(props) {
    const location = useLocation();
    const dispatch = useDispatch();
    const postData = useSelector(state => state.postData);
    const favorites = useSelector(state => state.favorites.posts);
    const endpoint = "https://www.reddit.com" + location.state.link + ".json";
    const [added, setadded] = useState(prev => {
        if (favorites.includes(location.pathname)) {
            return true;
        } else {
            return false;
        }
    });

    useEffect(() => {
        dispatch(loadPost(endpoint));

        return () => {
            dispatch(quitPost());
        }
    }, [dispatch, endpoint]);

    const addFavorites = () => {
        if (added) {
            dispatch(removePost({
                post: location.pathname,
                extras: location.state.link
            }));
            setadded(false);
        } else {
            dispatch(addPost({
                post: location.pathname,
                extras: location.state.link
            }));
            setadded(true);
        }
    }

    const renderContent = (obj) => {
        if (obj['url'].indexOf(".jpg") !== -1 || obj['url'].indexOf(".png") !== -1 || obj['url'].indexOf(".gif") !== -1) {
            return <img src={obj['url']} alt="post" />
        } else {
            return <a href={obj['url']} rel="noreferer" >{obj['url']}</a>
        }
    }

    const renderPost = () => {
        const postInfo = postData.postData[0]['data']['children'][0]['data'];
        const comments = postData.postData[1]['data']['children'];
        return (
            <div>
                <div className="post-marquee">
                    Author: {postInfo['author']}
                    <button className="material-symbols-outlined" onClick={addFavorites} style={added ? { backgroundColor: "gold" } : undefined}>
                        {added ? "bookmark_added" : "bookmark_add"}
                    </button>
                </div>
                <div className="content">
                    <h2>{postInfo['title']}</h2>
                    {postData.loaded && renderContent(postInfo)}
                    <a href={"https://www.reddit.com" + location.state.link} target="_blank" rel="noreferrer">Check out on Reddit</a>
                </div>
                <h3>Coments: </h3>
                {comments.map((item, index) => {
                    return (
                        <div className="post-comments" key={index}>
                            <strong>{item['data']['author']}:</strong>
                            <p>{item['data']['body']}</p>
                        </div>
                    );
                })}
            </div>
        )
    }
    return (
        <div className="post-container">
            {(postData.isLoading && !postData.loaded) ? <Loader /> : renderPost()}
        </div>
    );
}