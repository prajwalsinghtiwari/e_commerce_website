import { Heading, Box, Button, Select, Stack, SimpleGrid, Text, Spinner, Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products"
        );
        setProducts(res?.data?.data);
        setFilteredProducts(res?.data?.data);
      } catch (error) {
        console.log("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    let sortedProducts = [...filteredProducts];
    if (order === "asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  };

  const handleFilter = (e) => {
    const category = e.target.value;
    setCategoryFilter(category);
    let filtered = products;
    if (category) {
      filtered = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    setFilteredProducts(filtered);
  };

  return (
    <Box p={4}>
      <Heading>Products</Heading>
      <Stack direction="row" spacing={4} mt={4} mb={4}>
        <Select placeholder="Sort by Price" onChange={handleSort}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Select>
        <Select placeholder="Filter by Category" onChange={handleFilter}>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
          <option value="home-decor">Home Decor</option>
        </Select>
      </Stack>
      {loading ? (
        <Center>
          Loading...
        </Center>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <Box
                key={product.id}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <Box>
                  <Box as="h4" fontWeight="bold" mb={2}>
                    {product.title}
                  </Box>
                  <Box>Category: {product.category}</Box>
                  <Box>Price: ${product.price}</Box>
                  <Button
                    as={ReactRouterLink}
                    to={`/product/${product.id}`}
                    mt={2}
                    colorScheme="teal"
                  >
                    More Details
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <Text>No products found</Text>
          )}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Home;
