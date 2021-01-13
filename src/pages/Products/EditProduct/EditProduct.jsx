import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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

function getChosenProduct(id) {
  const products = JSON.parse(localStorage.getItem('products')); // local storage just to emulate db

  const product = products.filter((product) => product.id === +id)[0]; // this filter just to emulate db, ussually you fetch one product only. Back-End must do the most of the job

  return product;
}
function editProduct(
  e,
  id,
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

  let updatedProducts = currentProducts.map((product) => {
    if (product.id === id) {
      return {
        ...product,
        name: name,
        type: type,
        ean: +EANnumber,
        color: color,
        weight: +weight,
        active: productStatus,
      };
    } else {
      return product;
    }
  });

  localStorage.setItem('products', JSON.stringify(updatedProducts)); // rewrites fake db to new products
  toast({
    title: 'Product updated successfully!',

    status: 'success',
    duration: 9000,
    isClosable: true,
    position: 'top',
  });
}

function EditProduct() {
  const { id } = useParams();
  const product = getChosenProduct(id);
  const [name, setName] = useState(product.name);
  const [type, setType] = useState(product.type);
  const [EANnumber, setEANnumber] = useState(product.ean);
  const [color, setColor] = useState(product.color);
  const [weight, setWeight] = useState(product.weight);
  const [productStatus, setProductStatus] = useState(String(product.active));
  const currentProducts = JSON.parse(localStorage.getItem('products'));
  const toast = useToast();
  const history = useHistory();
  return (
    <>
      <Heading as="h2" size="lg" color="gray.500" fontWeight="500" pt="10">
        Edit {product.name} {product.type}
      </Heading>
      <Stack maxW="800px" pt="10">
        <form
          onSubmit={(e) => {
            editProduct(
              e,
              product.id,
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
                value={name}
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
                value={type}
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
                value={color}
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
                value={weight}
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
            Save
          </Button>
          <Button
            type="button"
            onClick={() => history.push('/products')}
            mt="8"
            ml="4"
          >
            Back
          </Button>
        </form>
      </Stack>
    </>
  );
}

export default EditProduct;
