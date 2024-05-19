import {
    Page,
    Layout,
    TextField,
    IndexTable,
    Card,
    IndexFilters,
    useSetIndexFiltersMode,
    useIndexResourceState,
    Text,
    ChoiceList,
    RangeSlider,
    Badge,
  } from '@shopify/polaris';
import { TitleBar } from "@shopify/app-bridge-react";
import { json } from "@remix-run/node";

export default function customerData(){
    return(
        <Page>
            <TitleBar title="Customer" />
            <Layout>
                <Layout.Section>
                <Card>
                
                </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}