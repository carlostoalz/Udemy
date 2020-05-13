class Auto:
    color = ""
    puertas = 0

consecionaria = Auto()

consecionaria.color = "Rojo"
consecionaria.puertas = 4

print("Mi auto es de color: ", consecionaria.color, " y tiene ", consecionaria.puertas, " puertas " )

class Auto2:
    Rojo = False

c = Auto2
print(c.Rojo)

c.Rojo = True
print(c.Rojo)

class Auto3:
    Rojo = False

    def __init__(self):
        print("Se creo un auto")

    def Fabricar(self):
        self.Rojo = True

    def confirmar_fabricacion(self):
        if self.Rojo:
            print("Auto coloreado rojo")
        else:
            print("Auto no esta coloreado")

a = Auto3()

print(a.Rojo)

a.Fabricar()

print(a.Rojo)

a.confirmar_fabricacion()