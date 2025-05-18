import Hero from "../components/landing/Hero";
import FeatureCard from "../components/landing/FeatureCard";
import Testimonial from "../components/landing/Testimonial";
import Footer from "../components/common/Footer";

const Landing = () => (
  <div className="min-h-screen flex flex-col">
    <Hero />
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-heading font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="/src/assets/icons/upload.svg"
            title="Upload Easily"
            description="Drag and drop your certificates in seconds."
          />
          <FeatureCard
            icon="/src/assets/icons/folder.svg"
            title="Organize Smartly"
            description="Sort and categorize with ease."
          />
          <FeatureCard
            icon="/src/assets/icons/share.svg"
            title="Share Anywhere"
            description="Generate links, QR codes, or embeds."
          />
        </div>
      </div>
    </section>
    <Testimonial />
    <Footer />
  </div>
);

export default Landing;