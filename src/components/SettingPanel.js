import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AUDIO, color, DOCUMENT, IMAGE } from '../utils/globalConstants';
import { Button } from './ToolBar';
import { AppContext } from '../context/AppContext';
const Container = styled.form`
    border-radius: 5px;
    position: absolute;
    width: 250px; 
    z-index: 3;
    top: 60px;
    padding: 10px;
    padding-bottom: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: white;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, .2);
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 500;
    margin: 5px 0;
`;

const Input = styled.input`
    padding: 3px;
    margin-bottom: 5px;
`;

const Select = styled.select`
    margin-bottom: 5px;
    padding: 3px;
`;


const SettingPanel = () => {
    const { appState: { setting }, updateSetting } = useContext(AppContext);


    const [settingForm, setSettingForm] = useState({});

    useEffect(() => {
        setSettingForm({
            id: setting.id,
            maxFileSize: setting.maxFileSize,
            mimeTypeAllowed: setting.mimeTypeAllowed,
            itemPerPage: setting.itemPerPage,
        });
    }, [setting])

    const onInputChange = event => {
        setSettingForm(prevInput => ({
            ...prevInput,
            [event.target.name]: event.target.value
        }));
    }

    const onFormSubmit = event => {
        event.preventDefault();
        console.log("Save setting ...")
        updateSetting(settingForm);
    }

    return (
        <Container onSubmit={onFormSubmit}>
            <Label>Max file size (MB)</Label>
            <Input
                type="number"
                min={1}
                name="maxFileSize"
                value={settingForm.maxFileSize}
                onChange={onInputChange}
            />
            <Label>Items per page</Label>
            <Input
                type="number"
                min={1}
                name="itemPerPage"
                value={settingForm.itemPerPage}
                onChange={onInputChange}
            />
            <Label>Allowed upload type</Label>
            <Select
                name="mimeTypeAllowed"
                value={settingForm.mimeTypeAllowed}
                onChange={onInputChange}
            >
                <option>Choose a type</option>
                <option value={IMAGE}  >Image</option>
                <option value={DOCUMENT} >Document</option>
                <option value={AUDIO}  >Audio</option>
            </Select>

            <Button
                type="submit"
                style={{ marginTop: "10px", width: 80 }}
                bg={color.primaryGreen}
                txc="white"
            >Save</Button>
        </Container>
    )
}

export default SettingPanel;
