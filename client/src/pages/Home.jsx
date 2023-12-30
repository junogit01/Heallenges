import OurServices from '@components/Home/OurServices/OurServices';
import Challenges from '@components/Home/Challenges/Challenges';
import SwiperImages from '@components/Home/SwiperImages/SwiperImages';

function Home() {
  return (
    <>
      {/* <Hero /> */}
      <SwiperImages />
      <OurServices />
      <Challenges />
    </>
  );
}

export default Home;
