/**
 * Created by SSQ on 2016/4/5.
 */

window.onload = function(){
    /**
     * aqiData���洢�û�����Ŀ���ָ������
     * ʾ����ʽ��
     * aqiData = {
 *    "����": 90,
 *    "�Ϻ�": 40
 * };
     */

    var aqiData = {
        "����": 90,
        "�Ϻ�": 50,
        "����": 10,
        "����": 50,
        "�ɶ�": 90,
        "����": 100
    };
    var table = document.getElementById('aqi-table');
    renderAqiList();
    /**
     * ���û������л�ȡ���ݣ���aqiData������һ������
     * Ȼ����Ⱦaqi-list�б���������������
     */
    function addAqiData() {
        var data_city = document.getElementById('aqi-city-input').value.trim(),
            data_txt = document.getElementById('aqi-value-input').value.trim();
        //���ֱ���Ϊ��Ӣ�ַ�
        var re_name = /^[a-zA-Z\u4e00-\u9fa5 ]{1,20}$/,
            re_num = /^[0-9]*[1-9][0-9]*$/;
        var result_name=  re_name.test(data_city),
            result_num=  re_num.test(data_txt);
        if(result_name) {
            //��������ָ������Ϊ����
            if(result_num) {
                //�û�����ĳ������ֺͿ�������ָ����Ҫ����ǰ��ȥ�ո񼰿��ַ�����trim��
                aqiData[data_city] = data_txt;
            }else {
                alert('��������ָ������Ϊ������');
            }
        }else{
            alert("����������Ϊ��Ӣ�ַ����������룡");
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
     * ��Ⱦaqi-table���
     */
    function renderAqiList() {
        //ɾ���������
        var trlist = document.getElementsByTagName('tr');
        var len = trlist.length;
        for(var n = len; n>0 ;n--){
            table.removeChild(table.childNodes[n]);
        }
        var city_txt,
            num_txt,
            btn_txt = 'ɾ��';
        //���ɱ�ͷ
        genRow("����","��������","","����",true);
        //ѭ�����ɱ�����
        for(var key in aqiData){
            num_txt = aqiData[key];
            city_txt = key;
            genRow(city_txt,num_txt,btn_txt,"",false);
        }
        init();
    }

    /**
     * ���add-btnʱ�Ĵ����߼�
     * ��ȡ�û����룬�������ݣ�������ҳ����ֵĸ���
     */
    function addBtnHandle() {
        addAqiData();
        renderAqiList();
    }

    /**
     * �������ɾ����ť��ʱ��Ĵ����߼�
     * ��ȡ�ĸ��������ݱ�ɾ��ɾ�����ݣ����±����ʾ
     */
    function delBtnHandle(target) {
        //var key = this.parentNode.childNodes[0].innerHTML;
        var key = target.parentNode.childNodes[0].innerHTML;
        delete aqiData[key];
        renderAqiList();
    }

    function init() {
        // ���������add-btn��һ������¼������ʱ����addBtnHandle����
        var add_btn = document.getElementById('add-btn');
        add_btn.onclick = addBtnHandle;
        add_btn.addEventListener('click',addBtnHandle);

        // ��취��aqi-table�е�����ɾ����ť���¼�������delBtnHandle����
        //var trlist = document.getElementsByTagName('tr');
        //var len = trlist.length;
        //var btn_list =  table.getElementsByTagName('button');
        //for(var i = 0; i < len-1; i++) {
        //    btn_list[i].addEventListener('click',delBtnHandle);
        //}


        //�����¼�����������Խ��һ��
        table.addEventListener("click", function(e) {
            if (e.target && e.target.nodeName === "BUTTON") {
                delBtnHandle(e.target);
            }
        })
    }

    init();

}