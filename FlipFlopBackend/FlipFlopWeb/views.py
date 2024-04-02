from django.http import JsonResponse
from .models import Googleusers, Communities, Questions
from django.views.decorators.csrf import csrf_exempt
import json
import logging
from django.core.serializers import serialize

logger = logging.getLogger(__name__)

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
            # Get the user's username
            user = Googleusers.objects.get(email=email)
            username = user.username  # Assuming username is a field in Googleusers

            # Return email, username, and existence status
            response_data = {
                'username': username,
                'valid': user_exists
            }
            return JsonResponse(response_data)
        else:
            return JsonResponse({'username': None,'valid': False})

    # Handle other HTTP methods or invalid requests
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

@csrf_exempt
def get_all_communities(request):
    if request.method == 'GET':
        communities = Communities.objects.all().values('data')
        dataToAdjust = list(communities)
        allCommunities = [item['data'] for item in dataToAdjust]
        return JsonResponse(allCommunities, safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def add_new_community(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        community = data.get('details')
        
        # Get the next auto-incrementing id from the Communities table
        if Communities.objects.count() == 0:
            next_id = 0
        else:
            next_id = Communities.objects.order_by('-id').first().id + 1

        # Include the id in the details
        community['index'] = next_id

        newCommunity = Communities(data=community)
        newCommunity.save()
        return JsonResponse({'valid': True})
    return JsonResponse({'valid': False})

@csrf_exempt
def get_all_questions(request, communityIndex):
    if request.method == 'GET':
        questions = Questions.objects.filter(index=communityIndex).values('data')
        dataToAdjust = list(questions)
        allQuestions = [item['data'] for item in dataToAdjust]
        return JsonResponse(allQuestions, safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def add_new_question(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        print(data)
        question = data.get('details')
        index = data.get('communityIndex')
        print("my index", index)
        newQuestion = Questions(index=index, data=question)
        newQuestion.save()
        return JsonResponse({'valid': True})
    return JsonResponse({'valid': False})