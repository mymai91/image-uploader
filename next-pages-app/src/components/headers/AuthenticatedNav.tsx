import { useAuthUser } from "@/features/auth/login/hooks/useAuthUser"
import { logoutUser } from "@/features/auth/stores/authThunk"
import { useAppDispatch } from "@/hooks/storeHooks"
import {
  Button,
  VStack,
  Box,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Spacer,
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"

const AuthenticatedNav = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAuthUser()

  const handleLogout = () => {
    dispatch(logoutUser())
    router.push("/login")
  }

  return (
    <>
      {/* Desktop Navigation */}
      <Flex display={{ base: "none", md: "flex" }} align="center" gap={4}>
        <Button as={Link} href="/product-images" variant="ghost" fontSize="md">
          Product Images
        </Button>
        <Button
          as={Link}
          href="/product-images/new"
          variant="ghost"
          fontSize="md"
        >
          New Image
        </Button>
        <Spacer />

        <Menu>
          <MenuButton
            as={Button}
            variant="ghost"
            fontSize="md"
            py="4"
            textAlign="left"
          >
            {user?.username}
          </MenuButton>
          <MenuList>
            <MenuItem
              as={Button}
              onClick={handleLogout}
              variant="ghost"
              fontSize="md"
              color="red.500"
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Mobile Navigation (Drawer) */}
      <Box display={{ base: "block", md: "none" }} width="full">
        <VStack align="stretch" width="full" spacing={2}>
          <Divider />
          <Button
            as={Link}
            href="/product-images"
            variant="ghost"
            justifyContent="start"
            fontSize="md"
            py="6"
          >
            Product Images
          </Button>
          <Button
            as={Link}
            href="/product-images/new"
            variant="ghost"
            justifyContent="start"
            fontSize="md"
            py="6"
          >
            New Image
          </Button>
          <Divider />
          <Button
            as={Link}
            href="/account"
            variant="ghost"
            justifyContent="start"
            fontSize="md"
            py="6"
          >
            {user?.username}
          </Button>
          <Button
            onClick={handleLogout}
            variant="ghost"
            justifyContent="start"
            fontSize="md"
            py="6"
            color="red.500"
          >
            Logout
          </Button>
        </VStack>
      </Box>
    </>
  )
}

export default AuthenticatedNav
