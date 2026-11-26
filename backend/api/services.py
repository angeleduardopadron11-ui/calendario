import requests
import icalendar
from datetime import datetime, date
from django.utils import timezone
from .models import FuenteICal, EventoOcupacion

def sincronizar_calendario(fuente_id):
    try:
        # 1. Buscamos la fuente en la base de datos
        fuente = FuenteICal.objects.get(id=fuente_id)
        
        # 2. Descargamos el archivo .ics desde la URL
        print(f"Descargando calendario desde: {fuente.url} ...")
        respuesta = requests.get(fuente.url, timeout=10)
        respuesta.raise_for_status() # Lanza error si la URL está caída
        
        # 3. Procesamos el archivo con la librería icalendar
        calendario = icalendar.Calendar.from_ical(respuesta.text)
        eventos_procesados = 0
        
        # 4. Recorremos el archivo buscando eventos (VEVENT)
        for componente in calendario.walk():
            if componente.name == "VEVENT":
                uid = str(componente.get('UID'))
                resumen = str(componente.get('SUMMARY', 'Sin título'))
                
                # Extraemos las fechas
                inicio = componente.get('DTSTART').dt
                fin = componente.get('DTEND').dt
                
                # --- ARREGLO DE ZONA HORARIA ---
                if isinstance(inicio, date) and not isinstance(inicio, datetime):
                    inicio = datetime.combine(inicio, datetime.min.time())
                if isinstance(fin, date) and not isinstance(fin, datetime):
                    fin = datetime.combine(fin, datetime.min.time())

                if timezone.is_naive(inicio):
                    inicio = timezone.make_aware(inicio, timezone.get_current_timezone())
                if timezone.is_naive(fin):
                    fin = timezone.make_aware(fin, timezone.get_current_timezone())
                # --------------------------------
                
                # 5. Guardamos o actualizamos (evita duplicados)
                evento, creado = EventoOcupacion.objects.update_or_create(
                    uid=uid,
                    fuente=fuente,
                    defaults={
                        'resumen': resumen,
                        'fecha_inicio': inicio,
                        'fecha_fin': fin,
                    }
                )
                eventos_procesados += 1
        
        # 6. Registramos la fecha de la última sincronización
        fuente.ultima_sincronizacion = timezone.now()
        fuente.save()
        
        print(f"¡Éxito! Se procesaron {eventos_procesados} eventos.")
        return True, eventos_procesados
        
    except Exception as e:
        print(f"Error al sincronizar: {e}")
        return False, 0