const API = "https://randomuser.me/api/?results=20";

window.addEventListener('DOMContentLoaded', async () => {
    /** @type { Array } */
    const data = await requestData();
    const userElems = data.map(createUserElement);
    const userWrapper = document.querySelector(".users");
    userWrapper.append(...userElems);

    const searcher = document.getElementById('searcher');
    searcher.addEventListener('input', (e) => {
        userElems.forEach(user => user.showWhenInclude(e.target.value));
    });
})


async function requestData() {
    const res = await fetch(API, {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    });

    let data = [];
    try {
        data = (await res.json()).results;
    } catch (err) {
        console.error(err)
    }

    return data;
}

function createUserElement(userData) {
    const user = document.createElement('div');
    user.className = "user";
    const avatar = userData.picture.thumbnail;
    const fullname = `${userData.name.first} ${userData.name.last}`
    const location = `${userData.location.state}, ${userData.location.country}`

    /**
     * Shows or hides the user element, based on whether the user's name or
     * location includes the given string.
     * @param {string} str The string to search for.
     */
    user.showWhenInclude = (str) => {
        str = str.toLowerCase();
        if(fullname.toLowerCase().includes(str) || location.toLowerCase().includes(str) || !str)
            return user.style.display = 'grid';

        user.style.display = 'none';
    }

    user.innerHTML = `
        <figure class="user-avatar">
            <img src="${avatar}" alt="user avatar">
        </figure>
        <h4 class="user-name">${fullname}</h4>
        <p class="user-location">${location}</p>
    `;

    return user;
}