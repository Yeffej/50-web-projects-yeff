class Article {
    #subscribtions;

    constructor() {
        this.#subscribtions = [];
    }

    subscribe(callback) {
        if (typeof callback !== 'function') {
            throw new Error('callback must be a function');
        }

        this.#subscribtions.push(callback);
    }

    fetch() {
        // Implement FAKE fetching logic here
        const data = { 
            title: 'Content Placeholder',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, expedita!',
            img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80",
            author: 'Lennon Paul',
            date: 'Oct 08 2024',
            avatar: 'https://randomuser.me/api/portraits/men/77.jpg'
        };


        setTimeout(() => {
            this.#subscribtions.forEach((callback) => {
                callback(data, null);
            });
        }, 3000);
    }
}


function renderCard(data, err) {
    let htmlcontnent = '';

    if (err) {
        console.error("Error: ", err);
        htmlcontnent = '<h1>Error on loading data</h1>';
        
    } else {
        htmlcontnent = `
         <figure class="card-img">
                <img src="${data.img}" alt="image of a PC">
            </figure>
            <div class="card-content">
                <h2>${data.title}</h2>
                <p>${data.content}</p>
            </div>
            <div class="card-user">
                <div class="card-user-avatar">
                    <img src="${data.avatar}" alt="user image">
                </div>
                <div class="card-user-info">
                    <h4>${data.author}</h4>
                    <span>${data.date}</span>
                </div>
            </div>
        `;
    }

    document.getElementById('card').innerHTML = htmlcontnent;
}    



window.addEventListener('DOMContentLoaded', () => {
    const article = new Article();
    article.subscribe(renderCard);
    article.fetch();
})