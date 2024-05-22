import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import {authenticate} from "../shopify.server";
import { Resend } from 'resend';
import sendgrid from '@sendgrid/mail';
import { json } from "@remix-run/node";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function loader({request}){
  const {admin, session } = await authenticate.admin(request)
  const {shop, accessToken } = session;
  console.log(shop, accessToken);

  const response = await admin.rest.get({
    path: "/webhooks/count.json",
  });

  const customers = await response.json();
  console.log("wwww ", customers);

  // const storefront_access_token = new admin.rest.resources.StorefrontAccessToken({session: session});

  // storefront_access_token.title = "Test";
  // await storefront_access_token.save({
  //   update: true,
  // });

  // console.log("SSSSSS ", JSON.stringify(storefront_access_token));

  // const data = await resend.emails.send({
  //   from: 'App <onboarding@resend.dev>',
  //   to: ['dones9069@gmail.com'],
  //   subject: 'Test Email',
  //   html: '<strong>It works! Email Sent</strong>',
  // });
  // console.log("DATA: ", data);


  return null;
}

export default function AdditionalPage() {
  return (
    <Page>
      <TitleBar title="Additional page" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text as="p" variant="bodyMd">
                The app template comes with an additional page which
                demonstrates how to create multiple pages within app navigation
                using{" "}
                <Link
                  url="https://shopify.dev/docs/apps/tools/app-bridge"
                  target="_blank"
                  removeUnderline
                >
                  App Bridge
                </Link>
                .
              </Text>
              <Text as="p" variant="bodyMd">
                To create your own page and have it show up in the app
                navigation, add a page inside <Code>app/routes</Code>, and a
                link to it in the <Code>&lt;NavMenu&gt;</Code> component found
                in <Code>app/routes/app.jsx</Code>.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">
                Resources
              </Text>
              <List>
                <List.Item>
                  <Link
                    url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                    target="_blank"
                    removeUnderline
                  >
                    App nav best practices
                  </Link>
                </List.Item>
              </List>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
