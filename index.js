document.addEventListener("DOMContentLoaded", () => {
  // Get all the elements we need
  const guestForm = document.getElementById('GuestContainer');
  const guestNameInput = document.getElementById('guestName');
  const addButton = document.getElementById('addGuest');
  const guestList = document.getElementById('guestList');
  
  // Constants and variables
  const maxGuests = 10;
  let allguests = [];
  let guestCount = 0;
  
  // Listen for form submission
  guestForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = guestNameInput.value.trim(); 
    
    if (!name) {
      alert("Please enter a guest name");
      return;
    }

    if (guestCount >= maxGuests) {
      alert("Maximum of 10 guests allowed");
      return;
    }
    
    // Add the guest to the list
    addGuest(name);
    guestNameInput.value = '';
    guestNameInput.focus();
  });

  // Function to add a guest to the list
  function addGuest(name) {
    const li = document.createElement("li");
    li.textContent = name;

    // RSVP Button
    const rsvpButton = document.createElement("button");
    rsvpButton.textContent = "Attending";
    rsvpButton.style.marginLeft = "10px";
    rsvpButton.style.backgroundColor = "green";
    rsvpButton.style.color = "white";
    rsvpButton.style.padding = "5px 10px";
    rsvpButton.style.border = "none";
    rsvpButton.style.borderRadius = "4px";

    rsvpButton.addEventListener("click", () => {
      if (rsvpButton.textContent === "Attending") {
        rsvpButton.textContent = "Not Attending";
        rsvpButton.style.backgroundColor = "red";
      } else {
        rsvpButton.textContent = "Attending";
        rsvpButton.style.backgroundColor = "green";
      }
    });

    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";
    deleteButton.style.backgroundColor = "red";
    deleteButton.style.color = "white";
    deleteButton.style.padding = "5px 10px";
    deleteButton.style.border = "none";
    deleteButton.style.borderRadius = "4px";

    deleteButton.addEventListener("click", () => {
      guestList.removeChild(li);
      guestCount--;
      // Remove from allguests array
      allguests = allguests.filter(guest => guest !== name);
    });

    li.appendChild(rsvpButton);
    li.appendChild(deleteButton);
    guestList.appendChild(li);
    
    // Update tracking
    allguests.push(name);
    guestCount++;
  }
});