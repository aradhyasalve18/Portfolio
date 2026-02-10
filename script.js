document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS here
  emailjs.init("hgLDAAZJQJbzfpEdJ");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");
  const addBtn = document.getElementById("addContactBtn");

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  function logContacts() {
    console.clear();
    console.log("===== CONTACT MESSAGES =====");
    contacts.forEach((c, index) => {
      console.log(`Contact #${index + 1}`);
      console.log("Name   :", c.name);
      console.log("Email  :", c.email);
      console.log("Phone  :", c.phone);
      console.log("Message:", c.message || "(No message)");
      console.log("----------------------------");
    });
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  addBtn.addEventListener("click", function () {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !phone || !message) {
      alert("Please fill all fields!");
      return;
    }

    const contact = { name, email, phone, message };

    emailjs.send(
      "service_0bn6ur8",
      "template_z50virc",
      { name, email, phone, message }
    )
    .then(function () {
      alert("✅ Message sent successfully!");
    })
    .catch(function (error) {
      console.error("EmailJS Error:", error);
      alert("❌ Failed to send message");
    });

    contacts.push(contact);
    logContacts();

    // Clear form
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    messageInput.value = "";
  });

  // Developer-only helpers
  window.deleteContact = function (index) {
    contacts.splice(index, 1);
    logContacts();
  };

  window.editContact = function (index, newData) {
    contacts[index] = { ...contacts[index], ...newData };
    logContacts();
  };

  logContacts();
});
