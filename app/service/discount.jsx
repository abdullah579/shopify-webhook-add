import db from "../db.server";
import { getAccessTokenForShop } from "../service/shop"

export async function createPirceRule(shop, accessToken, priceRuleBody){

    try{
        const res = await fetch('https://'+shop+'/admin/api/2024-04/price_rules.json', {
            method: 'POST',
            headers: {
              'X-Shopify-Access-Token': accessToken,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(priceRuleBody)
        });
    
        return await res.json();
    }catch(err){
        console.log("Price Rule Error", err);
    }

}

export async function createDiscountCode(shop, accessToken, price_rule_id, discountBody){
    try{
        const createDiscount = await fetch('https://'+shop+'/admin/api/2024-04/price_rules/'+price_rule_id+'/discount_codes.json', {
        method: 'POST',
        headers: {
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(discountBody)
      });
      
      return await createDiscount.json();
    }catch(err){
        console.lgo("Discount Error: ",err);
    }
}