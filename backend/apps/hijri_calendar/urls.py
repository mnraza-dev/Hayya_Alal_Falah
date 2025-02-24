from django.urls import path
from .views import hijri_details_view

urlpatterns = [
    path("hijri-date/", hijri_details_view, name="hijri_date"),
]
