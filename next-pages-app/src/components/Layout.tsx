import {
  Box,
  Link as ChakraLink,
  Container,
  Flex,
  Heading,
  Spacer,
  useColorModeValue,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  useDisclosure,
} from "@chakra-ui/react"
import NextLink from "next/link"
import React, { PropsWithChildren } from "react"
import { HamburgerIcon } from "@chakra-ui/icons"
import AuthenticatedNav from "./headers/AuthenticatedNav"
import { useIsAuthenticated } from "@/features/auth/login/hooks/useIsAuthenticated"

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const bgColor = useColorModeValue("gray.50", "gray.900")
  const headerBg = useColorModeValue("white", "gray.800")
  const isAuthenticated = useIsAuthenticated()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={bgColor} display={"flex"} flexDirection={"column"}>
      {/* Header */}
      <Box
        bg={headerBg}
        boxShadow="sm"
        position="fixed"
        width="full"
        zIndex="sticky"
        display={"flex"}
      >
        <Container maxW="container.xl" px={{ base: "4", md: "6" }}>
          <Flex
            py="4"
            align="center"
            justify={{ base: "space-between", md: "flex-start" }}
          >
            {/* Logo */}
            <ChakraLink
              as={NextLink}
              href="/"
              _hover={{ textDecoration: "none" }}
            >
              <Heading size="md" color="blue.500">
                React - Image Uploader
              </Heading>
            </ChakraLink>
            <Spacer display={{ base: "none", md: "flex" }} />

            {/* Mobile Menu Button */}
            {isAuthenticated && (
              <IconButton
                display={{ base: "flex", md: "none" }}
                icon={<HamburgerIcon />}
                aria-label="Open Menu"
                variant="ghost"
                onClick={onOpen}
              />
            )}

            {/* Desktop Navigation */}
            <Box display={{ base: "none", md: "flex" }}>
              {isAuthenticated ? <AuthenticatedNav /> : null}
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Mobile Navigation Drawer */}
      {isAuthenticated && (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>React-Image Uploader</DrawerHeader>
            <DrawerBody>
              <VStack align="start" spacing="4">
                <AuthenticatedNav />
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}

      {/* Main Content */}
      <Box as="main" pt="20" pb="16" flexGrow={1} display={"flex"}>
        <Container maxW="container.xl" p="6">
          {children}
        </Container>
      </Box>

      {/* Footer */}
      <Box
        as="footer"
        bg={headerBg}
        py="6"
        bottom="0"
        width="full"
        display={"flex"}
      >
        <Container maxW="container.xl">
          <Flex justify="center" color="gray.500">
            <Box
              as="a"
              href="https://github.com/mymai91"
              target="_blank"
              rel="noopener noreferrer"
            >
              © 2025 React-Image Uploader.
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout
