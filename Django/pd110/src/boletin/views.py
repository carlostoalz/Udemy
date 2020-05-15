from django.shortcuts import render
from .forms import RegForm
from .models import Registro

# Create your views here.
def inicio(request):
    titulo = "HOLA"
    print(dir(request.user))
    if request.user.is_authenticated:
        titulo = "Bienvenido %s" %(request.user)
    form = RegForm(request.POST or None)
    # print(dir(form))
    if form.is_valid():
        form_data = form.cleaned_data
        obj = Registro()
        obj.email = form_data.get("email")
        obj.nombre = form_data.get("nombre")
        obj.save()

    context = {
        "titulo": titulo,
        "form": form
    }
    return render(request, "inicio.html", context)