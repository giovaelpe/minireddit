import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addSub, removeSub } from "../Favorites/favoritesSlice";
import { Datarow } from "../features/Datarow";
import { Loader } from "../features/Loader";
import "./Subreddit.css";
import { loadSubreddit, clean } from "./subredditSlice";

export function Subreddit(props) {
    window.scrollTo(0,0);
    const { subredditname } = useParams();
    const navigate = useNavigate();
    const subredditData = useSelector(state => state.subredditData);
    const endpoint = "https://www.reddit.com/r/"+subredditname+".json";
    const location = useLocation();
    const favoritesSubs = useSelector(state => state.favorites.subs);
    const [added, setAdded] = useState(prev => {
        if(favoritesSubs.includes(location.pathname)){
            return true;
        } else {
            return false;
        }
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadSubreddit(endpoint));
        return () => {
            dispatch(clean());
        }
    },[dispatch, endpoint]);
    
    const handleFavorites = () => {
        if(added){
            dispatch(removeSub(location.pathname));
            setAdded(false);
        } else {
            dispatch(addSub(location.pathname));
            setAdded(true);
        }
    }
    return (
        <div className="subreddit-container">
            <div className="header">
                <button className="material-symbols-outlined"
                onClick={() => navigate(-1)}
                >arrow_back</button>
                <h2>Subreddit : {subredditname}</h2>
                <button className="material-symbols-outlined" onClick={handleFavorites} style={added? {backgroundColor: "gold"}: undefined}>
                    {added? "bookmark_added" : "bookmark_add"}
                </button>
            </div>
            <div>
                {(subredditData.isLoading && !subredditData.loaded)? <Loader /> : subredditData.redditData['data']['children'].map((item, index) => {
                    return (
                        <Datarow arrayData={item} key={index} showSub={false} />
                    );
                })}
            </div>
        </div>
    );
}