import React, { useReducer, useState } from 'react';
import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
} from '@chakra-ui/react';
import { ActionIconGroup } from '../../../components';
import ACTIONS from '../../../actions';
import products from '../../../utils/products'; // temporary

localStorage.setItem('products', JSON.stringify(products)); // temporary

function reducer(data, action) {
  switch (action.type) {
    case ACTIONS.HANDLE_CHECKBOX:
      let newData = data.map((product) => {
        if (product.id === action.payload.id) {
          return { ...product, active: !product.active };
        } else {
          return product;
        }
      });

      localStorage.setItem('products', JSON.stringify(newData));
      return newData;

    case ACTIONS.DELETE_PRODUCT:
      let productData = data.filter(
        (product) => product.id !== action.payload.id
      );

      localStorage.setItem('products', JSON.stringify(productData));
      return productData;

    default:
      return data;
  }
}

function ViewProducts() {
  const [data, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem('products'))
  );
  const [displayConfirmGroup, setDisplayConfirmGroup] = useState(false);
  const [selectedProdId, setSelectedProdId] = useState(0);

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
              // changes color to ligher to look like disabled if not active
              <Tr key={index} color={!row.active && 'gray.200'}>
                <Td>{index + 1}</Td>
                <Td>{row.name}</Td>
                <Td>{row.ean}</Td>
                <Td>{row.type}</Td>
                <Td>{row.weigth}</Td>
                <Td>{row.color}</Td>
                <Td>
                  <Checkbox
                    colorScheme="green"
                    isChecked={row.active}
                    onChange={() =>
                      dispatch({
                        type: ACTIONS.HANDLE_CHECKBOX,
                        payload: { id: row.id },
                      })
                    }
                  />
                </Td>
                <Td>
                  <ActionIconGroup
                    fontSize="18px"
                    handlePreview={() => console.log('Previewed!' + row.id)}
                    handleEdit={() => console.log('Edited!' + row.id)}
                    handleDelete={() => {
                      setDisplayConfirmGroup(true);
                      setSelectedProdId(row.id);
                    }}
                    handleDecline={() => setDisplayConfirmGroup(false)}
                    handleConfirm={() =>
                      dispatch({
                        type: ACTIONS.DELETE_PRODUCT,
                        payload: { id: row.id },
                      })
                    }
                    isDisabled={!row.active} // disables btns if not active
                    displayConfirmGroup={displayConfirmGroup}
                    id={row.id}
                    selectedProdId={selectedProdId}
                  />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default ViewProducts;
