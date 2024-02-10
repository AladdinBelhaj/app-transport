"use client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
interface IsCheckedProps {
  selectRole: (role: string) => void;
  setFormValid: React.Dispatch<React.SetStateAction<boolean>>;
}

function IsChecked({ selectRole, setFormValid }: IsCheckedProps) {
  const [isTransporterChecked, setIsTransporterChecked] = useState(false);
  const [isClientChecked, setIsClientChecked] = useState(false);

  useEffect(() => {
    setFormValid(isTransporterChecked || isClientChecked); // Set formValid to true if either checkbox is checked
  }, [isTransporterChecked, isClientChecked, setFormValid]);

  const handleTransporterChange = () => {
    selectRole("transporter");
    setIsTransporterChecked(!isTransporterChecked);
    setIsClientChecked(false);
  };

  const handleClientChange = () => {
    selectRole("client");
    setIsClientChecked(!isClientChecked);
    setIsTransporterChecked(false);
  };
  return (
    <div>
      <label className="label cursor-pointer">
        <span className="label-text block font-medium text-black dark:text-white">
          Transporter
        </span>
        <input
          type="checkbox"
          className="checkbox"
          checked={isTransporterChecked}
          onChange={handleTransporterChange}
        />
      </label>
      <label className="label cursor-pointer">
        <span className="label-text block font-medium text-black dark:text-white">
          Client
        </span>
        <input
          type="checkbox"
          className="checkbox"
          checked={isClientChecked}
          onChange={handleClientChange}
        />
      </label>
    </div>
  );
}

export default IsChecked;
