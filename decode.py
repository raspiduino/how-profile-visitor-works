# Decode the string in fb.au3

import sys

a = open(sys.argv[1], "r")
code = a.read().split("\n")
a.close()

d = [0, 500.0, 0.0, 200, 4, 5, 0, 2.0, 3, 0, 0, 1.0, 1, 0, 1, 2, 0, 0, 0.0, 0.0, 1.0, 2.0, 3, 4, 1, 0.0, 3, 1, 1, 1, '+', '-,', ': ', ';R', '\\', 'K', '^', 'E', '(', 'k', ' ', '^', '|M', 'n', 'a', 'XS', 'q', 'J', '}', '{', 'U', 'd', 'A', '_', '\\', '8T', 'k', '/', 'S', 't', 'r', 'd', 'e', 'n', '>', 'J', 'p>Mx', '}p', 'E', '#', 'g=#', 'J>K', 'Q', 'hu', '>p', 'J', 'p2', '^', '=t', 'J|', '5', 'p', 'K', '#', 'Tp?', '\\nE#', 'E', '>p', 'KVB', 'x$', 'E[', 'm', '?x>(', 'um', '^', '>*', '#', 'Lx2', '=#', 'C', '5u', '(=*', 'E', '#', '|6', ')w_hKpE', 'Qx', '#', '6>>2', 'p', 'C>', '\\S', '6', 'ug', 'H+', 'E', '>M$hC', '>', '*', '$', 'gp', 'S', 'C', '>', 'K', 'GS', 'ix', '<', 'O3wu', 'p*>3pE', 'KG', '+', '|Kx', '>M', '>', '}', 'u', '*p>', 'pC', 'p', 'g', '-H', '>M', '$p', 'G', 'h^', '+I', 'H', 'h', 'p', 'p', 'E', 'p', '$S', 'n', '2', '{PH', '*p', 'p', 'K', 'p', 'K', '*x', '5u', ' T', 'pa', '9', 'E$', '5#', '<>M', '>', 'L*', ' ', '>', '>9', '*', '9', 'p', '22kd', 'gx#T', '262', 'U?', '<>M', '*p', 'K', 'GS9#Lx', '$hC', 'L* T', 'x>p', '3{', '2', '=#', '*', '$', '}', 'J', 'p', 'p', 'p', '*', 'Z', 'ET', 'p', 'j', 'Cx', 'd', 'U', '#iE', '\\', 'EuE', '\\', '{', ' m', 'gw', 'm', 'w', 'e', 'i', 'Ku', 'd', '$', 'pCp#$', 'x>[', 'Ed', '>', 'p?p', 'dd', '6', 'phu', '[', '^Ku|', '*iEx>', 'hdu', 'x', '#', '$', '/', 'Kum', '|6Ku', 'z', 'p\\z', 'E|>#\\', 'p>', '2Ku', '>', '$E|', '#', '>\\Cx', 'p', '\\', '#(', 'J', 'd', 'dp>', 'j', 'Tp?', '\\zu', 'z', '\\', '(', '*', '#[\\z', '\\', '(', 'uK', '*', '$pd', 'p', "'m", '$p', '#[', 'p>4h', 'zE', '|>#\\', 'dA', '6', "$'m(", '#(7', '*', "pK*'", '$', '>', 'p', 'z', 'E', '|', "u#p'2($", '|', '6xd$', 'U', '[u#p', "'", '2', "p'm", 'j', '\\', 'u', '>\\', 'Cxdp\\z', '*', '>', '\\', 'K\\#', '(J', 'n', '}pgiKx', '}', 'p', 'd', '@', 'i)}', 't', 'uQ', '*', '9', 'pK', 'x|xp*', '*', 'Tp?p', 'h', '#>P', 'u#*', 'Tp', 'v', 'K', 'P', 'g', 'j', 'uC', 'u#j^', 'udx', '*jJ', '>', 'p', 'm', 'Ewd', 'Q', '*', '*', 'pK', 't', 'dp', '[Q', 'Kp', 'U', 'h', '9K', 'u', 'Kud', 'J', 'KBx|p', '*', 'EK', 'p', 'J>E#', 'w', 'd', 'pO', 'x', 'Edd', '3{', 'v', ':', 'p', 'udJ', 'K', '|p*', 'jJ', '*j', '^E', 'Emp', 'p', 'x', 'K', '$E', '^', 'dp', 'w', 'dp5', 'xCx', 'E', 'xu', 'J', 'M', 'Unjh9', 'u', '9', 'J', 'x|p', '|9', '3', 'p', 'j', 'QE', 'p', 'C>', 'j', 'i', 'u', 'pK', '#', 'Ji', '= ', 'U', 'J6', 'dd', 'U', 'p', 'z', 'u', 'z', 'dE', 'xu', 'x#', 'z', 'C', '4', '9>', '#', '#', '>Ku', '22tE', 'm', 'tx', 'u', 'I', '>', 'u2h', 'u', 'C>', '=', 'Y', '\\', 'jn', '|K', '>', '2', 'duK', 'W9x', 'E9', 'Y', 'O', '>', 'u', 'p', 'h', 'p', '>pJ', '6u', 'm', 'u#\\', 'dx#', 'Y', 'CpE>', 'u#>', 'p$\\z', '?', '>p', '#', 'x', 'u', 's.e', '2$E', '>p', 'e', 'p', '92$', '*', 'uC>Q', 'K', '2U', '*', 'p', 'KB', 'x|pT', 'p', 'hd', 'u', 'O', 'OxK*', 'O', 'pOx#$', 'K', '#g', 'x', '#g}pgU?2', 'f', 'r', '(', 'ljV', '/', '*H', 'x', 'p', 'C', 'jjjj/', 'R', 'GG/(fNjT', 'j', 'T', 'N', 'jk', '<', 'kj', 'jR', 'j', '6', 'kjj']

