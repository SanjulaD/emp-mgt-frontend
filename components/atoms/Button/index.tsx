interface ButtonProps {
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
}

const Button = ({ onClick, className = '', type = 'button', children }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${className}`}
      onClick={onClick}
    >
      {children} {/* Render children instead of label */}
    </button>
  );
};

export default Button;
