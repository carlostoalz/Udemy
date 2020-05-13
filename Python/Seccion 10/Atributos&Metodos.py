class Auto:
    Rojo = False

    def __init__(self, puertas=None, color=None):
        self.puertas = puertas
        self.color = color
        if self.puertas is not None and color is not None:
            print("Se creo un auto con puertas {} y color {}".format(self.puertas, self.color))            

    def Fabricar(self):
        self.Rojo = True

    def confimar_fabricacion(self):
        if self.Rojo:
            print("Auto coloreado rojo")
        else:
            print("aun no esta coloreado")

a = Auto(4, "Amarillo")
# a = Auto()
