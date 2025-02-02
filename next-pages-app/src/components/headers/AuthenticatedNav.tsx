import { useAuthUser } from "@/features/login/hooks/useAuthUser"
import { logoutUser } from "@/features/login/stores/authThunk"
import { useAppDispatch } from "@/hooks/storeHooks"
import {
  Text,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"

const AuthenticatedNav = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  // const { user } = useAppSelector(state => state.auth)

  const user = useAuthUser()

  const handleLogout = () => {
    // dispatch(logout())
    dispatch(logoutUser())
    router.push("/login")
  }

  return (
    <Flex gap="4" align="center">
      <Link href="/product-images" passHref legacyBehavior>
        <Button
          as="a"
          variant={router.pathname === "/product-images" ? "solid" : "ghost"}
          colorScheme="blue"
        >
          Product Images
        </Button>
      </Link>

      <Link href="/product-images/new" passHref legacyBehavior>
        <Button
          as="a"
          variant={
            router.pathname === "/product-images/new" ? "solid" : "ghost"
          }
          colorScheme="blue"
        >
          New Image
        </Button>
      </Link>

      <Menu>
        <MenuButton>
          {/* <Avatar size="sm" name="User" bg="blue.500" /> */}
          <Text color={"blackAlpha.900"}>{user.username}</Text>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}

export default AuthenticatedNav
