const CommentAction = ({ handleClick, type, className }:
    {
        handleClick: any,
        type: any,
        className: any,
      }) => {
  return (
    <div className={className} onClick={handleClick}>
      {type}
    </div>
  );
};

export default CommentAction;