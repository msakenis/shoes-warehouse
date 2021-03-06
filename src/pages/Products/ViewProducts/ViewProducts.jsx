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
  Button,
  Box,
  useToast,
  Text,
  Stack,
} from '@chakra-ui/react';
import { ActionIconGroup, NumberField } from '../../../components';
import ACTIONS from '../../../actions';
import { reducer } from './reducer';
import { setDefaultPrices, showUpdateBtn } from './helperFunctions';
import './ViewProducts.css';

function ViewProducts() {
  const [data, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem('products')) // getting init products data from local storage just to emulate DB
  );
  const [displayConfirmGroup, setDisplayConfirmGroup] = useState(false);
  const [selectedProdId, setSelectedProdId] = useState(0);
  const [enteredQntyValues, setEnteredQntyValues] = useState({});
  const [enteredPriceValues, setEnteredPriceValues] = useState(
    setDefaultPrices(data)
  );
  const history = useHistory();
  const toast = useToast();
  const productsHistory = JSON.parse(localStorage.getItem('productsHistory'));

  return (
    <Stack w="10xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          dispatch({
            type: ACTIONS.UPDATE_PRODUCTS,
            payload: {
              quantity: enteredQntyValues,
              price: enteredPriceValues,
              productsHistory,
              toast,
            },
          });
          setEnteredQntyValues({});
        }}
      >
        <Heading
          as="h2"
          size="lg"
          color="gray.500"
          fontWeight="500"
          textAlign={['center', 'center', 'left']}
          pt="10"
        >
          Products
        </Heading>
        {data && data.length !== 0 ? (
          <Table className="table" variant="simple" mt="10">
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>Name</Th>
                <Th>EAN</Th>
                <Th>Type</Th>
                <Th>Weight</Th>
                <Th>Color</Th>
                <Th>Quantity</Th>
                <Th>Change Quantity(+,-)</Th>
                <Th>Price (&euro;)</Th>
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
                    color={
                      !(String(row.active) === 'true')
                        ? 'gray.400'
                        : row.currentQnty === 0
                        ? 'red.600'
                        : ''
                    }
                  >
                    <Td>{index + 1}</Td>
                    <Td>{row.name}</Td>
                    <Td>{row.ean}</Td>
                    <Td>{row.type}</Td>
                    <Td>{row.weight / 1000} kg</Td>
                    <Td>{row.color}</Td>
                    <Td>{row.currentQnty}</Td>
                    <Td>
                      {
                        <NumberField
                          max={9999999}
                          min={-9999999}
                          isDisabled={!(String(row.active) === 'true')}
                          value={enteredQntyValues[row.id] || ''}
                          pattern="^[-+,0-9]*$"
                          handleChange={(value) => {
                            setEnteredQntyValues({
                              ...enteredQntyValues,
                              [row.id]: value,
                            });
                          }}
                        />
                      }
                    </Td>
                    <Td>
                      {
                        <NumberField
                          step={0.05}
                          precision={2}
                          max={9999999}
                          min={0}
                          isDisabled={!(String(row.active) === 'true')}
                          value={enteredPriceValues[row.id] || ''}
                          handleChange={(value) => {
                            setEnteredPriceValues({
                              ...enteredPriceValues,
                              [row.id]: value,
                            });
                          }}
                        />
                      }
                    </Td>
                    <Td>
                      <Checkbox
                        colorScheme="green"
                        isChecked={String(row.active) === 'true'} // chakra radio accepts booleans as strings so changing it to boolean type
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
                        handlePreview={() =>
                          history.push(`/products/${row.id}`)
                        }
                        handleEdit={() =>
                          history.push(`/products/${row.id}/edit`)
                        }
                        handleDelete={() => {
                          setDisplayConfirmGroup(true); // acticates confirm btns group to show
                          setSelectedProdId(row.id); // sets selected product id
                        }}
                        handleDecline={() => setDisplayConfirmGroup(false)} // if "X" clicked normal action buttons appear
                        handleConfirm={() =>
                          // activates reducer hook with delete action, which filters and return data
                          dispatch({
                            type: ACTIONS.DELETE_PRODUCT,
                            payload: { id: row.id, setEnteredPriceValues },
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
        ) : (
          <Text mt="5">No products, click "Create Product" to add</Text>
        )}
        {showUpdateBtn(enteredQntyValues, enteredPriceValues, data) && (
          <Box mt="4">
            <Button type="submit" w={['100%', '30%', '20%']}>
              Update
            </Button>
          </Box>
        )}
      </form>
    </Stack>
  );
}

export default ViewProducts;
