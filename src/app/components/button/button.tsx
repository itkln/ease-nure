const variantStyles: { [key: string]: string } = {
    basic: 'bg-[#0E1218] hover:bg-blue-700 focus:ring-blue-700'
};

interface ButtonProps {
    title: string;
    variant?: keyof typeof variantStyles;
    onClick?: () => void;
};

const Button = ({title, variant, onClick}: ButtonProps) => {
    // Define variant classes based on the provided variant or use a default
  const variantClasses = variant ? variantStyles[variant] : variantStyles["basic"];

  return (
    <button
      className={`rounded-lg text-white focus:outline-none ${variantClasses} `}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;