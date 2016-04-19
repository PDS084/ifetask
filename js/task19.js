/**
 * Created by SSQ on 2016/4/8.
 */
window.onload = function() {
    var num = document.getElementById('num'),
        in_left = document.getElementById('in_left'),
        in_right = document.getElementById('in_right'),
        out_left = document.getElementById('out_left'),
        out_right = document.getElementById('out_right'),
        sort = document.getElementById('sort'),
        wrapper = document.getElementById('wrapper');

    var data = [];
    for(var i = 0; i < 30; i++) {
        data[i]=parseInt(Math.random()*90)+10;
    }

    function checkNum() {
        if(num.value<10||num.value>100) {
            alert('wrong num');
            return false;
        }else {
            return true;
        }
    }

    function checkLength() {
        if (data.length > 59){
            alert('out of length');
            return false;
        }else {
            return true;
        }
    }


    function render() {
        var content='',
            len = data.length,
            val,
            num=0;
        for(var i = 0; i< len; i++) {
            num = (num+1)%3;
            console.log(num);
            val = data[i];
            content += '<div class="rec'+num+'" style="left:'+ (i+1)*25+'px;height:'+val*5+'px">'+val+'</div>';
            wrapper.innerHTML = content;
        }
    }

    var temp;
    function sortBubble (arr ) {
        var len = data.length;
        for(var j = 0; j < len-1; j++) {
            (function(time){
                setTimeout(function(){
                    var isSwap = false;
                    console.log(time);
                    for(var i = 0 ; i< len-time-1; i++){
                        /*  冒泡排序 */
                        if(arr[i] > arr[i+1]){
                            temp = arr[i];
                            arr[i] = arr[i+1];
                            arr[i+1] = temp;
                            isSwap = true;//发生了交换
                        }
                        console.log(isSwap);
                        render();
                    }
                    if(isSwap == false){//不发生交换，排序完成
                        return arr;
                    }
                },1000*time);
            })(j);
        }
    }



    in_left.addEventListener('click',function(){
        // 拼接函数(索引位置, 要删除元素的数量, 元素)
        if(checkNum()&&checkLength()){
            data.splice(0, 0, num.value);
            render();
        }
    });
    in_right.addEventListener('click',function(){
        if(checkNum()&&checkLength()) {
            data.splice(-1, 0, num.value);
            render();
        }
    });
    out_left.addEventListener('click',function(){
        alert(data.splice(0,1));
        render();
    });
    out_right.addEventListener('click',function(){
        alert(data.splice(-1,1));
        render();
    });
    sort.addEventListener('click',function(){
        sortBubble(data);
    });



    function init() {
        render();
    }
    init();
}