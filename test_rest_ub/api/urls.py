from django.urls  import path
from .views import get_user,create_user,get_users,user_details

urlpatterns = [
    path('users/',get_user,name="get_user"),
    path('create_user',create_user,name="create_user"),
    path('get_users/',get_users,name="get_users"),
    path('users/<int:pk>',user_details,name="user_details")

]