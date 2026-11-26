from django.urls import path
from . import views

urlpatterns = [
    path('inmuebles/', views.listar_propiedades, name='listar_inmuebles'),
    path('inmuebles/crear/', views.crear_propiedad, name='crear_inmueble'),
    path('inmuebles/eliminar/<int:id>/', views.eliminar_propiedad, name='eliminar_inmueble'),
]