import { useState, useEffect } from 'react';
import { server_calls } from '../api';

// interface movieDataItem {
//     id?: string;
//     genre?: string;
//     name?: string;
//     year?: string;
//     rating?: number; 
// }

export const useGetData = () => {
    const [movieData, setData] = useState<any>([]);

    async function handleDataFetch() {
        const result = await server_calls.get();
        setData(result)
    }
    useEffect(() => {
        handleDataFetch();
    }, []);
    let movieDataDict = {};
    movieData.forEach(l => {
        movieDataDict[l['id']] = {'genre': l['genre'], 'name': l['name'], 'rating': l['rating'], 'year': l['year']};
    });
    return { movieData, movieDataDict, getData: handleDataFetch }

}

interface SuggestionProps {
    suggestedMovies: string[];
}

export const useGetSuggestion = () => {
    const [movieSuggestion, setSuggestion] = useState<SuggestionProps>({'suggestedMovies': []});

    async function handleSuggestionFetch() {
        const result = await server_calls.getSuggestions();
        setSuggestion(result)
    }
    useEffect(() => {
        handleSuggestionFetch();
    }, []);
    return { movieSuggestion, getSuggestion: handleSuggestionFetch }
}

