import string
import random
import hashlib
from datetime import date

# Crea una stringa contenente tutte le lettere, numeri per le password
password_chars = string.ascii_letters + string.digits
# Converti la stringa in un array
password_array = list(password_chars)

#genero le 50 password
password=""
passwords=[]

for psw in range(50):
    for char in range(8):
        password += password_array[random.randint(0,len(password_array)-1)]
    passwords.append(password)
    password=""



print("Generated in date: " + str(date.today()) + "\n\n")



#applico MD5 a tutte le password
shaPassword= []
for password in passwords:
    md5pass = hashlib.md5(password.encode("utf-8"))
    shaPassword.append(md5pass.hexdigest())

print("Array delle password scritto in chiaro: ", passwords)
print("---------------------------------")
print("Array delle password scritto in sha: ", shaPassword)


for i in range(50):
    print ("Password: " + passwords[i] + "   -> in sha ->" +  shaPassword[i] + "\n")
    
    
