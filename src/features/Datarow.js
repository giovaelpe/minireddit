import { Link } from "react-router-dom";
import "./Datarow.css";

export function Datarow(props) {
    const renderPost = (obj) => {
        if (obj['data']['url'].indexOf(".jpg") !== -1 || obj['data']['url'].indexOf(".png") !== -1 || obj['data']['url'].indexOf(".gif") !== -1) {
            return <img src={obj['data']['url']} alt="reddit post" />
        }
        else {
            return <a href={obj['data']['url']} target="_blank" rel="noreferrer">{obj['data']['url']}</a>
        }
    }

    return (
        <div className="data-row">
            <div className="row-top">
                <span>Author: {props.arrayData['data']['author']}</span>
                <span>Subreddit: &nbsp;
                    <Link to={"/subreddit/" + props.arrayData['data']['subreddit']} >
                        {props.arrayData['data']['subreddit']}
                    </Link>
                </span>
            </div>
            <h2>{props.arrayData['data']['title']}</h2>
            {renderPost(props.arrayData)}
            <div className="row-footer">
                <span className="material-symbols-outlined">arrow_upward</span>
                <span>{props.arrayData['data']['upvote_ratio']}</span>
                <span className="material-symbols-outlined">arrow_downward</span>
                <span>{props.arrayData['data']['num_comments']}</span>
                <span className="material-symbols-outlined">comment</span>
            </div>
        </div>
    );
}