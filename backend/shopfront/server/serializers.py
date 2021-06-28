from django.contrib.auth.models import User
from rest_framework import serializers
from server.models import Product, Cart
from rest_framework_jwt.settings import api_settings

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username',]

class TokenedUserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ['token', 'username', 'password']

class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'quantity', 'seller']

class ProductListSerializer(serializers.ListSerializer):
    child = ProductSerializer()
    allow_null = True
    many = True

class CartSerializer(serializers.ModelSerializer):
    owner_id = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    product = ProductSerializer()

    class Meta:
        model = Cart
        fields = ['id',  'product', 'owner_id', 'product_id']

class CartListSerializer(serializers.ListSerializer):
    child = CartSerializer()
    allow_null = True
    many = True