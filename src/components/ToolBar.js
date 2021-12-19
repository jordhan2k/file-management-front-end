import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { color, uploadStates, WARNING } from '../utils/globalConstants';
import SettingPanel from './SettingPanel';
import SettingsIcon from '@mui/icons-material/Settings';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../utils/firebase';
import { AppContext } from '../context/AppContext';
import { v4 as uuidv4 } from 'uuid';
import { convertMBToB } from '../utils/formatters';

const Container = styled.div`
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: ${color.primaryGray};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    position: relative;

`;

export const Button = styled.button`
    font-size: 16px;
    background-color: ${props => props.bg};
    border: 1px solid gray;
    padding: 7px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.txc && props.txc};
`;

const Form = styled.form`
    display: flex; 
    align-items: center;
`;

const Input = styled.input`
    &[type=file]::file-selector-button {
     font-family: 'Poppins', sans-serif;
     color: #3A3B59;
}
`;

export default function ToolBar() {

    const [selectedFile, setSelectedFile] = useState();

    const {
        appState: { setting },
        setUploadStatus,
        saveFile,
        setToast,
        showSetting,
        setShowSetting
    } = useContext(AppContext);


    const toggleShowSetting = () => {
        if (!setting) {
            setToast({
                show: true,
                message: "Cannot connect to server",
                type: WARNING
            })
        } else {
            setShowSetting(!showSetting);
        }
    }


    const onChooseFile = (event) => {
        setSelectedFile(event.target.files[0]);
    };


    const uploadFileToCloud = async (event) => {
        event.preventDefault();

        if (!setting) {
            setToast({
                show: true,
                message: "It seems that you are disconnected!",
                type: WARNING
            });
            return;
        }

        if (selectedFile && selectedFile.size <= convertMBToB(setting.maxFileSize)) {

            setUploadStatus(prevState => ({
                ...prevState,
                state: uploadStates.UPLOADING
            }));
            const storageRef = ref(storage, `files/${uuidv4()}-${selectedFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, selectedFile);


            const taskProgress = snapshot => {
                const prog = Math.round(
                    snapshot.bytesTransferred / snapshot.totalBytes * 100
                );
                setUploadStatus(prevState => ({
                    ...prevState,
                    progress: prog
                }));
            }

            const taskError = error => {
                setUploadStatus(prevState => ({
                    ...prevState,
                    state: uploadStates.FAIL
                }));
            }

            const taskComplete = () => {
                getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                    setSelectedFile(null);
                    const file = {
                        name: selectedFile.name,
                        fileSize: selectedFile.size,
                        mime: selectedFile.type,
                        path: downloadURL
                    }
                    saveFile(file);
                    document.getElementsByName("file")[0].value = "";
                });
            }

            uploadTask.on(
                "state_changed",
                taskProgress,
                taskError,
                taskComplete
            );
        } else if (selectedFile && selectedFile.size > convertMBToB(setting.maxFileSize)) {
            console.log(setting.maxFileSize);
            console.log(convertMBToB(setting.maxFileSize));
            console.log(selectedFile.size);
            setToast({
                show: true,
                message: "Exceed max file size!",
                type: WARNING
            })
        }
    }



    return (
        <Container>
            <Button
                bg="white"
                onClick={() => toggleShowSetting()}  >
                Settings
                <SettingsIcon style={{ fontSize: 16, marginLeft: 5 }} />
            </Button>
            <Form
                onSubmit={uploadFileToCloud}>
                <Input
                    type="file"
                    name="file"
                    accept={setting?.mimeTypeAllowed || ""}
                    onChange={onChooseFile}
                />
                <Button
                    type="submit"
                    bg={color.primaryBlue}
                    txc="white">Upload</Button>
            </Form>
            {showSetting && <SettingPanel setShowSetting={setShowSetting} />}
        </Container>
    )
}
