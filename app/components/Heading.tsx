"use client";

interface Props {
  center?: boolean;
  subtitle?: string;
  title: string;
}
const Heading = ({ center, subtitle, title }: Props) => {
  return (
    <div className={`${center ? "text-center" : "text-start"}`}>
      <h1 className="text-2xl font-bold">{title}</h1>

      <h2 className="font-light text-netural-500">{subtitle}</h2>
    </div>
  );
};

export default Heading;
