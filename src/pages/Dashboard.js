import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import ToolBar from '../components/ToolBar';
import { AppContext } from '../context/AppContext';
import Lottie from 'react-lottie';

import noFile from '../assets/lottie/page-not-found.json';
import spinner from '../assets/lottie/spinner-loading.json';
import connectionError from '../assets/lottie/connectionError.json'
import Table from '../components/Table';
import { NO_FILE } from '../context/constants';
import Toast from '../components/Toast';
import { uploadStates } from '../utils/globalConstants'
import UploadModal from '../components/UploadModal';

const Container = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
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
    border: 1px solid gray;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    background-color: white;
`;

const EmptyTable = styled.div`
    width: 100%;
    text-align: center;
    padding: 25px;
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
            mainErrMsg
        },
        uploadStatus: { state },
        getSetting,
        toast
    } = useContext(AppContext);

    useEffect(() => {
        getFiles();
        getSetting();
    }, []);

    let body;

    if (fileLoading) {
        body = <EmptyTable>
            <Lottie options={{ animationData: spinner }} height={150} />
        </EmptyTable>
    } else {
        body = files.length > 0
            ? <Table />
            : <EmptyTable>
                {mainErrMsg}
                {mainErrMsg === NO_FILE
                    ? <Lottie options={{ animationData: noFile }} height={200} />
                    : <Lottie options={{ animationData: connectionError }} height={200} />
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

            {state !== uploadStates.IDLE && <UploadModal />}

            {toast.show && <Toast
                type={toast.type}
                message={toast.message} />}
        </Container>
    )
}
