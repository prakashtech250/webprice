from django.urls import path
from . import views

urlpatterns = [
    path('reviews/<str:asin>/<int:page>/',views.get_reviews, name='amazon_reviews')
]
