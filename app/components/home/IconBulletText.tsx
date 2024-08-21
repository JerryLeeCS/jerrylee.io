import React from "react";

type Props = {
  icon: React.ReactNode;
  text: string;
};

const IconBulletText = ({ icon, text }: Props) => {
  return (
    <div className="flex flex-row items-center gap-2">
      {icon}
      <text>{text}</text>
    </div>
  );
};

export default IconBulletText;
