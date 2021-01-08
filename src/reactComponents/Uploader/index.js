/**
 *  @Author  : s0urce <apao@douyu.tv>
 *  @Date    : 2020/11/16
 *  @Declare : Uploader 上传组件
 *
 */
/* eslint-disable */

import React, { Component, Fragment } from 'react';
import { nanoid } from 'nanoid';
import SVG from './SVG';

import './index.scss';

const DEFAULT_UPLOAD_BTN = (
    <div className="default-upload-btn">
        <p>+</p>
        <p>上传</p>
    </div>
)

class Uploader extends Component {
    static defaultProps = {
        className: '',
        defaultFileList: [],
        action: '/v1/storage/uploadFile',
        onChange: () => {},
        name: 'file',
        method: 'POST',
        accept: '',
        onPreview: () => {},
        beforeUpload: () => true,
        children: DEFAULT_UPLOAD_BTN,
    }

    constructor(props) {
        super(props);
        this.state = {
            fileList: props.defaultFileList,
        };
        this.uploadInput = null
    }

    _isControlled = () => {
        return this.props.hasOwnProperty('fileList')
    }

    triggerInput = () => {
        if (this.uploadInput) {
            this.uploadInput.click()
        }
    }

    clearInput = () => {
        if (this.uploadInput) {
            this.uploadInput.value = ''
        }
    }

    uploadFile = ({ fileObject, onProgress }) => new Promise((resolve, reject) => {
        const { action, name, method, customRequest } = this.props
        // 自定义请求方法
        if (customRequest && typeof customRequest === 'function') {
            customRequest({
                onProgress,
                onError: reject,
                onSuccess: resolve,
                action,
                file: fileObject,
            })
            return;
        }

        const xhr = new XMLHttpRequest();
        const fd = new FormData();
        fd.append(name, fileObject);
        xhr.open(method, action, true);

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percent = (event.loaded / event.total) * 100;
                onProgress(percent)
            }
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                const { code, data, msg } = JSON.parse(xhr.responseText);
                if (code !== 0) {
                    reject(msg)
                }
                resolve(data)
            }
            reject('网络错误')
        }

        xhr.send(fd);
    })

    _add = (file) => {
        const { fileList } = this.state;
        const { onChange } = this.props;

        onChange({
            file,
            fileList: [...fileList, file],
        })
        this.setState(({ fileList }) => ({
            fileList: [...fileList, file],
        }))
    }
    _update = (file) => {
        const { fileList } = this.state;
        const { onChange } = this.props;

        const update = fl => fl.map(f => {
            if (f.uid === file.uid) {
                return {
                    ...f,
                    ...file,
                }
            }
            return f
        })
        onChange({
            file: update(fileList).find(v => v.uid === file.uid),
            fileList: update(fileList),
        })
        this.setState(({ fileList }) => ({
            fileList: update(fileList)
        }))
    }
    _remove = (file) => {
        const { fileList } = this.state;
        const { onChange } = this.props;

        onChange({
            file,
            fileList: fileList.filter(f => f.uid !== file.uid),
        })
        this.setState(({ fileList }) => ({
            fileList: fileList.filter(f => f.uid !== file.uid),
        }))
    }

    _uploaderOnChange = (event) => {
        const fileObject = event.target.files[0];
        this.clearInput()

        // 暂时处理成只拦截不插入fileList
        if (!this.props.beforeUpload(fileObject)) return;

        const { name = '', size = 0, type = '' } = fileObject;
        const uid = nanoid()
        const isImage = !!~type.indexOf('image/');
        const newFile = {
            uid,    // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
            name,   // 文件名
            size,
            type,
            status: 'uploading', // 状态有：uploading done error removed，被 beforeUpload 拦截的文件没有 status 属性
            thumbUrl: isImage ? URL.createObjectURL(fileObject) : '',
            response: null, // 服务端响应内容
            originFileObj: fileObject,
        }
        this._add(newFile)

        const uploadConfig = {
            fileObject,
            onProgress: (percent) => {
                this._update({
                    uid,
                    percent,
                })
            }
        }
        this.uploadFile(uploadConfig)
            .then(response => {
                this._update({
                    uid,
                    status: 'done',
                    response,
                })
            })
            .catch(msg => {
                this._update({
                    uid,
                    status: 'error',
                })
                // TODO: 替换成msg
                console.error(`${msg}，上传失败`)
            })
    };

    _defaultItemRender = (file) => {
        const { onPreview } = this.props
        const { uid, type, name, thumbUrl, percent, status } = file
        const isImage = !!type && ~type.indexOf('image/');
        const isAudio = !!type && ~type.indexOf('audio/');
        const isVideo = !!type && ~type.indexOf('video/');
        return (
            <div
                key={uid}
                className="r-uploader-file-item"
            >
                <div
                    className={`thumb-item ${status}`}
                    style={{...(status !== 'error') && { backgroundImage: `url(${thumbUrl})` }}}
                >
                    {
                        status === 'uploading' && (
                            <div className="shadow">
                                <div className="progress">
                                    <div className="highlight" style={{ width: `${percent}%` }} />
                                </div>
                            </div>
                        )
                    }
                    {
                        status === 'done' && (
                            <Fragment>
                                {
                                    !isImage && (
                                        <div className="content-wrap done">
                                            <i className="file-icon">
                                                {isAudio ? SVG.audio : isVideo ? SVG.video : SVG.unknown}
                                            </i>
                                            <p className="file-name" title={name}>{name}</p>
                                        </div>
                                    )
                                }
                                <div className="preview-mask" onClick={() => onPreview(file)}>
                                    <i className="icon">
                                        {SVG.eye}
                                    </i>
                                </div>
                            </Fragment>
                        )
                    }
                    {
                        status === 'error' && (
                            <div className="content-wrap error">
                                <i className="file-icon">
                                    {isImage ? SVG.image : isAudio ? SVG.audio : isVideo ? SVG.video : SVG.unknown}
                                </i>
                                <p className="file-name" title={name}>{name}</p>
                            </div>
                        )
                    }
                    <i className="close-btn" onClick={() => this._remove(file)}>
                        {SVG.close}
                    </i>
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        const { fileList } = this.state
        fileList.forEach((file) => {
            if (file.thumbUrl) {
                URL.revokeObjectURL(file.thumbUrl)
            }
        })
    }

    render() {
        const {
            className,
            fileList: pFileList,
            accept,
            itemRender,
        } = this.props;
        const {
            fileList: sFileList,
        } = this.state;
        const fileList = this._isControlled() ? pFileList : sFileList

        return (
            <div className={`r-uploader ${className}`}>
                <div className="r-uploader-file-list">
                    {
                        fileList.map(file => {
                            const itemNode = this._defaultItemRender(file)
                            return itemRender ? itemRender(itemNode, file, fileList) : itemNode
                        })
                    }
                    <input
                        type="file"
                        name="r-file-input"
                        className="r-uploader-input"
                        accept={accept}
                        onChange={this._uploaderOnChange}
                        ref={ref => this.uploadInput = ref}
                    />
                    <div
                        className="r-uploader-file-item input-trigger"
                        onClick={this.triggerInput}
                    >
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}

export default Uploader;
