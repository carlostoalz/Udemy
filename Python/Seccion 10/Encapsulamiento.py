class Encapsulamiento:
    __privado_atri = "soy un atributo que no vas a poder acceder desde afuera de la clase"

    def __privado_met(self):
        print(self.__privado_atri)

    def public_atri(self):
        return self.__privado_atri

    def public_met(self):
        return self.__privado_met()

e = Encapsulamiento()
print(e.public_atri())
print(e.public_met())
