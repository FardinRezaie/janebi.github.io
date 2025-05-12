/* ---------- Blur main part when user Hover the li in navigation ---------- */
document
  .querySelector("#more-item")
  .addEventListener("mouseenter", function () {
    document.querySelector("main.container").style.filter = "blur(10px)";
    document.querySelector("main.container").style.transition =
      "filter 0.3s ease";
  });

document
  .querySelector(".more-item-hide")
  .addEventListener("mouseenter", function () {
    document.querySelector("main.container").style.filter = "blur(10px)";
    document.querySelector("main.container").style.transition =
      "filter 0.3s ease";
  });

document
  .querySelector("#more-item")
  .addEventListener("mouseleave", function () {
    document.querySelector("main.container").style.filter = "none";
  });

document
  .querySelector(".more-item-hide")
  .addEventListener("mouseleave", function () {
    document.querySelector("main.container").style.filter = "none";
  });

/***** Nav scroll *****/
var lastScrollTop = 0;
window.addEventListener("scroll", function () {
  let navbar = document.querySelector("nav");
  let navTop = document.getElementById("nav-top");
  let navBottom = document.getElementById("nav-bottom");
  var scrollTop = document.documentElement.scrollTop;

  // Adjust navigation height when scrolling
  if (window.scrollY > 25) {
    navTop.style.marginBottom = "0px";
    navTop.style.transition = "0.2s";
    navbar.classList.add("scrolled");
    if (scrollTop > lastScrollTop) {
      if (window.scrollY > 100) {
        navBottom.style.display = "none";
        navBottom.style.position = "fixed";
        navBottom.style.top = "0px";
      }
    } else {
      navBottom.style.display = "block";
      navBottom.style.position = "sticky";
    }
    lastScrollTop = scrollTop;
  } else {
    navTop.style.marginBottom = "40px";
    navTop.style.transition = "0.2s";
    navbar.classList.remove("scrolled");
  }
});

// Access the Images
let slideImages = document.querySelectorAll(".img");
// Access the next and prev buttons
let next = document.getElementById("next");
let prev = document.getElementById("prev");
// Access the indicators
let dots = document.querySelectorAll(".dot");

var counter = 0;

// Code for next button
next.addEventListener("click", slideNext);
function slideNext() {
  slideImages[counter].style.animation = "next1 0.3s ease-in forwards";
  if (counter >= slideImages.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  slideImages[counter].style.animation = "next2 0.3s ease-in forwards";
  indicators();
}

// Code for prev button
prev.addEventListener("click", slidePrev);
function slidePrev() {
  slideImages[counter].style.animation = "prev1 0.3s ease-in forwards";
  if (counter == 0) {
    counter = slideImages.length - 1;
  } else {
    counter--;
  }
  slideImages[counter].style.animation = "prev2 0.3s ease-in forwards";
  indicators();
}

// Auto slideing
function autoSliding() {
  deletInterval = setInterval(timer, 3000);
  function timer() {
    slideNext();
    indicators();
  }
}
autoSliding();

// Stop auto sliding when mouse is over
const container = document.querySelector(".slide-container");
container.addEventListener("mouseover", function () {
  clearInterval(deletInterval);
});

// Resume sliding when mouse is out
container.addEventListener("mouseout", autoSliding);

// Add and remove active class from the indicators
function indicators() {
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[counter].className += " active";
}

// Add click event to the indicator
function switchImage(currentImage) {
  currentImage.classList.add("active");
  var imageId = currentImage.getAttribute("attr");
  if (imageId > counter) {
    slideImages[counter].style.animation = "next1 0.3s ease-in forwards";
    counter = imageId;
    slideImages[counter].style.animation = "next2 0.3s ease-in forwards";
  } else if (imageId == counter) {
    return;
  } else {
    slideImages[counter].style.animation = "prev1 0.3s ease-in forwards";
    counter = imageId;
    slideImages[counter].style.animation = "prev2 0.3s ease-in forwards";
  }
  indicators();
}


/* -------------- Draggable Items -------------- */

const list = document.querySelector(".list-bottom"),
  firstDiv = list.querySelectorAll(".items")[0];
arrowIcons = document.querySelectorAll(".dragging-button i");

let isDragging = false,
  isDragStart = false,
  prevpageX,
  prevscrollLeft,
  positionDiff;

const showHideIcons = () => {
  let scrollWidth = list.scrollWidth - list.clientWidth;
  if (list.scrollLeft + 16 >= 0) {
    arrowIcons[1].style.display = "none";
  } else {
    arrowIcons[1].style.display = "flex";
  }
  if (Math.abs(list.scrollLeft) >= scrollWidth - 15) {
    arrowIcons[0].style.display = "none"; // Hide left arrow at the end
  } else {
    arrowIcons[0].style.display = "flex"; // Show left arrow otherwise
  }
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let divWidth = firstDiv.clientWidth;
    if (icon.id == "right") {
      list.scrollLeft += divWidth;
    } else {
      list.scrollLeft -= divWidth;
    }
    setTimeout(() => showHideIcons(), 80);
  });
});

