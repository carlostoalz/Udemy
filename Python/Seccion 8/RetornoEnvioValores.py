def estudiante():
    return "Mis estudiantes son unos genios"

print(estudiante())

def estudiante():
    return [5,6,4,7]

print(estudiante()[0:2])

def estudiante():
    return "Carlos Tobon", "Mis estudiantes", 10, [5,6,4,7]

print(estudiante())

a,b,c,d = estudiante()

print(a)
print(b)
print(c)
print(d)

def suma(i,x):
    return i * x

variable = suma(2,4)

print(variable)