# Generated by Django 2.2.6 on 2020-08-27 01:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('income', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='income',
            name='forecast_amount',
            field=models.CharField(blank=True, default='NA', max_length=100),
        ),
        migrations.AddField(
            model_name='income',
            name='forecast_percent',
            field=models.CharField(blank=True, default='NA', max_length=100),
        ),
    ]
