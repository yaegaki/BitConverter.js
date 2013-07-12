(function(window){
    window.getBinary = function(url, success){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = 'arraybuffer';
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function(){
            if(this.status == 200){
                success(new Uint8Array(this.response));
            }
        }
        xhr.send();
    }
})(window);