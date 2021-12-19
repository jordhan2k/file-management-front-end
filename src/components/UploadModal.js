import React, { useContext } from 'react'
import Lottie from 'react-lottie';
import styled from 'styled-components';
import uploadingFile from '../assets/lottie/uploading-files.json';
import done from '../assets/lottie/done.json';
import uploadingError from '../assets/lottie/upload-error.json';
import { AppContext } from '../context/AppContext';
import { uploadStates } from '../utils/globalConstants';

const Container = styled.div`
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

const UploadModal = () => {
    const {
        uploadStatus : {state, progress},
    } = useContext(AppContext);


    let progressLottie;
    let uploadMessage;
    if (state === uploadStates.UPLOADING) {
        progressLottie = <Lottie options={{ animationData: uploadingFile }} height={200} />
        uploadMessage = `Uploading file ${progress === 100 ? 99 : progress}%`;
    }
    if (state  === uploadStates.SUCCESS) {
        progressLottie = <Lottie options={{ animationData: done }} height={200} />
        uploadMessage = `File uploaded`
    }
    if (state  === uploadStates.FAIL) {
        progressLottie = <Lottie options={{ animationData: uploadingError }} height={200} />
        uploadMessage = `Oops! Fail to save your file!`
    }


    return (
        <Container>
            <LoadingToast>
                {progressLottie}
                <UploadMessage>
                    {uploadMessage}
                </UploadMessage>
            </LoadingToast>
        </Container>
    )
}

export default UploadModal
