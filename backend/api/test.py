# Python 3 code to demonstrate the 
# working of MD5 (byte - byte)
 
import hashlib
 
# encoding GeeksforGeeks using md5 hash
# function 
result = hashlib.md5('GeeksforGeeks'.encode('utf-8'))
 
# printing the equivalent byte value.
print("The byte equivalent of hash is : ", end ="")
print(result.hexdigest())