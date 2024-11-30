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
        <div>
           <EditProfile/>
        </div>
    )
}

export default Profile
