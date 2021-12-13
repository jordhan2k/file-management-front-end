import axios from "axios";
import React, { createContext, useReducer, useState, useEffect } from "react";
import { fileReducer } from "../reducers/fileReducer";
import { fileApiUrl, FILES_LOAD_FAIL, FILES_LOAD_SUCCESS, FILE_DELETE_SUCCESS, FILE_DOWNLOAD_SUCCESS, FILE_SAVE_SUCCESS, settingApiUrl, SETTING_LOADED } from "./constants";
import { saveAs } from 'file-saver';
import { getDownloadURL } from "firebase/storage";
import { formatList } from "../utils/formatters";

const list = [
    {
        id: "1",
        name: "abc.ssd",
        path: "abc"
    },
    {
        id: "2",
        name: "abc.ssd",
        path: "abccxvcc"
    },
    {
        id: "3",
        name: "abc.ssd",
        path: "abccc"
    },
    {
        id: "4",
        name: "abcd.ssd",
        path: "abccxvcc"
    },
    {
        id: "5",
        name: "abcd.ssd",
        path: "abccc"
    }];

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showSetting, setShowSetting] = useState(false);
    // const [derivedList, setDerivedList] = useState([]);

    const [appState, dispatch] = useReducer(fileReducer, {
        files: [],
        fileLoading: true,
        setting: null,
        mainErrMsg: ""
    });

//    useEffect(() => {
//        setDerivedList(formatList(appState.files));
//    }, [appState.files])
   
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
            console.log(error.message ? error.message : error);
            dispatch({
                type: FILES_LOAD_FAIL,
                payload: "Cannot connect to server"
            });
        }
    }

    const saveFile = async file => {
        try {
            const response = await axios.post(`${fileApiUrl}`, file);
            if (response.status === 201) {
                dispatch({
                    type: FILE_SAVE_SUCCESS,
                    payload: response.data,
                });
                setUploading(false);
                setProgress(0);
                setTimeout(() => {
                    setShowToast(false);
                }, 1200)
            }
        } catch (error) {
            console.log(error.message ? error.message : error);
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
            if (response.status === 200) {
                console.log(response.data);
                dispatch({
                    type: FILE_DELETE_SUCCESS,
                    payload: response.data
                })
            }
        } catch (error) {
            console.log(error.message ? error.message : error);
        }
    }

    const getSetting = async settingId => {
        try {
            const response = await axios.get(`${settingApiUrl}`);
            if (response.status === 200) {
                console.log(response.data);
                dispatch({
                    type: SETTING_LOADED,
                    payload: response.data
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateSetting = async updatedSetting => {
        try {

        } catch (error) {

        }
    }






    const appContextData = {
        appState,
        progress,
        setProgress,
        uploading,
        setUploading,
        showToast,
        setShowToast,
        showSetting,
        setShowSetting,
        getFiles,
        getSetting,
        saveFile,
        downloadFile,
        deleteFile,
        updateSetting,
        // derivedList
    }
    return (
        <AppContext.Provider value={appContextData}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
