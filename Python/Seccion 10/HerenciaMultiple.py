class Primera:
    def __init__(self):
        print("Yo soy la primera clase")

    def primera(self):
        print("Este es el método Heredado de primera")

class Segunda:
    def __init__(self):
        print("Yo soy la segunda clase")

    def segunda(self):
        print("Este es el método Heredado de segunda")

class Tercera(Primera,Segunda):
    def tercera(self):
        print("Este es el método de tercera")

herencia_multiple = Tercera()

herencia_multiple.primera()
herencia_multiple.segunda()
herencia_multiple.tercera()