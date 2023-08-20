document.addEventListener("DOMContentLoaded", function () {
  
    const editButtons = document.querySelectorAll(".edit-btn");
    const deleteButtons = document.querySelectorAll(".delete-btn");
    let inputField;

    editButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        console.log("Edit Button Clicked");
        const cartItemId = event.target.getAttribute("data-id");
        console.log("cartItemId", cartItemId)
        
        const quantityValue = document.querySelector(`.quantity-value[data-id="${cartItemId}"]`);
        console.log("quantityValue", quantityValue);
        const newQuantity = quantityValue.textContent; 
        console.log("newQuantity", newQuantity);
  
        if (newQuantity) {
          inputField = document.createElement("input");
          inputField.type = "number";
          inputField.min = 1;
          inputField.value = quantityValue.textContent;
          quantityValue.replaceWith(inputField);
  
          const updateButton = event.target.parentElement.querySelector(".update-quantity-btn");
          updateButton.style.display = "block";
          event.target.style.display = "none";
  
          updateButton.addEventListener("click", async () => {
            const newQuantity = inputField.value; // Moved inside the "Update" button event listener
  
            try {
              const response = await fetch("/update-cart", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: cartItemId, quantity: newQuantity }),
              });
  
              if (response.ok) {
                // Assuming you have an updateCartUI function to update the cart interface
                window.location.reload()
              } else {
                console.error("Error updating cart item quantity");
              }
            } catch (error) {
              console.error("An error occurred:", error);
            }
          });
        } else {
          console.log(".quantity-value not found");
        }
      });
    });


    deleteButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        const id = event.target.getAttribute("data-id");
        // console.log("Delete Button Clicked", cartItemId);
  
        try {
          const response = await fetch("/delete-cart", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          });
  
          if (response.ok) {
            // Assuming you have an updateCartUI function to update the cart interface
        window.location.reload() // Update the UI to reflect the deleted item
          } else {
            console.error("Error deleting cart item");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      });
    });
  
  });
  


  