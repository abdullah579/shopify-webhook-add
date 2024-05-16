import { authenticate, sessionStorage } from "../shopify.server";
import db from "../db.server";

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

        const res = await db.CustomerPoint.upsert({
          where: {
            id: 1,
            customerId: payload.id
          },
          create: {
            customerId: payload.id,
            points: 100
          },
          update: {
            points: 100
          },
        });

        if(res){
          console.log("RESSSSSSSSS", res);
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
