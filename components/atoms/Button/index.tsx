import { BUTTON_TYPES } from '@lib/utils/constants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  className?: string;
  type?: (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES];
  children: React.ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
  id?: string;
}

const Button = ({
  onClick,
  className = '',
  type = BUTTON_TYPES.BUTTON,
  children,
  disabled = false,
  ariaLabel,
  id,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      id={id}
    >
      {children}
    </button>
  );
};

export default Button;
