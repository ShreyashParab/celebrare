document.addEventListener("DOMContentLoaded", function () {
  // Apply functionality to existing defaultText elements
  document.querySelectorAll('.defaultText').forEach((textBox) => {
    applyDragFunctionality(textBox);
    attachClickListener(textBox);
  });

  // Handle Add Text button click
  document.getElementById("addTextBtn").addEventListener("click", function () {
    let activeSlide = document.querySelector('.carousel-item.active');
    if (activeSlide) {
      let newTextBox = document.createElement('div');
      newTextBox.classList.add('defaultText');
      newTextBox.setAttribute('contenteditable', 'true');
      newTextBox.innerText = "New Text Box";
      newTextBox.style.position = 'absolute';
      newTextBox.style.left = '60px';
      newTextBox.style.top = '100px';
      activeSlide.appendChild(newTextBox);
      applyDragFunctionality(newTextBox);
      attachClickListener(newTextBox); // Attach click listener
    }
  });

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
  }

  function attachClickListener(element) {
    element.addEventListener("click", (event) => {
      document.querySelectorAll('.defaultText').forEach((el) => el.removeAttribute('id'));
      element.id = "activeText";
      event.stopPropagation();
    });

    element.addEventListener("keydown", (event) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
        event.stopPropagation(); // Stop the event from reaching the carousel
      }
    });
  }

  // Toolbar functionality
  const boldButton = document.getElementById("boldBtn");
  const fontFamilySelect = document.getElementById("fontFamilySelect");
  const fontColorInput = document.getElementById("fontColorInput");
  const fontSizeInput = document.getElementById("fontSizeInput");
  const deleteButton = document.getElementById("deleteBtn");

  boldButton.addEventListener("click", () => {
    const activeText = document.getElementById("activeText");
    if (activeText) {
      const currentWeight = window.getComputedStyle(activeText).fontWeight;
      activeText.style.fontWeight = currentWeight === "700" ? "400" : "700";
    }
  });

  fontFamilySelect.addEventListener("change", (e) => {
    const activeText = document.getElementById("activeText");
    if (activeText) activeText.style.fontFamily = e.target.value;
  });

  fontColorInput.addEventListener("input", (e) => {
    const activeText = document.getElementById("activeText");
    if (activeText) activeText.style.color = e.target.value;
  });

  fontSizeInput.addEventListener("input", (e) => {
    const activeText = document.getElementById("activeText");
    if (activeText) activeText.style.fontSize = `${e.target.value}px`;
  });

  deleteButton.addEventListener("click", () => {
    const activeText = document.getElementById("activeText");
    if (activeText) activeText.remove();
  });
});
