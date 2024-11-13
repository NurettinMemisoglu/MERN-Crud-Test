import { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Container,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { Toaster, toaster } from "../components/ui/toaster";
import { useColorModeValue } from "../components/ui/color-mode";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toaster.create({
        type: "error",
        title: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toaster.create({
        type: "success",
        title: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <Container maxW={"sm"}>
      <VStack spacing={16}>
        <Heading
          as={"h1"}
          fontWeight={"bold"}
          textAlign={"center"}
          mb={8}
          color="transparent" // Metin rengini şeffaf yapıyoruz
          style={{
            fontSize: "2rem", // Metin boyutu
            backgroundImage: "linear-gradient(to right, #ff7e5f, #feb47b)", // Gradyan tanımı
            backgroundClip: "text", // Arka planı sadece metne uygula
            WebkitBackgroundClip: "text", // Safari için destek
          }}
        >
          Create New Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.700")}
          p={8}
          marginLeft={50}
          marginRight={50}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
        <SimpleGrid columns={[2, null, 3]} gap="40px">
          <Box height="20" />
          <Box height="20" />
          <Box height="20" />
          <Box height="20" />
          <Box height="20" />
        </SimpleGrid>
      </VStack>
      <Toaster />
    </Container>
  );
};

export default CreatePage;
