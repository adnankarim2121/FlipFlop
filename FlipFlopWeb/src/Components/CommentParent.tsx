import { useState } from "react";
import UserComments from "./UserComments";
import useNode from "../hooks/useNode";

const comments = {
  id: 1,
  items: [],
  teamValue: 0
};
const CommentParent = ({teamPlaceHolder, teamValue}:
    {teamPlaceHolder? : string, teamValue? : number}) => {
  const [commentsData, setCommentsData] = useState(comments);

  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (folderId:any, item:any) => {
    const finalStructure = insertNode(commentsData, folderId, item, teamValue);
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
      />
    </div>
  );
};

export default CommentParent;