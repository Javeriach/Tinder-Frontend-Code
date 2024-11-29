import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
import EditProfile from "./EditProfile";

function Profile() {

    let navigate = useNavigate();
    let user = useSelector(store => store.user);

    if (!user) {
        navigate("/login");
        return;
    }
    return (
        <div style={{background: `linear-gradient(0deg, rgba(253,120,87,1) 0%, rgba(253,41,125,1) 100%)`}}>
           <EditProfile/>
        </div>
    )
}

export default Profile
