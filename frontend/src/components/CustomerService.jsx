import {
  Box,
  Button,
  chakra,
  Container,
  IconButton,
  Textarea,
  useBreakpointValue,
  VStack,
  useRecipe,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
import { LuPenSquare } from "react-icons/lu";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from "./ui/drawer";
import { useEffect, useRef, useState } from "react";

const CustomerService = () => {
  const bg = useColorMode("gray.200", "gray.900");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [message, setMessage] = useState(""); // State for the message input
  const drawerHeight = useBreakpointValue({ base: "65%" });
  const predefinedMessages = ["Siparişlerim", "Yemek ve Market Siparişlerim"];
  const [messages, setMessages] = useState([]); // Store sent messages
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      // Prevent sending empty messages
      setMessages([...messages, message]);
      setMessage(""); // Clear input *after* adding to messages
    }
  };

  const handlePredefinedMessageClick = (predefinedMessage) => {
    setMessage(predefinedMessage); // Set the message input
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <Box
        p={6}
        bg={bg}
        shadow={"md"}
        rounded={"full"}
        transition={"all 0.3"}
        _hover={{
          transform: "translateY(5px)",
          shadow: "xl",
        }}
        onClick={() => setIsDrawerOpen(true)}
        cursor={"pointer"}
      >
        <IconButton variant={"ghost"}>
          <LuPenSquare size={24} />
        </IconButton>
      </Box>
      <DrawerRoot open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <DrawerBackdrop />
        <DrawerContent
          offset="4"
          position="fixed" // Key change: Fixed positioning
          bottom={5} // Key change: Anchor to bottom
          right={10} // Key change: Anchor to left
          height={drawerHeight}
          maxWidth="sm" // Set a maximum width if needed
          rounded="md"
          overflow="hidden"
        >
          <DrawerHeader>
            <DrawerTitle position={"fixed"}>Drawer Title</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <VStack
              backgroundColor={"bg.inverted"}
              w={"xs"}
              h={"xs"}
              rounded={"md"}
              overflowY={"auto"}
            >
              {messages.map((msg, index) => (
                <Text key={index} alignSelf="flex-end" mb={0.5} color={"bg"}>
                  {" "}
                  {/* Align messages to the right */}
                  You: {msg}
                </Text>
              ))}
              <div ref={messagesEndRef} /> {/* For scrolling to bottom */}
            </VStack>
            <VStack mb={4}>
              {predefinedMessages.map((predefinedMessage) => (
                <Button
                  key={predefinedMessage}
                  variant="outline"
                  onClick={() =>
                    handlePredefinedMessageClick(predefinedMessage)
                  }
                >
                  {predefinedMessage}
                </Button>
              ))}
            </VStack>

            {/* Message Input and Send Button */}
            <VStack spacing={4} align="stretch">
              <Textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                minH="initial"
                resize="none"
                overflow="hidden"
                lineHeight="inherit"
              />
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <DrawerActionTrigger>
              <HStack position={"fixed"} bottom={8} right={16}>
                <Button colorScheme="blue" onClick={handleSendMessage}>
                  Send
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Cancel
                </Button>
              </HStack>
            </DrawerActionTrigger>
          </DrawerFooter>
          <DrawerCloseTrigger onClick={() => setIsDrawerOpen(false)} />
        </DrawerContent>
      </DrawerRoot>
    </Container>
  );
};

export default CustomerService;
