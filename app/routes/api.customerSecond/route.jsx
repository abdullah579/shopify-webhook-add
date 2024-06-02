import { URL } from 'url';
import { json } from "@remix-run/node";
import db from "../../db.server";
import { findCustomerByEmail } from "../../service/customer";
import { createPirceRule,createDiscountCode } from "../../service/discount";
import { getAccessTokenForShop } from "../../service/shop";
import { getTodayDataTimeString,getRandomStrign } from "../../helper";
 
export async function loader({ request }){

  const url = new URL(request.url);
  const event = url.searchParams.get("event");
  const shop = url.searchParams.get("shop");
  console.log("SHOP: ",shop);

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
    console.log("Access Token: ", accessToken);

    if(redeemPoint <= customerData[0].points){
      console.log("HERE IN", customerData[0]);
      const discountAmount = 100;
      const discount_title = getRandomStrign(8);

      const priceRuleBody = {
        "price_rule":{
          "title": discount_title,
          "target_type":"line_item",
          "target_selection":"all",
          "allocation_method":"across",
          "value_type":"fixed_amount",
          "value": "-" + discountAmount,
          "customer_selection":"all",
          "starts_at": getTodayDataTimeString()
        }
      };

      const created_price_rules = await createPirceRule(shop, accessToken, priceRuleBody);

      if(created_price_rules){
        const discountBody = {
          "discount_code":
          {
            "code": discount_title
          }
        };
  
        const discountCodeCreate = createDiscountCode(shop, accessToken, created_price_rules.price_rule.id, discountBody);

        if(discountCodeCreate){
          data = json({
            data: {
              discountCode: discount_title
            }
          })
        }
      }
      
    }else{
      data = json({
        data: {
          discountCode: 333
        }
      })
    }

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

  