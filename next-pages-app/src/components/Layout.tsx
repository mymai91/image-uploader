import React, { PropsWithChildren } from "react"
import {
  Box,
  Flex,
  Container,
  Link as ChakraLink,
  Button,
  Heading,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const bgColor = useColorModeValue("gray.50", "gray.900")
  const headerBg = useColorModeValue("white", "gray.800")

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
            <Link href="/" passHref>
              <ChakraLink _hover={{ textDecoration: "none" }}>
                <Heading size="md" color="blue.500">
                  ProductApp
                </Heading>
              </ChakraLink>
            </Link>

            <Spacer />

            <Flex gap="4">
              <Link href="/login" passHref>
                <Button
                  as={ChakraLink}
                  variant={router.pathname === "/login" ? "solid" : "ghost"}
                  colorScheme="blue"
                >
                  Login
                </Button>
              </Link>
              <Link href="/product-images" passHref>
                <Button
                  as={ChakraLink}
                  variant={
                    router.pathname === "/product-images" ? "solid" : "ghost"
                  }
                  colorScheme="blue"
                >
                  Product Images
                </Button>
              </Link>
              <Link href="/product-images/new" passHref>
                <Button
                  as={ChakraLink}
                  variant={
                    router.pathname === "/product-images/new"
                      ? "solid"
                      : "ghost"
                  }
                  colorScheme="blue"
                >
                  New Image
                </Button>
              </Link>
            </Flex>
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
            <ChakraLink href="https://github.com" isExternal>
              © 2024 ProductApp. All rights reserved.
            </ChakraLink>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout
