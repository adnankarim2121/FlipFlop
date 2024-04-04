import { useEffect, useState } from "react";
import UserComments from "./UserComments";
import useNode from "../hooks/useNode";

const CommentParent = ({teamPlaceHolder, teamValue, teamVote, allComments, profilePicture, username}:
    {teamPlaceHolder? : string, teamValue? : number, teamVote?: string, allComments?:boolean, profilePicture?:string, username?:string}) => {
      const comments = {
        id: 1,
        items: [],
        teamValue: teamValue,
        profilePicture:profilePicture,
        username:username
      };
  const [commentsData, setCommentsData] = useState(comments);

  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (folderId:any, item:any, teamValueFromUser?:number, profilePictureFromUser?:string, usernameFromUser?:string) => {
    const finalStructure = insertNode(commentsData, folderId, item, teamValueFromUser, profilePictureFromUser, usernameFromUser);
    console.log(finalStructure)
    //push to db after final structre
    setCommentsData(finalStructure);
  };

  const handleEditNode = (folderId:any, value:any) => {
    const finalStructure = editNode(commentsData, folderId, value);
    console.log(finalStructure)
    //push to db after final structre
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId:any) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    console.log(temp)
    setCommentsData(temp);
  };

  useEffect(() =>
  {
    setCommentsData(comments)
  }, [])

  return (
    <div className="App">
      <UserComments
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        comment={commentsData}
        teamPlaceHolder={teamPlaceHolder || ''}
        teamValue={teamValue}
        teamVote={teamVote}
        allComments={allComments}
        username={username}
        profilePic={profilePicture}
      />
    </div>
  );
};

export default CommentParent;