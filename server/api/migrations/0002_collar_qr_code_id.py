# Generated by Django 4.2.5 on 2023-09-23 03:13

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="collar",
            name="qr_code_id",
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
