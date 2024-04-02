from django.http import JsonResponse
from .models import Googleusers
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def check_email_exists(request):
    if request.method == 'POST':
        # Parse the JSON data from the request body
        data = json.loads(request.body.decode('utf-8'))
        email = data.get('email')
        if email:
            user_exists = Googleusers.objects.filter(email=email).exists()
            if user_exists:
                return JsonResponse({'exists': True})
            else:
                # Add the user to the database
                first_name = data.get('given_name')
                last_name = data.get('family_name')
                # Create the user with hashed password
                new_user = Googleusers(email=email, first_name=first_name, last_name=last_name)
                new_user.save()
                return JsonResponse({'exists': False, 'added': True})
    
    return JsonResponse({'exists': False, 'added': False})

@csrf_exempt
def check_login(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        email = data.get('email')

        # Check if the email exists in the googleUsers table
        user_exists = Googleusers.objects.filter(email=email).exists()
        if user_exists:
            return JsonResponse({'valid': True})
        else:
            return JsonResponse({'valid': False})

    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def check_username_exists(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        email = data.get('email')

        # Check if the username is already used
        username_exists = Googleusers.objects.filter(username=username).exists()
        if not username_exists:
            # Update the username for the corresponding email
            user = Googleusers.objects.filter(email=email).first()
            if user:
                user.username = username
                user.save()
                return JsonResponse({'exists': username_exists})
            else:
                #Probably not needed, since email will have to exist.
                return JsonResponse({'error': 'Email does not exist'}, status=400)
        else:
            return JsonResponse({'exists': username_exists}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=400)