import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  Icon,
  Badge,
  Link,
} from "@chakra-ui/react";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <Box
      as="nav"
      bg="red.600"
      px={4}
      h={"100%"}
      display={"flex"}
      alignItems={"center"}
      shadow="md"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex
        minW="100%"
        justify="space-between"
        align="center"
        maxW="container.lg"
        color="white"
      >
        {/* Brand Section */}
        <HStack spacing={2}>
          <Icon as={BiDonateBlood} boxSize={6} />
          <Text fontSize="2xl" fontWeight="bold">
            Blood Bank App
          </Text>
        </HStack>

        {/* Navigation Section */}
        <HStack spacing={6}>



          {/* Conditional Links */}
          {location.pathname === "/" ||
          location.pathname === "/donar" ||
          location.pathname === "/hospital" ? (
            <Link
              as={RouterLink}
              to="/analytics"
              fontSize="sm"
              _hover={{ textDecoration: "underline", color: "gray.300" }}
            >
              Analytics
            </Link>
          ) : (
            <Link
              as={RouterLink}
              to="/"
              fontSize="sm"
              _hover={{ textDecoration: "underline", color: "gray.300" }}
            >
              Home
            </Link>
          )}
          
          {/* User Welcome Section */}
          {user && (
            <HStack spacing={3}>
              <Icon as={BiUserCircle} boxSize={6} />
              <Text fontSize="md">
                Welcome,{" "}
                <Text as="span" fontWeight="semibold">
                  {user?.name || user?.hospitalName || user?.organisationName}
                </Text>
                <Badge ml={2} colorScheme="red" fontSize="xs">
                  {user?.role}
                </Badge>
              </Text>
            </HStack>
          )}

          

          {/* Logout Button */}
          <Button
            size="sm"
            colorScheme="whiteAlpha"
            variant="solid"
            color="red.600"
            bg="white"
            _hover={{ bg: "gray.200" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
