while(True):
    try:
        variable = float(input("Introduce un número: "))
        a=2
        print("resultado: ", a*variable)
    except:
        print("Ingresaste cualquier otra cosa menos la que se te pidio")
    else:
        print("Iniciaste sesión perfectamente, amigo")
        break
    finally:
        print("Perfecto mi amigo termino todo esto.")