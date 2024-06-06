import FaqAbout from "../components/Home/FaqAbout";
import Hero from "../components/Home/Hero";
import HowWork from "../components/Home/HowWork";
import MostVote from "../components/Home/MostVote";
import RecentSurvey from "../components/Home/RecentSurvey";


const Home = () => {
  return (
    <div>
      <Hero />
      <MostVote />
      <RecentSurvey/>
      <HowWork/>
      <FaqAbout/>
    </div>
  );
};

export default Home;
