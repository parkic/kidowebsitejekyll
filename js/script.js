addEventListener('load', () => {
  const burgerMenu = document.querySelector('#burgerMenu')
  const closeMobileMenu = document.querySelector('#closeMobileMenu')
  const nav = document.querySelector('#mobileNav')
  

  burgerMenu.addEventListener('click', () => {
    
    if (nav.classList.contains('active')) {
      nav.classList.remove('active')
    } else {
      nav.classList.add('active')
    }
  })

  closeMobileMenu.addEventListener('click', () => {
    nav.classList.remove('active')
  })


  const navItems = document.querySelectorAll('.scrollTo')

  navItems.forEach((navItem) => {
    navItem.addEventListener('click', (e) => {
      e.preventDefault()
      const target = document.getElementById(navItem.dataset.scrollTo)

      if (innerWidth < 768) {
        nav.classList.remove('active')
      }
      target.scrollIntoView({
        behavior: 'smooth'
      })
    })
  })

  document.querySelectorAll(".reason").forEach((reason) => {
    if (innerWidth < 768) {
      reason.classList.remove('active')
    }
    reason.addEventListener("click", () => {
      const targetId = reason.id
      const reasonBoxes = document.querySelectorAll(".reason-box")
      const parentLi = reason.parentNode

      if(reason.classList.contains("active")) {
        parentLi.classList.remove("active")
        reason.classList.remove("active")
      } else {
        parentLi.classList.add("active")
        reason.classList.add("active")
        document.querySelectorAll(".reason").forEach((otherReason) => {
          if (otherReason !== reason) {
            const otherReasonParent = otherReason.parentNode
            otherReasonParent.classList.remove("active")
            otherReason.classList.remove("active")
          }
        })
  
        reasonBoxes.forEach((userbox) => {
          if (userbox.dataset.target === targetId) {
            userbox.classList.add("active")
          } else {
            userbox.classList.remove("active")
          }
        })

      }

    })
  })

  /* for users silder */

  const users = document.querySelectorAll(".user-box")
  users.forEach((user) => {
    user.addEventListener("click", () => {
      const targetId = user.id
      const usercards = document.querySelectorAll(".user-card")
      let clickedIndex

      users.forEach((otherUser) => {
        if (otherUser !== user) {
          otherUser.classList.remove("active")
        }
      })

      user.classList.add("active")

      usercards.forEach((usercard, index) => {
        if (usercard.dataset.target === targetId) {
          usercard.classList.add("active")
          usercard.classList.remove("prev", "next")
          clickedIndex = index
        } else {
          usercard.classList.remove("active", "prev", "next")
        }
      })

      const nextIndex = (clickedIndex + 1) % usercards.length
      const prevIndex = (clickedIndex - 1 + usercards.length) % usercards.length

      usercards[nextIndex].classList.add("next")
      usercards[prevIndex].classList.add("prev")
    })
  })

  function setActiveUser(usercards, index) {
    const targetId = usercards[index].dataset.target
    users.forEach((user) => {
      if (user.id === targetId) {
        user.classList.add("active")
      } else {
        user.classList.remove("active")
      }
    })
  }

  document.querySelector(".button-left").addEventListener("click", () => {
    const usercards = document.querySelectorAll(".user-card")
    let clickedIndex

    usercards.forEach((usercard, index) => {
      if (usercard.classList.contains("active")) {
        usercard.classList.remove("active")
        clickedIndex = index
      } else {
        usercard.classList.remove("prev", "next")
      }
    })

    const prevIndex = (clickedIndex - 1 + usercards.length) % usercards.length
    usercards[prevIndex].classList.add("active")
    usercards[
      (prevIndex - 1 + usercards.length) % usercards.length
    ].classList.add("prev")
    usercards[(prevIndex + 1) % usercards.length].classList.add("next")
    setActiveUser(usercards, prevIndex)
  })

  document.querySelector(".button-right").addEventListener("click", () => {
    const usercards = document.querySelectorAll(".user-card")
    let clickedIndex

    usercards.forEach((usercard, index) => {
      if (usercard.classList.contains("active")) {
        usercard.classList.remove("active")
        clickedIndex = index
      } else {
        usercard.classList.remove("prev", "next")
      }
    })

    const nextIndex = (clickedIndex + 1 + usercards.length) % usercards.length
    usercards[nextIndex].classList.add("active")
    usercards[
      (nextIndex + 1 + usercards.length) % usercards.length
    ].classList.add("prev")
    usercards[(nextIndex + 2) % usercards.length].classList.add("next")

    setActiveUser(usercards, nextIndex)
  })

  /* for yearly/monthly button */

  const monthlyButton = document.getElementById("monthly-button")
  const yearlyButton = document.getElementById("yearly-button")
  const monthlyCard = document.getElementById("monthly-card")
  const yearlyCard = document.getElementById("yearly-card")

  monthlyButton.addEventListener("click", function () {
    monthlyCard.classList.add("active")
    yearlyCard.classList.remove("active")
    monthlyButton.classList.add("active")
    yearlyButton.classList.remove("active")
  })

  yearlyButton.addEventListener("click", function () {
    monthlyCard.classList.remove("active")
    yearlyCard.classList.add("active")
    monthlyButton.classList.remove("active")
    yearlyButton.classList.add("active")
  })

  /* for accordion */

  const steps = document.querySelectorAll(".step")

  // Function to toggle accordion items based on visibility
  function toggleAccordion() {
    this.classList.toggle("active")
  }

  // Add click event listener to each step
  steps.forEach((step) => {
    step.addEventListener("click", toggleAccordion)
  })

  document.addEventListener("DOMContentLoaded", function () {
    const selected = document.querySelector(".select-selected")
    const items = document.querySelectorAll(".select-items div")

    // Toggle the dropdown
    selected.addEventListener("click", function () {
      document.querySelector(".select-items").style.display = "flex"
    })

    // Update the selected option
    items.forEach(function (item) {
      item.addEventListener("click", function () {
        selected.querySelector("span").textContent = item.textContent
        document.querySelector(".select-items").style.display = "none"
      })
    })

    // Hide the dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (!selected.contains(e.target)) {
        document.querySelector(".select-items").style.display = "none"
      }
    })
  })
})