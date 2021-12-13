import moment from "moment";

export const formatDateTime = input => moment(new Date(input)).format('yyyy-MM-DD HH:MM:ss');

export const formatSize = fileSize => fileSize < 1024 * 1024
    ? `${(fileSize / 1024).toFixed(0)} KB`
    : `${(fileSize / (1024 * 1024)).toFixed(2)} MB`;

export const formatDownloadURL = url => url.substring(0, url.indexOf("?alt"));

export const formatList = fileList => {
    return fileList.reduce((accumulator, file) => {
        if (!accumulator.find(item => item.name === file.name)) {
            accumulator.push({
                name: file.name,
                files: [{...file}]
              });
        } else {
            accumulator.map(item => {
                if (file.name === item.name) {
                    item.files = [...item.files, { ...file }];
                }
                return item;
            });
        }
        return accumulator;
    }, []);
}

export const reverseList = list => [...list].reverse();