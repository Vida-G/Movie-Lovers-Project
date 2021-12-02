import * as React from 'react';
import movie_image from '../../assets/images/movieImg.jpeg';
import { server_calls } from '../../api';

const apiKey: string = '0b08fd20c61df62da09bb0c40c00ac6e';

function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${width * cols}&h=${height * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

function getMoviePosterURL(movieId: string) {
    console.log(`movieId: ${movieId}`)
    return server_calls.getMoviePosterPhotos(movieId).then(value => {
        var file_path = ''
        var vote_count = -1
        try {
            value['posters'].forEach(element => {
                if (element['vote_count'] > vote_count && element['aspect_ratio'] >= 0.6 && element['aspect_ratio'] <= 0.8) {
                    vote_count = element['vote_count']
                    file_path = element['file_path']
                }
            })
        } catch {
            return `${movie_image}`
        }
        if (file_path != '') {
            return 'https://image.tmdb.org/t/p/w185' + file_path
        } else {
            return `${movie_image}`
        }
    }).catch(err => `${movie_image}`);
}

export class Suggestion extends React.Component {
    componentDidMount() {
        var movieItems = server_calls.getSuggestions().then(movieSuggestion => movieSuggestion['suggestedMovies'].map(item => {
            console.log('1) Here is not there')
            console.log(item)
            return ({
                img: movie_image,
                tmdbId: item[1],
                title: item[0],
                featured: true,
            })
        })).then(
            movieItems => movieItems.map((item, index) => {
                return getMoviePosterURL(item['tmdbId']).then(imageUrl => {
                    console.log('imageUrL:', imageUrl)
                    document.getElementById(`suggestion-${index}`).setAttribute("style", "background-image: url(" + imageUrl + "); width: 100%; height: 100%; display: flex; border-radius: 10px; background-size: cover");
                    document.getElementById(`suggestion-title-${index}`).innerHTML = item['title']
                    return ({
                        img: movie_image,
                        tmdbId: item[1],
                        tmdbUrl: imageUrl,
                        title: item[0],
                        featured: true
                    })
                })
            }
            )
        )
    }
    render() {
        return (
            <>
                <div className="app" id="suggestions">
                    <h1 style={{ color: 'white' }}>Suggestions for You</h1>
                    <ul className="hs full">
                        {Array.from({ length: 10 }, (x, i) => i).map(index => {
                            return (
                                <li key={index} className="item">
                                    <div
                                        id={`suggestion-${index}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            // padding: 10,
                                            borderRadius: '10px',
                                            backgroundImage: `url(${movie_image || "../public/book.png"})`,
                                            backgroundSize: 'cover'
                                        }}
                                    >
                                        <div
                                            id={`suggestion-title-${index}`}
                                            style={{
                                                color: 'white',
                                                height: '30%',
                                                width: '100%',
                                                padding: '5px',
                                                paddingLeft: '10px',
                                                paddingRight: '10px',
                                                borderRadius: '9px',
                                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                            }}
                                        >
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                        }
                    </ul>
                </div>
            </>
        );
    }

}