
import { Link } from 'react-router-dom';
import BackgroundImage1 from '../Images/BackgroundImage1.png';

function HomePage() {
  return (
        <div
          className="bg-cover h-screen "
          style={{ backgroundImage: `url(${BackgroundImage1})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-[0.8] h-screen"></div>
          {/* Content on top of overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <h1 className="text-8xl max-[700px]:text-[50px] max-[500px]:text-[40px] font-bold  text-center text-white">Start Something epic</h1>
              <Link to={"/login"}>
              <button type="button" class="btn text-white mt-4 max-[500px]:mt-8  bg-pink-700 text-[20px] h-[60px] rounded-full bg-gradient-to-r from-pink-500 to-orange-500  hover:from-teal-400 hover:to-blue-500  ...">
              Login Now
            </button>
              </Link>
             
          </div>
        </div>
     
  );
}

export default HomePage;
