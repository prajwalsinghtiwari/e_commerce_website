import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Image,
  Heading,
  Text,
  Stack,
  HStack,
  VStack,
  Divider,
  Spinner,
  Center,
} from "@chakra-ui/react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products/${id}`
        );
        setProduct(res.data.data);
      } catch (error) {
        console.log("Error fetching product details", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={8} maxW="7xl" mx="auto">
      <Stack direction={{ base: "column", md: "row" }} spacing={8}>
        <Box flex="1" maxW="md">
          <Image
            src={product.image}
            alt={product.title}
            borderRadius="lg"
            boxShadow="md"
          />
        </Box>
        <Box flex="2">
          <VStack align="start" spacing={4}>
            <Heading as="h1" size="xl">
              {product.title}
            </Heading>
            <Text fontSize="lg" color="gray.500">
              {product.brand}
            </Text>
            <HStack spacing={4}>
              <Text fontSize="2xl" fontWeight="bold" color="teal.500">
                ${product.price}
              </Text>
              <Text fontSize="lg" color="gray.600">
                Category: {product.category}
              </Text>
            </HStack>
            <Divider />
            <Text fontSize="md" color="gray.700">
              {product.description}
            </Text>
          </VStack>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductDetails;
