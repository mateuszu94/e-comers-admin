interface HedingProps {
  title: string;
  description: string;
}

export const Heding: React.FC<HedingProps> = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-3xl form- bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
