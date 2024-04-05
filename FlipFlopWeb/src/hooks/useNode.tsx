const useNode = () => {
    const insertNode = function (tree:any, commentId:any, item:any, teamValue?: number, profilePicture?:string, username?:string) {
      if (tree.id === commentId) {
        tree.items.push({
          id: new Date().getTime(),
          name: item,
          items: [],
          teamValue: teamValue,
          profilePicture: profilePicture,
          username: username
        });
  
        return tree;
      }
  
      let latestNode = [];
      latestNode = tree.items.map((ob:any) => {
        return insertNode(ob, commentId, item, teamValue, profilePicture, username);
      });
  
      return { ...tree, items: latestNode };
    };
  
    const editNode = (tree:any, commentId:any, value:any) => {
      if (tree.id === commentId) {
        tree.name = value;
        return tree;
      }
  
      tree.items.map((ob:any) => {
        return editNode(ob, commentId, value);
      });
  
      return { ...tree };
    };
  
    const deleteNode = (tree:any, id:any) => {
      for (let i = 0; i < tree.items.length; i++) {
        const currentItem = tree.items[i];
        if (currentItem.id === id) {
          tree.items.splice(i, 1);
          return tree;
        } else {
          deleteNode(currentItem, id);
        }
      }
      return tree;
    };
  
    return { insertNode, editNode, deleteNode };
  };
  
  export default useNode;