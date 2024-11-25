import React from "react";

const GenderCheckbox = () => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className="label cursor-pointer gap-2">
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            defaultChecked
            className="checkbox rounded-full"
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer gap-2">
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            defaultChecked
            className="checkbox rounded-full"
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
