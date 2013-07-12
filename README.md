﻿**BitConverter.js**  
javascriptからBinaryファイルのヘッダを読もうとすると少しめんどくさい.  
そこでc#のBitConverのようなものを作成した.  
GetBinary.jsは指定したurlにあるものをUint8Array形式でとってくる関数が入っている    

基本的な使い方はc#のBitConverterと同じだが,  
注意すべきことはTo系の関数は一番めのvalueは  
ただの配列ではなくUint8Arrayを取るということだ.  
また,GetBytes関数でnumberは標準でUint32ArrayもしくはFloat64Arrayに変換されたの後,4byteか8byteのUint8Arrayに変換される.  
1byteの数値が作りたい場合はGet1Bytesを用いる.
BitConverterにはBCという別名がある.

*使用例*  
    a = BC.GetBytes(123456789) // = [21, 205, 91, 7]  
    b = BC.Get1Bytes(123456789) // = [21]  
    c = BC.GetBytes(-1) // = [255, 255, 255, 255]  
    d = BC.GetBytes([-1 ,30.5, [true, false]]) // = [255, 255, 255, 255, 0, 0, 0, 0, 0, 128, 62, 64, 1, 0]  
    f = BC.GetBytes("あいうえお") // = [66, 48, 68, 48, 70, 48, 72, 48, 74, 48]     
    BC.ToInt32(a) // = 123456789
    BC.ToInt8(b) // = 21  
    BC.ToInt32(c) // = 23  
    BC.ToUInt32(c) // = -1  
    BC.ToFloat64(d, 4) // = 30.5  
    BC.ToString(f, 1*2, 3*2) // = "いうえ"