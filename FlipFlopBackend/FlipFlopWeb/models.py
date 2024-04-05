# Create your models here.
from django.db import models
import json

class User(models.Model):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=256)
    last_name = models.CharField(max_length=256)
    password = models.CharField(max_length=256)

    def __str__(self):
        return self.email
    
class Googleusers(models.Model):
    email = models.CharField(max_length=255, blank=True, null=True)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    username = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'googleUsers'


class Communities(models.Model):
    data = models.JSONField()
    class Meta:
        managed = False
        db_table = 'communities'

class Questions(models.Model):
    data = models.JSONField()
    index = models.IntegerField()
    comments = models.JSONField()
    questionuuid = models.UUIDField()
    class Meta:
        managed = False
        db_table = 'questions'