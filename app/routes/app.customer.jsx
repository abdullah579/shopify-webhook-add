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
import {useState, useCallback} from 'react';
import db from "../db.server";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

export async function loader(){

    const allCustomers = await db.CustomerPoint.findMany();
    console.log("eeeeeeeeeeeee" ,allCustomers);
    return allCustomers;
}

export default function customerData(){

    const customers = useLoaderData();
    console.log("sssss",customers);

    const resourceName = {
        singular: 'customer',
        plural: 'customers',
    };

    const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(customers);

    const rowMarkup = customers.map(
    (
        {id, customerFirstName, customerLastName, points},
        index,
    ) => (
        <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
        >
            <IndexTable.Cell>{id}</IndexTable.Cell>
            <IndexTable.Cell>{customerFirstName}</IndexTable.Cell>
            <IndexTable.Cell>{customerLastName}</IndexTable.Cell>
            <IndexTable.Cell>{points}</IndexTable.Cell>
        </IndexTable.Row>
    ),
    );

    return(
        <Page>
            <TitleBar title="Customer" />
            <Layout>
                <Layout.Section>
                <Card>
                <IndexTable
                    resourceName={resourceName}
                    itemCount={customers.length}
                    selectedItemsCount={
                    allResourcesSelected ? 'All' : selectedResources.length
                    }
                    onSelectionChange={handleSelectionChange}
                    headings={[
                    {title: 'Id'},
                    {title: 'First Name'},
                    {title: 'Last Name'},
                    {title: 'Point'},
                    ]}
                >
                    {rowMarkup}
                </IndexTable>
                </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );

}