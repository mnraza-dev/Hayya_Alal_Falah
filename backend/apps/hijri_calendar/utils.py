import requests
from datetime import datetime

def get_hijri_details(gregorian_date):
    try:
        # Convert from DD-MM-YYYY to MM-DD-YYYY for API request
        formatted_date = datetime.strptime(gregorian_date, "%d-%m-%Y").strftime("%m-%d-%Y")

        # API Request
        url = f"https://api.aladhan.com/v1/gToH?date={formatted_date}"
        response = requests.get(url)

        # Debug: Print full API response
        api_response = response.json()
        print(f"API Response: {api_response}")

        if response.status_code == 200 and "data" in api_response:
            data = api_response["data"]

            return {
                "code": 200,
                "status": "OK",
                "data": data  # Directly returning the full 'data' object from API
            }

    except Exception as e:
        print(f"Error: {e}")

    return {
        "code": 500,
        "status": "ERROR",
        "message": "Hijri date not available"
    }
