from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Propiedad

# 1. Vista para OBTENER todas las propiedades (GET)
def listar_propiedades(request):
    propiedades = Propiedad.objects.all()
    datos = []
    for p in propiedades:
        datos.append({
            'id': p.id,
            'nombre': p.nombre,
            'tipo': p.get_tipo_display(),
            'descripcion': p.descripcion,
            'imagen': request.build_absolute_uri(p.imagen.url) if p.imagen else 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=300&auto=format&fit=crop'
        })
    # safe=False permite enviar una lista (array) en formato JSON
    return JsonResponse(datos, safe=False)

# 2. Vista para CREAR una nueva propiedad (POST)
@csrf_exempt # Eximimos de la validación CSRF para pruebas locales con JS
def crear_propiedad(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        tipo = request.POST.get('tipo')
        descripcion = request.POST.get('descripcion')
        imagen = request.FILES.get('imagen') # Así se reciben los archivos (fotos)

        # Guardamos en la base de datos
        nueva = Propiedad.objects.create(
            nombre=nombre, 
            tipo=tipo, 
            descripcion=descripcion, 
            imagen=imagen
        )
        return JsonResponse({'status': 'success', 'id': nueva.id, 'mensaje': 'Inmueble creado'})
    
    return JsonResponse({'status': 'error', 'mensaje': 'Método no permitido'}, status=400)

# 3. Vista para ELIMINAR una propiedad (DELETE)
@csrf_exempt
def eliminar_propiedad(request, id):
    if request.method == 'DELETE':
        try:
            prop = Propiedad.objects.get(id=id)
            prop.delete() # Borra el registro de la base de datos
            return JsonResponse({'status': 'success', 'mensaje': 'Inmueble eliminado'})
        except Propiedad.DoesNotExist:
            return JsonResponse({'status': 'not found', 'mensaje': 'El inmueble no existe'}, status=404)
            
    return JsonResponse({'status': 'error'}, status=400)