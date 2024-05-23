// const fetchCustomerByEmail = async (email) => {
//     const query = `
//       query {
//         customer(id: "gid://shopify/Customer/${email}") {
//           id
//           firstName
//           lastName
//           email
//         }
//       }
//     `;
  
//     try {
//       const response = await fetch('https://manupulation-store.myshopify.com/api/graphql', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Shopify-Storefront-Access-Token': 'bc014535341d033f7d466e10e64bd510',
//         },
//         body: JSON.stringify({ query }),
//       });

//       console.log("RRRR", response);
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch customer by email');
//       }
  
//       const { data } = await response.json();
//       return data;
//     } catch (error) {
//       console.log('Error fetching customer by EMAIL:', error);
//       return { error: 'Error fetching customer by email' };
//     }
//   };
  
//   // Usage
//   const email = '7365505253601';
//   fetchCustomerByEmail(email)
//     .then(data => console.log('Customer data:', data))
//     .catch(error => console.error('Error:', error));

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

// Import the Prisma client
import { PrismaClient } from '@prisma/client';

// Create an instance of the Prisma client
const prisma = new PrismaClient();

// Fetch customer data
const getCustomerByEmail = async (email) => {
  try {
    const customer = await prisma.CustomerPoint.findUnique({
      where: {
        email: email,
      },
    });
    return customer;
  } catch (error) {
    console.error('Error fetching customer by email:', error);
    throw new Error('Error fetching customer by email');
  }
};

getCustomerByEmail("asdfsgfsdf@sdfg.dfgs");

