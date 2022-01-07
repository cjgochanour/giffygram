const API = "http://localhost:8088";

const applicationState = {
    currentState: {
        users: [],
        posts: [],
        likes: [],
        messages: [],
    },
    currentUser: {},
    feed: {
        chosenUser: null,
        chosenYear: null,
        displayFavorites: false,
        displayMessages: false,
        displayNavBar: true,
        displayMessageCreate: false,
        displayPostCreate: false,
        postsFeedState: "postList",
    },
};

//fetch each resource from database and put into applicationState

export const fetchUsers = () => {
    return fetch(`${API}/users`)
        .then((res) => res.json())
        .then((users) => (applicationState.currentState.users = users));
};

export const fetchPosts = () => {
    return fetch(`${API}/posts?_sort=timestamp&_order=desc`)
        .then((res) => res.json())
        .then((posts) => (applicationState.currentState.posts = posts));
};

export const fetchLikes = () => {
    return fetch(`${API}/likes`)
        .then((res) => res.json())
        .then((likes) => (applicationState.currentState.likes = likes));
};

export const fetchMessages = () => {
    return fetch(`${API}/messages?_sort=timestamp&_order=desc`)
        .then((res) => res.json())
        .then((messages) => (applicationState.currentState.messages = messages));
};

//get functions to retrieve information from applicationState

export const getUsers = () => {
    return applicationState.currentState.users.map((user) => ({ ...user }));
};

export const getPosts = () => {
    return applicationState.currentState.posts.map((post) => ({ ...post }));
};

export const getLikes = () => {
    return applicationState.currentState.likes.map((like) => ({ ...like }));
};

export const getMessages = () => {
    return applicationState.currentState.messages.map((message) => ({ ...message }));
};

export const getCurrentUser = () => {
    return applicationState.currentUser;
};

export const getChosenUser = () => {
    return applicationState.feed.chosenUser;
};

export const getChosenYear = () => {
    return applicationState.feed.chosenYear;
};

export const getDisplayFavorites = () => {
    return applicationState.feed.displayFavorites;
};

export const getDisplayMessages = () => {
    return applicationState.feed.displayMessages;
};

export const getDisplayNavBar = () => {
    return applicationState.feed.displayNavBar;
};

export const getDisplayMessageCreate = () => {
    return applicationState.feed.displayMessageCreate;
};

export const getDisplayPostCreate = () => {
    return applicationState.feed.displayPostCreate;
};

export const getPostsFeedState = () => {
    return applicationState.feed.postsFeedState;
};

//Set functions that allow us to set the currentUser and feed properties in applicationState

export const setCurrentUser = (userObject) => {
    applicationState.currentUser = userObject;
};

export const setChosenUser = (chosenUserId) => {
    applicationState.feed.chosenUser = chosenUserId;
};

export const setChosenYear = (chosenYear) => {
    applicationState.feed.chosenYear = chosenYear;
};

export const setDisplayFavoritesFalse = () => {
    applicationState.feed.displayFavorites = false;
};

export const setDisplayFavoritesTrue = () => {
    applicationState.feed.displayFavorites = true;
};

export const setDisplayMessagesFalse = () => {
    applicationState.feed.displayMessages = false;
};

export const setDisplayMessagesTrue = () => {
    applicationState.feed.displayMessages = true;
};

export const setDisplayNavBarFalse = () => {
    applicationState.feed.displayNavBar = false;
};

export const setDisplayNavBarTrue = () => {
    applicationState.feed.displayNavBar = true;
};

export const setDisplayMessageCreateFalse = () => {
    applicationState.feed.displayMessageCreate = false;
};

export const setDisplayMessageCreateTrue = () => {
    applicationState.feed.displayMessageCreate = true;
};

export const setDisplayPostCreateFalse = () => {
    applicationState.feed.displayPostCreate = false;
};

export const setDisplayPostCreateTrue = () => {
    applicationState.feed.displayPostCreate = true;
};

export const setPostsFeedStatePosts = () => {
    applicationState.feed.postsFeedState = "postList";
};

export const setPostsFeedStateProfile = () => {
    applicationState.feed.postsFeedState = "profile";
};

export const setPostsFeedStateUser = () => {
    applicationState.feed.postsFeedState = "userProfile";
};

//POST functions to add to the database
export const sendUser = (userToPost) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userToPost),
    };

    return fetch(`${API}/users`, fetchOptions);
};

export const sendPost = (postToPost) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postToPost),
    };

    return fetch(`${API}/posts`, fetchOptions);
};

export const sendLike = (likeToPost) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(likeToPost),
    };

    return fetch(`${API}/likes`, fetchOptions);
};

export const sendMessage = (messageToPost) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(messageToPost),
    };

    return fetch(`${API}/messages`, fetchOptions);
};

//DELETE functions for the database
export const deleteUser = (userId) => {
    return fetch(`${API}/users/${userId}`, { method: "DELETE" });
};

export const deletePost = (postId) => {
    return fetch(`${API}/posts/${postId}`, { method: "DELETE" });
};

export const deleteLike = (likeId) => {
    return fetch(`${API}/likes/${likeId}`, { method: "DELETE" });
};

export const deleteMessage = (messageId) => {
    return fetch(`${API}/messages/${messageId}`, { method: "DELETE" });
};

//PUT functions for the database
export const updateMessage = (messageUpdateObject) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(messageUpdateObject),
    };

    return fetch(`${API}/messages/${messageUpdateObject.id}`, fetchOptions);
};
