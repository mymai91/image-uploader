import { Button, Flex } from "@chakra-ui/react"

import Link from "next/link"

interface Props {}

const UnauthenticatedNav: React.FC<Props> = () => {
  // const router = useRouter

  return (
    <Flex gap="4" align="center">
      <Link href="/login" passHref legacyBehavior>
        <Button as="a" colorScheme="blue">
          Login
        </Button>
      </Link>
      <Link href="/register" passHref legacyBehavior>
        <Button as="a" colorScheme="blue">
          Get Started
        </Button>
      </Link>
    </Flex>
  )
}

export default UnauthenticatedNav
