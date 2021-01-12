import React, { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
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

      localStorage.setItem('products', JSON.stringify(newData)); // emulate db
      return newData;

    case ACTIONS.DELETE_PRODUCT:
      let productData = data.filter(
        (product) => product.id !== action.payload.id
      );

      localStorage.setItem('products', JSON.stringify(productData)); // emulate db
      return productData;

    default:
      return data;
  }
}

function ViewProducts() {
  const [data, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem('products')) // getting init products data from local storage just to emulate DB
  );
  const [displayConfirmGroup, setDisplayConfirmGroup] = useState(false);
  const [selectedProdId, setSelectedProdId] = useState(0);
  const history = useHistory();

  return (
    <div>
      <Heading as="h2" size="lg" color="gray.500" fontWeight="500" pt="10">
        Products
      </Heading>
      <Table variant="simple" mt="10">
        <Thead>
          <Tr>
            <Th>No.</Th>
            <Th>Name</Th>
            <Th>EAN</Th>
            <Th>Type</Th>
            <Th>Weight</Th>
            <Th>Color</Th>
            <Th>Active</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((row, index) => (
              // changes color to ligher to look like disabled if not active

              <Tr
                key={index}
                color={!(String(row.active) === 'true') && 'gray.200'}
              >
                <Td>{index + 1}</Td>
                <Td>{row.name}</Td>
                <Td>{row.ean}</Td>
                <Td>{row.type}</Td>
                <Td>{row.weight / 1000} kg</Td>
                <Td>{row.color}</Td>
                <Td>
                  <Checkbox
                    colorScheme="green"
                    isChecked={String(row.active) === 'true'} // chakra radio returns booleans as strings so changing it to boolean type
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
                    handlePreview={() => history.push(`/products/${row.id}`)}
                    handleEdit={() => history.push(`/products/${row.id}/edit`)}
                    handleDelete={() => {
                      setDisplayConfirmGroup(true); // acticates confirm btns group to show
                      setSelectedProdId(row.id); // sets selected product id
                    }}
                    handleDecline={() => setDisplayConfirmGroup(false)} // if "X" clicked normal action buttons appear
                    handleConfirm={() =>
                      // activates reducer hook with delete action, which filters and return data
                      dispatch({
                        type: ACTIONS.DELETE_PRODUCT,
                        payload: { id: row.id },
                      })
                    }
                    isDisabled={!(String(row.active) === 'true')} // disables btns if not active
                    displayConfirmGroup={displayConfirmGroup} // prop to show confirm btns
                    id={row.id} // sends id of every product to component
                    selectedProdId={selectedProdId} // sends only the clicked product id
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
