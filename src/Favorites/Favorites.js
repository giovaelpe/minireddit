import { useSelector } from "react-redux";

export function Favorites(props){
    const favorites = useSelector(state => state.favorites);
    return (
        <div>
            <h2>Favorite Stuff</h2>

        </div>
    );
}