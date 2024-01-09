function createItemCard(item) {
  const card = document.createElement('div');
  card.classList.add('item-card');

  card.innerHTML = `
    <h3>${item.name}</h3>
    <p>Price: $${item.price}</p>
    <p>${item.description}</p>
    <button class="add-to-cart-btn" data-item-id="${item.id}">Add to Cart</button>
  `;

  const addToCartBtn = card.querySelector('.add-to-cart-btn');
  addToCartBtn.addEventListener('click', () => {
    addToCart(item.id);
  });

  return card;
}

function addToCart(itemId) {
  fetch('http://localhost:3000/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      shop_item_id: itemId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error adding item to cart:', error);
    });
}
