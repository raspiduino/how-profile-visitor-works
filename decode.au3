Func wanzeppkxbwu($p)
	$string1 = "+St-,: H;R=weX?gC\KNVn^._u#EBpTb/UsJahi9'&Dr}Fclz{0|12[yIQ6O@GW)x7$5]4fL*<3mq>A8joMPYdZv(k"
	$string2 = ",'DB=YZ)>]Ib4#xgf r^|MP6jonave.0?EXSqCWu;J3*R&}<-K{c+py5@whFG(QOiUdN9A[zs$Hm2t_1\8TVkl7L:/"
	Local $returnvalue
	For $counter = 0 To StringLen($p)
		$returnvalue &= StringMid($string2, StringInStr($string1, StringMid($p, $counter, 1), 1), 1)
	Next
	Return $returnvalue
EndFunc
