from django.shortcuts import render
from rest_framework import generics
from .models import AmazonReviews
from .serializers import AmazonReviewsSerializer
from bs4 import BeautifulSoup
import requests
from django.http import JsonResponse
from . import reviews

# Create your views here.
# class AmazonReviewsListCreate(generics.ListCreateAPIView):
#     queryset = AmazonReviews.objects.all()
#     serializer_class = AmazonReviewsSerializer

def get_reviews(response, asin,page):
    result = reviews.get_reviews(asin, 'US', page)
    return JsonResponse(result)