
import { Link } from 'react-router-dom';
import BackgroundImage1 from '../Images/BackgroundImage1.png';

function HomePage() {
  return (
        <div
          className="bg-cover h-screen relative"
          style={{ backgroundImage: `url(${BackgroundImage1})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-[0.8]"></div>
          {/* Content on top of overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <h1 className="text-8xl max-[700px]:text-[50px] font-bold  text-center">Start Something epic</h1>
              <Link to={"/login"}>
              <button className="btn max-[500px]:mt-8  bg-pink-700 text-[20px] h-[60px] rounded-full">
              Login Now
            </button>
              </Link>
             
          </div>
        </div>
     
  );
}

export default HomePage;
