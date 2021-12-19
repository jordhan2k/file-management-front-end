import axios from "axios";
import React, { createContext, useReducer, useState, useEffect } from "react";
import { fileReducer } from "../reducers/fileReducer";
import { fileApiUrl, FILES_LOAD_FAIL, FILES_LOAD_SUCCESS, FILE_DELETE_SUCCESS, FILE_DOWNLOAD_SUCCESS, FILE_SAVE_SUCCESS, settingApiUrl, SETTING_LOADED } from "./constants";
import {ERROR, SUCCESS, uploadStates}  from '../utils/globalConstants';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    const [uploadStatus, setUploadStatus] = useState({
        state: uploadStates.IDLE,
        progress: 0
    });
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: ""
    });

    const [showSetting, setShowSetting] = useState(false);


    useEffect(() => {
        if (toast.show) {
            setTimeout(() => {
                setToast({
                    show: false,
                    message: "",
                    type: ""
                });
            }, 4000);
        }
    }, [toast])

    const [appState, dispatch] = useReducer(fileReducer, {
        files: [],
        fileLoading: true,
        setting: null,
        mainErrMsg: ""
    });

    const getFiles = async () => {
        try {
            const response = await axios.get(`${fileApiUrl}`);
            if (response.status === 200) {
                dispatch({
                    type: FILES_LOAD_SUCCESS,
                    payload: response.data
                });
            }
        } catch (error) {
            dispatch({
                type: FILES_LOAD_FAIL,
                payload: "Cannot connect to server"
            });
        }
    }

    const saveFile = async file => {
        try {
            const response = await axios.post(`${fileApiUrl}`, file);
            if (response.data) {
                dispatch({
                    type: FILE_SAVE_SUCCESS,
                    payload: response.data,
                });
                setUploadStatus({
                    state: uploadStates.SUCCESS,
                    progress: 0
                });
                setTimeout(() => {
                    setUploadStatus(prevState => ({
                        ...prevState,
                        state: uploadStates.IDLE
                    }));
                }, 1200);
            }
        } catch (error) {
            console.log(error.message ? error.message : error);
            
            setUploadStatus({
                state: uploadStates.FAIL,
                progress: 0
            });
            setTimeout(() => {
                setUploadStatus(prevState => ({
                    ...prevState,
                    state: uploadStates.IDLE
                }));
            }, 2000);
        }

    }

    const downloadFile = async fileId => {
        console.log("Updating download count for id: ", fileId);
        try {
            const response = await axios.get(`${fileApiUrl}/download/${fileId}`);
            if (response.data) {
                console.log(response.data);
                dispatch({
                    type: FILE_DOWNLOAD_SUCCESS,
                    payload: response.data
                });
            }
        } catch (error) {
            console.log(error.message ? error.message : error);
        }
    }

    const deleteFile = async file => {
        try {
            const response = await axios.put(`${fileApiUrl}/softdelete/${file.id}`, file);
            if (response.data) {
                console.log(response.data);
                dispatch({
                    type: FILE_DELETE_SUCCESS,
                    payload: response.data
                })
                setToast({
                    show: true,
                    message: "File deleted",
                    type: SUCCESS
                });
            }
        } catch (error) {
            console.log(error.message ? error.message : error);
            setToast({
                show: true,
                message: "Fail to delete file!",
                type: ERROR
            });
        }
    }

    const getSetting = async () => {
        try {
            const response = await axios.get(`${settingApiUrl}/default`);
            if (response.status === 200) {
                console.log(response.data);
                dispatch({
                    type: SETTING_LOADED,
                    payload: response.data
                });
            }
        } catch (error) {
            console.log(error.message ? error.message : error);
        }
    }

    const updateSetting = async updatedSetting => {
        try {
            const response = await axios.put(`${settingApiUrl}/${updatedSetting.id}`, updatedSetting);
            if (response.status === 202) {
                setShowSetting(false);
                window.location.reload();
            }
        } catch (error) {
            console.log(error.message ? error.message : error);
            setToast({
                show: true,
                message: "Fail to update setting!",
                type: ERROR
            });
        }
    }

    const appContextData = {
        appState,
        uploadStatus,
        setUploadStatus,
        toast,
        setToast,
        getFiles,
        getSetting,
        saveFile,
        downloadFile,
        deleteFile,
        updateSetting,
        showSetting,
        setShowSetting
    }
    return (
        <AppContext.Provider value={appContextData}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
