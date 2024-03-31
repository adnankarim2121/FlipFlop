import { useState, useRef, useEffect } from "react";
import CommentAction from "./CommentAction";
import  DownArrow  from "../assets/down-arrow.svg";
import UpArrow  from "../assets/up-arrow.svg";

const UserComments = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
}: {
    handleInsertNode: any,
    handleEditNode: any,
    handleDeleteNode: any,
    comment: any,
  }) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    } else {
      setExpand(true);
      handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };

  return (
    <div style={{paddingTop:'50'}}>
      <div className={comment.id === 1 ? "inputContainer" : "commentContainer"}>
        {comment.id === 1 ? (
          <>
            <input
              type="text"
              className="inputContainer__input first_input"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add comment"
            />

            <CommentAction
              className="reply comment"
              type="Reply"
              handleClick={onAddComment}
            />
          </>
        ) : (
          <>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              ref={inputRef}
              style={{ wordWrap: "break-word" }}
            >
              {comment.name}
            </span>

            <div style={{ display: "flex", marginTop: "5px" }}>
              {editMode ? (
                <>
                  <CommentAction
                    className="reply"
                    type="Save"
                    handleClick={onAddComment}
                  />
                  <CommentAction
                    className="reply"
                    type="Cancel"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name;
                      setEditMode(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <CommentAction
                    className="reply"
                    type={
                      <>
                        {expand}{" "}
                        {/* {expand ? (
                          <UpArrow />
                        ) : (
                         <DownArrow />
                        )}{" "} */}
                        Reply
                      </>
                    }
                    handleClick={handleNewComment}
                  />
                  <CommentAction
                    className="reply"
                    type="Edit"
                    handleClick={() => {
                      setEditMode(true);
                    }}
                  />
                  <CommentAction
                    className="reply"
                    type="Delete"
                    handleClick={handleDelete}
                  />
                  <CommentAction
                    className="reply"
                    type="Switch"
                    handleClick={()=>{}}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className="inputContainer">
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <CommentAction className="reply" type="Reply" handleClick={onAddComment} />
            <CommentAction
              className="reply"
              type="Cancel"
              handleClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
            />
          </div>
        )}

        {comment?.items?.map((cmnt:any) => {
          return (
            <UserComments
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              comment={cmnt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserComments;
