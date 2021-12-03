# !pip install fastbook
from fastbook import *
from sqlalchemy import desc

from movie_lovers.models import Movie
import pandas as pd

from sqlalchemy import and_

path = Path()
print(f'this is path: {path}')
path.ls(file_exts='.pkl')

learn = load_learner(path/'movie_lovers/ml/export25ML_v1.pkl')
print(f'learn string {learn}')
p = path/'movie_lovers/ml/links.csv'
movie_link_df = pd.read_csv(path/'movie_lovers/ml/links.csv',  encoding='latin-1', usecols=(0,2), names=('movieId','tmdbId'), 
                            header=1, dtype={'movieId': 'Int64', 'tmdbId': 'Int64'})
movie_title_df = pd.read_csv(path/'movie_lovers/ml/movies.csv',  encoding='latin-1', usecols=(0,1), names=('movieId','title'), 
                            header=1, dtype={'movieId': 'Int64', 'title': 'object'})   
movie_title_df = movie_title_df.merge(movie_link_df)                                                     
print(f'movie_link_df.shape: {movie_link_df.shape} and {p} and movie_title_df.columns: {movie_title_df.columns}')                            
movie_link_dict = dict(zip(movie_title_df.title, movie_title_df.tmdbId))                            

def row2dict(row):
    d = {}
    for column in row.__table__.columns:
        d[column.name] = str(getattr(row, column.name))
    return d


def movie_suggestion(current_user_token):
    movies = Movie.query.filter_by(user_token = vars(current_user_token)['token']).filter(Movie.rating >= 3).order_by(desc(Movie.rating))    
    list_suggestions = []
    rated_movies = set()
    for movie in movies:
        movie_factors = learn.model.i_weight.weight
        movie_dict = row2dict(movie)
        movie_title = f'{movie_dict["name"]} ({movie_dict["year"]})'
        rated_movies.add(movie_title)
        idx = learn.dls.classes['title'].o2i[movie_title]
        distances = nn.CosineSimilarity(dim=1)(movie_factors, movie_factors[idx][None])
        sorted_idx = distances.argsort(descending=True)
        i = 0
        list_suggestions.append([])
        while i < 20:
            idx = sorted_idx[i]
            print(f'idx: {idx} {type(idx)}')
            print(learn.dls.classes['title'][idx])
            
            movie_name = learn.dls.classes['title'][idx]
            print(movie_link_dict.get(movie_name, '-1'))
            if movie_name == '#na#':
                i += 1
                continue
            list_suggestions[-1].append((movie_name, str(movie_link_dict.get(movie_name, '-1'))))
            i += 1
        suggected_movie_count = 0
        suggested_movies = []
        movie_index = 0
        print('Before selecting top movies')
        while suggected_movie_count < 10:
            print(f'{movie_index} In selecting top movies: {suggected_movie_count}')
            for i in range(len(list_suggestions)):
                if list_suggestions[i][movie_index][0] not in rated_movies and list_suggestions[i][movie_index] not in suggested_movies:
                    suggested_movies.append(list_suggestions[i][movie_index])
                    suggected_movie_count += 1
            movie_index += 1

    print(suggested_movies)
    return suggested_movies[:10]
