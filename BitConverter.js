(function (window) {
    var _BitConverter = window.BitConverter || (window.BitConverter = {});
    var _BC = window.BC || (window.BC = _BitConverter);

    _BitConverter.GetBytes = function (value){
        switch (typeof value){
            case "string":
                var temp = new Uint16Array(value.length);
                for(var i = 0;i < value.length;i++){
                    temp[i] = value.charCodeAt(i);
                }
                return new Uint8Array(temp.buffer);
                break;
            case "number":
                if((value - Math.floor(value)) == 0){
                    if(value > 0xffffffff){
                        return (function(array){
                            array[0]=value;
                            return new Uint8Array(array.buffer);
                        })(new Float64Array(1));
                    }else{
                        return (function(array){
                            array[0]=value;
                            return new Uint8Array(array.buffer);
                        })(new Int32Array(1));
                    }
                }else{
                    return (function(array){
                        array[0]=value;
                        return new Uint8Array(array.buffer);
                    })(new Float64Array(1));
                }
                break;
            case "boolean":
                return (function(array){
                    array[0] = value;
                    return array;
                })(new Uint8Array(1));
            default :
                if(value instanceof Array){
                    var temp = [];
                    for(var i = 0;i < value.length;i++){
                        temp.push(this.GetBytes(value[i]));
                    }
                    var length = 0;
                    for(var i = 0;i < temp.length;i++){
                        length += temp[i].length;
                    }
                    var array = new Uint8Array(length);
                    var pos = 0;
                    for(var i = 0;i < temp.length;i++){
                        for(var j = 0;j < temp[i].length;j++){
                            array[pos++] = temp[i][j];
                        }
                    }
                    return array;
                }

                throw "Can't Convert To Bytes!!";
        }
    }

    _BitConverter.Get1Bytes = function(value){
        switch (typeof value){
            case "number":
            case "boolean":
                return (function(array){
                    array[0] = value;
                    return array;
                })(new Uint8Array(1));
                break;
            default :
                if(value instanceof Array){
                    var temp = [];
                    for(var i = 0;i < value.length;i++){
                        temp.push(this.Get1Bytes(value[i]));
                    }
                    var length = 0;
                    for(var i = 0;i < temp.length;i++){
                        length += temp[i].length;
                    }
                    var array = new Uint8Array(length);
                    var pos = 0;
                    for(var i = 0;i < temp.length;i++){
                        for(var j = 0;j < temp[i].length;j++){
                            array[pos++] = temp[i][j];
                        }
                    }
                    return array;
                }

                throw "Can't Convert To Bytes!!";
        }
    }

    _BitConverter.ToBoolean = function (value, startIndex){
        startIndex = startIndex || 0;
        return (value[startIndex])? true: false;
    }

    _BitConverter.ToInt8 = function (value, startIndex){
        startIndex = startIndex || 0;
        var result = value[startIndex] & 0xff;
        if(result & 0x80) result = -((result ^ 0xff) + 1)
        return (value[startIndex] & 0x80)?  -((value[startIndex] ^ 0xff) + 1): value[startIndex];
    }

    _BitConverter.ToUInt8 = function (value, startIndex){
        startIndex = startIndex || 0;
        return value[startIndex];
    }

    _BitConverter.ToInt16 = function (value, startIndex){
        startIndex = startIndex || 0;
        var temp = new Uint8Array(2);
        for(var i = 0;i < 2;i++) temp[i] = (value[startIndex+i] || 0);
        return (new Int16Array(temp.buffer, 0, 1))[0];
    }

    _BitConverter.ToInt32 = function (value, startIndex){
        startIndex = startIndex || 0;
        var temp = new Uint8Array(4);
        for(var i = 0;i < 4;i++) temp[i] = (value[startIndex+i] || 0);
        return (new Int32Array(temp.buffer, 0, 1))[0];
    }

    _BitConverter.ToUInt16 = function (value, startIndex){
        startIndex = startIndex || 0;
        var temp = new Uint8Array(2);
        for(var i = 0;i < 2;i++) temp[i] = (value[startIndex+i] || 0);
        return (new Uint16Array(temp.buffer, 0, 1))[0];
    }

    _BitConverter.ToUInt32 = function (value, startIndex){
        startIndex = startIndex || 0;
        var temp = new Uint8Array(4);
        for(var i = 0;i < 4;i++) temp[i] = (value[startIndex+i] || 0);
        return (new Uint32Array(temp.buffer, 0, 1))[0];
    }

    _BitConverter.ToChar = function (value, startIndex){
        startIndex = startIndex || 0;
        var temp = new Uint8Array(2);
        for(var i = 0;i < 2;i++) temp[i] = (value[startIndex+i] || 0);
        return String.fromCharCode((new Uint16Array(temp.buffer, 0, 1))[0]);
    }

    _BitConverter.ToAscii = function (value, startIndex){
        startIndex = startIndex || 0;
        return String.fromCharCode(value[startIndex]);
    }

    //length is Number of Bytes
    //length must be even number
    //because javascript char-code is utf-16
    _BitConverter.ToString = function (value, startIndex, length){
        startIndex = startIndex || 0;
        length = length || value.length;
        if(length+startIndex > value.length) length -= startIndex;
        var temp = new Uint8Array(length);
        for(var i = 0;i < length;i++) temp[i] = (value[startIndex+i] || 0);
        return String.fromCharCode.apply(null, new Uint16Array(temp.buffer, 0, length / 2));
    }

    _BitConverter.ToFloat32 = function (value, startIndex){
        startIndex = startIndex || 0;
        var temp = new Uint8Array(4);
        for(var i = 0;i < 4;i++) temp[i] = (value[startIndex+i] || 0);
        return (new Float32Array(temp.buffer, 0, 1))[0];
    }

    _BitConverter.ToFloat64 = function (value, startIndex){
        startIndex = startIndex || 0;
        var temp = new Uint8Array(8);
        for(var i = 0;i < 8;i++) temp[i] = (value[startIndex+i] || 0);
        return (new Float64Array(temp.buffer, 0, 1))[0];
    }

})(window);