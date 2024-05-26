// const fetchCustomerByEmail = async (email) => {
  
//     try {
//       const response = await fetch('https://manupulation-store.myshopify.com/apps/conn-user');

//       console.log("RRRR", response);
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch customer by email');
//       }

//       return response;
//     } catch (error) {
//       console.log('Error fetching customer by EMAIL:', error);
//       return { error: 'Error fetching customer by email' };
//     }
// };

document.addEventListener("DOMContentLoaded", function() {
  fetch('/apps/conn-user', {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log("DDD", data);
    })
    .catch(error => {
      console.log('Error fetching data:', error);
    });
});
  
  // Usage
  // fetchCustomerByEmail(email)
  //   .then(response => response.json())
  //   .then(data => console.log('Customer data:', data))
  //   .catch(error => console.log('Error:', error.message));

// const accessToken = 'shpua_07176bb46e7428d952b25684e8c77c32'; // Replace with your access token
// const shopUrl = 'manupulation-store.myshopify.com'; // Replace with your shop URL

// fetch(`https://${shopUrl}/admin/api/2024-04/customers/7365505253601.json`, {
//   headers: {
//     'X-Shopify-Access-Token': accessToken,
//   },
// })
// .then(response => {
//   if (!response.ok) {
//     throw new Error('Failed to fetch customer information');
//   }
//   return response.json();
// })
// .then(data => {
//   // Process the retrieved customer data
//   console.log('Customer data:', data);
// })
// .catch(error => {
//   console.error('Error fetching customer information:', error);
// });

