import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Spinner,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import Layout from "../Component/shared/Layout/Layout";
import Modal from "../Component/shared/Modal/Modal";
import API from "../Services/API";
import moment from "moment";

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch blood inventory records
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <Layout>
      {user?.role === "admin" && navigate("/admin")}
      {error && (
        <Text color="red.500" textAlign="center" my={4}>
          {alert(error)}
        </Text>
      )}
      {loading ? (
        <Flex justifyContent="center" alignItems="center" h="full">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Box maxW="container.lg" mx="auto" mt={6} px={4}>
          {/* Add Inventory Button */}
          <Button
            leftIcon={<i className="fa-solid fa-plus"></i>}
            colorScheme="green"
            mb={4}
            onClick={onOpen}
          >
            Add Inventory
          </Button>

          {/* Inventory Table */}
          <Box overflowX="auto" bg="white" shadow="md" rounded="lg">
            <Table variant="simple" size="sm">
              <Thead bg="gray.100">
                <Tr>
                  <Th>Blood Group</Th>
                  <Th>Inventory Type</Th>
                  <Th>Quantity</Th>
                  <Th>Donor Email</Th>
                  <Th>Time & Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record._id} borderBottom="1px solid" borderColor="gray.200">
                    <Td>{record.bloodGroup}</Td>
                    <Td>{record.inventoryType}</Td>
                    <Td>{record.quantity} (ML)</Td>
                    <Td>{record.email}</Td>
                    <Td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          {/* Modal Component */}
          <Modal isOpen={isOpen} onClose={onClose} />
        </Box>
      )}
    </Layout>
  );
};

export default HomePage;
