import React from "react";

interface AnimatedTitleProps {
  text: string;
  className?: string;
}

const AnimatedTitle = ({ text, className = "" }: AnimatedTitleProps) => {
  return (
    <h1 className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-300 hover:scale-125 hover:text-gold-accent hover:-translate-y-2 cursor-default"
          style={{ transitionDelay: `${index * 20}ms` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  );
};

export default AnimatedTitle;
