try:
    a = float(input("Número: "))
    print(10/a)
except TypeError:
    print("Esto es una cadena querido")
except ValueError:
    print("la cadena debe ser un número")
except ZeroDivisionError:
    print("No se puede dividir por cero")
except Exception as ex:
    print(type(ex).__name__)

def profesor(estudiantes=None):
    try:
        if estudiantes is None:
            raise ValueError("Debes escribir algo, sino no llames a la funcíon")
    except ValueError as ex:
        print(ex)

profesor()