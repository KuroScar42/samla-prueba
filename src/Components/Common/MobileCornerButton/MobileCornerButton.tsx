import { backArrow } from "../../../Utils/Icons";
import "./MobileCornerButton.scss";

interface IMobileCornerButton {
  onClick: (event: any) => void;
}

const MobileCornerButton = (props: IMobileCornerButton) => {
  const { onClick } = props;
  return (
    <div className="mobile-corner-button">
      <button className="btn btn-link" onClick={onClick}>
        {backArrow}
      </button>
    </div>
  );
};

export default MobileCornerButton;
