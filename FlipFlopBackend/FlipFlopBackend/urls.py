"""
URL configuration for FlipFlopBackend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from FlipFlopWeb.views import check_email_exists, check_login, check_username_exists, get_all_communities, add_new_community, get_all_questions, add_new_question

urlpatterns = [
    path('admin/', admin.site.urls),
    path('check-email/', check_email_exists, name='check_email_exists'),
    path('check-login/', check_login, name='check_login'),
    path('check-username-exists/', check_username_exists, name='check_username_exists'),
    path('get-all-communities/', get_all_communities, name='get_all_communities'),
    path('add-new-community/', add_new_community, name='add_new_community'),
    path('get-all-questions/<int:communityIndex>/', get_all_questions, name='get_all_questions'),
    path('add-new-question/', add_new_question, name='add_new_question')
]
