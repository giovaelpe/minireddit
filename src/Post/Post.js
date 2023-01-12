import { useLocation, useParams } from "react-router-dom";

export function Post(props){
    const {postid} = useParams();
    const location = useLocation();
    
    return (
        <div>
            
        </div>
    );
}