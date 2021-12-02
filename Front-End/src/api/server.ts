const token = '482ce1c5707620c073e1fff0669c2af12e427d5253a2432e';

const api_prefix = 'https://movie-lovers-ml.herokuapp.com'


export const server_calls = {
    get: async () => {
        const response = await fetch(`${api_prefix}/api/movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch your data from the server...')
        }
        return await response.json()
    },
    create: async (data: any = {}) => {
        const response = await fetch(`${api_prefix}/api/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to create new movie..')
        }
        return await response.json()
    },
    update: async (id: string, data: any = {}) => {
        const response = await fetch(`${api_prefix}/api/movies/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to update the movie...')
        }
        return await response.json()
    },
    delete: async (id: string) => {
        const response = await fetch(`${api_prefix}/api/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Could not delete the movie...')
        }
    },
    getSuggestions: async () => {
        const response = await fetch(`${api_prefix}/api/suggestedmovies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch your data from the server...')
        }
        // console.log(await response.json())
        return await response.json()
    },
}