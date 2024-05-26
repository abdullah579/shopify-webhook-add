import { json } from '@remix-run/node';
import { URL } from 'url';
import db from "../../db.server";


export async function loader({ request }){
  const url = new URL(request.url);
  const customerEmail = url.searchParams.get('email');

  console.log(customerEmail);
  return customerEmail;

  // Use these parameters to fetch data from your external API
//   const response = await fetch(`https://api.example.com/data?param1=${param1}&param2=${param2}`);
//   const data = await response.json();

//   return json(data);
};