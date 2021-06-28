from django.urls import path
from server import views

urlpatterns = [
    path('api/products/create', views.create_product),
    path('api/products', views.get_products),
    path('api/current-user', views.current_user),
    path('api/my-shop-data', views.my_shop_data),
    path('api/users/', views.UserList.as_view()),
    path('api/my-cart-products', views.my_cart_products),
    path('api/add-product-to-cart', views.add_product_to_cart),
    path('api/search-products', views.search_products),
    path('api/update-product-quantity', views.update_product_quantity),
    path('api/remove-product-from-cart', views.remove_product_from_cart),
    path('api/checkout', views.checkout),
]