# !pip install fastbook
from fastbook import *
from sqlalchemy import desc

from movie_lovers.models import Movie

from sqlalchemy import and_

path = Path()
print(f'this is path: {path}')
path.ls(file_exts='.pkl')

learn = load_learner(path/'movie_lovers/ml/export25ML_v1.pkl')
print(f'learn string {learn}')

def row2dict(row):
    d = {}
    for column in row.__table__.columns:
        d[column.name] = str(getattr(row, column.name))
    return d


def movie_suggestion(current_user_token):
    print(f'my current token is: {vars(current_user_token)}')
    movies = Movie.query.filter_by(user_token = vars(current_user_token)['token']).filter(Movie.rating >= 3).order_by(desc(Movie.rating))    
    # .limit(3)
    # print(f'movies are {vars(movies)}')
    list_suggestions = []
    for movie in movies:
        movie_factors = learn.model.i_weight.weight
        movie_dict = row2dict(movie)
        movie_title = f'{movie_dict["name"]} ({movie_dict["year"]})'
        # print(type(learn.dls), type(learn.dls.classes['title']))
        idx = learn.dls.classes['title'].o2i[movie_title]
        # print(movie_title, idx)
        distances = nn.CosineSimilarity(dim=1)(movie_factors, movie_factors[idx][None])
        sorted_idx = distances.argsort(descending=True)
        for i in range(0,10):
            idx = sorted_idx[i]
            list_suggestions.append(learn.dls.classes['title'][idx])
            # print(learn.dls.classes['title'][idx])
    print(len(list(set(list_suggestions))))
    return list(set(list_suggestions))[0:10]
