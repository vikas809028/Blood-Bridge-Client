import React from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, VStack, HStack, Icon, Link, Text } from "@chakra-ui/react";
import {
  FaWarehouse,
  FaHandHoldingMedical,
  FaHospital,
  FaBuilding,
} from "react-icons/fa";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const getActiveClass = (path) => (location.pathname === path ? "active" : "");

  const organisationMenu = [
    { to: "/", icon: FaWarehouse, label: "Inventory" },
    { to: "/donar", icon: FaHandHoldingMedical, label: "Donar" },
    { to: "/hospital", icon: FaHospital, label: "Hospital" },
  ];

  const adminMenu = [
    { to: "/donar-list", icon: FaWarehouse, label: "Donar List" },
    {
      to: "/hospital-list",
      icon: FaHandHoldingMedical,
      label: "Hospital List",
    },
    { to: "/org-list", icon: FaHospital, label: "Organisation List" },
    { to: "/consumer", icon: FaBuilding, label: "Consumer" },
  ];

  const hospitalMenu = [
    { to: "/orgnaisation", icon: FaBuilding, label: "Orgnaisation" },
    { to: "/consumer", icon: FaBuilding, label: "Consumer" },
  ];

  const donorMenu = [
    { to: "/orgnaisation", icon: FaBuilding, label: "Orgnaisation" },
    { to: "/donation", icon: FaBuilding, label: "Donation" },
  ];

  const renderMenuItems = (menuItems) => {
    return menuItems.map((item) => (
      <HStack
        key={item.to}
        as={RouterLink}
        to={item.to}
        align="center"
        spacing={3}
        px={4}
        py={2}
        borderRadius="md"
        bg={location.pathname === item.to ? "blue.500" : "transparent"}
        color={location.pathname === item.to ? "white" : "gray.700"}
        _hover={{ bg: "blue.400", color: "white" }}
      >
        <Icon as={item.icon} />
        <Text>{item.label}</Text>
      </HStack>
    ));
  };

  return (
    <Box bg="gray.300" w="250px" minH="90vh" p={4}>
      <VStack spacing={4} align="stretch">
        {user?.role === "organisation" && renderMenuItems(organisationMenu)}
        {user?.role === "admin" && renderMenuItems(adminMenu)}
        {user?.role === "donar" && renderMenuItems(donorMenu)}
        {user?.role === "hospital" && renderMenuItems(hospitalMenu)}
      </VStack>
    </Box>
  );
};

export default Sidebar;
