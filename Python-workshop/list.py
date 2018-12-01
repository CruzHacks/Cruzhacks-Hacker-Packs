# List examples
mylist = ['foo', 'bar', 'baz']  # Initialize list

print(mylist)
print(mylist[2])

# for (int i = 0; i < mylist.length; i++)
for i in range(len(mylist)):
    print(mylist[i])

# An example of looping through a list
for ele in mylist:
	print(ele)

# An example of enumerating through a list
for index, ele in enumerate(mylist):
	print(index, ele)

