import React from 'react';
import logoImg from '../../assets/images/talechLogo.png';
import { Link as ReactLink, useHistory } from 'react-router-dom';
import { Stack, Image, Link, Box } from '@chakra-ui/react';

function NavBar() {
  const history = useHistory();
  return (
    <Box borderBottom="2px" borderColor="gray.200">
      <Stack
        maxW="6xl"
        direction="row"
        justify="space-between"
        align="center"
        m="auto"
      >
        <Image
          src={logoImg}
          p="4"
          width="200px"
          alt="logo"
          cursor="pointer"
          onClick={() => history.push('/products')}
        />
        <Stack direction="row" color="gray.500">
          <Link as={ReactLink} mr="4" to="/products">
            Products
          </Link>
          <Link as={ReactLink} to="/products/create">
            Create Product
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}

export default NavBar;
