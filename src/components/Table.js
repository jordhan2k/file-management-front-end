import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AppContext } from '../context/AppContext';
import { formatList } from '../utils/formatters';
import TableRow from './TableRow';
import '../App.css';
import ReactPaginate from 'react-paginate';


const Container = styled.table`
    padding : 10px;
`;

const Wrapper = styled.table`
    /* margin: 10px;
    margin-bottom: 30px; */
    border-collapse: collapse;`;

const Header = styled.thead`
`;

const HeaderCell = styled.th`
     font-weight: 600;
     font-size: 15px;
     width: ${props => props.w};
     border: 1px solid gray;
     text-align: left;
     padding: 5px;
`;

const Body = styled.tbody``;



const PaginationBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
`;

const CurrentPage = styled.div`
    flex: 1;
`;


function Table() {
    const { appState: { files } } = useContext(AppContext);

    const [pagination, setPagination] = useState({
        data: [],
        offset: 0,
        numberPerPage: 2,
        pageCount: 0,
        currentData: []
    });


    useEffect(() => {
        setPagination(prevState => ({
            ...prevState,
            data: formatList(files)
        }));
    }, [files]);

    useEffect(() => {

        setPagination((prevState) => ({
            ...prevState,
            pageCount: prevState.data.length / prevState.numberPerPage,
            currentData: prevState.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage)
        }))
        console.log(pagination);
    }, [pagination.numberPerPage, pagination.offset, files])

    const handlePageClick = event => {
        const selected = event.selected;
        console.log(selected);
        const offset = selected * pagination.numberPerPage
        setPagination({ ...pagination, offset })

    }



    return (
        <Container>
            <Wrapper>
                <Header>
                    <HeaderCell w="7%">Index</HeaderCell>
                    <HeaderCell w="40%">File name</HeaderCell>
                    <HeaderCell w="7%">Version</HeaderCell>
                    <HeaderCell w="10%">File size</HeaderCell>
                    <HeaderCell w="15%">Created Time</HeaderCell>
                    <HeaderCell w="10%">Download</HeaderCell>
                    <HeaderCell w="10%">Action</HeaderCell>
                </Header>

                <Body>
                    {pagination.currentData.length > 0 && pagination.currentData.map((item, groupIndex) => (
                        <>
                            {item.files.map((file, index) => (
                                <TableRow
                                    groupIndex={pagination.offset + groupIndex}
                                    file={file} key={file.id}
                                    groupSize={item.files.length}
                                    fileIndex={index} />)
                            )}
                        </>
                    ))}
                </Body>
            </Wrapper>

            <PaginationBar>
                <CurrentPage>
                    Page {pagination.offset / pagination.numberPerPage + 1} of {Math.ceil(pagination.pageCount)}
                </CurrentPage>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={pagination.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </PaginationBar>
        </Container>
    )
}

export default Table;
