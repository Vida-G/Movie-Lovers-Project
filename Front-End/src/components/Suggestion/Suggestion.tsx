import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import movie_image from '../../assets/images/movieImg.jpeg';
import { useGetSuggestion } from '../../custom-hooks';


function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${width * cols}&h=${height * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}
export const Suggestion = () => {
    //   export default function CustomImageList() {
    let { movieSuggestion, getSuggestion } = useGetSuggestion();

    const itemData = movieSuggestion['suggestedMovies'].map((item: string) => {
        return ({
            img: movie_image,
            title: item,
            featured: true,
        })
    });

    return (
        <>
            <div className="app">
                <h1 style={{ color: 'white' }}>Suggestions for You</h1>

                <ul className="hs full">
                    {itemData.map((item) => {
                        const cols = item.featured ? 2 : 1;
                        const rows = item.featured ? 2 : 1;

                        return (
                            <li key={item.img} className="item">
                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        padding: 10,
                                        borderRadius: '8px',
                                        backgroundImage: `url(${item.img || "../public/book.png"})`
                                    }}

                                >
                                    <div
                                        style={{
                                            color: 'white',
                                            height: '30%',
                                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                        }}
                                    >
                                        {item.title}
                                    </div>
                                </div>
                            </li>

                        );
                    })}
                </ul>
            </div>
        </>
    );
}