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
    useBreakpoints,
  } from '@shopify/polaris';
import { TitleBar } from "@shopify/app-bridge-react";
import {useState, useCallback} from 'react';
import db from "../db.server";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

export async function loader(){

    const allCustomers = await db.CustomerPoint.findMany({
        take: 5,
        select: {
            id: true,
            customerFirstName: true,
            customerLastName: true,
            email: true,
            points: true,
        },
        orderBy: {
            id: 'desc',
        },
    });
    
    return json(allCustomers);
}

export default function customerData(){

    const customers = useLoaderData();

    const resourceName = {
        singular: 'customer',
        plural: 'customers',
    };

    const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(customers);

    const rowMarkup = customers.map(
    (
        {id, customerFirstName, customerLastName, email, points},
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
            <IndexTable.Cell>{email}</IndexTable.Cell>
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
                    {title: 'Email'},
                    {title: 'Point'},
                    ]}
                    pagination={{
                        hasNext: true,
                        onNext: () => {},
                    }}
                >
                    {rowMarkup}
                </IndexTable>
                </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );

}