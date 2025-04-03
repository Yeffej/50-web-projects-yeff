const tabs = {
    "home": { url: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80' },
    "work": { url: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80' },
    "blog": { url: 'https://images.unsplash.com/photo-1559087867-ce4c91325525?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80' },
    "about": { url: 'https://images.unsplash.com/photo-1522735338363-cc7313be0ae0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80' }
}

let prevTab = null;

const tabsEl = document.querySelectorAll(".tab");
const tabScreen = document.getElementById("tabScreen");
tabsEl.forEach((el) => {
    el.addEventListener("click", () => {
        const tabkey = el.dataset.tabkey;
        if(!tabkey) return;

        const tab = tabs[tabkey];
        tabScreen.style.backgroundImage = `url(${tab.url})`;

        el.classList.add("active");
        if(prevTab) prevTab.classList.remove("active");
        prevTab = el;
    });
})

tabsEl[0].click(); // activate homepage
