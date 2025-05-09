# Generated by Django 2.2.6 on 2020-08-27 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expenses', '0002_auto_20200827_0145'),
    ]

    operations = [
        migrations.RenameField(
            model_name='expense',
            old_name='amount',
            new_name='ay_actual_export',
        ),
        migrations.RenameField(
            model_name='expense',
            old_name='forecast_amount',
            new_name='ay_actual_generate',
        ),
        migrations.RenameField(
            model_name='expense',
            old_name='forecast_percent',
            new_name='ay_actual_year',
        ),
        migrations.RenameField(
            model_name='expense',
            old_name='name',
            new_name='ay_daa',
        ),
        migrations.AddField(
            model_name='expense',
            name='ay_date',
            field=models.CharField(blank=True, default='NA', max_length=100),
        ),
        migrations.AddField(
            model_name='expense',
            name='ay_export',
            field=models.CharField(blank=True, default='NA', max_length=100),
        ),
        migrations.AddField(
            model_name='expense',
            name='ay_generate',
            field=models.CharField(blank=True, default='NA', max_length=100),
        ),
        migrations.AddField(
            model_name='expense',
            name='ay_id',
            field=models.CharField(blank=True, default='NA', max_length=100),
        ),
        migrations.AddField(
            model_name='expense',
            name='ay_id_app',
            field=models.CharField(blank=True, default='NA', max_length=100),
        ),
        migrations.AddField(
            model_name='expense',
            name='ay_prorate',
            field=models.CharField(blank=True, default='NA', max_length=100),
        ),
        migrations.AddField(
            model_name='expense',
            name='ay_total_days',
            field=models.CharField(blank=True, default='NA', max_length=100),
        ),
        migrations.AddField(
            model_name='expense',
            name='ay_year',
            field=models.CharField(blank=True, default='NA', max_length=100),
        ),
        migrations.AddField(
            model_name='expense',
            name='ay_year_number',
            field=models.CharField(blank=True, default='NA', max_length=100),
        ),
        migrations.AddField(
            model_name='expense',
            name='inf_cre_dt',
            field=models.CharField(blank=True, default='NA', max_length=100),
        ),
        migrations.AddField(
            model_name='expense',
            name='inf_cre_usr',
            field=models.CharField(blank=True, default='NA', max_length=100),
        ),
        migrations.AddField(
            model_name='expense',
            name='inf_mod_dt',
            field=models.CharField(blank=True, default='NA', max_length=100),
        ),
        migrations.AddField(
            model_name='expense',
            name='inf_mod_usr',
            field=models.CharField(blank=True, default='NA', max_length=100),
        ),
    ]
