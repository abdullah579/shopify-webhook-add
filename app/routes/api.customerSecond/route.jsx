import { URL } from 'url';
import { json } from "@remix-run/node";
import db from "../../db.server";
import { findCustomerByEmail } from "../../service/customer";
import { action } from "../../service/discount";
import { getAccessTokenForShop } from "../../service/shop";

export async function loader({ request }){

  console.log("HIT Done");

  const url = new URL(request.url);
  const event = url.searchParams.get("event");
  const shop = url.searchParams.get("shop");
  console.log(shop);

  let data;
  
  if(event == 'findCustomer'){
    const customerEmail = url.searchParams.get("email");
    const customerData = await findCustomerByEmail(customerEmail);
    data = json(customerData);
  }else if(event == 'createDiscount'){
    const customerEmail = url.searchParams.get("email");
    const redeemPoint = url.searchParams.get("points");
    const shop = url.searchParams.get("shop");

    const customerData = await findCustomerByEmail(customerEmail);

    const accessToken = await getAccessTokenForShop(shop);
    console.log("SACCES: ", accessToken);

    if(redeemPoint <= customerData[0].points){
      console.log("HERE IN", customerData[0]);
      console.log("UHUJIK IN", 'https://'+shop+'/admin/api/2024-04/price_rules.json');
      const discountAmount = 100;

      const body = {
        "price_rule":{
          "title":"SUMMERSALE10OFF",
          "target_type":"line_item",
          "target_selection":"all",
          "allocation_method":"across",
          "value_type":"fixed_amount",
          "value":"-10.0",
          "customer_selection":"all",
          "starts_at":"2024-09-19T17:59:10Z"
        }
      };
      const res = await fetch('https://'+shop+'/admin/api/2024-04/price_rules.json', {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': 'shpua_07176bb46e7428d952b25684e8c77c32',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      console.log("create price rules : ", res);
    }
    return data = json({
      data: {
        id: 333,
        name: "eeee"
      }
    })
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

  