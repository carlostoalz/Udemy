class Fabrica:
    def __init__(self,tiempo,nombre,ruedas):
        self.tiempo = tiempo
        self.nombre = nombre
        self.ruedas = ruedas
        print("Se creo el auto", self.nombre)
    
    def __del__(self):
        print("Se elimino el auto", self.nombre)

    def __str__(self):
        return "{} se fabricó con exito, en el tiempo {} y tiene esta cantiidad de ruedas {}".format(self.nombre, self.tiempo, self.ruedas)

    def __len__(self):
        return self.tiempo

a = Fabrica(10,"Carlos",4)
print(str(a))
print(len(a))