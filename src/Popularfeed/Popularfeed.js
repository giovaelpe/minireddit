import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPopular } from "./popularSlice";
import { Loader } from "../features/Loader"
import { Datarow } from "../features/Datarow";

export function Popularfeed(props) {
    const dispatch = useDispatch();
    const popularFeed = useSelector(state => state.popularFeed);
    useEffect(() => {
        dispatch(loadPopular());
    }, [dispatch])

    return (
        <div>
            {(popularFeed.isLoading && !popularFeed.loaded) ? <Loader /> : popularFeed.redditData['data']['children'].map((item, index) => {
                return <Datarow arrayData={item} key={index} showSub={true} />
            })}
        </div>
    );
}