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

function createRandomEANNumber() {
  // randomly generates 13digit number
  return Math.floor(Math.random() * 1000000000000 + 1000000000000);
}

function addProduct(
  e,
  name,
  type,
  EANnumber,
  color,
  weight,
  productStatus,
  currentProducts,
  toast
) {
  e.preventDefault();
  const id = currentProducts.sort((a, b) => a.id - b.id).slice(-1)[0].id + 1; //sorts by id to get highest id number and +1 to have unique id

  currentProducts.push({
    id,
    name,
    type,
    ean: +EANnumber,
    color,
    weight: +weight,
    active: productStatus,
  });

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
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [EANnumber, setEANnumber] = useState(createRandomEANNumber());
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState(0);
  const [productStatus, setProductStatus] = useState('true');
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
            addProduct(
              e,
              name,
              type,
              EANnumber,
              color,
              weight,
              productStatus,
              currentProducts,
              toast
            );
          }}
        >
          <Stack direction="row">
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                maxLength="50"
              />
              <FormHelperText>e.g. "Adidas"</FormHelperText>
            </FormControl>

            <FormControl id="type" isRequired>
              <FormLabel>Type</FormLabel>
              <Input
                type="text"
                onChange={(e) => setType(e.target.value)}
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
                onChange={(e) => setEANnumber(e.target.value)}
                value={EANnumber}
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
                onChange={(e) => setColor(e.target.value)}
                placeholder="Color"
                maxLength="50"
              />
              <FormHelperText>e.g. "Red"</FormHelperText>
            </FormControl>

            <FormControl id="weight" isRequired>
              <FormLabel>Weight (g)</FormLabel>
              <Input
                type="text"
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Grams"
                pattern="^[0-9]*$"
                maxLength="7"
              />
              <FormHelperText>weight in grams. E.g 1000</FormHelperText>
            </FormControl>
          </Stack>

          <RadioGroup onChange={setProductStatus} value={productStatus} mt="4">
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
