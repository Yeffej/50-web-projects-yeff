const api = 'https://icanhazdadjoke.com/' 
const jokeWrapper = document.getElementById('jokeWrapper')

async function getDadJoke() {
    const res = await fetch(api, {
        headers: {
            accept: "application/json"
        }
    });

    return res.json();;
}

function insertNewJoke() { 
    getDadJoke()
        .then((data) => {
            if(data) {
                jokeWrapper.innerHTML = data.joke;
            } else {
                console.error("Request failed! dad joke could not be loaded")
            }
        })
}

// insert the initial joke.
window.addEventListener('DOMContentLoaded', insertNewJoke);
