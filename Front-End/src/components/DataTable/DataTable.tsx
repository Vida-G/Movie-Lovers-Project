import React, { useState } from 'react';
import { DataGrid, GridColDef, GridDataContainer, GridValueGetterParams } from '@material-ui/data-grid';
import { server_calls } from '../../api';
import { useGetData } from '../../custom-hooks';
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
import { MovieForm } from '../../components/MovieForm';

interface gridData {
    id?: string;
}

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 100
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 210
    },
    {
        field: 'genre',
        headerName: 'Genre',
        width: 300
    },
    {
        field: 'year',
        headerName: 'Year',
        width: 110
    },
    {
        field: 'rating',
        headerName: 'Rating',
        width: 200
    },
];

// const rows = [
//     { id: 1, name: 'The Godfather', genre: 'Drama, Crime', year: '1972' },
//     { id: 2, name: 'Life Is Beautiful', genre: 'Comedy, Drama, Romance', year: '1997' },
//     { id: 3, name: 'Interstellar', genre: 'Adventure, Drama, Sci-Fi', year: '2014' },
//     { id: 4, name: 'The Pianist', genre: 'Biography, Drama, Music', year: '2002' },
//     { id: 5, name: 'The Lion King', genre: 'Animation, Adventure, Drama', year: '1994' },
//     { id: 6, name: 'Joker', genre: 'Crime, Drama, Thriller', year: '2019' },
//     { id: 7, name: 'The Lives of Others', genre: 'Drama, Mystery, Thriller', year: '2006' },
//     { id: 8, name: 'A Separation', genre: 'Drama', year: '2011' },
//     { id: 9, name: 'Up', genre: 'Animation, Adventure, Comedy', year: '2009' },
//     { id: 10, name: 'The Wolf of Wall Street', genre: 'Biography, Comedy, Crime', year: '2013' },
// ];


export const DataTable = () => {

    let { movieData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<gridData>({ id: '' });
    const [selectionModel, setSelectionModel] = useState<any>([])

    let handleOpen = () => {
        setOpen(true)
    }

    let handleClose = () => {
        setOpen(false)
    }

    let deleteData = async () => {
        await server_calls.delete(selectionModel)
        getData()
        console.log('deleted selection!', selectionModel)
    }


    return (
        <div style={{ height: 400, width: '100%', color: 'white' }}>
            <h2>Movies</h2>
            <DataGrid
                rows={movieData}
                columns={columns}
                pageSize={5}
                checkboxSelection
                onSelectionModelChange={(item) => {
                    setSelectionModel(item)
                }}
                style={{ color: 'white', backgroundColor: 'black' }}
                {...movieData}
            />

            <Button onClick={handleOpen}>Update</Button>
            <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

            {/*Dialog Pop Up begin */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Movie</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>Update Movie</DialogContentText>
                <MovieForm id={gridData.id!}/> */}
                    <DialogContentText>Movie id: {selectionModel}</DialogContentText>
                    <MovieForm id={`${selectionModel}`} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleClose} color="primary">Done</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}