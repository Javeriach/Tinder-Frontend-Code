import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import EditProfile from "../Components/EditProfile";

function Profile() {

    let navigate = useNavigate();
    let user = useSelector(store => store.user);

    if (!user?.toString() || user==null) {
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
