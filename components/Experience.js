import { Text, Heading, GridItem, Image } from "@chakra-ui/react"
import PropTypes from "prop-types"
import { Grid } from "./Grid"
import { assetPath } from "../utils/assetPath"

export const Experience = ({ side, title, desc, stack, image, imageSize = "36px", href, ...props }) => (
  <Grid fluid templateColumns="repeat(4, 1fr)" mb={10} {...props}>
    <GridItem colSpan={{ base: 4, sm: 1 }}>
      <Text color="white" opacity={0.5}>
        {side}
      </Text>
    </GridItem>
    <GridItem colSpan={{ base: 4, sm: 3 }}>
      {image && <Image width={imageSize} mb={4} src={image} alt={title} />}
      <Heading
        as={href ? "a" : "h3"}
        href={href}
        target="_blank"
        rel="noreferrer"
        size="md"
        display="flex"
        alignItems="center"
      >
        {title}
        {href && (
          <Image
            ml={2}
            src={assetPath("/arrow-link.svg")}
            alt={`link to ${title}`}
            transform="translateY(1px)"
          />
        )}
      </Heading>
      {desc && <Text my={2}>{desc}</Text>}
      {stack && (
        <Text color="white" opacity={0.5}>
          {stack}
        </Text>
      )}
    </GridItem>
  </Grid>
)

Experience.propTypes = {
  side: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  desc: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  stack: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  image: PropTypes.string,
  imageSize: PropTypes.string,
  href: PropTypes.string,
}
