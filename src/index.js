// Get all the elements we need
  const guestform = document.getElementById('GuestContainer')
  const guestNameInput = document.getElementById('guestName');
  const addButton = document.getElementById('addGuest');
  const guestList = document.getElementById('guestList');
  //guest array to store all guests
  let allguests = [];
  //render guestlist
  const renderGuestList = () =>{
    guestList.innerHTML = '';
  }

  // Function to add a new guest
  function addGuest() {
    // Get the name from the input field and remove extra spaces
    const guestName = inputField.value.trim();

    // Only add if the name isn't empty
    if (guestName) {
      // Create a new list item
      const listItem = document.createElement('li');
      listItem.textContent = guestName;
      
      // Add it to the list
      guestList.appendChild(listItem);
      
      // Clear the input field
      inputField.value = '';

      // Put focus back in the input field
      inputField.focus();
    }
  }
  
  // Add event listener to the button
  addButton.addEventListener('click', addGuest);{

});
  function deleteGuest(guestName) {
    // Remove from DOM
    const guestElement = document.getElementById(`guest-${guestName}`);
    if (guestElement) {
      guestElement.remove();
    }
  }