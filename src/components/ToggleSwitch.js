import React from 'react';

export default function ToggleSwitch({ isChecked, onChange, label }) {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={onChange}
        />
        <div className={`block w-14 h-7 rounded-full transition-colors duration-300 ease-in-out ${
          isChecked ? 'bg-blue-600' : 'bg-gray-600'
        }`}></div>
        <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform duration-300 ease-in-out ${
          isChecked ? 'transform translate-x-7' : ''
        }`}></div>
      </div>
      <span className="ml-3 text-gray-200">{label}</span>
    </label>
  );
}