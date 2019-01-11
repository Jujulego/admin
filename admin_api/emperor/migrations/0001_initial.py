# Generated by Django 2.1.5 on 2019-01-09 10:17

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
                ('actif', models.BooleanField(blank=True, default=False)),
                ('date_modif', models.DateTimeField(auto_now=True)),
                ('format', models.CharField(choices=[('.ini', 'INI'), ('.json', 'JSON'), ('.xml', 'XML'), ('.yaml', 'YAML')], max_length=5)),
                ('config', models.TextField()),
            ],
            options={
                'verbose_name_plural': 'vassaux',
            },
        ),
    ]