def decode_to_code(p):
    string1 = "+St-,: H;R=weX?gC\KNVn^._u#EBpTb/UsJahi9'&Dr}Fclz{0|12[yIQ6O@GW)x7$5]4fL*<3mq>A8joMPYdZv(k"
    string2 = ",'DB=YZ)>]Ib4#xgf r^|MP6jonave.0?EXSqCWu;J3*R&}<-K{c+py5@whFG(QOiUdN9A[zs$Hm2t_1\8TVkl7L:/"
    returnvalue = ""
    for i in range(0, len(p)):
        l = len(string1.split(p[i:i+1])[0])
        returnvalue += string2[l:l+1]
    return returnvalue

def decode_string(b, c, d):
    c = c.split(" & ")

    for i in range(0, len(c)):
        if '"' in c[i]:
            c[i] = c[i][1:-1]

    for i in range(0, len(c)):
        if ("$" in c[i]) and (not ("[" in c[i] and "]" in c[i])):
            for j in b:
                if (c[i] + " = ") in j:
                    c[i] = j.split(" = ")[1]

    for i in range(0, len(c)):
        if ("$hhwbnd[" in c[i]):
            c[i] = d[int(c[i].split("[")[1][:-1])]

    for i in range(0, len(c)):
        if ("(" in c[i]) and (")" in c[i]):
            name = c[i].split("()")[0]
            for j in range(0, len(b)):
                if ("Func " + name + "()") in b[j]:
                    for k in range(j+1, len(b)):
                        if "EndFunc" in b[k]:
                            c[i] = b[k-1].split(" ")[1]
                            break
                    break

    for i in range(0, len(c)):
        if '"' in c[i]:
            c[i] = c[i][1:-1]
    
    return decode_to_code(''.join(c))

while True:
    print("Enter the string you want to decode: ")
    i = input()
    print("The output is " + decode_string(code, i, d))
