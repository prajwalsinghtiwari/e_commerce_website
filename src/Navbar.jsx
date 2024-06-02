import React from 'react'
import { useAuth } from './AuthContext'
import { Box, Button, Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { authState, logout } = useAuth()

    return (
        <Box>
        hello
            <Flex justify="space-between" align="center" >
                {authState.isUserAuthenticated ? <Text >{authState.email}</Text> : 'Home'}
                <Flex>
                    {authState.isUserAuthenticated ? <>

                        <Link to={'/'}>
                            <Button>
                                Home
                            </Button>

                        </Link>
                        <Button>Logout</Button>
                    </> : <Link to={'/login'}>
                        <Button>
                            Login
                        </Button>

                    </Link>}
                </Flex>
            </Flex>

        </Box>
    )
}

export default Navbar
