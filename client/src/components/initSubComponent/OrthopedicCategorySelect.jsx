import { useState } from "react";

export const OrthopedicCategorySelect = () => {
    const [selectedOrthopedic, setSelectedOrthopedic] = useState('');
  
    const handleOrthopedicChange = (event) => {
      setSelectedOrthopedic(event.target.value);
    };
  
    return (
      <div className="orthopedic-category">
        <select value={selectedOrthopedic} onChange={handleOrthopedicChange}>
          <option value="">Select Orthopedic Category</option>
          <option value="category1">Orthopedic Category 1</option>
          <option value="category2">Orthopedic Category 2</option>
          <option value="category3">Orthopedic Category 3</option>
          <option value="category4">Orthopedic Category 4</option>
          <option value="category5">Orthopedic Category 5</option>
        </select>
      </div>
    );
  };