const autoslide = () => {
  positionDiff = Math.abs(positionDiff);
  let divWidth = firstDiv.clientWidth;
  let valDifference = divWidth;

  if (list.scrollLeft > prevscrollLeft) {
    return (list.scrollLeft -=
      positionDiff > firstDiv ? valDifference : -positionDiff);
  }
  list.scrollLeft += positionDiff > firstDiv ? valDifference : -positionDiff;
};

const dragStart = (e) => {
  isDragging = true;
  prevpageX = e.pageX;
  prevscrollLeft = list.scrollLeft;
  list.classList.add("dragging");
};

const dragging = (e) => {
  if (!isDragging) return;
  e.preventDefault();
  isDragStart = true;
  positionDiff = e.pageX - prevpageX;
  list.scrollLeft = prevscrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  if (!isDragStart) return;
  isDragging = false;
  list.classList.remove("dragging");
  isDragStart = false;
  autoslide();
};

list.addEventListener("mousedown", dragStart);
list.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
document.addEventListener("mouseleave", dragStop);

/* -------------- Draggable Items2 -------------- */

const list2 = document.querySelector(".list-bottom2"),
  firstDiv2 = list2.querySelectorAll(".items2")[0];
arrowIcons2 = document.querySelectorAll(".dragging-button2 i");

let isDragging2 = false,
  isDragStart2 = false,
  prevpageX2,
  prevscrollLeft2,
  positionDiff2;

const showHideIcons2 = () => {
  let scrollWidth2 = list2.scrollWidth - list2.clientWidth;
  if (list2.scrollLeft + 16 >= 0) {
    arrowIcons2[1].style.display = "none";
  } else {
    arrowIcons2[1].style.display = "flex";
  }
  if (Math.abs(list2.scrollLeft) >= scrollWidth2 - 15) {
    arrowIcons2[0].style.display = "none"; // Hide left arrow at the end
  } else {
    arrowIcons2[0].style.display = "flex"; // Show left arrow otherwise
  }
};

arrowIcons2.forEach((icon2) => {
  icon2.addEventListener("click", () => {
    let divWidth2 = firstDiv2.clientWidth;
    if (icon2.id == "right") {
      list2.scrollLeft += divWidth2;
    } else {
      list2.scrollLeft -= divWidth2;
    }
    setTimeout(() => showHideIcons2(), 80);
  });
});

const autoslide2 = () => {
  positionDiff2 = Math.abs(positionDiff2);
  let divWidth2 = firstDiv2.clientWidth;
  let valDifference2 = divWidth2;

  if (list2.scrollLeft > prevscrollLeft2) {
    return (list2.scrollLeft -=
      positionDiff2 > firstDiv2 ? valDifference2 : -positionDiff2);
  }
  list2.scrollLeft +=
    positionDiff2 > firstDiv2 ? valDifference2 : -positionDiff2;
};

const dragStart2 = (e) => {
  isDragging2 = true;
  prevpageX2 = e.pageX;
  prevscrollLeft2 = list2.scrollLeft;
  list2.classList.add("dragging2");
};

const dragging2 = (e) => {
  if (!isDragging2) return;
  e.preventDefault();
  isDragStart2 = true;
  positionDiff2 = e.pageX - prevpageX2;
  list2.scrollLeft = prevscrollLeft2 - positionDiff2;
  showHideIcons2();
};

const dragStop2 = () => {
  if (!isDragStart2) return;
  isDragging2 = false;
  list2.classList.remove("dragging2");
  isDragStart2 = false;
  autoslide2();
};

