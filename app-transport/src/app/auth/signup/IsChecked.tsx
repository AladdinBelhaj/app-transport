"use client";
import React from "react";
import { useState } from "react";

interface IsCheckedProps {
  selectRole: (role: string) => void;
}

function IsChecked({ selectRole }: IsCheckedProps) {
  const [isTransporterChecked, setIsTransporterChecked] = useState(false);
  const [isClientChecked, setIsClientChecked] = useState(false);

  const handleTransporterChange = () => {
    selectRole('transporter');
    setIsTransporterChecked(!isTransporterChecked);
    setIsClientChecked(false); // Uncheck the Client checkbox
  };

  const handleClientChange = () => {
    selectRole('client');
    setIsClientChecked(!isClientChecked);
    setIsTransporterChecked(false); // Uncheck the Transporter checkbox
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
          onChange={handleTransporterChange} />
      </label>
      <label className="label cursor-pointer">
        <span className="label-text block font-medium text-black dark:text-white">
          Client
        </span>
        <input
          type="checkbox"
          className="checkbox"
          checked={isClientChecked}
          onChange={handleClientChange} />
      </label>
    </div>
  );
}

export default IsChecked;
