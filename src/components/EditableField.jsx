const EditableField = ({ label, value, onChange }) => {
  let inputType = 'text';
  if (typeof value === 'boolean') {
    inputType = 'checkbox';
  } else if (typeof value === 'number') {
    inputType = 'number';
  }

  return (
    <>
      <label>
        {label}:
        <input
          type={inputType}
          value={value == null ? '' : value} //if the value is null ignore it
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </>
  );
}



export default EditableField;