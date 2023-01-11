import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPopular } from "./popularSlice";
import { Loader } from "../features/Loader"
import "./Popularfeed.css"
import { Link } from "react-router-dom";

export function Popularfeed(props) {
    const dispatch = useDispatch();
    const popularFeed = useSelector(state => state.popularFeed);
    useEffect(() => {
        dispatch(loadPopular());
        console.log("se ejecuta");
    }, [dispatch])

    const renderPost = (obj) => {
        if (obj['data']['url'].indexOf(".jpg") !== -1 || obj['data']['url'].indexOf(".png") !== -1 || obj['data']['url'].indexOf(".gif") !== -1) {
            return <img src={obj['data']['url']} alt="reddit post" />
        }
        else {
            return <a href={obj['data']['url']} target="_blank" rel="noreferrer">{obj['data']['url']}</a>
        }
    }
    return (
        <div>
            {(popularFeed.isLoading && !popularFeed.loaded) ? <Loader /> : popularFeed.redditData['data']['children'].map((item, index) => {
                return (
                    <div key={index} className="data-row">
                        <div className="row-top">
                            <span>Author: {item['data']['author']}</span>
                            <span>Subreddit: &nbsp;
                                <Link to={"/subreddit/" + item['data']['subreddit']} >
                                    {item['data']['subreddit']}
                                </Link>
                            </span>
                        </div>
                        <h2>{item['data']['title']}</h2>
                        {renderPost(item)}
                        <div className="row-footer">
                            <span className="material-symbols-outlined">arrow_upward</span>
                            <span>{item['data']['upvote_ratio']}</span>
                            <span className="material-symbols-outlined">arrow_downward</span>
                            <span>{item['data']['num_comments']}</span>
                            <span className="material-symbols-outlined">comment</span>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}