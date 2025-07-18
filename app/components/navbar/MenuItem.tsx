"use client";

interface Props {
  label: string;
  onClick: () => void;
}

const MenuItem = ({ label, onClick }: Props) => {
  return (
    <div
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default MenuItem;
