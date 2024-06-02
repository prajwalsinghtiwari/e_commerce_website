import React from 'react'
import { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box , Heading , Text} from '@chakra-ui/react'
import { chakra } from '@chakra-ui/react'
import axios from 'axios';
const ProductDetails = () => {

    const [product, setProduct] = useState(null)
    const { id } = useParams()
    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`).then(res => {
            setProduct(res.data)
        })
    }, [id])
    console.log(product)
    if (!product) {
        return <h1>Loading...</h1>
    }
    return (
        <Box>
            <Heading>{product.title}</Heading>
            <Text>{product.description}</Text>
        </Box>
    )

}

export default ProductDetails
