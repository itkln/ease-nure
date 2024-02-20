const variantStyles: { [key: string]: string } = {
  basic: 'py-[12px] w-full bg-[#0E1218] text-white rounded-[9px]'
};

interface ButtonProps {
  title: string;
  variant?: keyof typeof variantStyles;
  onClick?: () => void;
}

const Button = ({ title, variant, onClick }: ButtonProps) => {
  // Define variant classes based on the provided variant or use a default
  const variantClasses = variant ? variantStyles[variant] : variantStyles["basic"];

  return (
    <button
      className={`${variantClasses}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;