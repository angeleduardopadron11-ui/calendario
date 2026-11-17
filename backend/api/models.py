from django.db import models


class Propiedad(models.Model):
    TIPO_PROPIEDAD = [
        ('PROPIA', 'Propia'),
        ('TERCEROS', 'De Terceros'),
    ]
    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=10, choices=TIPO_PROPIEDAD, default='PROPIA')
    
    def __str__(self):
        return self.nombre

class FuenteICal(models.Model):
    propiedad = models.ForeignKey(Propiedad, on_delete=models.CASCADE, related_name='fuentes')
    url = models.URLField(max_length=500)
    ultima_sincronizacion = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"iCal de {self.propiedad.nombre}"

class EventoOcupacion(models.Model):
    fuente = models.ForeignKey(FuenteICal, on_delete=models.CASCADE, related_name='eventos')
    uid = models.CharField(max_length=255) # ID único para evitar duplicados
    resumen = models.CharField(max_length=255, blank=True, null=True)
    fecha_inicio = models.DateTimeField()
    fecha_fin = models.DateTimeField()
    
    def __str__(self):
        return f"{self.resumen} - {self.fecha_inicio.date()}"
