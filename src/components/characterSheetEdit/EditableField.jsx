const EditableField = ({ label, value, onChange, className }) => {
  let inputType = 'text';
  if (typeof value === 'boolean') {
    inputType = 'checkbox';
  } else if (typeof value === 'number') {
    inputType = 'number';
  }

  const formattedLabel = label
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

    const handleInputChange = (e) => {
      const inputValue = e.target.value;
      e.target.style.height = 'auto';
      e.target.style.height = Math.min(e.target.scrollHeight, 1000) + 'px';
      onChange(inputValue);
    };
  
  return (
    <>
      <label className={className}>
        {formattedLabel}
        <textarea
          style={{ resize: 'none' }}
          value={value == null ? '' : value}
          onChange={handleInputChange}
        />
      </label>
    </>
  );
};


export default EditableField;