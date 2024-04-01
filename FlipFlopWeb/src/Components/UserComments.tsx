import { useState, useRef, useEffect } from "react";
import CommentAction from "./CommentAction";
import { FaRegComment } from "react-icons/fa";
import { BsReply } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline, MdOutlineCancel } from "react-icons/md";
import { TbFlipFlops } from "react-icons/tb";
import { CiCircleCheck } from "react-icons/ci";
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { Grid } from "@mui/material";

const UserComments = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
  teamPlaceHolder,
  teamValue
}: {
    handleInsertNode: any,
    handleEditNode: any,
    handleDeleteNode: any,
    comment: any,
    teamPlaceHolder: string
    teamValue?: number
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
    <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item>
            <Avatar sx={{ bgcolor: deepOrange[500], width: 20, height: 20, fontSize: 8 }}>a</Avatar>
        </Grid>
        <Grid item>
            <Typography sx={{ fontSize: 8 }} color="text.secondary" gutterBottom>
                ak2121
            </Typography>
        </Grid>
    </Grid>
      <div className={comment.id === 1 ? "inputContainer" : "commentContainer"} style={{marginTop:5}}>
        {comment.id === 1 ? (
          <>
            <input
              type="text"
              className="inputContainer__input first_input"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={teamPlaceHolder}
            />

            <FaRegComment onClick={onAddComment} style={{marginLeft:'10'}}> 
                <CommentAction
                            className="reply comment"
                            type="Reply"
                            handleClick={onAddComment}
                            />
            </FaRegComment>

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
                <CiCircleCheck onClick={onAddComment} style={{marginRight:'10'}}>
                <CommentAction
                    className="reply"
                    type="Save"
                    handleClick={onAddComment}
                  />
                </CiCircleCheck>

                <MdOutlineCancel onClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name;
                      setEditMode(false);
                    }} style={{marginRight:'10'}}>
                <CommentAction
                    className="reply"
                    type="Cancel"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name;
                      setEditMode(false);
                    }}
                  />
                </MdOutlineCancel>

                </>
              ) : (
                <>
                <BsReply onClick={handleNewComment} style={{marginRight:'10'}}>
                <CommentAction
                    className="reply"
                    type={
                      <>
                        {expand}{" "}
                        Reply
                      </>
                    }
                    handleClick={handleNewComment}
                  />
                </BsReply>
                <CiEdit onClick={() => {
                      setEditMode(true);}} style={{marginRight:'10'}}> 
                <CommentAction
                    className="reply"
                    type="Edit"
                    handleClick={() => {
                      setEditMode(true);
                    }}
                  />
                </CiEdit>
                <MdOutlineDeleteOutline onClick={handleDelete} style={{marginRight:'10'}}>
                    <CommentAction
                        className="reply"
                        type="Delete"
                        handleClick={handleDelete}
                    />
                </MdOutlineDeleteOutline>

                <TbFlipFlops onClick={() => {}} style={{marginRight:'10'}}>
                    <CommentAction
                        className="reply"
                        type="Switch"
                        handleClick={()=>{}}
                    />
                </TbFlipFlops>

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
            <BsReply onClick={onAddComment} style={{marginRight:'10'}}>
                <CommentAction className="reply" type="Reply" handleClick={onAddComment} />
            </BsReply>
            <MdOutlineCancel onClick={() => {
                    setShowInput(false);
                    if (!comment?.items?.length) setExpand(false);
                }} style={{marginRight:'10'}}>
                <CommentAction
                className="reply"
                type="Cancel"
                handleClick={() => {
                    setShowInput(false);
                    if (!comment?.items?.length) setExpand(false);
                }}
                />
            </MdOutlineCancel>

          </div>
        )}

    {comment?.items?.filter((cmnt:any) => cmnt.teamValue === teamValue)?.map((filteredCmnt:any) => {
        console.log("team val is", teamValue)
    return (
        <UserComments
        key={filteredCmnt.id}
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        comment={filteredCmnt}
        teamPlaceHolder={teamPlaceHolder}
        />
    );
    })}
      </div>
    </div>
  );
};

export default UserComments;