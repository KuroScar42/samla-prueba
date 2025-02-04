import "./DecorativeHeader.scss";

interface IDecorativeHeader {
  content?: any;
  className?: string;
}

const DecorativeHeader = (props: IDecorativeHeader) => {
  const { content, className } = props;
  return (
    <div className={`decorative-background ${className ?? ""}`}>
      <div className="decorative-background-image"></div>
      {content}
    </div>
  );
};

export default DecorativeHeader;
