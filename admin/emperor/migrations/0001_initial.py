# Generated by Django 2.1 on 2018-08-20 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Vassal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=50, unique=True)),
                ('format', models.CharField(choices=[('INI', '.ini')], max_length=3)),
                ('config', models.TextField()),
                ('date_modif', models.DateTimeField(auto_now=True)),
                ('enabled', models.BooleanField(blank=True, default=True)),
            ],
        ),
    ]