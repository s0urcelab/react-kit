/**
 *  @Author  : s0urce <apao@douyu.tv>
 *  @Date    : 2020/7/1
 *  @Declare : playground
 *
 */

import React, {Fragment, useRef, useEffect, useState} from 'react'
import { Select } from '@/reactComponents'
const { Option } = Select

const Playground = () => {
    const P = [
        {
            label: "好啊",
            value: "111"
        },
        {
            label: "给对方",
            value: "222"
        }
    ];

    return (
        <Fragment>
            <h3>Select</h3>
            <Select
                // defaultValue="lucy"
                onSelect={console.log}
                // options={P}
            >
                {/*<Option value="jack">Jack</Option>*/}
                {/*<Option value="lucy">Lucy</Option>*/}
                {/*<Option value="Yiminghe">yiminghe</Option>*/}
                {/*<h3>3213</h3>*/}
            </Select>

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
