function createItemCard(item) {
  const card = document.createElement('div');
  card.classList.add('item-card');

  card.innerHTML = `
    <h3>${item.name}</h3>
    <p>Price: $${item.price}</p>
    <p>${item.description}</p>
    <button class="add-to-cart-btn" data-item-id="${item.id}">Add to Cart</button>
    <button class="delete-item-btn" data-item-id="${item.id}">Delete</button>
  `;
  const addToCartBtn = card.querySelector('.add-to-cart-btn');
  addToCartBtn.addEventListener('click', () => {
    addToCart(item.id);
  });

  const deleteItemBtn = card.querySelector('.delete-item-btn');
  deleteItemBtn.addEventListener('click', () => {
    deleteItem(item.id);
  });

  return card;
}

function deleteItem(itemId) {
  fetch(`http://localhost:3000/api/shop_items/${itemId}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response (success or error)
      console.log(data);
      // Refresh the shop items after deletion (optional)
      fetchShopItems();
    })
    .catch((error) => {
      console.error('Error deleting item:', error);
    });
}

function fetchShopItems() {
  const shopItemsContainer = document.getElementById('shop-items');

  fetch('http://localhost:3000/api/shop_items')
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const shopItems = data.shopItems;
        displayShopItems(shopItems);
      } else {
        console.error('Failed to fetch shop items:', data.message);
      }
    })
    .catch((error) => {
      console.error('Error fetching shop items:', error);
    });

  function displayShopItems(shopItems) {
    shopItemsContainer.innerHTML = '';

    shopItems.forEach((item) => {
      const itemCard = createItemCard(item);
      shopItemsContainer.appendChild(itemCard);
    });
  }
}
