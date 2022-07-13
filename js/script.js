
window.addEventListener("load", function () {
   document.querySelector(".preloader").classList.add("opacity-0");

   setTimeout(function () {
      document.querySelector(".preloader").style.display = "none";
   }, 1000)
})

/* ------------- Toggle Body Scrolling ------------------ */
function toggleBodyScrolling() {
   document.body.classList.toggle("hide-scrolling");
}


// filter portfolio items
const filterBtnsContainer = document.querySelector(".portfolio-filter");
let portfolioItems;
filterBtnsContainer.addEventListener("click", (e) => {
   if (e.target.classList.contains("portfolio-filter-btn") &&
      !e.target.classList.contains("active")) {
      filterBtnsContainer.querySelector(".active").classList.remove("active");
      e.target.classList.add("active");
      toggleBodyScrolling();
      filterItems(e.target);
   }
});

function filterItems(filterBtn) {
   const selectedCategory = filterBtn.getAttribute("data-filter");
   document.querySelectorAll(".portfolio-item").forEach((item) => {
      const category = item.getAttribute("data-category").split(",");
      if (category.indexOf(selectedCategory) !== -1 || selectedCategory === "all") {
         item.classList.add("show");
      }
      else {
         item.classList.remove("show");
      }
   });
   portfolioItems = document.querySelectorAll(".portfolio-item.show");
}
// Filter Active Category Portfolio Items
filterItems(document.querySelector(".portfolio-filter-btn.active"));


/* ------------- Portfolio Item Details Popup --------------- */
let portfolioItemIndex;
document.addEventListener("click", (e) => {
   if (e.target.closest(".portfolio-item")) {
      const currentItem = e.target.closest(".portfolio-item");
      portfolioItemIndex = Array.from(portfolioItems).indexOf(currentItem);
      togglePopup();
      portfolioItemDetails();
      updateNextPrevItem();
   }
});

function togglePopup() {
   document.querySelector(".portfolio-popup").classList.toggle("open");
   toggleBodyScrolling();
   document.querySelector(".pp-inner").scrollTo(0, 0);
}

const ppCloseBtn = document.querySelectorAll(".pp-close-btn");
ppCloseBtn.forEach((item) => {
   item.addEventListener("click", togglePopup);

});

function portfolioItemDetails() {
   if(portfolioItems[portfolioItemIndex].querySelector("img").getAttribute("data-img")){

   document.querySelector(".pp-thumbnail img").src =
      portfolioItems[portfolioItemIndex].querySelector("img").getAttribute("data-img");
   }
      else{
         
   document.querySelector(".pp-thumbnail img").src =
   portfolioItems[portfolioItemIndex].querySelector("img").src;
      }

   document.querySelector(".pp-header h3").innerHTML =
      portfolioItems[portfolioItemIndex].querySelector(".portfolio-item-title").innerHTML;

   document.querySelector(".pp-body").innerHTML =
      portfolioItems[portfolioItemIndex].querySelector(".portfolio-item-details").innerHTML;

   document.querySelector(".pp-counter").innerHTML = `${portfolioItemIndex + 1} of ${portfolioItems.length} ( <span title="category">${document.querySelector(".portfolio-filter-btn.active").innerHTML}</span> )`;
}

function updateNextPrevItem() {
   const ppFooterLeft = document.querySelectorAll(".pp-footer-left");
   const ppFooterRight = document.querySelectorAll(".pp-footer-right");
   if (portfolioItemIndex !== 0) {
      ppFooterLeft.forEach((item) => {
         item.classList.remove("hidden");
         item.querySelector("h3").innerHTML =
            portfolioItems[portfolioItemIndex - 1].querySelector("h3").innerHTML;

         item.querySelector("img").src =
            portfolioItems[portfolioItemIndex - 1].querySelector("img").src;
      });
   }
   else {
      ppFooterLeft.forEach((item) => {
         item.classList.add("hidden");
      });

   }

   if (portfolioItemIndex !== portfolioItems.length - 1) {
      ppFooterRight.forEach((item) => {
         item.classList.remove("hidden");
         item.querySelector("h3").innerHTML =
            portfolioItems[portfolioItemIndex + 1].querySelector("h3").innerHTML;

         item.querySelector("img").src =
            portfolioItems[portfolioItemIndex + 1].querySelector("img").src;
      });

   }
   else {
      ppFooterRight.forEach((item) => {
         item.classList.add("hidden");
      });

   }
}

const ppPrevBtn = document.querySelectorAll(".pp-prev-btn");
ppPrevBtn.forEach((item) => {
   item.addEventListener("click", () => {
      changePortfolioItem("prev");
   });
});

const ppRightBtn = document.querySelectorAll(".pp-next-btn");
ppRightBtn.forEach((item) => {
   item.addEventListener("click", () => {
      changePortfolioItem("next");
   });
});


function changePortfolioItem(direction) {
   if (direction == "prev") {
      portfolioItemIndex--;
   }
   else {
      portfolioItemIndex++;
   }
   document.querySelector(".pp-overlay").classList.add(direction);
   setTimeout(() => {
      document.querySelector(".pp-inner").scrollTo(0, 0);
      portfolioItemDetails();
      updateNextPrevItem();
   }, 400);
   setTimeout(() => {
      document.querySelector(".pp-overlay").classList.remove(direction);
   }, 1000);

}


// Aside Navbar
const nav = document.querySelector(".nav"),
   navList = nav.querySelectorAll("li"),
   totalNavList = navList.length,
   allSection = document.querySelectorAll(".section"),
   totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
   const a = navList[i].querySelector("a");
   a.addEventListener("click", function () {

      //   hide portfolio popup if open 
      if (document.querySelector(".portfolio-popup").classList.contains("open")) {
         togglePopup();
      }

      // remove back section Class
      removeBackSectionClass();

      for (let j = 0; j < totalNavList; j++) {
         if (navList[j].querySelector("a").classList.contains("active")) {
            // add back section Class
            addBackSectionClass(j)
         }
         navList[j].querySelector("a").classList.remove("active");
      }

      a.classList.add("active");
      showSection(a);

      if (window.innerWidth < 1200) {
         asideSectionTogglerBtn();
      }

   })
}

function removeBackSectionClass() {
   for (let i = 0; i < totalSection; i++) {
      allSection[i].classList.remove("back-section");
   }
}
function addBackSectionClass(num) {
   allSection[num].classList.add("back-section");
}
function showSection(element) {
   for (let i = 0; i < totalSection; i++) {
      allSection[i].classList.remove("active");
   }
   const target = element.getAttribute("href").split("#")[1];
   document.querySelector("#" + target).classList.add("active")

}

function updateNav(element) {
   for (let i = 0; i < totalNavList; i++) {
      navList[i].querySelector("a").classList.remove("active");
      const target = element.getAttribute("href").split("#")[1];
      if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
         navList[i].querySelector("a").classList.add("active");
      }
   }

}


document.querySelector(".hire-me").addEventListener("click", function () {
   const sectionIndex = this.getAttribute("data-section-index");
   // console.log(sectionIndex)
   showSection(this);
   updateNav(this);
   removeBackSectionClass();
   addBackSectionClass(sectionIndex);

})

const navTogglerBtn = document.querySelector(".nav-toggler"),
   aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", asideSectionTogglerBtn)

function asideSectionTogglerBtn() {
   aside.classList.toggle("open");
   navTogglerBtn.classList.toggle("open");
   // for (let i = 0; i < totalSection; i++) {
   //    allSection[i].classList.toggle("open");
   // }
}



