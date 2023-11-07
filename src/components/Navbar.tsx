import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, Flex, Link } from '@chakra-ui/core';

interface IMenuItemProps {
  children: React.ReactNode;
  to: string;
}

const MenuItem: React.FC<IMenuItemProps> = (props) => {
  const { children, to } = props;
  return (
    <Link
      as={RouterLink}
      to={to}
      mt={{ base: 4, md: 0 }}
      mr={6}
      display="block"
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="blue.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
          TO DO APP
        </Heading>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItem to="/">Todo</MenuItem>
        <MenuItem to="/other">Other Page</MenuItem>
      </Box>
    </Flex>
  );
};

export default Navbar;
