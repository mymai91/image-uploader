import { useAppSelector } from "@/hooks/storeHooks"
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
// import { useRouter } from "next/router"
import React, { PropsWithChildren } from "react"
import AuthenticatedNav from "./headers/AuthenticatedNav"
import UnauthenticatedNav from "./headers/UnauthenticatedNav"

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const bgColor = useColorModeValue("gray.50", "gray.900")
  const headerBg = useColorModeValue("white", "gray.800")

  const { isAuthenticated } = useAppSelector(state => state.auth)
  return (
    <Box minH="100vh" bg={bgColor}>
      {/* Header */}
      <Box
        bg={headerBg}
        boxShadow="sm"
        position="fixed"
        width="full"
        zIndex="sticky"
      >
        <Container maxW="container.xl">
          <Flex py="4" align="center">
            <ChakraLink
              as={NextLink}
              href="/"
              _hover={{ textDecoration: "none" }}
            >
              <Heading size="md" color="blue.500">
                ProductApp
              </Heading>
            </ChakraLink>

            <Spacer />

            {isAuthenticated ? <AuthenticatedNav /> : <UnauthenticatedNav />}
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Box as="main" pt="20" pb="16">
        <Container maxW="container.xl" p="6">
          {children}
        </Container>
      </Box>

      {/* Footer */}
      <Box
        as="footer"
        bg={headerBg}
        py="6"
        position="fixed"
        bottom="0"
        width="full"
      >
        <Container maxW="container.xl">
          <Flex justify="center" color="gray.500">
            <Box
              as="a"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              © 2024 ProductApp. All rights reserved.
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout
