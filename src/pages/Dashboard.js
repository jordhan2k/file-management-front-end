import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import ToolBar from '../components/ToolBar';
import { AppContext } from '../context/AppContext';
import Lottie from 'react-lottie';
import uploadingFile from '../assets/lottie/uploading-files.json';
import done from '../assets/lottie/done.json';
import noFile from '../assets/lottie/page-not-found.json';
import spinner from '../assets/lottie/spinner-loading.json';
import error from '../assets/lottie/error.json'
import PaginationBar from '../components/PaginationBar';
import Table from '../components/Table';
import { NO_FILE } from '../context/constants';
import bg from '../assets/images/bg.jpg';

const Container = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    /* background: 
    linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${bg})
      center no-repeat;

    background-size: cover; */
    overflow-y: scroll;
`;


const Header = styled.div`
    padding: 10px 20px;

`;

const Title = styled.h1`
    font-size: 30px;
    font-weight: 600;
`;

const Separator = styled.hr`

`;

const Wrapper = styled.div`
    padding-top: 20px;
    margin: auto;
    width: 1000px;
    

`;

const TableContainer = styled.div`
    /* margin: auto;
    width: 1000px; */
    border: 1px solid gray;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    background-color: white;
    
    /* box-sizing: border-box; */
    /* overflow: hidden; */
`;




const EmptyTable = styled.div`
    width: 100%;
    text-align: center;
    padding: 25px;
`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, .2) ;
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
`;
const LoadingToast = styled.div`
    width: 400px;
    height: 250px;
    background-color: white ;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 5px 2px rgba(0,0,0,.1);

`;

const UploadMessage = styled.div`
`;

const Footer = styled.div`
    margin
    width: 1000px;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    padding: 30px;
`;




export default function Dashboard() {

    const {
        getFiles,
        appState: {
            files,
            fileLoading,
            setting,
            mainErrMsg
        },
        progress,
        uploading,
        setUploading,
        showToast,

    } = useContext(AppContext);

    useEffect(() => getFiles(), []);

    let body;

    if (fileLoading) {
        body = <EmptyTable>
            <Lottie options={{ animationData: spinner }} height={150} />
        </EmptyTable>
    } else {
        body = files.length > 0
            ? <Table/>
            : <EmptyTable>
                {mainErrMsg}
                {mainErrMsg === NO_FILE
                    ? <Lottie options={{ animationData: noFile }} height={200} />
                    : <Lottie options={{ animationData: error }} height={200} />
                }
            </EmptyTable>
    }

    return (
        <Container >
            <Header>
                <Title>File Management</Title>
            </Header>
            <Separator />
            <Wrapper>
                <TableContainer>
                    <ToolBar />
                    {body}
                </TableContainer>
               
                <Footer>
                    File management dashboard by Jordan.
                </Footer>
            </Wrapper>

            {showToast && <Modal>
                <LoadingToast>
                    {uploading
                        ? <Lottie options={{ animationData: uploadingFile, }} height={200} />
                        : <Lottie options={{ animationData: done, }} height={200} />}
                    <UploadMessage>
                        {uploading ? `Uploading file ${progress}%` : `File uploaded`}
                    </UploadMessage>

                </LoadingToast>
            </Modal>}
        </Container>
    )
}
