def funciones(a,b):
    return a-b

print(funciones(b=2,a=1))

def nulos(x=None, i=None):
    if x==None or i==None:
        print('Amigo debes ingresar los parametros')
        return

    return x/i

print(nulos(1024,2))
print(nulos(1024))
