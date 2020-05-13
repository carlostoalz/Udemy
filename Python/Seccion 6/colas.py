from collections import deque

colas = deque()

print(colas)

print(type(colas))

colas = deque(['Carlos','Estudiantes','Familia','Genios'])
print(colas)

print(colas.pop())
print(colas.popleft())

print(colas)