# Generated by Django 4.2.13 on 2024-05-11 20:08

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('electricity_board', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicant',
            name='district',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='applicant',
            name='govt_id',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='applicant',
            name='name',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='applicant',
            name='state',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='application',
            name='load_applied_value',
            field=models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(200)]),
        ),
    ]