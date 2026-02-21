import MainLayout from "Layout/MainLayout";
import bgImage from "@assets/TicketPrice/bgImage.png";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <MainLayout>
      <div
        className="min-h-screen bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        {/* Overlay */}
        <div className="bg-black/70 min-h-screen">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                About Our Cinema
              </h1>
              <p className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg">
                We deliver a world-class movie experience with cutting-edge
                projection technology, immersive sound systems, and luxury
                seating designed for maximum comfort.
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
                <h2 className="text-3xl font-bold text-yellow-400">10+</h2>
                <p className="text-sm mt-2 text-gray-300">Locations</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
                <h2 className="text-3xl font-bold text-yellow-400">30+</h2>
                <p className="text-sm mt-2 text-gray-300">Cinema Halls</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
                <h2 className="text-3xl font-bold text-yellow-400">5000+</h2>
                <p className="text-sm mt-2 text-gray-300">Seats</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
                <h2 className="text-3xl font-bold text-yellow-400">20+</h2>
                <p className="text-sm mt-2 text-gray-300">Years Experience</p>
              </div>
            </div>

            {/* Features Section */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
                <h3 className="text-xl font-semibold mb-4 text-yellow-400">
                  🎬 Premium Screens
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Ultra HD digital projection systems with 3D capability,
                  delivering crystal-clear visuals for the ultimate cinematic
                  immersion.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
                <h3 className="text-xl font-semibold mb-4 text-yellow-400">
                  🔊 Dolby Atmos Sound
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Experience breathtaking surround sound with Dolby Atmos
                  technology that brings every scene to life.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
                <h3 className="text-xl font-semibold mb-4 text-yellow-400">
                  💺 Luxury Seating
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Spacious recliner seats and VIP lounges designed for maximum
                  comfort and relaxation during your movie experience.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-20">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                Ready for the Ultimate Movie Experience?
              </h2>
              <Link
                to={"/booking-movie"}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-full transition"
              >
                Book Your Ticket Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutUs;
