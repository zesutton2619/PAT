import { useState } from "react";

export const PatentCategoryDropdown = () => {
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    
    return (
      <div className="category-dropdown">
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="">Select Patent Category</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
          <option value="category4">Category 4</option>
          <option value="category5">Category 5</option>
        </select>
      </div>
    );
  };