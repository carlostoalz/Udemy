from django import forms

from .models import Registro

class RegModelForm(forms.ModelForm):
    class Meta:
        model = Registro
        fields = ["nombre","email"]

    def clean_email(self):
        email = self.cleaned_data.get("email")
        emaiul_base, proveedor = email.split("@")
        domino, extension = proveedor.split(".")
        if not extension == "edu":
            raise forms.ValidationError("Por favor utiliza un email con la extensión .edu")
        return email

    def clean_nombre(self):
        nombre = self.cleaned_data.get("nombre")
        #Validaciones
        return nombre

class RegForm(forms.Form):
    nombre = forms.CharField(max_length=100)
    email = forms.EmailField()