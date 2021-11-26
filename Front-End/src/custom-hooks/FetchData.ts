import { useState, useEffect } from 'react';
import { server_calls } from '../api';

export const useGetData = () => {
    const [movieData, setData] = useState<any>([]);

    async function handleDataFetch() {
        const result = await server_calls.get();
        setData(result)
    }
    useEffect(() => {
        handleDataFetch();
    }, []);
    return { movieData, getData: handleDataFetch }

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

