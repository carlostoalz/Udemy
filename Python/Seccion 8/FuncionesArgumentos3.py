def argu(*tu):
    for tus in tu:
        print(tus)

argu('Carlos', 'Tobon', 'estudiantes', 10, [1,2,3])

def nombre_diccionario(*tu,**lo):
    b=0
    for tus in tu:
        b+=tus
    print(b)
    for x in lo:
        print(x, " ", lo[x])

nombre_diccionario(1,2,3,4,carlos="Tobon", Estudiantes='Genios', calificaciones=[7,8,9]) 