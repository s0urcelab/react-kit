import React, { useState, useEffect, useRef } from 'react';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Image,
    SimpleGrid,
    Tag,
    Divider,
    TagLabel,
    IconButton,
} from '@chakra-ui/react';
import { FaTemperatureHigh } from 'react-icons/fa';

import './index.scss'

const ICON_MAP = {
    ssd: 'hdd',
    hdd1: 'hdd',
    hdd2: 'hdd',
    cpu_fan: 'fan',
    hdd_fan: 'fan',
    cpu_load: 'load',
}
const TRANS_CN = {
    mainboard: '主板',
    cpu: 'CPU',
    ssd: '固态硬盘',
    hdd1: '机械硬盘1',
    hdd2: '机械硬盘2',
    cpu_fan: 'CPU风扇',
    hdd_fan: '硬盘风扇',
    cpu_load: 'CPU负载',
}
const DATA_PATH = {
    mainboard: 'Children:0.Children:0.Children:0.Children:1.Children:2',
    cpu: 'Children:0.Children:1.Children:3.Children:0',
    ssd: 'Children:0.Children:5.Children:0.Children:0',
    hdd1: 'Children:0.Children:6.Children:0.Children:0',
    hdd2: 'Children:0.Children:4.Children:0.Children:0',
    cpu_fan: 'Children:0.Children:0.Children:0.Children:2.Children:1',
    hdd_fan: 'Children:0.Children:0.Children:0.Children:2.Children:0',
    cpu_load: 'Children:0.Children:1.Children:4.Children:0',
}

const getIcon = key => `//${HTPC_DOMAIN}/hwstatus/images/${ICON_MAP[key] || key}.png`

const parseData = (data = {}) => {
    const read = (d, path) => {
        return path.split('.')
            .reduce((acc, curr) => {
                const [key, idx] = curr.split(':')
                return idx ? acc[key][idx] : acc[key]
            }, d)
    }

    return Object.keys(DATA_PATH).map(key => {
        const { Value, Type } = read(data, DATA_PATH[key])
        const [num, unit] = Value.split(' ')
        return {
            key,
            type: Type,
            name: TRANS_CN[key],
            value: num,
            unit: unit,
        }
    })
}

const isTooHigh = temp => +temp > 80

function StatusItem({ data, color }) {
    return (
        <Tag size="lg" variant='subtle' colorScheme={color}>
            <Image marginRight={1} src={getIcon(data.key)} />
            <span className="tag-title">{data.name}</span>
            <TagLabel>{`${data.value} ${data.unit}`}</TagLabel>
        </Tag>
    )
}

function Sider() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const [data, setData] = useState([])

    const fetchData = () => {
        fetch(`//${HTPC_DOMAIN}/hwstatus/data`, { mode: 'cors' })
            .then(res => res.json())
            .then(parseData)
            .then(setData)
    }

    useEffect(() => {
        if (isOpen) {
            fetchData()
            const tid = setInterval(fetchData, 3000)
            return () => clearInterval(tid)
        }
    }, [isOpen])

    const tempGroup = data.filter(v => v.type === 'Temperature')
    const fanGroup = data.filter(v => v.type === 'Fan')
    const loadGroup = data.filter(v => v.type === 'Load')

    return (
        <>
            <IconButton
                size="md"
                fontSize="lg"
                variant="ghost"
                color="current"
                onClick={onOpen}
                icon={<FaTemperatureHigh />}
                ref={btnRef}
                justifySelf="flex-end"
            />

            <Drawer
                size="sm"
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>硬件实时状态</DrawerHeader>

                    <DrawerBody>
                        <SimpleGrid columns={2} spacing={2}>
                            {
                                tempGroup.map(item => (
                                    <StatusItem
                                        key={item.key}
                                        data={item}
                                        color={isTooHigh(item.value) ? 'red' : 'green'}
                                    />
                                ))
                            }
                        </SimpleGrid>
                        <Divider marginTop={4} marginBottom={4} />
                        <SimpleGrid columns={2} spacing={2}>
                            {
                                fanGroup.map(item => (
                                    <StatusItem
                                        key={item.key}
                                        data={item}
                                        color="blue"
                                    />
                                ))
                            }
                        </SimpleGrid>
                        <Divider marginTop={4} marginBottom={4} />
                        <SimpleGrid columns={2} spacing={2}>
                            {
                                loadGroup.map(item => (
                                    <StatusItem
                                        key={item.key}
                                        data={item}
                                        color="gray"
                                    />
                                ))
                            }
                        </SimpleGrid>

                    </DrawerBody>


                </DrawerContent>
            </Drawer>
        </>
    );
}

export default Sider;
