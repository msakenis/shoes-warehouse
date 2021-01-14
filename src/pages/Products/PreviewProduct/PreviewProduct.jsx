import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Heading,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { getChosenProduct } from '../../../helpers/sharedHelperFunctions';
import { ProductDetailsTable } from '../../../components';

function PreviewProduct() {
  const { id } = useParams(); // take router param as product id
  const product = getChosenProduct(id); // func which gets the product from all products in fake DB
  const history = useHistory();

  return (
    <div>
      <Heading
        as="h2"
        size="lg"
        color="gray.500"
        fontWeight="500"
        pt="10"
        pb="10"
      >
        {product.name} {product.type}
      </Heading>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Product Details</Tab>
          <Tab>Price History</Tab>
          <Tab>Quantity History</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProductDetailsTable product={product} />
          </TabPanel>
          <TabPanel>
            <p>Price History</p>
          </TabPanel>
          <TabPanel>
            <p>Quantity History</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Button mt="10" onClick={() => history.push('/products')}>
        Back
      </Button>
    </div>
  );
}

export default PreviewProduct;
