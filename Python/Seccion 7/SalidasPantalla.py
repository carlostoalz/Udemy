print("Hola mi querida familia digital")

variable = "Carlos Andres Tobon Alzate"
otra = "Genios estudiantes"

forma = "El profesor '{}' y sus '{}'".format(variable,otra)
print(forma)

forma = "El profesor '{1}' y sus '{0}'".format(variable,otra)
print(forma)

print('{:>50}'.format('Carlos Tobon'))