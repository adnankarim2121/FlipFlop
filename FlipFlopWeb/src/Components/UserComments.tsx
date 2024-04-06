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
import { useUser } from "../hooks/useUser";
import { UserInfoLocal } from "../Interfaces/UserInfoLocal";

const UserComments = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
  teamPlaceHolder,
  teamValue,
  teamVote,
  allComments,
  username,
  profilePic
}: {
    handleInsertNode: any,
    handleEditNode: any,
    handleDeleteNode: any,
    comment: any,
    teamPlaceHolder: string,
    teamValue?: number,
    teamVote?: string,
    allComments?: boolean,
    username?:string,
    profilePic?:string
  }) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(true);
  const inputRef = useRef<HTMLSpanElement>(null);
  const [userInfo, setUserInfo] = useUser();
  const [userInfoObject, setUserInfoObject] = useState<UserInfoLocal | null>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  useEffect(() => {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo: UserInfoLocal = JSON.parse(userInfoString);
      console.log("user info string", userInfo)
      setUserInfoObject(userInfo);
    }
  }, []);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    } else {
      console.log('replying comment in add', userInfo?.picture, userInfo?.username)
      setExpand(true);
      handleInsertNode(comment.id, input, teamValue, userInfo?.picture, userInfo?.username);
      setShowInput(false);
      setInput("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };

  //make sure to save all user local storage related stuff on sign up and login.
  return (
    <div style={{paddingTop:'50'}}>
    <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item>
            <Avatar src={comment.id === 1 ? userInfoObject?.picture:comment.profilePicture} sx={{ bgcolor: deepOrange[500], width: 20, height: 20, fontSize: 8 }}></Avatar>
        </Grid>
        <Grid item>
            <Typography sx={{ fontSize: 8}} color="text.secondary">
            {comment.id === 1 ? userInfoObject?.username:comment.username}
            </Typography>
        </Grid>
        <Grid item>
            <Typography sx={{ fontSize: 8 }} color="text.secondary" >
                {teamVote}
            </Typography>
        </Grid>
    </Grid>
      <div className={comment.id === 1 ? "inputContainer" : "commentContainer"} style={{marginTop:5, marginBottom:20}}>
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

{comment?.items?.filter((cmnt:any) => allComments || cmnt.teamValue === teamValue)?.map((filteredCmnt:any) => {
  return (
    <UserComments
      key={filteredCmnt.id}
      handleInsertNode={handleInsertNode}
      handleEditNode={handleEditNode}
      handleDeleteNode={handleDeleteNode}
      comment={filteredCmnt}
      teamPlaceHolder={teamPlaceHolder}
      teamVote={teamVote}
      allComments={allComments}
      teamValue={filteredCmnt.teamValue}
    />
  );
})}
      </div>
    </div>
  );
};

export default UserComments;
