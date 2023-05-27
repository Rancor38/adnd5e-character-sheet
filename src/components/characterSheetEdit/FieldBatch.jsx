import EditableField from "./EditableField";

const FieldBatch = ({ characterSheet, specificItems, handleChange, className }) => {
  return (
  <div className={className}>
  {specificItems.map((item, index) => (
  <EditableField
  key={index}
  label={item}
  value={characterSheet[item]}
  onChange={(newValue) => handleChange(item, newValue)}
  className={characterSheet[item]}
  />
  ))}
  </div>
  );
  };

export default FieldBatch;