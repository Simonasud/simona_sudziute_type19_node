document.addEventListener('DOMContentLoaded', () => {
  const addItemForm = document.getElementById('addItemForm');

  addItemForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;
    const itemTypeId = document.getElementById('itemTypeId').value;

    // Siunčiame užklausą į serverį
    try {
      const response = await fetch('http://localhost:3000/api/shop_items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price,
          description,
          image,
          item_type_id: itemTypeId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Parduotuvės prekė sėkmingai sukurtas, nukreipiame į shop.html
        window.location = 'shop.html';
      } else {
        // Klaidos pranešimas iš serverio
        console.error('Failed to add shop item:', data.message);
        alert('Failed to add shop item. Please try again.');
      }
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Error sending request. Please try again.');
    }
  });
});
