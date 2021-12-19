import { CONNECT_ERROR, FILES_LOAD_FAIL, FILES_LOAD_SUCCESS, FILE_DELETE_SUCCESS, FILE_DOWNLOAD_SUCCESS, FILE_SAVE_SUCCESS, NO_FILE, SETTING_LOADED, SETTING_UPDATED } from "../context/constants";


export const fileReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case FILES_LOAD_SUCCESS:
            console.log("receive files from dispatch", payload)
            return {
                ...state,
                files: payload,
                fileLoading: state.setting ? false : true,
                mainErrMsg: payload.length === 0 && NO_FILE
            };
        case FILES_LOAD_FAIL:
            return {
                ...state,
                fileLoading: false,
                mainErrMsg: CONNECT_ERROR
            };


        case FILE_SAVE_SUCCESS:
            return {
                ...state,
                files: [
                    ...state.files,
                    payload
                ]
            };
        case FILE_DELETE_SUCCESS:
            return {
                ...state,
                files: state.files.filter(file => file.id !== payload.id)
            };

        case FILE_DOWNLOAD_SUCCESS:
            return {
                ...state,
                files: state.files.map(file => file.id !== payload.id ? file : {
                    ...file,
                    numberOfDownload: payload.numberOfDownload
                })
            };


        case SETTING_LOADED:
            return {
                ...state,
                setting: payload,
                fileLoading: state.files ? false : true,
            }

        case SETTING_UPDATED:
            return {
                ...state,
                setting: payload,
                settingLoading: false,
            }
        default:
            return state;

    }

}