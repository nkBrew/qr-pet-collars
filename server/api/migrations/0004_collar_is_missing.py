# Generated by Django 4.2.5 on 2023-09-23 15:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_collar_img_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='collar',
            name='is_missing',
            field=models.BooleanField(default=False),
        ),
    ]
