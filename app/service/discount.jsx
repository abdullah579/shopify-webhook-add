import db from "../db.server";
import { getAccessTokenForShop } from "../service/shop"

export async function action({request}){
    try{
        const res = await admin.rest.resources.PriceRule.delete({
            session: session,
            id: 1555553353953,
          });
        console.log("Delete : ", res);
    }catch(err){
        console.log("DO IT ",err);
    }

}

export async function getTodayDataTimeString(){
    let date = new Date();
    let dateString = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "T" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    console.log("TIME NOW", dateString);
    return dateString;
}