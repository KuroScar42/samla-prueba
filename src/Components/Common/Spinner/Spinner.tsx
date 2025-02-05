import "./Spinner.scss";

interface ISpinner {
  label: any;
}

function Spinner(props: ISpinner) {
  const { label } = props;
  return (
    <div className="spinner-container">
      <span className="loader"></span>
      <p className="spinner-label">{label}</p>
    </div>
  );
}

export default Spinner;
