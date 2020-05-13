def estudiantes():
    print("Genios mis estudiantes parte de mi familia digital")

estudiantes()

def tabla_del_7():
    for x in range(10):
        print("7 * {} = {}".format(x, 7*x))

tabla_del_7()

def advierto():
    global variable
    variable = 'alvaro'
    print(variable)

advierto()

variable = "Tobon"
advierto()