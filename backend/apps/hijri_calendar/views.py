from django.http import JsonResponse
from .utils import get_hijri_details
from datetime import datetime

def hijri_details_view(request):
    # Get today's date in DD-MM-YYYY format
    today = datetime.today().strftime("%d-%m-%Y")

    # Get Hijri details
    hijri_info = get_hijri_details(today)

    return JsonResponse(hijri_info, safe=False)
