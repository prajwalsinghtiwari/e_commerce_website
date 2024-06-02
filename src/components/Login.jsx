import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { Box, Button, Heading, Input, VStack } from "@chakra-ui/react";
import axios from "axios"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  async function HandleLogin(){
try {
  let res = await axios.post("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/login",{email , password})
  let token = res.data.token;
  login(email, token);
  
  
} catch (error) {
  console.error("error login", error);
}
 }
  return (
    <Box p={4}>
      <VStack spacing={4}>
        <Heading>Login Page</Heading>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="teal" onClick={HandleLogin}>
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
