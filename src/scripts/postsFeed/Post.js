import {getUsers} from "../dataAccess.js";
//function returns post so that it can appear in post list
export const Post = (post) => {
  const users = getUsers();
  const author = users.find(user=> user.id === post.authorId);
  
    return `
        <li class ="post postListItem">
            <h2 class="postItem postSubject">${post.subject}<h2>
            <img class="postItem postImage" src="${post.gifLink}" width="200px"/>
            <div class= "postItem postStory">${post.story}</div>
            <div class="postItem postAuthor">Posted by: ${author.firstName} ${author.lastName}</div>
            <div class="postItem postDate">${new Date(post.timestamp).toLocaleDateString("en-US")} </div>    
        
        `;
};