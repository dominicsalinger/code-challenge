from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from server.models import Product, Cart
from server.serializers import UserSerializer, ProductSerializer, CartSerializer, TokenedUserSerializer, CartListSerializer
from server.serializers import ProductListSerializer
from django.core.exceptions import ValidationError
from django.db.models import F


@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
    
def get_products(request):
    products = Product.objects.filter(quantity__gte=1).order_by('-id')[:50]
    serializer = ProductListSerializer(products)
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
def create_product(request):
    user = request.user
    if user.is_authenticated:
        try:
            data = JSONParser().parse(request)
            product = Product(**data)
            product.seller_id = user.id
            product.full_clean()
            product.save()
            return JsonResponse(ProductSerializer(product).data, status=201)
        except ValidationError as error:
            return JsonResponse({'error': error.message_dict}, status=500)
    return JsonResponse({"error": "Please login"}, status=401)

@api_view(['GET'])
def my_shop_data(request):
    user = request.user
    if user.is_authenticated:
        try:
            products = Product.objects.filter(seller_id=user.id)
            serializer = ProductListSerializer(products)
            return JsonResponse(serializer.data, status=200, safe=False)
        except Exception:
            return JsonResponse({"error": "Error, please try again"}, status=500)
    return JsonResponse({"error": "Please login"}, status=401)

@api_view(['GET'])
def my_cart_products(request):
    user = request.user
    if user.is_authenticated:
        try:
            cart_items = Cart.objects.filter(owner_id=user.id).select_related('product').all()
            serializer = CartListSerializer(cart_items)
            return JsonResponse(serializer.data, status=200, safe=False)
        except Cart.DoesNotExist:
            return JsonResponse({"error": "Empty Cart"}, status=404)
    return JsonResponse({"error": "Please login"}, status=401)

@api_view(['POST'])
def add_product_to_cart(request):
    user = request.user
    if user.is_authenticated:
        try:
            product_id = JSONParser().parse(request)['product_id']
            cart_attributes = {
                'product_id': product_id,
                'owner_id': user.id
            }
            cart_item = Cart(**cart_attributes)
            cart_item.full_clean()
            cart_item.save()
            return JsonResponse({"success": "true"}, status=200, safe=False)
        except Exception as e:
            return JsonResponse({"error": "Error, please try again"}, status=500)
    return JsonResponse({"error": "Please login"}, status=401)

def search_products(request):
    try:
        search = request.GET['search']
        results = Product.objects.filter(name__icontains=search, quantity__gte=1)
        serializer = ProductListSerializer(results)
        return JsonResponse(serializer.data, status=200, safe=False)
    except Exception:
        return JsonResponse({"error": "Error, please try again"}, status=400)

@api_view(['POST'])
def update_product_quantity(request):
    if request.user.is_authenticated:
        try:
            data = JSONParser().parse(request)
            Product.objects.filter(id=data['id']).update(quantity=data['quantity'])
            # if the available quantity of an item is 0, remove it from carts
            if data['quantity'] == '0':
                Cart.objects.filter(product_id=data['id']).delete()  
            return JsonResponse({"success": "true"}, status=200, safe=False)
        except ValueError:
            return JsonResponse({"error": "Please enter a valid number"}, status=400, safe=False)
    return JsonResponse({"error": "Please login"}, status=401, safe=False)

@api_view(['POST'])
def remove_product_from_cart(request):
    user = request.user
    if user.is_authenticated:
        try:
            data = JSONParser().parse(request)
            Cart.objects.filter(owner_id=user.id, product_id=data['productId']).delete()
            return JsonResponse({"success": "true"}, status=200, safe=False)
        except Exception:
            return JsonResponse({"error": "Please try again"}, status=500, safe=False)
    return JsonResponse({"error": "Please login"}, status=401, safe=False)

@api_view(['POST'])
def checkout(request):
    user = request.user
    if user.is_authenticated:
        try:
            product_ids = JSONParser().parse(request)['productIds']
            Product.objects.filter(id__in=product_ids).update(quantity=F('quantity') -1)
            Cart.objects.filter(owner_id=user.id).delete()
            return JsonResponse({"success": "true"}, status=200, safe=False)
        except Exception:
            return JsonResponse({"error": "Please try again"}, status=401, safe=False)
    return JsonResponse({"error": "Please login"}, status=401, safe=False)
        

class UserList(APIView):
    permission_classes = [permissions.AllowAny,]

    def post(self, request, format=None):
        serializer = TokenedUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)