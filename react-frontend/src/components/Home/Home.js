import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import Header from "../Header/Header";
import Features from "../Features/Features";

const Home = () => {
  return (
    <div data-testid="home">
      <NavBar />
      <Header />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
