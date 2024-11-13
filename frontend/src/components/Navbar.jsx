import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  Stack,
  Box,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { LuPlusSquare, LuShoppingCart, LuMoon, LuSun } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorMode("white", "gray.900");
  return (
    <Container maxW={"full"} px={10}>
      <Flex
        h={20}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Stack>
          <Box
            h={10}
            fontFamily="myHeading"
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
            color="transparent" // Metin rengini şeffaf yapıyoruz
            style={{
              fontSize: "2rem", // Metin boyutu
              backgroundImage: "linear-gradient(to right, #ff7e5f, #feb47b)", // Gradyan tanımı
              backgroundClip: "text", // Arka planı sadece metne uygula
              WebkitBackgroundClip: "text", // Safari için destek
            }}
          >
            <Link to={"/"}>
              <HStack>
                Product Store
                <Icon color={"ActiveBorder"}>
                  <LuShoppingCart fontSize={24} />
                </Icon>
              </HStack>
            </Link>
          </Box>
        </Stack>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <LuPlusSquare fontSize={20} />
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <LuMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
