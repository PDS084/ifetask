/**
 * Created by SSQ on 2016/4/6.
 */
window.onload = function() {
    /* 数据格式演示
     var aqiSourceData = {
     "北京": {
     "2016-01-01": 10,
     "2016-01-02": 10,
     "2016-01-03": 10,
     "2016-01-04": 10
     }
     };
     */

// 以下两个函数用于随机模拟生成测试数据
    function getDateStr(dat) {
        var y = dat.getFullYear();
        var m = dat.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = dat.getDate();
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
    }
    function randomBuildData(seed) {
        var returnData = {};
        var dat = new Date("2016-01-01");
        var datStr = ''
        for (var i = 1; i < 92; i++) {
            datStr = getDateStr(dat);
            returnData[datStr] = Math.ceil(Math.random() * seed);
            dat.setDate(dat.getDate() + 1);
        }
        return returnData;
    }

    var aqiSourceData = {
        "北京": randomBuildData(500),
        "上海": randomBuildData(300),
        "广州": randomBuildData(200),
        "深圳": randomBuildData(100),
        "成都": randomBuildData(300),
        "西安": randomBuildData(500),
        "福州": randomBuildData(100),
        "厦门": randomBuildData(100),
        "沈阳": randomBuildData(500)
    };
    var sel = document.getElementById('city-select');
    var panel = document.getElementsByClassName('aqi-chart-wrap')[0];
// 用于渲染图表的数据
    var chartData = {};

// 记录当前页面的表单选项
    var pageState = {
        nowSelectCity: -1,
        nowGraTime: "day"
    }
    pageState.nowSelectCity = 0;

    /**
     * 渲染图表
     */
    function renderChart() {
        var count = 0 ;
        //删除上次的显示
        var len = panel.childNodes.length;
        for (var i = 0; i <len-1; i++) {
            panel.removeChild(panel.childNodes[0]);
        }
        //生成新的图
        for(var date in chartData) {
            count++;
            var line = document.createElement('div');
            line.innerHTML='<p>'+date+'</p><p>'+chartData[date]+'</p>';
            line.setAttribute('class','line');
            line.style.left = count * 13 + 'px';
            line.style.height = chartData[date]+'px';
            panel.appendChild(line);
        }
        document.getElementById('cn').innerHTML = "城市："+ sel.children[pageState.nowSelectCity].innerHTML;
    }

    /**
     * 日、周、月的radio事件点击时的处理函数
     */
    function graTimeChange(target) {
        var val = target.value;
        var index = sel.selectedIndex;
        // 确定是否选项发生了变化
        //通过与pageState比较
        if(pageState.nowGraTime != val || pageState.nowSelectCity != index) {//状态发生改变
            // 设置对应数据
            pageState.nowGraTime = val;
            pageState.nowSelectCity = index;
        }
        // 调用图表渲染函数
        renderChart();
    }

    /**
     * select发生变化时的处理函数
     */
    function citySelectChange() {
        // 确定是否选项发生了变化
        delete chartData['北京'];
        var index = sel.selectedIndex;
        var ori_city = pageState.nowSelectCity;
        var city_name = sel.childNodes[index+1].innerHTML;
        delete chartData[city_name];
        if(ori_city != index){
            // 设置对应数据
            pageState.nowSelectCity = index;
        }
        // 调用图表渲染函数
        renderChart();
    }

    /**
     * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
     */
    function initGraTimeForm() {
        var item = document.getElementById("form-gra-time");
        item.addEventListener('click', function(e) {
            if (e.target && e.target.nodeName === "INPUT") {
                graTimeChange(e.target);
            }
        });
    }

    /**
     * 初始化城市Select下拉选择框中的选项
     */
    function initCitySelector() {
        // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
        for (var key in aqiSourceData) {
            sel.innerHTML += '<option>'+key+'</option>';
        }
        // 给select设置事件，当选项发生变化时调用函数citySelectChange
        sel.addEventListener('click', citySelectChange);
    }

    /**
     * 初始化图表需要的数据格式
     */
    function initAqiChartData() {
        // 将原始的源数据处理成图表需要的数据格式
        // 处理好的数据存到 chartData 中
        var count = 0;
        for(var key in aqiSourceData) {
            var day = 'day';
            //var data = {};
            chartData[key][day] = "";
            console.log(chartData[key].day);
            //chartData[key].day= aqiSourceData[key];
            //data.day = chartData[key];
            //console.log((count++));
            //console.log(data.day);
        }
    }

    /**
     * 初始化函数
     */
    function init() {
        initGraTimeForm();
        initCitySelector();
        initAqiChartData();
    }

    init();
}