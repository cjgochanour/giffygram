const apiURL = "http://localhost:8088";
const applicationElement = document.querySelector(".beta");

const applicationState = {
    currentUser: {},
    feed: {
        chosenUser: null,
        displayFavorites: false,
        displayMessages: false,
    },
};
