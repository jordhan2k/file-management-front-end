import React, { useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../context/AppContext';
import { formatSize, formatDateTime } from '../utils/formatters';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import axios from 'axios';

const Row = styled.tr` 
`;

const Cell = styled.td`
    font-weight: 400;
    font-size: 14px;
    width: ${props => props.w};
    border: 1px solid gray;
    padding: 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const Link = styled.a`
    text-decoration: none;
    color: blue;
`;

const IconContainer = styled.span`
    border: none;
    background-color:  "white";
    display: inline-block;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    margin: 0 5px;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
        box-shadow: 0 0 4px 1px rgba(0, 0 ,0 , .2);
    }
`;

function TableRow({ groupSize, groupIndex, fileIndex, file }) {

    const { deleteFile, downloadFile } = useContext(AppContext);
    const onDelete = async file => {
        if (window.confirm("Do you want to delete this file?")) {
            console.log(file);
            await deleteFile(file);
        }
    }
    const onDownload = file => {
        console.log(file.path);
        axios({
            url: file.path,
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.name); //or any other extension
            document.body.appendChild(link);
            link.click();

            downloadFile(file.id);
        });
    }
    return (
        <Row key={file.id}>
            {fileIndex == 0 && (<>
                <Cell w="7%" rowSpan={groupSize}>{groupIndex + 1}</Cell>
                <Cell w="40%" rowSpan={groupSize} title={file.name}>{file.name}</Cell></>
            )}
            <Cell w="7%">
                <Link href={file.path} target="_blank">
                    {file.version}
                </Link>
            </Cell>
            <Cell w="10%">{formatSize(file.fileSize)}</Cell>
            <Cell w="15%">{formatDateTime(file.createdDateTime)}</Cell>
            <Cell w="10%">{file.numberOfDownload}</Cell>
            <Cell w="10%" >
                <IconContainer onClick={() => onDownload(file)}  >
                    <FileDownloadOutlinedIcon style={{ margin: "auto", fontSize: 20, verticalAlign: "middle" }} />
                </IconContainer>
                <IconContainer type="delete" onClick={() => onDelete(file)}>
                    <DeleteForeverRoundedIcon
                        style={{ margin: "auto", fontSize: 20, verticalAlign: "middle", color: "white" }} />
                </IconContainer>
            </Cell>
        </Row>
    )
}

export default TableRow
