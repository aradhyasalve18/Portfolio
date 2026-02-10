
document.addEventListener("DOMContentLoaded", function () {

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const addBtn = document.getElementById("addContactBtn");
  const contactList = document.getElementById("contactList");

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  let editIndex = -1;

  function renderContacts() {
  console.clear();   // clears old output (optional)

  console.log("==== Contact List ====");

  contacts.forEach((c, index) => {
    console.log(`Contact ${index + 1}`);
    console.log("Name :", c.name);
    console.log("Email:", c.email);
    console.log("Phone:", c.phone);
    console.log("---------------------");
  });

  localStorage.setItem("contacts", JSON.stringify(contacts));
}


  addBtn.addEventListener("click", function () {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!name || !email || !phone) {
      alert("Fill all fields");
      return;
    }

    if (editIndex === -1) {
      contacts.push({ name, email, phone });
    } else {
      contacts[editIndex] = { name, email, phone };
      editIndex = -1;
      addBtn.textContent = "Add Contact";
    }

    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";

    renderContacts();
  });

  window.editContact = function (index) {
    const c = contacts[index];
    nameInput.value = c.name;
    emailInput.value = c.email;
    phoneInput.value = c.phone;
    editIndex = index;
    addBtn.textContent = "Update Contact";
  };

  window.deleteContact = function (index) {
    contacts.splice(index, 1);
    renderContacts();
  };

  renderContacts();
});
