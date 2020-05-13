diccionario = {'Carlos':'Tobon','Estudiantes':'Genios'}
print(diccionario)
print(type(diccionario))
print(diccionario['Carlos'])
diccionario['Carlos'] = 'Alzate'
print(diccionario)
del(diccionario['Estudiantes'])
print(diccionario)

print("\n\n\n")

edades_de_mis_estudiantes = {'estudiante':20, 'otros': 30}
print(edades_de_mis_estudiantes)
edades_de_mis_estudiantes['estudiante'] += 1
print(edades_de_mis_estudiantes)
print(edades_de_mis_estudiantes['estudiante'] + edades_de_mis_estudiantes['otros'])
print("\n")
for edades in edades_de_mis_estudiantes:
    print(edades)
print("\n")
for edades in edades_de_mis_estudiantes:
    print(edades, edades_de_mis_estudiantes[edades])

print("\n\n\n")

lista = []
lista.append(edades_de_mis_estudiantes)
print(lista)

print("\n\n\n")

edades_de_mis_estudiantes = {'masestudiantes':40, 'masgenios': 50}
lista.append(edades_de_mis_estudiantes)
print(lista)