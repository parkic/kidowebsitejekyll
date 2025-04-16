addEventListener("load", () => {
  const burgerMenu = document.querySelector("#burgerMenu");
  const closeMobileMenu = document.querySelector("#closeMobileMenu");
  const nav = document.querySelector("#mobileNav");

  burgerMenu.addEventListener("click", () => {
    if (nav.classList.contains("active")) {
      nav.classList.remove("active");
    } else {
      nav.classList.add("active");
    }
  });

  closeMobileMenu.addEventListener("click", () => {
    nav.classList.remove("active");
  });

  const navItems = document.querySelectorAll(".scrollTo");

  navItems.forEach((navItem) => {
    navItem.addEventListener("click", (e) => {
      e.preventDefault();
      if (
        window.location.pathname !== "/" &&
        window.location.pathname !== "/index.html"
      ) {
        window.location.href = `/index.html#${navItem.dataset.scrollTo}`;
      }

      const target = document.getElementById(navItem.dataset.scrollTo);

      if (innerWidth < 768) {
        nav.classList.remove("active");
      }
      target.scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  document.querySelectorAll(".reason").forEach((reason) => {
    if (innerWidth < 768) {
      reason.classList.remove("active");
    }
    reason.addEventListener("click", () => {
      const targetId = reason.id;
      const reasonBoxes = document.querySelectorAll(".reason-box");
      const parentLi = reason.parentNode;

      if (reason.classList.contains("active")) {
        parentLi.classList.remove("active");
        reason.classList.remove("active");
      } else {
        parentLi.classList.add("active");
        reason.classList.add("active");
        document.querySelectorAll(".reason").forEach((otherReason) => {
          if (otherReason !== reason) {
            const otherReasonParent = otherReason.parentNode;
            otherReasonParent.classList.remove("active");
            otherReason.classList.remove("active");
          }
        });

        reasonBoxes.forEach((userbox) => {
          if (userbox.dataset.target === targetId) {
            userbox.classList.add("active");
          } else {
            userbox.classList.remove("active");
          }
        });
      }
    });
  });

  /* for users silder */

  const users = document.querySelectorAll(".user-box");
  users.forEach((user) => {
    user.addEventListener("click", () => {
      const targetId = user.id;
      const usercards = document.querySelectorAll(".user-card");
      let clickedIndex;

      users.forEach((otherUser) => {
        if (otherUser !== user) {
          otherUser.classList.remove("active");
        }
      });

      user.classList.add("active");

      usercards.forEach((usercard, index) => {
        if (usercard.dataset.target === targetId) {
          usercard.classList.add("active");
          usercard.classList.remove("prev", "next");
          clickedIndex = index;
        } else {
          usercard.classList.remove("active", "prev", "next");
        }
      });

      const nextIndex = (clickedIndex + 1) % usercards.length;
      const prevIndex =
        (clickedIndex - 1 + usercards.length) % usercards.length;

      usercards[nextIndex].classList.add("next");
      usercards[prevIndex].classList.add("prev");
    });
  });

  function setActiveUser(usercards, index) {
    const targetId = usercards[index].dataset.target;
    users.forEach((user) => {
      if (user.id === targetId) {
        user.classList.add("active");
      } else {
        user.classList.remove("active");
      }
    });
  }

  const buttonLeft = document.querySelector(".button-left");
  if (buttonLeft) {
    buttonLeft.addEventListener("click", () => {
      const usercards = document.querySelectorAll(".user-card");
      let clickedIndex;

      usercards.forEach((usercard, index) => {
        if (usercard.classList.contains("active")) {
          usercard.classList.remove("active");
          clickedIndex = index;
        } else {
          usercard.classList.remove("prev", "next");
        }
      });

      const prevIndex =
        (clickedIndex - 1 + usercards.length) % usercards.length;
      usercards[prevIndex].classList.add("active");
      usercards[
        (prevIndex - 1 + usercards.length) % usercards.length
      ].classList.add("prev");
      usercards[(prevIndex + 1) % usercards.length].classList.add("next");
      setActiveUser(usercards, prevIndex);
    });
  }

  const buttonRight = document.querySelector(".button-right");
  if (buttonRight) {
    buttonRight.addEventListener("click", () => {
      const usercards = document.querySelectorAll(".user-card");
      let clickedIndex;

      usercards.forEach((usercard, index) => {
        if (usercard.classList.contains("active")) {
          usercard.classList.remove("active");
          clickedIndex = index;
        } else {
          usercard.classList.remove("prev", "next");
        }
      });

      const nextIndex =
        (clickedIndex + 1 + usercards.length) % usercards.length;
      usercards[nextIndex].classList.add("active");
      usercards[
        (nextIndex + 1 + usercards.length) % usercards.length
      ].classList.add("prev");
      usercards[(nextIndex + 2) % usercards.length].classList.add("next");

      setActiveUser(usercards, nextIndex);
    });
  }

  /* for yearly/monthly button */

  const monthlyButton = document.getElementById("monthly-button");
  const yearlyButton = document.getElementById("yearly-button");
  const monthlyCard = document.getElementById("monthly-card");
  const yearlyCard = document.getElementById("yearly-card");

  if (monthlyButton) {
    monthlyButton.addEventListener("click", function () {
      monthlyCard.classList.add("active");
      yearlyCard.classList.remove("active");
      monthlyButton.classList.add("active");
      yearlyButton.classList.remove("active");
    });
  }

  if (yearlyButton) {
    yearlyButton.addEventListener("click", function () {
      monthlyCard.classList.remove("active");
      yearlyCard.classList.add("active");
      monthlyButton.classList.remove("active");
      yearlyButton.classList.add("active");
    });
  }

  /* for accordion */

  const steps = document.querySelectorAll(".step");

  // Function to toggle accordion items based on visibility
  function toggleAccordion() {
    this.classList.toggle("active");
  }

  // Add click event listener to each step
  steps.forEach((step) => {
    step.addEventListener("click", toggleAccordion);
  });

  function initLanguageDropdown() {
    const items = document.querySelectorAll(".select-items div");
    const selectedText = document.querySelector(".select-selected span");
    const savedLang = localStorage.getItem("lang") || "en";
    selectedText.textContent = savedLang.toUpperCase();

    document
      .querySelector(".select-selected")
      .addEventListener("click", function () {
        document.querySelector(".select-items").style.display = "flex";
      });

    items.forEach(function (item) {
      item.addEventListener("click", function () {
        const lang = item.textContent.trim().toLowerCase();
        selectedText.textContent = lang.toUpperCase();
        document.querySelector(".select-items").style.display = "none";
        setLanguage(lang);
      });
    });

    document.addEventListener("click", function (e) {
      if (!document.querySelector(".custom-select").contains(e.target)) {
        document.querySelector(".select-items").style.display = "none";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLanguageDropdown);
  } else {
    initLanguageDropdown();
  }
});
