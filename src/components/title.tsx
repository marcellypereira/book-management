import React from "react";

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-1 h-6 bg-[#6347F9]"></div>
      <h2 className="text-2xl font-bold text-black">{text}</h2>
    </div>
  );
};

export default Title;
