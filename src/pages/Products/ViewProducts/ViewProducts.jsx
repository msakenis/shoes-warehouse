import React, { useState } from 'react';
import { Heading, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

function ViewProducts() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem('products'))
  );

  return (
    <div>
      <Heading as="h2" size="lg" color="gray.500" fontWeight="500" pt="4">
        Products
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>No.</Th>
            <Th>Name</Th>
            <Th>EAN</Th>
            <Th>Type</Th>
            <Th>Weigth</Th>
            <Th>Color</Th>
            <Th>Active</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((row, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{row.name}</Td>
                <Td>{row.ean}</Td>
                <Td>{row.type}</Td>
                <Td>{row.weigth}</Td>
                <Td>{row.color}</Td>
                <Td>checkbox</Td>
                <Td>action buttons</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default ViewProducts;
