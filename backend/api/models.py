from django.db import models

class Usuario(models.Model):
    ROLES = [
        ('alumno', 'Alumno'),
        ('profesor', 'Profesor'),
        ('admin', 'Administrador'),
    ]

    dni = models.CharField(max_length=8, unique=True)
    nombre = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    rol = models.CharField(max_length=10, choices=ROLES)

    def __str__(self):
        return f"{self.nombre} ({self.rol})"