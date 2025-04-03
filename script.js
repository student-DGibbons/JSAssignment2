// JS Assignment 2 — Dylan Gibbons (200230810)

// Creating a smoothie class to for smoothie-related functionality
class Smoothie {
    constructor(formData) {
      this.name = formData.get('name');
      this.base = formData.get('base');
      this.flavor = formData.get('flavor');
      this.size = formData.get('size');
      this.protein = formData.get('protein');
      this.toppings = formData.getAll('toppings'); // Handle multiple selections
      this.instructions = formData.get('instructions') || 'None';
    }
  
    // Method to generate an order summary (this is for the 
    // display: none part at the bottom for the output). I use .join()
    // for the multiple checklist items OR 'None' if none are selected
    generateSummary() {
      return `
        <strong>Order Summary:</strong><br>
        Name: ${this.name}<br>
        Base: ${this.base}<br>
        Flavour: ${this.flavor}<br>
        Size: ${this.size}<br>
        Protein: ${this.protein}<br>
        Toppings: ${this.toppings.join(', ') || 'None'}<br>
        Instructions: ${this.instructions}
      `;
    }
  }
  
  // Dropdown functionality (selecting each section)
  document.querySelectorAll('.dropdown').forEach(function (dropdown) {
    // Grabbing the dropdown elements (button and hidden menu container)
    const btn = dropdown.querySelector('.dropbtn');
    const content = dropdown.querySelector('.dropdown-content');
  
    // Button click event handler
    btn.addEventListener('click', function (event) {
      // Stops parent elements/other event listeners triggering when an event occurs on a child element
      event.stopPropagation();
  
      document.querySelectorAll('.dropdown-content').forEach(function (d) {
        // Only keep current dropdown open
        if (d !== content) {
          d.classList.remove('show');
        }
      });
  
      // Toggle visibility of this specific dropdown and add/remove show class
      content.classList.toggle('show');
    });
  
    // Menu item event handler
    content.addEventListener('click', function (event) {
      if (event.target.tagName === 'LABEL') {
        // Update button text with selected option's text
        btn.textContent = event.target.textContent.trim();
        // Close dropdown menu after selection
        content.classList.remove('show');
      }
    });
  });
  
  // Window click event handler to close all dropdowns when clicking outside
  window.addEventListener('click', function () {
    document.querySelectorAll('.dropdown-content').forEach(function (d) {
      d.classList.remove('show'); // Make invisible
    });
  });
  
  // Submission handler for the smoothie form
  document.getElementById('smoothieForm').addEventListener('submit', function (event) {
    // Block default form submission
    event.preventDefault();
  
    // Grabbing the form data
    const formData = new FormData(event.target);
  
    // Creating a smoothie object using the form data and the class
    const smoothie = new Smoothie(formData);
  
    // Getting the output container
    const output = document.getElementById('output');
  
    // Populating the output container with the order summary from the smoothie object
    output.innerHTML = smoothie.generateSummary();
  
    // Changing the display from none to block to populate the bottom output
    output.style.display = 'block';
  });
  