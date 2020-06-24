/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
// Global variable decleared for navigation

// Global variable decleared for all sections

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */
// build the nav

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
//   Selecting all section items
const allSections = Array.from(document.querySelectorAll("section"));

// Selecting the ul tag
const navUl = document.querySelector("#navbar__list");

allSections.forEach((section, index) => {
  //   creating the internal navigation items
  const li = document.createElement("li");
  const anchorTag = document.createElement("a");
  const linkTextAchorTag = `#section${index + 1}`;

  // setting the attribute and text on the a tag
  anchorTag.setAttribute("href", linkTextAchorTag);
  anchorTag.innerHTML = `Section ${index + 1}`;

  // setting class and adding the a tag inside the li tag
  li.className = `li${index + 1}`;
  li.appendChild(anchorTag);

  // Adding the li inside the ul tag
  navUl.appendChild(li);

  // Eventlistener for menu buttons
  // Scroll to anchor ID using click event
  li.addEventListener("click", (event) => {
    event.preventDefault();
    const clickedButtonHref = event.target.getAttribute("href");
    anchorLinkHandler(clickedButtonHref, 1000);
  });

  // Add class 'active' to section when near top of viewport
  li.addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }
    this.className += " active";
  });
});

//to scroll
function anchorLinkHandler(target, animationDuration) {
  const distanceToTop = (el) => Math.floor(el.getBoundingClientRect().top);
  const targetAnchor = document.querySelector(target);
  if (!targetAnchor) return;
  const originalTop = distanceToTop(targetAnchor);

  window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });

  const checkIfDone = setInterval(function () {
    const atBottom =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
    if (distanceToTop(targetAnchor) === 0 || atBottom) {
      targetAnchor.tabIndex = "-1";
      targetAnchor.focus();
      window.history.pushState("", "", target);
      clearInterval(checkIfDone);
    }
  }, 100);
}

//set class to current on scrolling
let navLinks = document.querySelectorAll(".navbar__menu ul li a");
let mainSections = document.querySelectorAll("section");

let lastId;
let cur = [];

window.addEventListener("scroll", (event) => {
  let fromTop = window.scrollY;

  navLinks.forEach((link) => {
    let section = document.querySelector(link.hash);

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("current");
    } else {
      link.classList.remove("current");
    }
  });
});
