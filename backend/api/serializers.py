from rest_framework import serializers
from .models import AmazonReviews

class AmazonReviewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AmazonReviews
        fields = ['id', 'asin' ,'title', 'description', 'rating','reviewed_date', 'published_date']
        
        