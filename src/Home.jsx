import { Heading, List , Box , ListItem , Link as ChakraLink } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import axios from 'axios'

const Home = () => {

    const [products,setProduct]=useState([])

    useEffect(()=> { 

        const fetchProducts = async()=>{
            try { 
                const res = await axios.get("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products");
                setProduct(res?.data)
            } catch (error) {
                console.log("Error fetching products",error);
            }
        }
        fetchProducts();
    },[])

  return (
    <Box p={4}>
   <Heading>Products</Heading>
   <List spacing={3}>
    {products.map((product)=>(
        <ListItem key={product.id}><Link as={RouterLink}to={`/product/${product.id}`}> {product.name}</Link>
        </ListItem>
    ))}
   </List>
    </Box>
  )
}
export default Home
