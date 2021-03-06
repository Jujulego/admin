# Generated by Django 2.1.5 on 2019-01-12 18:47

from django.db import migrations, models
import django.db.models.deletion

def forwards_func(apps, schema_editor):
    SendQueue = apps.get_model('sender', 'SendQueue')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    new_ct = ContentType.objects.get_for_model(SendQueue)
    SendQueue.objects.filter(polymorphic_ctype__isnull=True).update(polymorphic_ctype=new_ct)

class Migration(migrations.Migration):

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
        ('sender', '0010_template'),
    ]

    operations = [
        migrations.AddField(
            model_name='sendqueue',
            name='polymorphic_ctype',
            field=models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='polymorphic_sender.sendqueue_set+', to='contenttypes.ContentType'),
        ),
        migrations.RunPython(
            code=forwards_func,
            reverse_code=migrations.RunPython.noop
        ),
    ]
