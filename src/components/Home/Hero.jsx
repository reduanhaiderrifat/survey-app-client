const Hero = () => {
  return (
    <div>
      <div
        className="hero min-h-[700px]"
        style={{
          backgroundImage: "url(https://i.ibb.co/dKt1NZ6/servey.png)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className=" space-y-4">
            <h1 className="text-6xl font-bold">
              Welcome to <span className="text-green-500">SurveySense _ </span>
            </h1>
            <h2 className="text-3xl font-bold">
              Your Gateway to Insightful Feedback
            </h2>
            <p className="max-w-2xl text-xl font-bold">
              Share your thoughts and make a difference! At SurveySense, we
              value your opinions and experiences. Participate in our surveys to
              help shape the future of products, services, and more. Your
              feedback is crucial for making informed decisions and driving
              positive change.
            </p>
            <button className="relative px-4 py-2 font-medium group">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-rose-500 border-2 border-black group-hover:bg-black"></span>
              <span className="relative text-white group-hover:text-white">
                Explore
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
