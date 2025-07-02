document.addEventListener("DOMContentLoaded", () => {
  const guestForm = document.querySelector('.guest-form');
  const guestNameInput = document.getElementById('guestName');
  const guestList = document.getElementById('guestList');
  
  const API = 'http://localhost:3000/guests'
  const maxGuests = 10;

  fetch(API)
    .then(response => response.json())
    .then(guests => {
      guests.forEach(guest => {
        addGuestToDOM(guest);
      });
    });

  guestForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = guestNameInput.value.trim();

    if (!name) {
      alert("Please enter a guest name");
      return;
    }

    try {
      const response = await fetch(API);
      const guests = await response.json();

      if (guests.length >= maxGuests) {
        alert("Maximum of 10 guests allowed");
        return;
      }

      const postResponse = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, attending: true }),
      });

      const newGuest = await postResponse.json();
      addGuestToDOM(newGuest);
      guestNameInput.value = "";
      guestNameInput.focus();
    } catch {
      alert("Failed to add guest");
    }
  });

  function addGuestToDOM(guest) {
    const li = document.createElement("li");
    li.textContent = guest.name;

    const rsvpButton = document.createElement("button");
    rsvpButton.textContent = guest.attending ? "Attending" : "Not Attending";
    rsvpButton.style.marginLeft = "10px";
    rsvpButton.style.backgroundColor = guest.attending ? "green" : "red";
    rsvpButton.style.color = "white";
    rsvpButton.style.padding = "5px 10px";
    rsvpButton.style.border = "none";
    rsvpButton.style.borderRadius = "4px";

    rsvpButton.addEventListener("click", () => {
      const newStatus = rsvpButton.textContent === "Attending" ? false : true;
      fetch(`${API}/${guest.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ attending: newStatus })
      })
      .then(response => response.json())
      .then(updatedGuest => {
        rsvpButton.textContent = updatedGuest.attending ? "Attending" : "Not Attending";
        rsvpButton.style.backgroundColor = updatedGuest.attending ? "green" : "red";
      });
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";
    deleteButton.style.backgroundColor = "red";
    deleteButton.style.color = "white";
    deleteButton.style.padding = "5px 10px";
    deleteButton.style.border = "none";
    deleteButton.style.borderRadius = "4px";

    deleteButton.addEventListener("click", () => {
      fetch(`${API}/${guest.id}`, {
        method: "DELETE"
      })
      .then(() => {
        guestList.removeChild(li);
      });
    });

    li.appendChild(rsvpButton);
    li.appendChild(deleteButton);
    guestList.appendChild(li);
  }
});
