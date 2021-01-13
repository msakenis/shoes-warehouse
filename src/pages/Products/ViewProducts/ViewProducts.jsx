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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Box,
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
    case ACTIONS.UPDATE_PRODUCTS:
      let updatedProducts = data.map((product) => {
        // most iteractions with data would do in back-end. In front end usually you fetch already filtered data
        if (action.payload.quantity[product.id]) {
          product = {
            ...product,
            currentQnty:
              (+product.currentQnty || 0) +
                +action.payload.quantity[product.id] <
              0
                ? 0
                : (+product.currentQnty || 0) +
                  +action.payload.quantity[product.id], // if current qnty lower than 0 return 0, qnty cannot be negative
          };
        }
        if (action.payload.price[product.id] >= 0) {
          product = {
            ...product,
            price: action.payload.price[product.id] || 0,
          };
        }
        return product;
      });
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      return updatedProducts;

    default:
      return data;
  }
}

function showUpdateBtn(enteredQntyValues, enteredPriceValues, data) {
  const qntyValueArr = Object.values(enteredQntyValues);
  const priceValueArr = Object.values(enteredPriceValues);
  const defaultPriceArr = Object.values(setDefaultPrices(data));

  return (
    !qntyValueArr.length === 0 || //check if no values were changed do not show the button update
    !qntyValueArr.every((item) => item === 0) || //check if all values 0 then no need to show button either
    !(JSON.stringify(priceValueArr) === JSON.stringify(defaultPriceArr)) // check if any changes were made to prices and show button if yes
  );
}

function setDefaultPrices(data) {
  const dataObj = {};
  data.map((item) => Object.assign(dataObj, { [item.id]: item.price }));
  return dataObj;
}

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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({
          type: ACTIONS.UPDATE_PRODUCTS,
          payload: { quantity: enteredQntyValues, price: enteredPriceValues },
        });
        setEnteredQntyValues({});
      }}
    >
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
            <Th>Quantity</Th>
            <Th>Change Quantity</Th>
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
                color={!(String(row.active) === 'true') && 'gray.200'}
              >
                <Td>{index + 1}</Td>
                <Td>{row.name}</Td>
                <Td>{row.ean}</Td>
                <Td>{row.type}</Td>
                <Td>{row.weight / 1000} kg</Td>
                <Td>{row.color}</Td>
                <Td>{row.currentQnty || 0}</Td>
                <Td>
                  {
                    <NumberInput
                      minW="100px"
                      inputMode="numeric"
                      max="9999999"
                      min="-9999999"
                      keepWithinRange={false}
                      clampValueOnBlur={false}
                      isDisabled={!(String(row.active) === 'true')}
                      value={enteredQntyValues[row.id] || ''}
                      onChange={(value) => {
                        setEnteredQntyValues({
                          ...enteredQntyValues,
                          [row.id]: +value,
                        });
                      }}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  }
                </Td>
                <Td>
                  {
                    <NumberInput
                      minW="100px"
                      step={0.05}
                      precision={2}
                      inputMode="numeric"
                      keepWithinRange={false}
                      clampValueOnBlur={false}
                      max="9999999"
                      min="0"
                      isDisabled={!(String(row.active) === 'true')}
                      value={enteredPriceValues[row.id] || ''}
                      onChange={(value) => {
                        setEnteredPriceValues({
                          ...enteredPriceValues,
                          [row.id]: +value,
                        });
                      }}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
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
      {showUpdateBtn(enteredQntyValues, enteredPriceValues, data) && (
        <Box mt="4">
          <Button type="submit">Update</Button>
        </Box>
      )}
    </form>
  );
}

export default ViewProducts;
