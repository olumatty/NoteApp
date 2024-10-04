import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  return (
    <div>
  {tags?.length > 0 && (
    <div className="flex items-center gap-2 flex-wrap mt-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="flex items-center gap-1 text-xs sm:text-sm text-slate-900 bg-slate-100 px-2 py-1 rounded"
        >
          #{tag}
          <button onClick={() => handleRemoveTag(tag)}>
            <MdClose className="text-xs sm:text-sm" />
          </button>
        </span>
      ))}
    </div>
  )}

  <div className="flex items-center gap-3 mt-3">
    <input
      type="text"
      value={inputValue}
      className="text-xs sm:text-sm bg-transparent border px-3 py-2 rounded outline-none flex-grow"
      placeholder="Add tags"
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    />

    <button
      className="w-8 h-8 flex items-center justify-center rounded border border-primary"
      onClick={addNewTag}
    >
      <MdAdd className="text-lg sm:text-2xl hover:text-white hover:bg-primary" />
    </button>
  </div>
</div>
  )
}

export default TagInput;
