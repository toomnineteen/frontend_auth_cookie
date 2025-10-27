import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
AOS.init();

const PageHome = () => {
  return (
    <div>
      <div className=""></div>
      <div
        data-aos="zoom-in"
        data-aos-duration="1500"
        className="overflow-hidden relative z-10 flex flex-col items-center justify-center h-[calc(100vh-65px)] px-4 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg animate-fade-in">
          Hello Welcome Back !!
        </h1>
        <p className="mt-4 font-medium text-lg md:text-xl max-w-2xl capitalize"></p>
        <button className="mt-8 px-6 cursor-pointer py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition transform hover:scale-105 text-white">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default PageHome;
