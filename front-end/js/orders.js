document.addEventListener('DOMContentLoaded', () => {
  const ordersTable = document.getElementById('ordersTable');
  const userSelect = document.getElementById('userSelect');

  // Fetch all orders from the server
  fetch('http://localhost:3000/api/orders')
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const orders = data.orders;
        displayOrders(orders);

        // Populate user select options
        const users = data.users;
        populateUserSelect(users);
      } else {
        console.error('Failed to fetch orders:', data.message);
      }
    })
    .catch((error) => {
      console.error('Error fetching orders:', error);
    });

  // Event listener for user select change
  userSelect.addEventListener('change', () => {
    const selectedUserId = userSelect.value;

    // If a user is selected, fetch orders for that user
    if (selectedUserId !== '') {
      fetch(`http://localhost:3000/api/orders/user/${selectedUserId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            const userOrders = data.orders;
            displayOrders(userOrders);
          } else {
            console.error('Failed to fetch user orders:', data.message);
          }
        })
        .catch((error) => {
          console.error('Error fetching user orders:', error);
        });
    } else {
      // If no user is selected, display all orders
      fetch('http://localhost:3000/api/orders')
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            const orders = data.orders;
            displayOrders(orders);
          } else {
            console.error('Failed to fetch orders:', data.message);
          }
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
        });
    }
  });

  // Function to display orders in the table
  function displayOrders(orders) {
    ordersTable.innerHTML = '';

    orders.forEach((order) => {
      const row = ordersTable.insertRow();
      row.insertCell(0).textContent = order.id;
      row.insertCell(1).textContent = order.user_name;
      row.insertCell(2).textContent = order.item_name;
      row.insertCell(3).textContent = order.quantity;
      row.insertCell(4).textContent = `$${order.total_price}`;
      row.insertCell(5).textContent = order.status;
    });
  }

  // Function to populate user select options
  function populateUserSelect(users) {
    users.forEach((user) => {
      const option = document.createElement('option');
      option.value = user.id;
      option.textContent = user.name;
      userSelect.appendChild(option);
    });
  }
});
