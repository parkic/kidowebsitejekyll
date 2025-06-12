// Paddle.Environment.set("sandbox")
// Paddle.Initialize({
//   token: 'test_96406623aa9a0b2af2a768b393f',
//   pwCustomer: { }
// })

// const subscriptionPlans = {
//   monthly: {
//     priceId: 'pri_01j3yykrygkmh960wqmqz3p1nn',
//     quantity: 1
//   },
//   yearly :{
//     priceId: 'pri_01j3yyqbqs9ncga4awv4v3cf5s',
//     quantity: 1
//   }
// }

// function openCheckout(item){
//   Paddle.Checkout.open({
//     items: [subscriptionPlans[item]]
//   });
// }

// Paddle live setup
Paddle.Initialize({
  token: "live_f91ac6dd497795320132605127c",
});

const subscriptionPlans = {
  monthly: {
    priceId: "pri_01j5njtaj7nxpymat4jhh0fbny",
    quantity: 1,
  },
  yearly: {
    priceId: "pri_01jbybehqqx6z5nh9a0h2ddnrw",
    quantity: 1,
  },
};

let selectedPlan = null;
let formData = {
  school: {},
  user: {},
};

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function openCheckoutModal(planKey) {
  selectedPlan = subscriptionPlans[planKey];
  document.getElementById("popup-modal").classList.add("active");
  document.getElementById("modal-step-1").style.display = "block";
  document.getElementById("modal-step-2").style.display = "none";
}

function closeModal() {
  document.getElementById("popup-modal").classList.remove("active");
}

function goBackToStep(step) {
  document.getElementById("modal-step-1").style.display =
    step === 1 ? "block" : "none";
  document.getElementById("modal-step-2").style.display =
    step === 1 ? "none" : "block";
}

function nextStep(step) {
  if (step === 2) {
    formData.school.name = document.getElementById("school-name").value;
    formData.school.phone = document.getElementById("school-phone").value;
    formData.school.email = document.getElementById("school-email").value;
    formData.school.address = document.getElementById("school-address").value;

    let hasError = false;
    ["school-name", "school-address"].forEach((id) => {
      const input = document.getElementById(id);
      const errorSpan = document.getElementById(`${id}-error`);
      if (!input.value.trim()) {
        errorSpan.classList.remove("hidden");
        hasError = true;
      } else {
        errorSpan.classList.add("hidden");
      }
    });

    const email = formData.school.email.trim();
    if (!validateEmail(email)) {
      document.getElementById("school-email-error").classList.remove("hidden");
      hasError = true;
    } else {
      document.getElementById("school-email-error").classList.add("hidden");
    }

    if (hasError) return;

    document.getElementById("admin-email").value = email;
    document.getElementById("modal-step-1").style.display = "none";
    document.getElementById("modal-step-2").style.display = "block";
  }

  if (step === 3) {
    formData.user.first_name =
      document.getElementById("admin-first-name").value;
    formData.user.last_name = document.getElementById("admin-last-name").value;
    formData.user.email = document.getElementById("admin-email").value;

    let hasError = false;
    ["admin-first-name", "admin-last-name"].forEach((id) => {
      const input = document.getElementById(id);
      const errorSpan = document.getElementById(`${id}-error`);
      if (!input.value.trim()) {
        errorSpan.classList.remove("hidden");
        hasError = true;
      } else {
        errorSpan.classList.add("hidden");
      }
    });

    const email = formData.user.email;
    if (!validateEmail(email)) {
      document.getElementById("admin-email-error").classList.remove("hidden");
      hasError = true;
    } else {
      document.getElementById("admin-email-error").classList.add("hidden");
    }

    if (hasError) return;

    createSchoolCredentials().then(() => {
      openCheckout(selectedPlan, formData.school.email);
      closeModal();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("school-email");
  const adminEmailInput = document.getElementById("admin-email");

  if (emailInput) {
    emailInput.addEventListener("input", (e) => {
      const isValid = validateEmail(e.target.value.trim());
      document
        .getElementById("school-email-error")
        .classList.toggle("hidden", isValid);
    });
  }

  if (adminEmailInput) {
    adminEmailInput.addEventListener("input", (e) => {
      const isValid = validateEmail(e.target.value);
      document
        .getElementById("admin-email-error")
        .classList.toggle("hidden", isValid);
    });
  }
});

async function createSchoolCredentials() {
  try {
    await fetch("https://app.kido.cloud/api/school-user-creation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  } catch (e) {
    console.error("Error creating school:", e);
  }
}

function openCheckout(plan, email) {
  Paddle.Checkout.open({
    settings: {
      displayMode: "overlay",
      variant: "one-page",
    },
    items: [plan],
    customer: { email },
  });
}
