import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Datarow } from "../features/Datarow";
import { Loader } from "../features/Loader";
import "./Subreddit.css";
import { loadSubreddit } from "./subredditSlice";

export function Subreddit(props) {
    window.scrollTo(0,0);
    const { subredditname } = useParams();
    const navigate = useNavigate();
    const subredditData = useSelector(state => state.subredditData);
    const endpoint = "https://www.reddit.com/r/"+subredditname+".json";
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadSubreddit(endpoint));
    },[dispatch, endpoint]);
    return (
        <div className="subreddit-container">
            <div className="header">
                <button className="material-symbols-outlined"
                onClick={() => navigate(-1)}
                >arrow_back</button>
                <h2>Subreddit : {subredditname}</h2>
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