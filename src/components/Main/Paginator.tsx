import { Button, Center, HStack, Text } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

const Paginator = () => {
  return (
    <HStack>
        <Button><ChevronLeftIcon /></Button>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>4</Button>
        <Button>5</Button>
        <Button>6</Button>
        <Button>7</Button>
        <Button><ChevronRightIcon /></Button>
    </HStack>
  )
}

export default Paginator