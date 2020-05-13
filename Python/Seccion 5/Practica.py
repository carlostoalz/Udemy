print('Elije tu propio camino')
inicio = input('Escribe "empezar" para iniciar el programa: ')
while (inicio == 'empezar'):
    print(""" ¿Que camino quieres elejir? 
    Escribe la opción con número
    1 - Quiero que me saludes.
    2 - Deseo multiplicar ya que no se como hacerlo.
    3 - Quiero salir del programa, ya que aprendí a multiplicar con el curso de Alvaro.\n""")

    while True:
        try:
            wOpcion = int(input("Ingrese opción = "))
            print("\n")
            if (wOpcion < 1 or wOpcion > 3):
                raise Exception()
            break
        except Exception as ex:
            print("No es una opción válida")
            print("\n")

    if wOpcion == 1:
        print("Hola como estas?")
        print("\n")
    elif wOpcion == 2:                
        while True:
            try:
                wTotalNumeros = int(input("Ingrese cuantos numeros quiere multiplicar = "))
                print("\n")
                if(wTotalNumeros < 2):
                    raise Exception()
                break
            except:
                print("Debes digitar un numero mayor o igual a 2")
                print("\n")

        i = 1
        wTotal = 0
        mensaje = ""
        while (i <= wTotalNumeros):
            try:
                factor = float(input("Ingrese el número " + str(i) + " = "))

                if (len(mensaje) == 0):
                    mensaje += "El resultado de la multilicación de " + str(factor)
                else:
                    mensaje += " * " + str(factor)

                if (wTotal == 0):
                    wTotal += factor
                else:
                    wTotal *= factor
                
                i += 1
            except:
                print("Para poder multiblicar se debe ingresar un valor valido ya sea un número entero o decimal")
                print("\n")
            
        print(mensaje + " es " + str(wTotal))    
        print("\n")                           

    elif wOpcion == 3:
        print("Muchas gracias!!")
        print("\n")
        exit()