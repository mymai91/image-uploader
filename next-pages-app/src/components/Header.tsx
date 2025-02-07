"use client"

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
  Link as ChakraLink,
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { useAppDispatch } from "@/hooks/storeHooks"
import { useAuthUser } from "@/features/auth/login/hooks/useAuthUser"
import { logoutUser } from "@/features/auth/stores/authThunk"

interface NavLinkProps {
  children: React.ReactNode
  href: string
  isActive?: boolean
  onClick?: () => void
}

const NavLink = ({ children, href, isActive, onClick }: NavLinkProps) => {
  return (
    <ChakraLink
      as={NextLink}
      px={2}
      py={1}
      rounded="md"
      href={href}
      bg={isActive ? "blue.50" : "transparent"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      onClick={onClick}
    >
      {children}
    </ChakraLink>
  )
}

export default function Header({
  isAuthenticated,
}: {
  isAuthenticated: boolean
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAuthUser()

  const handleLogout = () => {
    dispatch(logoutUser())
    router.push("/login")
  }

  const AuthenticatedLinks = [
    { name: "Product Images", href: "/product-images" },
    { name: "New Image", href: "/product-images/new" },
  ]

  const UnauthenticatedLinks = [
    { name: "Login", href: "/login" },
    { name: "Get Started", href: "/register" },
  ]

  const activeLinks = isAuthenticated
    ? AuthenticatedLinks
    : UnauthenticatedLinks

  return (
    <>
      <Box bg={useColorModeValue("white", "gray.900")} px={4} boxShadow="sm">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack spacing={8} alignItems="center">
            <ChakraLink
              as={NextLink}
              href="/"
              _hover={{ textDecoration: "none" }}
            >
              <Heading size="md" color="blue.500">
                React - Image uploader
              </Heading>
            </ChakraLink>

            <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
              {activeLinks.map(link => (
                <NavLink
                  key={link.name}
                  href={link.href}
                  isActive={router.pathname === link.href}
                >
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          {isAuthenticated ? (
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
              >
                <Avatar size="sm" name={user.username} bg="blue.500" />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Box display={{ base: "none", md: "block" }}>
              <Button
                as={NextLink}
                href="/register"
                colorScheme="blue"
                size="sm"
                ml={4}
              >
                Get Started
              </Button>
            </Box>
          )}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as="nav" spacing={4}>
              {activeLinks.map(link => (
                <NavLink
                  key={link.name}
                  href={link.href}
                  isActive={router.pathname === link.href}
                  onClick={onClose}
                >
                  {link.name}
                </NavLink>
              ))}
              {!isAuthenticated && (
                <Button
                  as={NextLink}
                  href="/register"
                  w="full"
                  colorScheme="blue"
                  size="sm"
                >
                  Get Started
                </Button>
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}
