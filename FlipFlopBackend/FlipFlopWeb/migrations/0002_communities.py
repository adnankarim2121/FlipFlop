# Generated by Django 4.2.10 on 2024-04-02 19:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FlipFlopWeb', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Communities',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', models.JSONField()),
            ],
        ),
    ]