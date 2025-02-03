import {
  Box,
  Link as ChakraLink,
  Container,
  Flex,
  Heading,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react"
import NextLink from "next/link"
import React, { PropsWithChildren } from "react"
import AuthenticatedNav from "./headers/AuthenticatedNav"
import UnauthenticatedNav from "./headers/UnauthenticatedNav"
import { useIsAuthenticated } from "@/features/auth/login/hooks/useIsAuthenticated"

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const bgColor = useColorModeValue("gray.50", "gray.900")
  const headerBg = useColorModeValue("white", "gray.800")

  const isAuthenticated = useIsAuthenticated()
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
        <Container maxW="container.xl">
          <Flex py="4" align="center">
            <ChakraLink
              as={NextLink}
              href="/"
              _hover={{ textDecoration: "none" }}
            >
              <Heading size="md" color="blue.500">
                React - Image uploader
              </Heading>
            </ChakraLink>

            <Spacer />

            {isAuthenticated ? <AuthenticatedNav /> : <UnauthenticatedNav />}
          </Flex>
        </Container>
      </Box>

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
