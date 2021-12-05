import React, { useState } from 'react';
import {
  Text,
  SimpleGrid,
  Tag,
  TagLeftIcon,
  TagLabel,
  VStack,
} from '@chakra-ui/react';
import { BsCpuFill } from 'react-icons/bs';

import './index.scss'

function Secret() {
  // const { isOpen, onOpen, onClose } = useDisclosure()

  // const handleClick = (newSize) => {
  //   setSize(newSize)
  //   onOpen()
  // }

  return (
    <SimpleGrid minH="100vh" templateRows="24%">
      <VStack>
        <Text fontSize="4xl" >硬件状态</Text>
        <Tag size="lg" variant='subtle' colorScheme='green'>
          <TagLeftIcon boxSize='20px' as={BsCpuFill} />
          <TagLabel>20 ℃</TagLabel>
        </Tag>
      </VStack>
    </SimpleGrid>
  );
}

export default Secret;
