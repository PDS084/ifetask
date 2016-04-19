/**
 * Created by SSQ on 2016/4/5.
 */

window.onload = function(){
    /**
     * aqiData，存储用户输入的空气指数数据
     * 示例格式：
     * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
     */

    var aqiData = {
        "北京": 90,
        "上海": 50,
        "福州": 10,
        "广州": 50,
        "成都": 90,
        "西安": 100
    };
    var table = document.getElementById('aqi-table');
    renderAqiList();
    /**
     * 从用户输入中获取数据，向aqiData中增加一条数据
     * 然后渲染aqi-list列表，增加新增的数据
     */
    function addAqiData() {
        var data_city = document.getElementById('aqi-city-input').value.trim(),
            data_txt = document.getElementById('aqi-value-input').value.trim();
        //名字必须为中英字符
        var re_name = /^[a-zA-Z\u4e00-\u9fa5 ]{1,20}$/,
            re_num = /^[0-9]*[1-9][0-9]*$/;
        var result_name=  re_name.test(data_city),
            result_num=  re_num.test(data_txt);
        if(result_name) {
            //空气质量指数必须为整数
            if(result_num) {
                //用户输入的城市名字和空气质量指数需要进行前后去空格及空字符处理（trim）
                aqiData[data_city] = data_txt;
            }else {
                alert('空气质量指数必须为整数！');
            }
        }else{
            alert("城市名必须为中英字符，请检查输入！");
        }
    }
    function genRow(city_txt,num_txt,btn_txt,opr_txt,flag) {
        var tr =  document.createElement('tr'),
            city = document.createElement('td'),
            num = document.createElement('td'),
            opr = document.createElement('td'),
            btn =  document.createElement('button');
        city.innerHTML = city_txt;
        num.innerHTML = num_txt;
        btn.innerHTML = btn_txt;
        opr.innerHTML = opr_txt;
        tr.appendChild(city);
        tr.appendChild(num);
        if( flag == true ) {
            tr.appendChild(opr);
        }else {
            opr.appendChild(btn);
            tr.appendChild(btn);
        }
        table.appendChild(tr);
    }
    /**
     * 渲染aqi-table表格
     */
    function renderAqiList() {
        //删除表格内容
        var trlist = document.getElementsByTagName('tr');
        var len = trlist.length;
        for(var n = len; n>0 ;n--){
            table.removeChild(table.childNodes[n]);
        }
        var city_txt,
            num_txt,
            btn_txt = '删除';
        //生成表头
        genRow("城市","空气质量","","操作",true);
        //循环生成表内容
        for(var key in aqiData){
            num_txt = aqiData[key];
            city_txt = key;
            genRow(city_txt,num_txt,btn_txt,"",false);
        }
        init();
    }

    /**
     * 点击add-btn时的处理逻辑
     * 获取用户输入，更新数据，并进行页面呈现的更新
     */
    function addBtnHandle() {
        addAqiData();
        renderAqiList();
    }

    /**
     * 点击各个删除按钮的时候的处理逻辑
     * 获取哪个城市数据被删，删除数据，更新表格显示
     */
    function delBtnHandle(target) {
        //var key = this.parentNode.childNodes[0].innerHTML;
        var key = target.parentNode.childNodes[0].innerHTML;
        delete aqiData[key];
        renderAqiList();
    }

    function init() {
        // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
        var add_btn = document.getElementById('add-btn');
        add_btn.onclick = addBtnHandle;
        add_btn.addEventListener('click',addBtnHandle);

        // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
        //var trlist = document.getElementsByTagName('tr');
        //var len = trlist.length;
        //var btn_list =  table.getElementsByTagName('button');
        //for(var i = 0; i < len-1; i++) {
        //    btn_list[i].addEventListener('click',delBtnHandle);
        //}


        //利用事件这个方法可以借鉴一下
        table.addEventListener("click", function(e) {
            if (e.target && e.target.nodeName === "BUTTON") {
                delBtnHandle(e.target);
            }
        })
    }

    init();

}