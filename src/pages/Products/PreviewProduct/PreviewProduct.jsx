import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Heading, Table, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

function getChosenProduct(id) {
  const products = JSON.parse(localStorage.getItem('products')); // local storage just to emulate db

  const product = products.filter((product) => product.id === +id)[0]; // this filter just to emulate db, ussually you fetch one product only. Back-End must do the most of the job

  return product;
}

function PreviewProduct() {
  const { id } = useParams(); // take router param as product id
  const product = getChosenProduct(id); // func which gets the product from all products in fake DB
  const history = useHistory();

  return (
    <div>
      <Heading as="h2" size="lg" color="gray.500" fontWeight="500" pt="10">
        {product.name} {product.type}
      </Heading>
      <Table variant="simple" mt="10" width="600px">
        <Tbody>
          <Tr>
            <Th>Name:</Th>
            <Td>{product.name}</Td>
          </Tr>
          <Tr>
            <Th>EAN Code:</Th>
            <Td>{product.ean}</Td>
          </Tr>
          <Tr>
            <Th>Type:</Th>
            <Td>{product.type}</Td>
          </Tr>
          <Tr>
            <Th>Weigth:</Th>
            <Td>{product.weigth / 1000} kg</Td>
          </Tr>
          <Tr>
            <Th>Color:</Th>
            <Td>{product.color}</Td>
          </Tr>
          <Tr>
            <Th>Current Quantity:</Th>
            <Td>{product.currentQnty}</Td>
          </Tr>
          <Tr>
            <Th>Active:</Th>
            <Td>{product.active ? 'YES' : 'NO'}</Td>
          </Tr>
        </Tbody>
      </Table>
      <Button mt="10" onClick={() => history.push('/products')}>
        Back
      </Button>
    </div>
  );
}

export default PreviewProduct;
