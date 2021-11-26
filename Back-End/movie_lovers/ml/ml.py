# !pip install fastbook
from fastbook import *
from sqlalchemy import desc

from movie_lovers.models import Movie

path = Path()
print(f'this is path: {path}')
path.ls(file_exts='.pkl')

learn = load_learner(path/'movie_lovers/ml/export.pkl')
print(f'learn string {learn}')

def row2dict(row):
    d = {}
    for column in row.__table__.columns:
        d[column.name] = str(getattr(row, column.name))
    return d

def movie_suggestion(current_user_token):
    print(f'my current token is: {vars(current_user_token)}')
    movies = Movie.query.filter_by(user_token = vars(current_user_token)['token']).order_by(desc(Movie.rating)).limit(3)
    # print(f'movies are {vars(movies)}')
    list_suggestions = []
    for movie in movies:
        movie_factors = learn.model.i_weight.weight
        movie_dict = row2dict(movie)
        movie_title = f'{movie_dict["name"]} ({movie_dict["year"]})'
        print(type(learn.dls), type(learn.dls.classes['title']))
        idx = learn.dls.classes['title'].o2i[movie_title]
        distances = nn.CosineSimilarity(dim=1)(movie_factors, movie_factors[idx][None])
        idx = distances.argsort(descending=True)[1]
        list_suggestions.append(learn.dls.classes['title'][idx])
        # print(learn.dls.classes['title'][idx])

    return list_suggestions
