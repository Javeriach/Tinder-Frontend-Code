import Lottie from "lottie-react";
import EmptyChatScreenAnimation from "../../../assests/EmptyChatScreen_Animation.json";
import { useSelector } from "react-redux";
function EmptyChatContainer() {
    

    return (
        <div className="flex-1 md:bg-white md:flex flex-col justify-center hidden items-center  duration-100">
            <Lottie 
                className="h-[200px]"
                isClickToPauseDisabled={true}
                animationData={EmptyChatScreenAnimation}
            />
            <div>
                <h1 className="text-black font-semibold text-[30px] font-poppins"><span>!</span>Welcome to <span className="text-[#fe3c72]">Tinder</span>  Chat</h1>
            </div>
        </div>
    )
}

export default EmptyChatContainer
