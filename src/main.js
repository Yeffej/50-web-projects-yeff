const PROJECTS = [
  { id: 1, name: "Expanding Cards", uri: "day1-expanding-cards" },
  { id: 2, name: "Progress Steps", uri: "day2-progress-steps" },
  { id: 3, name: "Rotating Navigation", uri: "day3-rotating-navigation" },
  { id: 4, name: "Hidden Search Widget", uri: "day4-hidden-search-widget" },
  { id: 5, name: "Blurry Loading", uri: "day5-blurry-loading" },
  { id: 6, name: "Scroll Animation", uri: "day6-scroll-animation" },
  { id: 7, name: "Split Landing Page", uri: "day7-split-landing-page" },
  { id: 8, name: "Form Wave", uri: "day8-form-wave" },
  { id: 9, name: "Sound Board", uri: "day9-sound-board" },
  { id: 10, name: "Dad Jokes", uri: "day10-dad-jokes" },
  { id: 11, name: "Event Keycodes", uri: "day11-event-keycodes" },
  { id: 12, name: "Faq Collapse", uri: "day12-faq-collapse" },
  { id: 13, name: "Random Choice Picker", uri: "day13-random-choice-picker" },
  { id: 14, name: "Animated Navigation", uri: "day14-animated-navigation" },
  { id: 15, name: "Incrementing Counter", uri: "day15-incrementing-counter" },
  { id: 16, name: "Drink Water", uri: "day16-drink-water" },
  { id: 17, name: "Move App", uri: "day17-move-app" },
  { id: 18, name: "Background Slider", uri: "day18-background-slider" },
  { id: 19, name: "Theme Clock", uri: "day19-theme-clock" },
  { id: 20, name: "Button Ripple Effect", uri: "day20-button-ripple-effect" },
  { id: 21, name: "Drag N Drop", uri: "day21-drag-n-drop" },
  { id: 22, name: "Drawing App", uri: "day22-drawing-app" },
  { id: 23, name: "Kinetic Loader", uri: "day23-kinetic-loader" },
  { id: 24, name: "Content Placeholder", uri: "day24-content-placeholder" },
  { id: 25, name: "Sticky Navbar", uri: "day25-sticky-navbar" },
  {
    id: 26,
    name: "Double Vertical Slider",
    uri: "day26-double-vertical-slider",
  },
  { id: 27, name: "Toast Notification", uri: "day27-toast-notification" },
  { id: 28, name: "Github_Profiles", uri: "day28-github_profiles" },
  { id: 29, name: "Double Click Heart", uri: "day29-double-click-heart" },
  { id: 30, name: "Auto Text Effect", uri: "day30-auto-text-effect" },
  { id: 31, name: "Passoword Generator", uri: "day31-passoword-generator" },
  { id: 32, name: "Good Cheap Fast", uri: "day32-good-cheap-fast" },
  { id: 33, name: "Notes App", uri: "day33-notes-app" },
  { id: 34, name: "Ink Animation Effect", uri: "day34-ink-animation-effect" },
  { id: 35, name: "Image Carousel 3D", uri: "day35-image-carousel-3D" },
  { id: 36, name: "Hoverboard", uri: "day36-hoverboard" },
  {
    id: 37,
    name: "Text Background Animation",
    uri: "day37-text-background-animation",
  },
  { id: 38, name: "Mobile Tab Nav", uri: "day38-mobile-tab-nav" },
  {
    id: 39,
    name: "Password Strength Background",
    uri: "day39-password-strength-background",
  },
  { id: 40, name: "3D Background Boxes", uri: "day40-3d-background-boxes" },
  { id: 41, name: "Verify Account Ui", uri: "day41-verify-account-ui" },
  { id: 42, name: "Live User Filter", uri: "day42-live-user-filter" },
  { id: 43, name: "Feedback Ui Design", uri: "day43-feedback-ui-design" },
  { id: 44, name: "Custom Range Slider", uri: "day44-custom-range-slider" },
  { id: 45, name: "Dark Mode Toggle", uri: "day45-dark-mode-toggle" },
  { id: 46, name: "Quiz App", uri: "day46-quiz-app" },
  {
    id: 47,
    name: "Testimonial Box Switcher",
    uri: "day47-testimonial-box-switcher",
  },
  { id: 48, name: "Random Img Feed", uri: "day48-random-img-feed" },
  { id: 49, name: "Todo List", uri: "day49-todo-list" },
  { id: 50, name: "Insect Catch Game", uri: "day50-insect-catch-game" },
  { id: 51, name: "Page Transition", uri: "day51-page-transition" },
  { id: 52, name: "Jumping Ball 3D", uri: "day52-jumping-ball-3d" },
  { id: 53, name: "Cards Rgb Tilt Effect", uri: "day53-cards-rgb-tilt-effect" },
  {
    id: 54,
    name: "Infinite Horizontal Scroll",
    uri: "day54-infinite-horizontal-scroll",
  },
];

// indicates is the page is fully loaded.
let isPageLoaded = false;

const carouselWrapper = document.querySelector(".carousel");
const projectListWrapper = document.querySelector(".project-manager-list");
const goNextBtn = document.getElementById("goNextBtn");
const goBackBtn = document.getElementById("goBackBtn");

const itemsQuantity = 8;
const PAGES = Math.ceil(PROJECTS.length / itemsQuantity);
let currentPage = 1;

goNextBtn.addEventListener("click", () => {
  currentPage++;
  if (currentPage > PAGES) currentPage = 1;
  insertItems();
});
goBackBtn.addEventListener("click", () => {
  currentPage--;
  if (currentPage < 1) currentPage = PAGES;
  insertItems();
});

window.addEventListener("DOMContentLoaded", () => {
  carouselWrapper.classList.add("show");
  isPageLoaded = true;
});

function insertItems() {
  const items = PROJECTS.slice(
    (currentPage - 1) * itemsQuantity,
    currentPage * itemsQuantity
  );

  if (projectListWrapper.children.length > 0) removeProjectItems();
  const projectItems = items.map(createProjectHtmlItem);
  projectListWrapper.append(...projectItems);

  if (carouselWrapper.children.length > 0) {
    removeCarouselItems().then(() => {
      addCarouselItems(items);
    });
  } else {
    addCarouselItems(items);
  }
}
insertItems();

function removeProjectItems() {
  projectListWrapper.innerHTML = "";
}

function addCarouselItems(items) {
  const carouselItems = items.map(createCarouselItem);
  carouselWrapper.append(...carouselItems);
}

function handleCarouselTransitionEnd(e) {
  if (
    carouselWrapper.classList.contains("show") ||
    e.propertyName != "transform"
  )
    return;

  carouselWrapper.classList.add("show");
  carouselWrapper.innerHTML = "";

  carouselWrapper.removeEventListener(
    "transitionend",
    handleCarouselTransitionEnd
  );
}

function removeCarouselItems() {
  if (isPageLoaded) {
    carouselWrapper.classList.remove("show");
  }

  return new Promise((resolve) => {
    carouselWrapper.addEventListener("transitionend", (e) => {
      handleCarouselTransitionEnd(e, resolve);
      resolve();
    });
  });
}

function createProjectHtmlItem(data, idx) {
  const item = document.createElement("li");
  item.innerHTML = `<a href="${data.uri}/">${data.id}. ${data.name}</a>`;
  item.style.animationDelay = `${0.5 * idx}s`;

  return item;
}
function createCarouselItem(data) {
  const item = document.createElement("a");
  item.className = "carousel-item";
  item.textContent = `${data.name}`;
  item.href = `${data.uri}/`;

  return item;
}
