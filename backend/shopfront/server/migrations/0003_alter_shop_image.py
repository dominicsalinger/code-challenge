# Generated by Django 3.2.4 on 2021-06-23 07:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0002_auto_20210623_0727'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shop',
            name='image',
            field=models.ImageField(null=True, upload_to=''),
        ),
    ]
