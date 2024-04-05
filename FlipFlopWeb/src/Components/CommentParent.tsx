import { useEffect, useState } from "react";
import UserComments from "./UserComments";
import useNode from "../hooks/useNode";
import axios from "axios";
import { UserInfoLocal } from "../Interfaces/UserInfoLocal";

const CommentParent = ({teamPlaceHolder, teamValue, teamVote, allComments, profilePicture, username, uuid}:
    {teamPlaceHolder? : string, teamValue? : number, teamVote?: string, allComments?:boolean, profilePicture?:string, username?:string, uuid:any}) => {
      const comments = {
        id: 1,
        items: [],
        teamValue: teamValue,
        profilePicture:profilePicture,
        username:username
      };
  const [commentsData, setCommentsData] = useState(comments);

  const { insertNode, editNode, deleteNode } = useNode();
  const userInfoString = localStorage.getItem('userInfo');
  const userInfoObject: UserInfoLocal = JSON.parse(userInfoString!) as UserInfoLocal;

  const handleInsertNode = (folderId:any, item:any, teamValueFromUser?:number, profilePictureFromUser?:string, usernameFromUser?:string) => {
    const finalStructure = insertNode(commentsData, folderId, item, teamValueFromUser, profilePictureFromUser, usernameFromUser);
    console.log(finalStructure)
    //push to db after final structre
    pushCommentsToDb(finalStructure)
    setCommentsData(finalStructure);
  };

  const handleEditNode = (folderId:any, value:any) => {
    const finalStructure = editNode(commentsData, folderId, value);
    console.log(finalStructure)
    //push to db after final structre
    pushCommentsToDb(finalStructure)
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId:any) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    console.log("deleted", temp)
    pushCommentsToDb(temp)
    setCommentsData(temp);
  };

  const pushCommentsToDb = async (commentsToPush: any) =>
  {
    var uuid = userInfoObject?.questionUuid
    console.log("from user info local, uuid ", uuid)
    try {
        const response = await axios.post('http://localhost:8000/update-comments/', {commentsToPush, uuid});
        return response.data.valid
    }
    catch (error) 
    {
        console.error('Error adding community:', error);
    }
  }

  const getAllComments = async () =>
  {
    var uuid = userInfoObject?.questionUuid
    try {
      const response = await axios.get(`http://localhost:8000/get-all-comments/${uuid}`, uuid as any);
      const comments = response.data;
      const allComments = comments[0].comments
      console.log("retrieved ", allComments)
      if (allComments != null)
      {
        setCommentsData(allComments)
      }
  } catch (error) {
      console.error('Error fetching all questions:', error);
  }
  }
  useEffect(() =>
  {
    getAllComments()
    // setCommentsData(comments)
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