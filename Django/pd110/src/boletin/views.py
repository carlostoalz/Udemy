from django.shortcuts import render
from .forms import RegForm
from .models import Registro

# Create your views here.
def inicio(request):
    form = RegForm(request.POST or None)

    # print(dir(form))
    if form.is_valid():
        form_data = form.cleaned_data
        abc = form_data.get("email")
        obj = Registro.objects.create(email=abc)
        print(form_data.get("nombre"))

    context = {
        "form": form,
    }
    return render(request, "inicio.html", context)