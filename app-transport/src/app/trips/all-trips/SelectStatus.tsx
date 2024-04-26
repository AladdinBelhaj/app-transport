import React from "react";

interface SelectStatusProps {
  selectedStatus: string; // Prop for passing the selected status value
  onStatusChange: (status: string) => void; // Prop for handling status change
}

const SelectStatus: React.FC<SelectStatusProps> = ({
  selectedStatus,
  onStatusChange,
}) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(event.target.value);
  };

  return (
    <div>
      <div>
        <label
          htmlFor="status"
          className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
        >
          Trip Status
        </label>
        <select
          id="status"
          className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
          value={selectedStatus}
          onChange={handleStatusChange}
          required
        >
          <option value="" disabled>
            Choose status
          </option>
          <option value="pending">Pending</option>
          <option value="ongoing">Ongoing</option>
          <option value="finished">Finished</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default SelectStatus;
