import Button from "../common/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
  <section
    className="relative bg-cover bg-center h-[80vh] flex items-center"
    style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))" }} // Using gradient as fallback
  >
    <div className="absolute inset-0 bg-black opacity-40"></div>
    <div className="container mx-auto text-center text-white relative z-10">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-heading font-bold mb-4"
      >
        Your Achievements, Organized and Shareable
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-xl md:text-2xl mb-8"
      >
        Upload, Store, and Showcase Your Certificates in One Place
      </motion.p>
      <div className="space-x-4">
        <Button onClick={() => navigate("/auth/signup")}>Get Started</Button>
        <Button variant="secondary" onClick={() => navigate("/auth/signin")}>Sign In</Button>
      </div>
    </div>
  </section>
  );
};

export default Hero;