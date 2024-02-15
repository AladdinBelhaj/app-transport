import React from 'react';

interface Props {
  isFirstLogin?: string;
  children: React.ReactNode;
}

const FirstLoginGuard: React.FC<Props> = ({ isFirstLogin, children }) => {
  if (isFirstLogin === "1") {
    return null; // Return null to prevent rendering on the client side
  }

  return children; // Returning children directly
};

export default FirstLoginGuard;
