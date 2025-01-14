function fetchItems() {
  $.get('/api/items', function (items) {
    const itemsList = $('#items-list');
    itemsList.empty(); // Clear the existing items
    items.forEach(function (item) {
      itemsList.append(`
        <li class="collection-item">${item.name}: ${item.description}</li>
      `);
    });
  }).fail(function (error) {
    console.error('Error fetching items:', error);
  });
}


$(document).ready(function () {
    // Fetch and display items on page load
    fetchItems();
  
    // Fetch items from the server and display them
    
  
    // Handle form submission to add a new item
    $('#add-item-form').submit(function (e) {
      e.preventDefault();
  
      const name = $('#name').val();
      const description = $('#description').val();
  
      if (!name || !description) {
        alert('Both fields are required!');
        return;
      }
  
      // Send POST request to add the new item
      $.ajax({
        url: '/api/items',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ name: name, description: description }),
        success: function (data) {
          if (data.message) {
            alert(data.message);
            fetchItems(); // Re-fetch the items after adding a new one
            $('#name').val(''); // Clear the input fields
            $('#description').val('');
          }
        },
        error: function (error) {
          console.error('Error adding item:', error);
        }
      });
    });
  });
  