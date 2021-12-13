import React from 'react'
import styled from 'styled-components'
import { color } from '../utils/globalConstants';
import { Button } from './ToolBar';

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


export default function SettingPanel() {

    const onFormSubmit = event => {
        event.preventDefault();
    }

    return (
        <Container onSubmit={onFormSubmit}>
            <Label>Max file size (MB)</Label>
            <Input type="number" min={1}/>
            <Label>Items per page</Label>
            <Input type="number" min={1}/>
            <Label>Allowed upload type</Label>
            <Select>
                <option>Choose a type</option>
                <option>Image</option>
                <option>Document</option>
                <option>Audio</option>
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
