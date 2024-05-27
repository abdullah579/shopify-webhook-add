import { URL } from 'url';
import { json } from "@remix-run/node";
import db from "../../db.server";

export async function loader({ request }){

  console.log("HIT Done");

  const url = new URL(request.url);
  console.log("path name: ", url.pathname, url);
  const customerEmail = url.searchParams.get("email");

  // Handle the request, possibly by fetching data from your own API or performing other logic
  // const data = await fetchYourDataFunction(pathname);

  const customer = await db.CustomerPoint.findMany({
    where: {
      email: customerEmail
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

  // Return the data as JSON
  return json(customer);

};

async function fetchYourDataFunction(path) {
  // Your logic to fetch data based on the path
  return { message: `Handled proxy request for path: ${path}` };
}

  