list2.addEventListener("mousedown", dragStart2);
list2.addEventListener("mousemove", dragging2);
document.addEventListener("mouseup", dragStop2);
document.addEventListener("mouseleave", dragStop2);

/* -------------- Draggable Items3 -------------- */

const list3 = document.querySelector(".list-bottom3");
const arrowBtns = document.querySelectorAll(".dragging-button3 i");
const firstDiv3 = list3.querySelector(".items3").offsetWidth;
const list3Childrens = [...list3.children];

let itemPerView = Math.round(list3.offsetWidth / firstDiv3);

list3Childrens
  .slice(-itemPerView)
  .reverse()
  .forEach((item) => {
    list3.insertAdjacentHTML("afterbegin", item.outerHTML);
  });

list3Childrens.slice(0, itemPerView).forEach((item) => {
  list3.insertAdjacentHTML("beforeend", item.outerHTML);
});

let isDragging3 = false,
  startX,
  startScrollLeft;

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    list3.scrollLeft -= btn.id === "left" ? firstDiv3 : -firstDiv3;
  });
});

const dragStart3 = (e) => {
  isDragging3 = true;
  list3.classList.add("dragging3");
  startX = e.pageX;
  startScrollLeft = list3.scrollLeft;
};

const dragging3 = (e) => {
  if (!isDragging3) return;
  list3.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop3 = () => {
  isDragging3 = false;
  list3.classList.remove("dragging3");
};

const infiniteScroll = () => {
  if (list3.scrollLeft == 0) {
    list3.classList.add("no-transition");
    list3.scrollLeft = list3.scrollWidth - 2 * list3.offsetWidth;
    list3.classList.remove("no-transition");
  } else if (
    Math.ceil(list3.scrollLeft) ==
    list3.scrollWidth - list3.offsetWidth
  ) {
    list3.classList.add("no-transition");
    list3.scrollLeft = list3.offsetWidth;
    list3.classList.remove("no-transition");
  }
};

list3.addEventListener("mousedown", dragStart3);
list3.addEventListener("mousemove", dragging3);
document.addEventListener("mouseup", dragStop3);
list3.addEventListener("scroll", infiniteScroll);

/* -------------- Draggable Items4 -------------- */

const list4 = document.querySelector(".list-bottom4"),
  firstDiv4 = list4.querySelectorAll(".items4")[0];
arrowIcons4 = document.querySelectorAll(".dragging-button4 i");

let isDragging4 = false,
  isDragStart4 = false,
  prevpageX4,
  prevscrollLeft4,
  positionDiff4;

const showHideIcons4 = () => {
  let scrollWidth4 = list4.scrollWidth - list4.clientWidth;
  if (list4.scrollLeft + 16 >= 0) {
    arrowIcons4[1].style.display = "none";
  } else {
    arrowIcons4[1].style.display = "flex";
  }
  if (Math.abs(list4.scrollLeft) >= scrollWidth4 - 15) {
    arrowIcons4[0].style.display = "none"; // Hide left arrow at the end
  } else {
    arrowIcons4[0].style.display = "flex"; // Show left arrow otherwise
  }
};

arrowIcons4.forEach((icon4) => {
  icon4.addEventListener("click", () => {
    let divWidth4 = firstDiv4.clientWidth;
    if (icon4.id == "right") {
      list4.scrollLeft += divWidth4;
    } else {
      list4.scrollLeft -= divWidth4;
    }
    setTimeout(() => showHideIcons4(), 80);
  });
});

const autoslide4 = () => {
  positionDiff4 = Math.abs(positionDiff4);
  let divWidth4 = firstDiv4.clientWidth;
  let valDifference4 = divWidth4;

  if (list4.scrollLeft > prevscrollLeft4) {
    return (list4.scrollLeft -=
      positionDiff4 > firstDiv4 ? valDifference4 : -positionDiff4);
  }
  list4.scrollLeft +=
    positionDiff4 > firstDiv4 ? valDifference4 : -positionDiff4;
};

const dragStart4 = (e) => {
  isDragging4 = true;
  prevpageX4 = e.pageX;
  prevscrollLeft4 = list4.scrollLeft;
  list4.classList.add("dragging4");
};

const dragging4 = (e) => {
  if (!isDragging4) return;
  e.preventDefault();
  isDragStart4 = true;
  positionDiff4 = e.pageX - prevpageX4;
  list4.scrollLeft = prevscrollLeft4 - positionDiff4;
  showHideIcons4();
};

const dragStop4 = () => {
  if (!isDragStart4) return;
  isDragging4 = false;
  list4.classList.remove("dragging4");
  isDragStart4 = false;
  autoslide4();
};

list4.addEventListener("mousedown", dragStart4);
list4.addEventListener("mousemove", dragging4);
document.addEventListener("mouseup", dragStop4);
document.addEventListener("mouseleave", dragStop4);

/* -------------- Draggable Items5 -------------- */

const list5 = document.querySelector(".list-bottom5"),
  firstDiv5 = list5.querySelectorAll(".items5")[0];
arrowIcons5 = document.querySelectorAll(".dragging-button5 i");

let isDragging5 = false,
  isDragStart5 = false,
  prevpageX5,
  prevscrollLeft5,
  positionDiff5;

const showHideIcons5 = () => {
  let scrollWidth5 = list5.scrollWidth - list5.clientWidth;
  if (list5.scrollLeft + 16 >= 0) {
    arrowIcons5[1].style.display = "none";
  } else {
    arrowIcons5[1].style.display = "flex";
  }
  if (Math.abs(list5.scrollLeft) >= scrollWidth5 - 15) {
    arrowIcons5[0].style.display = "none"; // Hide left arrow at the end
  } else {
    arrowIcons5[0].style.display = "flex"; // Show left arrow otherwise
  }
};

arrowIcons5.forEach((icon5) => {
  icon5.addEventListener("click", () => {
    let divWidth5 = firstDiv5.clientWidth;
    if (icon5.id == "right") {
      list5.scrollLeft += divWidth5;
    } else {
      list5.scrollLeft -= divWidth5;
    }
    setTimeout(() => showHideIcons5(), 80);
  });
});

const autoslide5 = () => {
  positionDiff5 = Math.abs(positionDiff5);
  let divWidth5 = firstDiv5.clientWidth;
  let valDifference5 = divWidth5;

  if (list5.scrollLeft > prevscrollLeft5) {
    return (list5.scrollLeft -=
      positionDiff5 > firstDiv5 ? valDifference5 : -positionDiff5);
  }
  list5.scrollLeft +=
    positionDiff5 > firstDiv5 ? valDifference5 : -positionDiff5;
};

const dragStart5 = (e) => {
  isDragging5 = true;
  prevpageX5 = e.pageX;
  prevscrollLeft5 = list5.scrollLeft;
  list5.classList.add("dragging5");
};

const dragging5 = (e) => {
  if (!isDragging5) return;
  e.preventDefault();
  isDragStart5 = true;
  positionDiff5 = e.pageX - prevpageX5;
  list5.scrollLeft = prevscrollLeft5 - positionDiff5;
  showHideIcons5();
};

const dragStop5 = () => {
  if (!isDragStart5) return;
  isDragging5 = false;
  list5.classList.remove("dragging5");
  isDragStart5 = false;
  autoslide5();
};

list5.addEventListener("mousedown", dragStart5);
list5.addEventListener("mousemove", dragging5);
document.addEventListener("mouseup", dragStop5);
document.addEventListener("mouseleave", dragStop5);

/* -------------- Draggable Items5 -------------- */

const list6 = document.querySelector(".list-bottom6"),
  firstDiv6 = list6.querySelectorAll(".items6")[0];
arrowIcons6 = document.querySelectorAll(".dragging-button6 i");

let isDragging6 = false,
  isDragStart6 = false,
  prevpageX6,
  prevscrollLeft6,
  positionDiff6;

const showHideIcons6 = () => {
  let scrollWidth6 = list6.scrollWidth - list6.clientWidth;
  if (list6.scrollLeft + 16 >= 0) {
    arrowIcons6[1].style.display = "none";
  } else {
    arrowIcons6[1].style.display = "flex";
  }
  if (Math.abs(list6.scrollLeft) >= scrollWidth6 - 15) {
    arrowIcons6[0].style.display = "none"; // Hide left arrow at the end
  } else {
    arrowIcons6[0].style.display = "flex"; // Show left arrow otherwise
  }
};

arrowIcons6.forEach((icon6) => {
  icon6.addEventListener("click", () => {
    let divWidth6 = firstDiv6.clientWidth;
    if (icon6.id == "right") {
      list6.scrollLeft += divWidth6;
    } else {
      list6.scrollLeft -= divWidth6;
    }
    setTimeout(() => showHideIcons6(), 80);
  });
});

const autoslide6 = () => {
  positionDiff6 = Math.abs(positionDiff6);
  let divWidth6 = firstDiv6.clientWidth;
  let valDifference6 = divWidth6;

  if (list6.scrollLeft > prevscrollLeft6) {
    return (list6.scrollLeft -=
      positionDiff6 > firstDiv6 ? valDifference6 : -positionDiff6);
  }
  list6.scrollLeft +=
    positionDiff6 > firstDiv6 ? valDifference6 : -positionDiff6;
};

const dragStart6 = (e) => {
  isDragging6 = true;
  prevpageX6 = e.pageX;
  prevscrollLeft6 = list6.scrollLeft;
  list6.classList.add("dragging6");
};

const dragging6 = (e) => {
  if (!isDragging6) return;
  e.preventDefault();
  isDragStart6 = true;
  positionDiff6 = e.pageX - prevpageX6;
  list6.scrollLeft = prevscrollLeft6 - positionDiff6;
  showHideIcons6();
};

const dragStop6 = () => {
  if (!isDragStart6) return;
  isDragging6 = false;
  list6.classList.remove("dragging6");
  isDragStart6 = false;
  autoslide6();
};

list6.addEventListener("mousedown", dragStart6);
list6.addEventListener("mousemove", dragging6);
document.addEventListener("mouseup", dragStop6);
document.addEventListener("mouseleave", dragStop6);

/* -------------- Draggable Items5 -------------- */

const list7 = document.querySelector(".list-bottom7"),
  firstDiv7 = list7.querySelectorAll(".items7")[0];
arrowIcons7 = document.querySelectorAll(".dragging-button7 i");

let isDragging7 = false,
  isDragStart7 = false,
  prevpageX7,
  prevscrollLeft7,
  positionDiff7;

const showHideIcons7 = () => {
  let scrollWidth7 = list7.scrollWidth - list7.clientWidth;
  if (list7.scrollLeft + 16 >= 0) {
    arrowIcons7[1].style.display = "none";
  } else {
    arrowIcons7[1].style.display = "flex";
  }
  if (Math.abs(list7.scrollLeft) >= scrollWidth7 - 15) {
    arrowIcons7[0].style.display = "none"; // Hide left arrow at the end
  } else {
    arrowIcons7[0].style.display = "flex"; // Show left arrow otherwise
  }
};

arrowIcons7.forEach((icon7) => {
  icon7.addEventListener("click", () => {
    let divWidth7 = firstDiv7.clientWidth;
    if (icon7.id == "right") {
      list7.scrollLeft += divWidth7;
    } else {
      list7.scrollLeft -= divWidth7;
    }
    setTimeout(() => showHideIcons7(), 80);
  });
});

const autoslide7 = () => {
  positionDiff7 = Math.abs(positionDiff7);
  let divWidth7 = firstDiv7.clientWidth;
  let valDifference7 = divWidth7;

  if (list7.scrollLeft > prevscrollLeft7) {
    return (list7.scrollLeft -=
      positionDiff7 > firstDiv7 ? valDifference7 : -positionDiff7);
  }
  list7.scrollLeft +=
    positionDiff7 > firstDiv7 ? valDifference7 : -positionDiff7;
};

const dragStart7 = (e) => {
  isDragging7 = true;
  prevpageX7 = e.pageX;
  prevscrollLeft7 = list7.scrollLeft;
  list7.classList.add("dragging7");
};

const dragging7 = (e) => {
  if (!isDragging7) return;
  e.preventDefault();
  isDragStart7 = true;
  positionDiff7 = e.pageX - prevpageX7;
  list7.scrollLeft = prevscrollLeft7 - positionDiff7;
  showHideIcons7();
};

const dragStop7 = () => {
  if (!isDragStart7) return;
  isDragging7 = false;
  list7.classList.remove("dragging7");
  isDragStart7 = false;
  autoslide7();
};

list7.addEventListener("mousedown", dragStart7);
list7.addEventListener("mousemove", dragging7);
document.addEventListener("mouseup", dragStop7);
document.addEventListener("mouseleave", dragStop7);

/* -------------- Draggable Items5 -------------- */

const list8 = document.querySelector(".list-bottom-brand");
const firstDiv8 = list8.querySelector(".items8").offsetWidth;
const list8Childrens = [...list8.children];

let itemPerView8 = Math.round(list8.offsetWidth / firstDiv8);

let isDragging8 = false,
  startX8,
  startScrollLeft8;

const dragStart8 = (e) => {
  isDragging8 = true;
  list8.classList.add("dragging8");
  startX8 = e.pageX;
  startScrollLeft8 = list8.scrollLeft;
};

const dragging8 = (e) => {
  if (!isDragging8) return;
  list8.scrollLeft = startScrollLeft8 - (e.pageX - startX8);
};

const dragStop8 = () => {
  isDragging8 = false;
  list8.classList.remove("dragging8");
};

const infiniteScroll8 = () => {
  if (list8.scrollLeft == 0) {
    list8.classList.add("no-transition2");
    list8.scrollLeft = list8.scrollWidth - 2 * list8.offsetWidth;
    list8.classList.remove("no-transition2");
  } else if (
    Math.ceil(list8.scrollLeft) ==
    list8.scrollWidth - list8.offsetWidth
  ) {
    list8.classList.add("no-transition2");
    list8.scrollLeft = list8.offsetWidth;
    list8.classList.remove("no-transition2");
  }
};

list8.addEventListener("mousedown", dragStart8);
list8.addEventListener("mousemove", dragging8);
document.addEventListener("mouseup", dragStop8);
list8.addEventListener("scroll", infiniteScroll8);

/* -------------- Draggable Items5 -------------- */

const list9 = document.querySelector(".list-bottom9"),
  firstDiv9 = list9.querySelectorAll(".items9")[0];
arrowIcons9 = document.querySelectorAll(".dragging-button9 i");

let isDragging9 = false,
  isDragStart9 = false,
  prevpageX9,
  prevscrollLeft9,
  positionDiff9;

const showHideIcons9 = () => {
  let scrollWidth9 = list9.scrollWidth - list9.clientWidth;
  if (list9.scrollLeft + 16 >= 0) {
    arrowIcons9[1].style.display = "none";
  } else {
    arrowIcons9[1].style.display = "flex";
  }
  if (Math.abs(list9.scrollLeft) >= scrollWidth9 - 20) {
    arrowIcons9[0].style.display = "none"; // Hide left arrow at the end
  } else {
    arrowIcons9[0].style.display = "flex"; // Show left arrow otherwise
  }
};

arrowIcons9.forEach((icon9) => {
  icon9.addEventListener("click", () => {
    let divWidth9 = firstDiv9.clientWidth;
    if (icon9.id == "right") {
      list9.scrollLeft += divWidth9;
    } else {
      list9.scrollLeft -= divWidth9;
    }
    setTimeout(() => showHideIcons9(), 80);
  });
});

const autoslide9 = () => {
  positionDiff9 = Math.abs(positionDiff9);
  let divWidth9 = firstDiv9.clientWidth;
  let valDifference9 = divWidth9;

  if (list9.scrollLeft > prevscrollLeft9) {
    return (list9.scrollLeft -=
      positionDiff9 > firstDiv9 ? valDifference9 : -positionDiff9);
  }
  list9.scrollLeft +=
    positionDiff9 > firstDiv9 ? valDifference9 : -positionDiff9;
};

const dragStart9 = (e) => {
  isDragging9 = true;
  prevpageX9 = e.pageX;
  prevscrollLeft9 = list9.scrollLeft;
  list9.classList.add("dragging9");
};

const dragging9 = (e) => {
  if (!isDragging9) return;
  e.preventDefault();
  isDragStart9 = true;
  positionDiff9 = e.pageX - prevpageX9;
  list9.scrollLeft = prevscrollLeft9 - positionDiff9;
  showHideIcons9();
};

const dragStop9 = () => {
  if (!isDragStart9) return;
  isDragging9 = false;
  list9.classList.remove("dragging9");
  isDragStart9 = false;
  autoslide9();
};

list9.addEventListener("mousedown", dragStart9);
list9.addEventListener("mousemove", dragging9);
document.addEventListener("mouseup", dragStop9);
document.addEventListener("mouseleave", dragStop9);
