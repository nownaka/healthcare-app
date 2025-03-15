import React from "react";

type ButtonProps = {
  label: string;
  type?: "submit" | "reset" | "button";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<ButtonProps> = ({
  label,
  type = "button",
  className = "",
  onClick,
}) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      style={{ padding: "10px", cursor: "pointer" }}
    >
      {label}
    </button>
  );
};

export default Button;
