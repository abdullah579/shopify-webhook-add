import { authenticate, sessionStorage } from "../shopify.server";
import db from "../db.server";
import { json } from '@remix-run/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const action = async ({ request }) => {
  const { topic, shop, session, admin, payload } = await authenticate.webhook(request);

  if (!admin) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await db.session.deleteMany({ where: { shop } });
      }

      break;
    case "CUSTOMERS_CREATE":
        console.log("-------hit customer webhook--------");
        console.log(payload);

        const res = await db.CustomerPoint.create({
          data: {
            customerFirstName: payload.first_name,
            customerLastName: payload.last_name,
            email: payload.email,
            points: 100,
          }
        });

        if(res){
          console.log("RESSSSSSSSS", res);

          const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['dones9069@gmail.com'],
            subject: 'Hello world',
            html: '<strong>It works!</strong>',
          });      

          return new Response("Success!", { status: 200 });
        }
        console.log("-------hit customer webhook end--------");
      break;
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  const response = await admin.graphql(
    `#graphql
    mutation populateProduct($input: ProductInput!) {
      productCreate(input: $input) {
        product {
          id
        }
      }
    }`,
    {variables: {input: {title: 'Product Name'}}},
  );

  throw new Response();
};
