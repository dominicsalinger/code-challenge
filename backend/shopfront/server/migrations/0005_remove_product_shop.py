# Generated by Django 3.2.4 on 2021-06-27 01:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0004_product_seller'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='shop',
        ),
    ]