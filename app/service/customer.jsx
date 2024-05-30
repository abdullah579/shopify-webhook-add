import { json } from "@remix-run/node";
import db from "../db.server";

export async function findCustomerByEmail(email){
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

    console.log("CUSTOMER Recreate --->>>",customer);

    return customer;
}