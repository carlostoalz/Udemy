carlos = 11
if carlos % 2  == 0:
    print('El resto es 0')
else:
    print('el resto es: ' + str(carlos % 2))

frase = "carlos"
if frase == "NO":
    print('Bienvenidos')
elif frase == 'hola':
    print('nos estan saludando')
else:
    print('Esto no entro a ninguna validación')

nota = float(input('Coloca la nota: '))
if nota >= 9:
    print('eres un genio')
elif nota >= 7:
    print('Aprobaste')
elif nota == 6:
    print('Te falto poco')
elif nota >= 0 and nota <= 5:
    print('Tuviste que haber estudiado en el curso de python de alvaro')
else:
    print('No es permitido esa nota')