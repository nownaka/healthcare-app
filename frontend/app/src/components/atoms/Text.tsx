import React from "react";

type TextProps = {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
};

const Text: React.FC<TextProps> = ({ children, size = "medium" }) => {
  const fontSize =
    size === "large" ? "20px" : size === "small" ? "12px" : "16px";

  return <p style={{ fontSize }}>{children}</p>;
};

export default Text;
