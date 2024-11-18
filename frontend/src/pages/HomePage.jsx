import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  CardFooter,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import CustomerService from "../components/CustomerService";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);
  return (
    <Container p={8}>
      <VStack grid={""}>
        <Heading
          as={"h1"}
          fontWeight={"bold"}
          textAlign={"center"}
          mb={8}
          color="transparent"
          style={{
            fontSize: "2rem", // Metin boyutu
            backgroundImage: "linear-gradient(to right, #ff7e5f, #feb47b)", // Gradyan tanımı
            backgroundClip: "text", // Arka planı sadece metne uygula
            WebkitBackgroundClip: "text", // Safari için destek
          }}
        >
          Current Products
        </Heading>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          gap={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}
          >
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
      <VStack alignItems={"flex-end"}>
        <SimpleGrid p={4}>
          <CustomerService />
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default HomePage;
