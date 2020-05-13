from django.contrib import admin

# Register your models here.
from .models import Registro

class AdminRegistro(admin.ModelAdmin):
    list_display = ["email", "nombre", "timestamp"]
    # list_display_links = ["nombre"]
    list_filter = ["timestamp"]
    list_editable = ["nombre"]
    search_fields = ["email","nombre"]

    class Meta:
        model = Registro

admin.site.register(Registro, AdminRegistro)