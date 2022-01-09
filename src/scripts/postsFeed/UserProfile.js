import { getPosts, getCurrentUser, updateUser, fetchUsers, setCurrentUser, getUsers } from "../dataAccess.js";
import { Post } from "./Post.js";

export const UserProfile = () => {
    const posts = getPosts();
    const currentUser = getCurrentUser();
    const curUserPosts = posts.filter(post => post.authorId === currentUser.id);

    return `
    <section class="userProfile">
        <div class="profileCard">
            <img id="profileCloseBtn" class="profileCloseBtn" src="images/closeX.png" alt="close profile" width="30px" />
            <div class="userProfileImg">
                ${UserProfileImage()}
            </div>
            <div class="profileInfo profileCardItem">
                <div class="profNamePstCount">
                    <h2 class= "profileName">${currentUser.firstName} ${currentUser.lastName}</h2>
                    <div class="profilePostCount">Post count: ${curUserPosts.length}</div>
                </div>
                <div class="userProfileBio">
                    ${UserProfileBio()}
                </div>
            </div>
        </div>
        <ul class="userPostsList">
            ${curUserPosts.map(post => Post(post)).join("")}
        </ul>
    </section>`
}

const mainContainer = document.querySelector(".beta");

// html functions

const UserProfileImage = () => {
    const currentUser = getCurrentUser();
    return `
                <img class="profileCardImg profileCardItem" src="${currentUser.gifLink}" />
                <div class="editImgBtnContainer"><div class="editImgBtn" id="editImgBtn">Edit User Gif</div></div>`
}

const UserProfileBio = () => {
    const currentUser = getCurrentUser();
    return `
    <div class="profileBio">${currentUser.bio}</div>
    <div class="editBioBtnContainer">
        <div class="editBioBtn" id="editBioBtn">Change Bio</div>
    </div>`
}

//change link event listeners

//pull up the change gif input
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "editImgBtn") {
        document.querySelector(".editImgBtnContainer").innerHTML = `
        <div class="changeGifLink">
            <label for="gifLink" class="editImgBtnItem">New Gif Link</label>    
            <input type="text" autofocus name="gifLink" class="editImgBtnItem" id="gifLink" placeholder="Gif That Says You" />
            <div class="gifLinkBtnContainer editImgBtnItem">
                <button id="gifLinkBtn" class="gifLinkBtn">Submit Gif</button>
                <button id="cancelGifLinkBtn" class="gifLinkBtn">Cancel</button>
            </div>
        </div>`
    }
})

//cancel changing Gif Link, rerender this html back to normal
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "cancelGifLinkBtn") {
        document.querySelector(".userProfileImg").innerHTML = UserProfileImage();
    }
})

//use change gif input to change gif
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "gifLinkBtn") {
        const currentUser = getCurrentUser();
        //change current user's gifLink to the new one
        currentUser.gifLink = document.querySelector("input[name='gifLink']").value;
        //update the user in the databse, then change currentUser's dataAccess object to match databse, rerender profileCard's html
        
        //first though, check if the new gifLink actually has text in it that is a link. Using currentUser.gifLink as it is a shallow copy and is okay to be altered here.
        if (currentUser.gifLink.startsWith("http")) {
            updateUser(currentUser)
                .then(() => fetchUsers())
                .then(() => {
                    const users = getUsers();
                    setCurrentUser(users.find(x => x.id === currentUser.id));
                    mainContainer.dispatchEvent(new CustomEvent("profilePicChanged"));
                    document.querySelector(".userProfileImg").innerHTML = UserProfileImage();
                })
            } else {
                window.alert("Please use a link to a Gif");
            }
    }
})

//change bio evnet listeners. It will all work the same as above
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "editBioBtn") {
        const currentUser = getCurrentUser();
        document.querySelector(".userProfileBio").innerHTML = `
        <div class="changeBio">
            <label for="bio" class="editBioItem">New Bio</label>    
            <textarea autofocus name="bio" class="editBioItem editBioTextarea" id="bio" >${currentUser.bio}</textarea>
            <div class="editBioBtnContainer editBioItem">
                <button id="submitBioBtn" class="bioBtn">Submit Bio</button>
                <button id="cancelBioBtn" class="bioBtn">Cancel</button>
            </div>
        </div>` 
    }
})

//cancel changin bio
mainContainer.addEventListener('click', clickEvent => {
    if (clickEvent.target.id === "cancelBioBtn") {
        document.querySelector(".userProfileBio").innerHTML = UserProfileBio();
    }
})

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitBioBtn") {
        const currentUser = getCurrentUser();
        currentUser.bio = document.querySelector("#bio").value;

        if (currentUser.bio.length <= 250) {
            updateUser(currentUser)
                .then(() => fetchUsers())
                .then(() => {
                    const users = getUsers();
                    setCurrentUser(users.find(x => x.id === currentUser.id));
                    document.querySelector(".userProfileBio").innerHTML = UserProfileBio();
                })
            } else {
                window.alert("You may only use up to 250 characters for your bio");
            }
    }
})