import React from 'react';
import { useAuth } from './AuthContext';
import { Box, Button, Flex, Text, Spacer } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box bg="teal.500" p={4}>
      <Flex justify="space-between" align="center">
        {authState.isUserAuthenticated ? (
          <Text color="white" fontSize="lg">{authState.email}</Text>
        ) : (
          <Link to="/" style={{ color: 'white', fontSize: 'lg', textDecoration: 'none' }}>
            Home
          </Link>
        )}
        <Flex>
          {authState.isUserAuthenticated ? (
            <>
              <Link to="/" style={{ marginRight: '16px' }}>
                <Button colorScheme="teal" variant="outline">
                  Home
                </Button>
              </Link>
              <Button colorScheme="teal" variant="solid" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button colorScheme="teal" variant="outline">
                Login
              </Button>
            </Link>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
