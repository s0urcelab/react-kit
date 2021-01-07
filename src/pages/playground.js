/**
 *  @Author  : s0urce <apao@douyu.tv>
 *  @Date    : 2020/7/1
 *  @Declare : playground
 *
 */

import React, {Fragment, useRef, useEffect, useState} from 'react'

// import moment from 'moment'
//
// import { Button, Table, Checkbox, DatePicker, Select, Modal, Loading, Input, InputNum, Tooltip } from '@/reactComponents'
//
// import Trigger from '../reactComponents/Modal/trigger';
//
// const { Option } = Select
//
// const columns = [
//     {
//         title: 'Name',
//         dataIndex: 'name',
//         sorter: true,
//     },
//     {
//         title: 'Age',
//         dataIndex: 'age'
//     },
//     {
//         title: 'Address',
//         dataIndex: 'address'
//     }
// ]
//
// const data1 = []
// for (let i = 0; i < 5; i++) {
//     data1.push({
//         key: i,
//         name: `AAAAA ${i}`,
//         age: 32,
//         address: `London, Park Lane no. ${i}`
//     })
// }
//
// const data2 = []
// for (let i = 0; i < 5; i++) {
//     data2.push({
//         key: i,
//         name: `BBBBBB ${i}`,
//         age: 32,
//         address: `London, Park Lane no. ${i}`
//     })
// }
//
//
// class AAA extends React.Component {
//     static defaultProps = {
//         ppp: {},
//     }
//     constructor(props) {
//         super(props);
//         console.log(props.ppp)
//     }
//     render() {
//         return (
//             <div>{this.props.ppp}</div>
//         )
//     }
// }


