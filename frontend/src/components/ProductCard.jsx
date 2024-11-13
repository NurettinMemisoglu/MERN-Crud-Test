import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { LuPenSquare, LuTrash2 } from "react-icons/lu";
import { useColorMode } from "./ui/color-mode";
import { useProductStore } from "../store/product.js";
import { Toaster, toaster } from "./ui/toaster";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const textColor = useColorMode("gray.600", "gray.200");
  const bg = useColorMode("gray.200", "gray.900");
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateProduct = async (productId, updatedProduct) => {
    const { success, message } = await updateProduct(productId, updatedProduct);
    setIsDialogOpen(false);
    if (!success) {
      toaster.create({
        type: "error",
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toaster.create({
        type: "success",
        title: "Success",
        description: "Product updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const { deleteProduct, updateProduct } = useProductStore();
  const handleDeleteProduct = async (productId) => {
    const { success, message } = await deleteProduct(productId);
    if (!success) {
      toaster.create({
        type: "error",
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toaster.create({
        type: "success",
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />

      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack>
          <IconButton onClick={() => setIsDialogOpen(true)}>
            <LuPenSquare size={24} />
          </IconButton>
          <IconButton onClick={() => handleDeleteProduct(product._id)}>
            <LuTrash2 size={24} />
          </IconButton>
        </HStack>
      </Box>
      <DialogRoot open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  })
                }
              />

              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Save
            </Button>
          </DialogFooter>
          <DialogCloseTrigger onClick={() => setIsDialogOpen(false)} />
        </DialogContent>
      </DialogRoot>
      <Toaster />
    </Box>
  );
};

export default ProductCard;
