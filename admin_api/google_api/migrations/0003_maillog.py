# Generated by Django 2.1.5 on 2019-01-07 18:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sender', '0002_message'),
        ('google_api', '0002_gmailcontact'),
    ]

    operations = [
        migrations.CreateModel(
            name='MailLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('S', 'Succès'), ('E', 'Erreur')], max_length=2)),
                ('mail_id', models.CharField(max_length=512, null=True)),
                ('erreur', models.TextField(null=True)),
                ('api', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='google_api.GoogleAPI')),
                ('message', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sender.Message')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='google_api.GmailContact')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
