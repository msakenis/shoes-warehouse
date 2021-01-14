import React, { useState } from 'react';
import {
  Heading,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Radio,
  RadioGroup,
  useToast,
} from '@chakra-ui/react';
import { NumberField } from '../../../components/';
import { generateUniqueId, createRandomEANNumber } from './helperFunctions';

function addProduct(e, fieldValues, currentProducts, toast) {
  e.preventDefault();
  const id = generateUniqueId(currentProducts);

  currentProducts.push({ ...fieldValues, id });

  localStorage.setItem('products', JSON.stringify(currentProducts)); // rewrites fake db to new products

  toast({
    title: 'Product created successfully!',

    status: 'success',
    duration: 9000,
    isClosable: true,
    position: 'top',
  });
}

function CreateProduct() {
  const [fieldValues, setFieldValues] = useState({
    name: '',
    type: '',
    ean: createRandomEANNumber(),
    color: '',
    weight: 0,
    active: 'true',
    price: 0,
    currentQnty: 0,
  });

  const currentProducts = JSON.parse(localStorage.getItem('products'));
  const toast = useToast();

  return (
    <>
      <Heading as="h2" size="lg" color="gray.500" fontWeight="500" pt="10">
        Create Product
      </Heading>
      <Stack maxW="800px" pt="10">
        <form
          onSubmit={(e) => {
            addProduct(e, fieldValues, currentProducts, toast);
          }}
        >
          <Stack direction="row">
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                onChange={(e) =>
                  setFieldValues({ ...fieldValues, name: e.target.value })
                }
                placeholder="Name"
                maxLength="50"
              />
              <FormHelperText>e.g. "Adidas"</FormHelperText>
            </FormControl>

            <FormControl id="type" isRequired>
              <FormLabel>Type</FormLabel>
              <Input
                type="text"
                onChange={(e) =>
                  setFieldValues({ ...fieldValues, type: e.target.value })
                }
                placeholder="Type"
                maxLength="50"
              />
              <FormHelperText>e.g. "Sneakers" </FormHelperText>
            </FormControl>
          </Stack>

          <Stack direction="row" mt="5">
            <FormControl id="ean" isRequired>
              <FormLabel>EAN Code</FormLabel>
              <Input
                type="text"
                onChange={(e) =>
                  setFieldValues({ ...fieldValues, ean: +e.target.value })
                }
                value={fieldValues.ean}
                placeholder="Color"
                minLength="13"
                maxLength="13"
                pattern="^[0-9]*$"
              />
              <FormHelperText>
                This is randomly generated EAN code
              </FormHelperText>
            </FormControl>

            <FormControl id="color" isRequired>
              <FormLabel>Color</FormLabel>
              <Input
                type="text"
                onChange={(e) =>
                  setFieldValues({ ...fieldValues, color: e.target.value })
                }
                placeholder="Color"
                maxLength="50"
              />
              <FormHelperText>e.g. "Red"</FormHelperText>
            </FormControl>

            <FormControl id="weight" isRequired>
              <FormLabel>Weight (g)</FormLabel>
              <Input
                type="text"
                onChange={(e) =>
                  setFieldValues({ ...fieldValues, weight: +e.target.value })
                }
                placeholder="Grams"
                pattern="^[0-9]*$"
                maxLength="7"
              />
              <FormHelperText>weight in grams. E.g 1000</FormHelperText>
            </FormControl>
          </Stack>

          <Stack direction="row" mt="5">
            <FormControl id="price" isRequired>
              <FormLabel>Price (&euro;)</FormLabel>
              <NumberField
                step={0.05}
                precision={2}
                max={9999999}
                value={fieldValues.price}
                isDisabled={false}
                min={0}
                handleChange={(value) => {
                  setFieldValues({
                    ...fieldValues,
                    price: value.charAt(1) === '0' ? 0 : value,
                  }); // prevent "0000"
                }}
              />
              <FormHelperText>e.g 100</FormHelperText>
            </FormControl>
            <FormControl id="quantity" isRequired>
              <FormLabel>Quantity (pcs)</FormLabel>
              <NumberField
                max={9999999}
                min={-9999999}
                value={fieldValues.currentQnty}
                isDisabled={false}
                pattern="^[0-9]*$"
                handleChange={(value) => {
                  setFieldValues({
                    ...fieldValues,
                    currentQnty: value.startsWith(0) ? 0 : value, // prevent "0000"
                  });
                }}
              />
              <FormHelperText>e.g 1</FormHelperText>
            </FormControl>
          </Stack>
          <RadioGroup
            onChange={(value) =>
              setFieldValues({
                ...fieldValues,
                active: value, // prevent "0000"
              })
            }
            value={fieldValues.active}
            mt="4"
          >
            <Stack direction="row">
              <Radio value="true">Active</Radio>
              <Radio value="false">Inactive</Radio>
            </Stack>
          </RadioGroup>

          <Button type="submit" mt="8">
            Create
          </Button>
        </form>
      </Stack>
    </>
  );
}

export default CreateProduct;
