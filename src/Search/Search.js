import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom"
import { Datarow } from "../features/Datarow";
import { Loader } from "../features/Loader";
import { searchTerm as performSearch } from "./SearchSlice";
import "./Search.css";

export function Search(props) {
    const [searchTerm] = useSearchParams();
    const dispatch = useDispatch();
    const endpoint = "https://www.reddit.com/r/popular/search.json?q=" + searchTerm.get("q");
    const search = useSelector(state => state.search);
    useEffect(() => {
        dispatch(performSearch(endpoint));
    }, [dispatch, endpoint]);
    return (
        <div className="search-results">
            <h2>Results for: {searchTerm.get("q")}</h2>
            {(search.isLoading && !search.loaded) ? <Loader /> : search.searchData['data']['children'].map((item, index) => {
                return <Datarow arrayData={item} key={index} showSub={true} />
            })}
        </div>
    )
}