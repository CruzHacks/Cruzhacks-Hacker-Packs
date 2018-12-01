# Simple implementation of for loops in Python
mylist = ['thank', 'you', 'kanye', 'very', 'cool']

# A simple list traversal
for word in mylist:
	print(word)

# A simple indexing example
for i in range(1,10):
	print(i)

# Indexing during a list traversal
for index, word in enumerate(mylist):
	print(index, word)
