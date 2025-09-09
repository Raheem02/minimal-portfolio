import { Box, Image, Flex } from "@chakra-ui/react"
import { keyframes } from "@emotion/react"
import { useEffect, useState } from "react"
import { assetPath } from "../utils/assetPath"

export const Avatar = () => {
  const spin = keyframes`
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg)}
  `
  const [hasMounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!hasMounted) return false

  return (
    <Box
      transition="0.25s cubic-bezier(0.68, -0.6, 0.32, 1.6)"
      _hover={{
        transform: "scale(1.03)",
      }}
    >
      <Flex alignItems="center" justifyContent="center" position="relative">
        <Flex
          alignItems="center"
          justifyContent="center"
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          animation={`${spin} infinite 2.5s paused linear`}
          _hover={{
            animationPlayState: "running",
          }}
        >
          <Image
            maxWidth="none"
            position="absolute"
            width={{ base: "full", lg: "135%" }}
            src={assetPath("/blurs.png")}
            role="presentation"
            animation={`${spin} infinite 5s linear`}
          />
        </Flex>
        <Image
          borderRadius="full"
          width={{ base: "80%", lg: "full" }}
          src={assetPath("/profile.png")}
          alt="Bonhomme"
        />
      </Flex>
    </Box>
  )
}
