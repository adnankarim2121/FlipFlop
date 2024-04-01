import { useState } from "react";
import UserComments from "./UserComments";
import useNode from "../hooks/useNode";

const comments = {
  id: 1,
  items: [],
  teamValue: 0
};
const CommentParent = ({teamPlaceHolder, teamValue, teamVote, allComments}:
    {teamPlaceHolder? : string, teamValue? : number, teamVote?: string, allComments?:boolean}) => {
  const [commentsData, setCommentsData] = useState(comments);

  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (folderId:any, item:any, teamValueFromUser?:number) => {
    const finalStructure = insertNode(commentsData, folderId, item, teamValueFromUser);
    setCommentsData(finalStructure);
  };

  const handleEditNode = (folderId:any, value:any) => {
    const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId:any) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
  };


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
      />
    </div>
  );
};

export default CommentParent;