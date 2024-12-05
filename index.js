document.addEventListener("DOMContentLoaded", function() {
  // Handle Add Text button click
  document.getElementById("addTextBtn").addEventListener("click", function() {
    // Get the currently active slide
    let activeSlide = document.querySelector('.carousel-item.active');

    if (activeSlide) {
      // Create a new text box
      let newTextBox = document.createElement('div');
      newTextBox.classList.add('defaultText');
      newTextBox.setAttribute('contenteditable', 'true');
      newTextBox.innerText = "New Text Box";

      // Append it to the active slide
      activeSlide.appendChild(newTextBox);

      // Apply drag functionality to the new text box
      applyDragFunctionality(newTextBox);
    }
  });

  // Apply dragging functionality to any new or existing text box
  function applyDragFunctionality(element) {
    let isDragging = false;

    function onMouseDrag({ movementX, movementY }) {
      if (!isDragging) return;

      let container = element.closest('.carousel-item');
      let containerStyle = container.getBoundingClientRect();

      let style = window.getComputedStyle(element);
      let leftValue = parseInt(style.left);
      let topValue = parseInt(style.top);

      let newLeft = leftValue + movementX;
      let newTop = topValue + movementY;

      // Constrain movement within container
      newLeft = Math.max(0, Math.min(newLeft, containerStyle.width - element.offsetWidth));
      newTop = Math.max(0, Math.min(newTop, containerStyle.height - element.offsetHeight));

      element.style.left = `${newLeft}px`;
      element.style.top = `${newTop}px`;
    }

    element.addEventListener("mousedown", () => {
      isDragging = true;
      document.addEventListener("mousemove", onMouseDrag);
    });

    element.addEventListener("mouseup", () => {
      isDragging = false;
      document.removeEventListener("mousemove", onMouseDrag);
    });

    // Make content editable on double-click
    element.addEventListener('dblclick', () => {
      element.setAttribute('contenteditable', 'true');
      element.focus();
    });
  }
});