const Playground = (props) => {
    // const [modal, showModal] = useState(false)
    // const [modal2, showModal2] = useState(false)
    //
    // const [selectedRowKeys, select] = useState([])
    // const [page, setPage] = useState(1)
    // const [checked, setCheck] = useState(false)
    // const [num, setNum] = useState(123)
    //
    // const onSelectChange = selectedRowKeys => {
    //     console.log('selectedRowKeys changed: ', selectedRowKeys)
    //     select(selectedRowKeys)
    // }
    //
    // const start = () => {
    //     select([...selectedRowKeys, 'AAAAA 2'])
    // }
    //
    // const hasSelected = selectedRowKeys.length > 0
    //
    // const onchange = (val) => {
    //     setNum(val)
    //     console.log('number', val)
    // }
    //
    // const [date, setDate] = useState('2020-06-01')

    return (
        <Fragment>
            {/*<h3>fully controlled</h3>*/}
            {/*<DatePicker*/}
            {/*    // picker="month"*/}
            {/*    value={date ? moment(date) : date}*/}
            {/*    // disabledDate={disabledDate}*/}
            {/*    onChange={(date, str) => {*/}
            {/*        console.log('onchange', str)*/}
            {/*        setDate(str)*/}
            {/*    }}*/}
            {/*/>*/}



            {/*<Tooltip title="prompt text" placement="bottom">*/}
            {/*    <p>fsdfsdf: <input /></p>*/}
            {/*</Tooltip>*/}


            {/*<Trigger*/}
            {/*    action={['click']}*/}
            {/*    popup={<span>popup</span>}*/}
            {/*    popupAlign={{*/}
            {/*        points: ['tl', 'bl'],*/}
            {/*        offset: [0, 3]*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <a href='#'>hover</a>*/}
            {/*</Trigger>*/}



            {/*<Button*/}
            {/*    onClick={() =>　showModal(true)}*/}
            {/*>*/}
            {/*    弹窗*/}
            {/*</Button>*/}
            {/*<Modal*/}
            {/*    visible={modal}*/}
            {/*    onCancel={() => showModal(false)}*/}
            {/*>*/}
            {/*    <Button*/}
            {/*        onClick={() =>　showModal2(true)}*/}
            {/*    >*/}
            {/*        再来一个*/}
            {/*    </Button>*/}
            {/*    <Modal*/}
            {/*        visible={modal2}*/}
            {/*        onCancel={() => showModal2(false)}*/}
            {/*    >*/}
            {/*        <p>弹窗23222222222</p>*/}
            {/*        <DatePicker*/}
            {/*            // picker="month"*/}
            {/*            value={moment('2020-06-01')}*/}
            {/*            // disabledDate={disabledDate}*/}
            {/*            onChange={(date, str) => console.log('%c controlled change:', 'color: red', date, str)}*/}
            {/*        />*/}
            {/*        <img alt="" width="50" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=197605495,1763507074&fm=26&gp=0.jpg" />*/}
            {/*    </Modal>*/}
            {/*    <h3>fdsfds</h3>*/}
            {/*    <img alt="" height="800" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=197605495,1763507074&fm=26&gp=0.jpg" />*/}
            {/*    <DatePicker*/}
            {/*        onChange={console.log}*/}
            {/*    />*/}
            {/*</Modal>*/}


            {/*<Select defaultValue="lucy" onSelect={console.log}>*/}
            {/*    <Option value="jack">Jack</Option>*/}
            {/*    <Option value="lucy">Lucy</Option>*/}
            {/*    <Option value="Yiminghe">yiminghe</Option>*/}
            {/*</Select>*/}


            {/*<h3>fully uncontrolled</h3>*/}
            {/*<DatePicker*/}
            {/*    // picker="month"*/}
            {/*    // defaultValue={moment('2020-05-08')}*/}
            {/*    // disabledDate={disabledDate}*/}
            {/*    onChange={(date, str) => console.log('%c uncontrolled change:', 'color: red', date, str)}*/}
            {/*/>*/}

            {/*<DatePicker*/}
            {/*    // format={'YYYY/MM/DD'}*/}
            {/*    // defaultValue={moment('2020-05-22')}*/}
            {/*    // value={moment('2018-02-13')}*/}
            {/*    // disabledDate={disabledDate}*/}
            {/*    onChange={(date, str) => console.log('date change:', date, str)}*/}
            {/*    // disabledTime={disabledRangeTime}*/}
            {/*    // showTime={{*/}
            {/*    //   hideDisabledOptions: true,*/}
            {/*    //   defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],*/}
            {/*    // }}*/}
            {/*/>*/}
            {/*<TimePicker*/}
            {/*  // format={'YYYY/MM/DD'}*/}
            {/*  // defaultValue={moment('13:10:09', 'HH:mm:ss')}*/}
            {/*  value={moment('13:10:09', 'HH:mm:ss')}*/}
            {/*  // disabledDate={disabledDate}*/}
            {/*  onChange={(date, str) => console.log('time change:', date, str)}*/}
            {/*  // disabledTime={disabledRangeTime}*/}
            {/*  // showTime={{*/}
            {/*  //   hideDisabledOptions: true,*/}
            {/*  //   defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],*/}
            {/*  // }}*/}
            {/*/>*/}

            {/*<div style={{ marginBottom: 16 }}>*/}
            {/*    <Button onClick={start} disabled>*/}
            {/*        合并填写发票*/}
            {/*    </Button>*/}
            {/*    <Checkbox checked={checked} onClick={() => setCheck(!checked)}>你觉得呢</Checkbox>*/}
            {/*</div>*/}

            {/*<Table*/}
            {/*    rowKey="name"*/}
            {/*    pagination={{*/}
            {/*        total: 10,*/}
            {/*        pageSize: 5,*/}
            {/*        onChange: page => setPage(page)*/}
            {/*    }}*/}
            {/*    // expandable={{*/}
            {/*    //   expandedRowRender: record => <p style={{ margin: 0 }}>{record.name}</p>,*/}
            {/*    //   rowExpandable: record => record.name !== 'AAAAA 2',*/}
            {/*    // }}*/}
            {/*    rowSelection={{*/}
            {/*        // selectedRowKeys,*/}
            {/*        onChange: onSelectChange,*/}
            {/*        // onSelect: console.log,*/}
            {/*        // onSelectAll: console.log,*/}
            {/*        getCheckboxProps: record => ({*/}
            {/*            disabled: record.name === 'AA55 2',*/}
            {/*            // Column configuration not to be checked*/}
            {/*        }),*/}
            {/*    }}*/}
            {/*    columns={columns}*/}
            {/*    dataSource={page === 1 ? data1 : data2}*/}
            {/*/>*/}
        </Fragment>
    )
}

export default Playground
