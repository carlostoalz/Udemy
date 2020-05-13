class Fabrica:
    def __init__(self,tiempo,nombre,ruedas):
        self.tiempo = tiempo
        self.nombre = nombre
        self.ruedas = ruedas
        print("Se creo el auto", self.nombre)

    def __str__(self):
        return "{} se fabricó con exito, en el tiempo {} y tiene esta cantiidad de ruedas {}".format(self.nombre, self.tiempo, self.ruedas)
    
    def __del__(self):
        print("Se elimino el auto", self.nombre)

class Listado:

    autos = []

    def __init__(self, autos=[]):
        self.autos = autos

    def fabricar(self, x):
        self.autos.append(x)

    def visualizar(self):
        for x in self.autos:
            print(x)

a = Fabrica(10, "Carlos", 4)
l = Listado([a])
l.fabricar(Fabrica(15,"Estudiantes",2))
l.visualizar()