import { URL } from 'url';
import { json } from "@remix-run/node";
import db from "../../db.server";

export async function loader({ request }){

  console.log("HIT Done");

  const url = new URL(request.url);
  const event = url.searchParams.get("event");

  let data;
  
  if(event == 'findCustomer'){
    const customerEmail = url.searchParams.get("email");
    data = await getCustomerDetailByEmail(customerEmail);
  }

  return data;
};

async function getCustomerDetailByEmail(email) {
  const customer = await db.CustomerPoint.findMany({
    where: {
      email: email
    },
    select: {
        id: true,
        customerFirstName: true,
        customerLastName: true,
        email: true,
        points: true,
    }
  });

  console.log("CUSTOMER --->>>",customer);

  return json(customer);
}

  