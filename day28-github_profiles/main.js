// TODO LOADER AND ERROR CARD.

const BASE_API = 'https://api.github.com/search/users';
const searcher = document.getElementById('searcher')
const profileWrapper = document.getElementById('profileWrapper')

function handleSubmit(e) {
    e.preventDefault();

    if(!searcher.value) return;

    getGithubUserByQuery(searcher.value)
        .then((users) => {
            const profiles = users.map((user) =>  createProfileElement(user))
            profileWrapper.append(...profiles);
        })
        .catch((err) => console.error(err));
}

async function getGithubUserByQuery(query) {
    try {
        const req  = await fetch(`${BASE_API}?q=${query}`);
        const res = await req.json();

        return getGithubUsersData(res.items);
    } catch(err) {
        console.error(err);
    }
}

async function getGithubUsersData(usersItems) {
    const users = []
    const repos = []
    
    usersItems.forEach(item => {
        users.push(requestGitHubUserData(item.url));
        repos.push(requestGitHubUserReposData(item.repos_url));
    });

    const usersPromise = Promise.all(users);
    const reposPromise = Promise.all(repos);

    const [usersRes, reposRes] = await Promise.all([usersPromise, reposPromise]);

    usersRes.forEach((user, idx) => {
        user.repos = reposRes[idx];
    })

    return usersRes;
}

async function requestGitHubUserData(url) {
    const req  = await fetch(url);
    return req.json();
}
async function requestGitHubUserReposData(url) {
    const req  = await fetch(url);
    return req.json();
}

function createProfileElement(data) {
    const profile = document.createElement('div');
    profile.className = 'profile'
    profile.innerHTML = `
        <figure class="profile-avatar">
            <img src="${data.avatar_url}" alt="Avatar">
        </figure>
        <div class="profile-info">
            <h3 class="profile-info-name">${data.name}</h3>
            <p class="profile-info-descrip">
                ${data.bio}
            </p>
            <div class="profile-info-stats">
                <span>${data.followers} followers</span>
                <span>${data.following} Following</span>
                <span>${data.public_repos} Repos</span>
            </div>
            <div class="profile-info-repos">
                ${getReposElements(data.repos)}
            </div>
        </div>
    `

    return profile;
}


function getReposElements(repos) {
    let result = '';
    let count = 0
    for (const repo of repos) {
        if(count > 7) break;

        result += `<a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>`
        count++;
    }

    return result;
}


{/* <div class="profile">
    <figure class="profile-avatar">
        <img src="" alt="">
    </figure>
    <div class="profile-info">
        <h3 class="profile-info-name">Profile Name</h3>
        <p class="profile-info-descrip">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt dicta,
            praesentium tempora deleniti itaque, consequuntur magni harum eaque amet
        </p>
        <div class="profile-info-stats">
            <span>2 followers</span>
            <span>4 Following</span>
            <span>37 Repos</span>
        </div>
        <div class="profile-info-repos">
            <a href="#">sitamet</a>
            <a href="#">sit_amet_magni</a>
            <a href="#">consequuntur magnit</a>
            <a href="#">sit_itaque</a>
            <a href="#">itaque_amet</a>
            <a href="#">sit_itaque_amet</a>
        </div>
    </div>
</div> */}