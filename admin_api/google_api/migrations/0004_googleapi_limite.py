# Generated by Django 2.1.5 on 2019-01-08 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('google_api', '0003_maillog'),
    ]

    operations = [
        migrations.AddField(
            model_name='googleapi',
            name='limite',
            field=models.BigIntegerField(default=0),
            preserve_default=False,
        ),
    ]
