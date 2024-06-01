from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    return render(request, 'home/index.html')

def about(request):
    return HttpResponse("This is about page")

def contact(request):
    return HttpResponse("This is a contact page")