import { Button, Center, HStack, Text } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

const Paginator = () => {
  return (
    <HStack>
        <Button><ChevronLeftIcon /></Button>
        <Text>1</Text>
        <Text>2</Text>
        <Text>3</Text>
        <Text>4</Text>
        <Text>5</Text>
        <Text>6</Text>
        <Text>7</Text>
        <Button><ChevronRightIcon /></Button>
    </HStack>
  )
}

export default Paginator