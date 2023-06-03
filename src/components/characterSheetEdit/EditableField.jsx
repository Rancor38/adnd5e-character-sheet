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

  return (
    <>
      <label className={className}>
        {formattedLabel}
        <input
          type={inputType}
          value={value == null ? '' : value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </>
  );
};


export default EditableField;