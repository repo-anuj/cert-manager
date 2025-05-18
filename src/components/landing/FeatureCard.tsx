import Card from "../common/Card";

interface FeatureCardProps {
  icon: string; // Path to SVG
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <Card className="text-center">
    <img src={icon} alt={title} className="w-12 h-12 mx-auto mb-4" />
    <h3 className="text-xl font-heading font-semibold mb-2">{title}</h3>
    <p className="text-accent">{description}</p>
  </Card>
);

export default FeatureCard;