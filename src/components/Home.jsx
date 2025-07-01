
import { Fade } from "react-awesome-reveal";
import Banner from "./Banner";
import Counter from "./Counter";
import WhyChoose from "./WhyChoose";
import FeturedRoommate from "./FeturedRoommate";
import Marquee from "./Marquee";


const Home = () => {
  return (
    <div>
      <Banner />
      <main>
        <FeturedRoommate/>
        <Fade><Counter/></Fade>
        <Marquee/>
        <WhyChoose/>
      </main>
    </div>
  );
};

export default Home;