import Card from "../common/Card";

const Testimonial = () => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto">
      <h2 className="text-3xl font-heading font-bold text-center mb-12">What Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <p className="italic">"This made sharing my certifications so simple!"</p>
          <p className="mt-4 font-semibold">- Jane Doe</p>
        </Card>
        {/* Add more testimonials */}
      </div>
    </div>
  </section>
);

export default Testimonial;