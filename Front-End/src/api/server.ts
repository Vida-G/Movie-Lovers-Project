//  Heroku Token:
const token = '482ce1c5707620c073e1fff0669c2af12e427d5253a2432e';
// Local Token:
// const token = '12e746a4d56dda07154cd7235b1e86811c1f2a5e9b7ff546';



const api_prefix = 'https://movie-lovers-ml.herokuapp.com'
// const api_prefix = 'http://127.0.0.1:5000'

const tmdb_api_key = '';

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

    getMoviePosterPhotos: async(movieId: string) => {
        if(movieId == '-1'){
            return ''
        }
        const api_prefix = 'https://api.themoviedb.org/3/movie'
        const response = await fetch(`${api_prefix}/${movieId}/images?api_key=${tmdb_api_key}&language=en`);

        if (!response.ok) {
            throw new Error('Failed to fetch poster links from the tmdb...')
        }
        // console.log(await response.json())
        return await response.json()

    }
}