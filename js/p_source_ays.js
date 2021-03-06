/**
 * Created by yyg on 2017/2/28.
 */
$(document).ready(function(){
    laydate({elem: '#date03', format: 'YYYY/MM/DD',
        choose: function(datas){ //选择日期完毕的回调
            //alert('得到：'+datas);
        }
    });
    laydate({elem: '#date04', format: 'YYYY/MM/DD',
        choose: function(datas){ //选择日期完毕的回调
            //alert('得到：'+datas);
        }
    });
    //var code = localStorage.getItem('code');
    //var name = localStorage.getItem('name');
    var type = getUrlObj().type;
    var code = getUrlObj().code;
    var name = getUrlObj().name;
    var time = getUrlObj().time;
    $('.title_chart').text(name+'民意来源占比');
    initData = function(){
        chartType();
    }
    initData();
    function chartType(){
        var data = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17", "2017-02-18"],
                "showData": [
                    {"originCode":"370828",originName:"市长热线12345",opinionCount: randomData()},
                    {"originCode":"370828",originName:"公安局",opinionCount: randomData()},
                    {"originCode":"370828",originName:"信访局",opinionCount: randomData()},
                    {"originCode":"370828",originName:"督查室",opinionCount: randomData()},
                    {"originCode":"370828",originName:"城管局",opinionCount: randomData()},
                    {"originCode":"370828",originName:"民生通",opinionCount: randomData()}
                ]
            }
        };
        var paramData = {
            id:'chartId',
            color:['#00c0fe','#0082d2','#fbc802','#fe5600','#ff9200'],
            legendGrid:{ left:'10%', top:'28%',},
            center: ['50%', '44%'],
            radius: ['45%', '70%'],
            data:[]
        };
        for(var i=0;i<data.data.showData.length;i++){
            paramData.data.push({
                value:data.data.showData[i].opinionCount,
                code:data.data.showData[i].originCode,
                name:data.data.showData[i].originName
            })
        }
        resetOpt();//重置默认配置
        waterPoloOpt.isRose = true;//使用玫瑰图
        waterPoloOpt.labelLine = true;//使用标线
        waterPoloOpt.legend = true;//使用图例
        var myChart = initPie(paramData);
        myChart.on('click',function(param){
            var pm = '?type='+type+'&time='+time+'&name='+param.data.name+'&code='+param.data.code;
            window.location.href = './source_scale.html'+pm;
        });
    }
});
