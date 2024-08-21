import React, { useEffect } from "react";
import { Label, useStore } from "../../store/calendar.store";

interface LabelsProps {
  labelOptions: Label[];
}



const Labels: React.FC<LabelsProps> = ({ labelOptions }) => {
  const { labels, updateLabel, setLabels } = useStore((state) => ({
    setLabels: state.setLabels,
    labels: state.labels,
    updateLabel: state.updateLabel,
  }));


  useEffect(() => {
    setLabels(labelOptions);
  }, [labelOptions]);

  return (
    <React.Fragment>
      <p className="text-gray-500 font-bold mt-10">Label</p>
      {labels.map(({ label: lbl, checked, color, type }, idx) => (
        <label key={idx} className="flex items-center mt-3">
          <input
            type="checkbox"
            checked={checked}
            onChange={() =>
              updateLabel({ label: lbl, checked: !checked, color, type })
            }
            className={`form-checkbox h-4 w-5 accent-${color} rounded-md focus:ring-0 cursor-pointer`}
          />
          <span className="ml-2 text-gray-700 capitalize">{lbl}</span>
        </label>
      ))}
    </React.Fragment>
  );
};

export default Labels;
