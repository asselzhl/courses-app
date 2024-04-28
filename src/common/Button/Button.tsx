import React from "react";

const style = {
  pageButton: `uppercase bg-[#007298] text-white rounded py-[13px] px-9 hover:opacity-80 duration-300`,
};

type ButtonType = "submit" | "reset" | "button";
interface ButtonProps {
  text: string;
  type?: ButtonType;
  onClick: () => void;
}

export const Button = ({ text, type = "button", onClick }: ButtonProps) => {
  return (
    <button className={style.pageButton} onClick={onClick} type={type}>
      {text}
    </button>
  );
};
