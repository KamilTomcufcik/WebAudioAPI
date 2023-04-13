const CustomInput = (props) => {
  return (
    <input
      type='range'
      onChange={props.changeValue}
      value={props.value}
      min={props.min}
      max={props.max}
      step={props.step}
    />
  );
};

export default CustomInput;
