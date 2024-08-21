import React, { useEffect } from "react";
import { Label, useStore } from "../../store/calendar.store";

interface LabelsProps {
  labelOptions: Label[];
}

const defaultLabels: Label[] = [
  { label: "indigo", checked: true, color: "indigo-500", type: "indigo" },
  { label: "gray", checked: true, color: "gray-500", type: "gray" },
  { label: "green", checked: true, color: "green-500", type: "green" },
  { label: "blue", checked: true, color: "blue-500", type: "blue" },
  { label: "red", checked: true, color: "red-500", type: "red" },
  { label: "purple", checked: true, color: "purple-500", type: "purple" },
];

const Labels: React.FC<LabelsProps> = ({ labelOptions = defaultLabels }) => {
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
