import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseName, chooseGenre, chooseYear, chooseRating } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { Button } from '@material-ui/core';

import { server_calls } from '../../api';

import { useGetData } from '../../custom-hooks';
import Rating from '@mui/material/Rating';
import { visuallyHidden } from '@mui/utils';
import { TextField } from '@material-ui/core';

interface MovieFormProps {
    id?: string;
    movieInfo?: {name: string; genre: string; year: string; rating: number};
    data?: {}
}

interface MovieState {
    name: string;
    price: string;
}

export const MovieForm = (props: MovieFormProps) => {

    const dispatch = useDispatch();
    let { movieData, getData } = useGetData();
    const store = useStore()
    const name = useSelector<MovieState>(state => state.name)
    const { register, handleSubmit } = useForm({})
    const [value, setValue] = React.useState<number | null>(2);
    const [movieName, setMovieName] = React.useState<string | null>('');
    const onSubmit = async (data: any, event: any) => {


        if (props.id!) {
            data.rating = value
            dispatch(chooseName(data.name))
            dispatch(chooseGenre(data.genre))
            dispatch(chooseYear(data.year))
            dispatch(chooseRating(data.rating))
            await server_calls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            data.rating = value
            dispatch(chooseName(data.name))
            dispatch(chooseGenre(data.genre))
            dispatch(chooseYear(data.year))
            dispatch(chooseRating(data.rating))
            console.log('rating added')
            console.log(data)
            console.log(event)
            console.log(value)
            console.log(store.getState())
            await server_calls.create(store.getState())
            var x = await server_calls.getSuggestions()
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Movie Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="genre">Genre</label>
                    <Input {...register('genre')} name="genre" placeholder="Genre" />
                </div>
                <div>
                    <label htmlFor="year">Year</label>
                    <Input {...register('year')} name="year" placeholder="Year"  />
                </div>
                <div>
                    <label htmlFor="rating">Rating</label>
                    <Rating
                        {...register("rating")}
                        name="rating"
                        value={value || 0}
                        onChange={(_, newValue) => {
                            setValue(newValue);
                        }}
                    />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}