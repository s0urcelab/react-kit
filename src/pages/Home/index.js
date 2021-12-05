import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Center,
  HStack,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons'
import { ColorModeSwitcher } from '@/components/ColorModeSwitcher';
import { videoSiteList, shoppingSiteList } from '@/config'

import './index.scss'

function Home() {
  const [userInput, setInput] = useState('')

  const onSearch = (e) => {
    if (e.key === 'Enter') {
      window.open(`https://www.baidu.com/s?ie=UTF-8&wd=${userInput.trim()}`, '_blank')
    }
  }

  return (
    <Box textAlign="center" fontSize="xl">
      <SimpleGrid templateRows="10%">
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Text fontSize="5xl" fontWeight="bold" color="gray.600" className="main-title">导航</Text>
          <InputGroup width="40%" variant="filled">
            <InputLeftElement
              height="100%"
              pointerEvents="none"
              children={<Search2Icon w={6} h={6} color="gray.300" />}
            />
            <Input
              type="text"
              size="lg"
              placeholder="输入想要搜索的内容..."
              onKeyPress={onSearch}
              value={userInput}
              onChange={e => setInput(e.target.value)}
            />
            <InputRightElement children={<Text fontSize="2xl" color="gray.300">↵</Text>} />
          </InputGroup>
          <HStack>
            {
              videoSiteList.map((site, idx) => (
                <Box
                  bg="gray.100"
                  className="site-item"
                  key={idx}
                  borderWidth="1px"
                  borderRadius="lg"
                >
                  {/* <div className="site-item-bg">{site.title}</div> */}
                  <a href={site.url} target="_blank" >
                    <Center h="100%">
                      <img className="site-logo" alt="" src={site.logo} />
                    </Center>
                  </a>
                </Box>
              ))
            }
          </HStack>
          <HStack>
            {
              shoppingSiteList.map((site, idx) => (
                <Box
                  bg="gray.100"
                  className="site-item"
                  key={idx}
                  borderWidth="1px"
                  borderRadius="lg"
                >
                  {/* <div className="site-item-bg">{site.title}</div> */}
                  <a href={site.url} target="_blank" >
                    <Center h="100%">
                      <img className="site-logo" alt="" src={site.logo} />
                    </Center>
                  </a>
                </Box>
              ))
            }
          </HStack>
        </VStack>
      </SimpleGrid>
    </Box>
  );
}

export default Home;
