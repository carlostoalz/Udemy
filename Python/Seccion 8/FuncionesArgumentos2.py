def estudiantes(valor):
    valor*=3

variable = 15
estudiantes(variable)
print(variable)

def listas(numero):
    for x,i in enumerate(numero):
        numero[x] *= 3

lista = [2,4,8,16,32,64,128,256,512,1024,2048,4096,8192]
# listas(lista) # trabaja las listas por referncia, las variables no
listas(lista[:]) # De esta forma no se modifica la lista al enviarla como parametro

print(lista)