const variantStyles: { [key: string]: string } = {
  basic: 'py-[8px] bg-[#0047D6] px-5 text-white text-[14px] rounded-[9px] hover:bg-[#0841B5] transition duration-200 ease-in'
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