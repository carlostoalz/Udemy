import copy

class Fabrica:
    def __init__(self, marca, nombre, precio, descripcion):
        self.marca = marca
        self.nombre = nombre
        self.precio = precio
        self.descripcion = descripcion

    def __str__(self):
        return """
            MARCA\t{}
            NOMBRE\t{}
            PRECIO\t{}
            DESCRIPCIÓN\t{}""".format(self.marca,self.nombre,self.precio,self.descripcion)

class Auto(Fabrica):
    pass

class Deportivo(Auto):
    ruedas = ""
    distibuidor = ""

    def __str__(self):
        return """
            MARCA\t\t{}
            NOMBRE\t\t{}
            PRECIO\t\t{}
            DESCRIPCIÓN\t\t{}
            RUEDAS\t\t{}
            DISTRIBUIDOR\t{}""".format(self.marca,self.nombre,self.precio,self.descripcion,self.ruedas,self.distibuidor)

class Accesorios(Fabrica):
    autor = ""
    fabricante = ""

    def __str__(self):
        return """
            MARCA\t\t{}
            NOMBRE\t\t{}
            PRECIO\t\t{}
            DESCRIPCIÓN\t\t{}
            AUTOR\t\t{}
            FABRICANTE\t{}""".format(self.marca,self.nombre,self.precio,self.descripcion,self.autor,self.fabricante)

z = Auto('Volkswagen',"Jetta",30000000,"Sedan")

deportivo = Deportivo("Buggati","Veiron",4000000000,"El mejor")
deportivo.ruedas = 4
deportivo.distibuidor = "Volkswagen"

accesorios = Accesorios('Fiat', 'luces de neos', 180000, 'Iluminan Mejor')
accesorios.autor = 'Vos'
accesorios.fabricante = 'Yo'

fabrica = [accesorios, deportivo]
fabrica.append(z)

# print(fabrica)

# for x in fabrica:
#     print(x,'\n')

# for x in fabrica:
#     print(x.marca, x.precio)

# for x in fabrica:
#     print(x.autor)

for x in fabrica:
    if (isinstance(x, Auto)):
        print(x.marca,x.nombre)
    elif (isinstance(x,Deportivo)):
        print(x.marca,x.nombre,x.ruedas)
    elif (isinstance(x,Accesorios)):
        print(x.marca,x.nombre,x.fabricante)


def Descuento_auto(t,precio):
    descuento = 10
    t.precio = precio - (t.precio/100*descuento)

Descuento_auto(accesorios,10)

print(accesorios.precio)

copia_deportivo = copy.copy(accesorios)

print(copia_deportivo)
