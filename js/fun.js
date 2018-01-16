/*
写的时候我技术还不大好
所以代码很乱
*/

date = new Date();
year = date.getFullYear();
month = date.getMonth();
day = date.getDate();
weekDay = date.getDay();
weeksDay = ['天', '一', '二', '三', '四', '五', '六'];
//显示时间
function showTime() {
    dateTime = '今天是' + year + '年' + (month + 1) + '月' + day + '日 星期' + weeksDay[weekDay];
    $('.time').html(dateTime)
}


//写附加变量
//var tools = ["Eclipse写程序", "MSOffice写文档", "记事本写程序", "Windows8", "Linux", "MacOS", "IE", "Android设备", "iOS设备"];


//生成基本种子
basicSeed = year * 10000 + (month + 1) * 100 + day;

//开始按照随机写内容
function startChange() {
    //写时间
    insertLib()
    showTime()
        //初始化
    $('.badList').html('')
    $('.goodList').html('')

    $('.drink').html('%drink%')
    $('.direction').html('%direction%')
    $('.bat').html('%bat%')
        //写内容
    changeGood()
    changeBad()
        //更改变量
    replaceVreab('%mcbbs%', 14)
    replaceVreab('%drink%', 19)
    replaceVreab('%direction%', 23)
    replaceVreab('%bat%', 3)
    console.timeEnd('done')
}

//写宜
function changeGood() {
    //获得数量
    var num = getNum('good')
        //初始化
    Info = ''
        //开始写
        //写入头部
    for (var i = 0; i < num; i++) {
        var huanglinum = randomNum(i + 34);
        huangliID = huanglinum % getUnused('basic');
        Info += '<div class = "mainStuff">';
        Info += Huangli.find({
            type: 'basic',
            used: false
        })[huangliID].name

        if (Huangli.find({
                type: 'basic',
                used: false
            })[huangliID].good != false) {
            Info += '<div class = "mainStuffAdd">';
            Info += Huangli.find({
                type: 'basic',
                used: false
            })[huangliID].good;
            Info += '</div>';
        }
        Info += '</div>';
        Huangli.update({
            _id: Huangli.find({
                type: 'basic',
                used: false
            })[huangliID]._id
        }, {
            $set: {
                used: true
            }
        });
    }
    $('.goodList').html(Info)
}

//写忌
function changeBad() {
    //获得数量
    var num = getNum('bad');
    //初始化
    Info = '';
    //开始写
    for (var i = 0; i < num; i++) {
        var huanglinum = randomNum(i + 20);
        huangliID = huanglinum % getUnused('basic');
        Info += '<div class = "mainStuff">';
        Info += Huangli.find({
            type: 'basic',
            used: false
        })[huangliID].name

        if (Huangli.find({
                type: 'basic',
                used: false
            })[huangliID].bad != false) {
            Info += '<div class = "mainStuffAdd">';
            Info += Huangli.find({
                type: 'basic',
                used: false
            })[huangliID].bad;
            Info += '</div>';
        }
        Info += '</div>';
        Huangli.update({
            _id: Huangli.find({
                type: 'basic',
                used: false
            })[huangliID]._id
        }, {
            $set: {
                used: true
            }
        });
    }
    $('.badList').html(Info)
}




//变量替换
function replaceVreab(nameType, theSeed) {
    //根据数量进行替换,不知道为什么需要+1....
    for (var i = 0; i < countNum(nameType) + 1; i++) {
        var huanglinum = randomNum(i + theSeed);
        huangliID = huanglinum % getUnused(nameType);
        var goal = Huangli.find({
            used: false,
            type: nameType
        })[huangliID].name
        $('main').html($('main').html().replace(nameType, goal))
        Huangli.update({
            _id: Huangli.find({
                type: nameType,
                used: false
            })[huangliID]._id
        }, {
            $set: {
                used: true
            }
        });
    }
}



//获得变量部分

//随机数
function randomNum(seedindex) {
    var n = basicSeed % 11117;
    for (var i = 0; i < 100 + seedindex; i++) {
        n = n * n;
        n = n % 11117; // 11117 是个质数
    }
    return n;
}

//我真是个天才(随机数量)
function getNum(type) {
    if (type == 'good') {
        return Math.round((Math.sin(basicSeed) + 1) * 10) % 3 + 2
    } else {
        return Math.round((Math.cos(basicSeed) + 1) * 10) % 3 + 2
    }
}

//看看还有多少没用的
function getUnused(type) {
    return Huangli.find({
        type: type,
        used: false
    }).length
}

//字符串计数
function countNum(char) {
    var index = 0,
        index1 = 0,
        count = 0;
    string = $('main').html();
    for (var i = 0; i < string.length && (index1 != -1); i++) {
        index1 = string.indexOf(char, index);
        index = index1 + 1;
        count = i;
    }
    return count;
}

function insertLib() {
    var minimongo = require('minimongo');
    var LocalDb = minimongo.MemoryDb;
    var db = new LocalDb();
    db.addCollection('huangLi');
    window.Huangli = db.huangLi;
    //基本黄历
    Huangli.insert({
        type: 'basic',
        used: false,
        name: '发宣传贴',
        good: '会来妹子',
        bad: '会来熊孩子'
    });
    Huangli.insert({
        type: 'basic',
        used: false,
        name: '装插件',
        good: '插件用处很大',
        bad: '会崩服'
    });
    Huangli.insert({
        type: 'basic',
        used: false,
        name: '汉化插件',
        good: '玩家容易看懂中文',
        bad: '会乱码'
    });
    Huangli.insert({
        type: 'basic',
        used: false,
        name: '做主城',
        good: '会很好看',
        bad: '会很难看'
    });
    Huangli.insert({
        type: 'basic',
        used: false,
        name: '使用WE',
        good: '能帮助建筑',
        bad: '会卡服'
    });
    Huangli.insert({
        type: 'basic',
        used: false,
        name: '设置NPC',
        good: '增加服务器特色',
        bad: '会被玩家拿来刷东西'
    });
    Huangli.insert({
        type: 'basic',
        used: false,
        name: '改插件配置文件',
        good: '服务器会更好玩',
        bad: '会导致全服OP'
    });
    Huangli.insert({
        type: 'basic',
        used: false,
        name: '收赞助',
        good: '会是土豪',
        bad: '会引起纠纷'
    });
    Huangli.insert({
        type: 'basic',
        used: false,
        name: '在妹子面前吹牛',
        good: '改善你矮穷挫的形象',
        bad: '会被嫌弃'
    });
    Huangli.insert({
        type: 'basic',
        used: false,
        name: '上MCBBS',
        good: '能很快升级',
        bad: '会被%mcbbs%教育'
    });
    Huangli.insert({
        type: 'basic',
        used: false,
        name: '去别的服务器打广告',
        good: '能拉到很多玩家',
        bad: '会被婊'
    });
    Huangli.insert({
        type: 'basic',
        used: false,
        name: '设置领地',
        good: '能保护建筑',
        bad: '还是会被拆'
    });
    Huangli.insert({
        type: 'basic',
        used: false,
        name: '洗澡',
        good: '你几天没洗澡了?',
        bad: '会没热水'
    });
    Huangli.insert({
        type: 'basic',
        used: false,
        name: '上贴吧',
        good: '很快就能升级',
        bad: false
    });
    Huangli.insert({
        type: 'basic',
        used: false,
        name: '使用Dynmap',
        good: '能让玩家方便查看世界地图',
        bad: '硬盘会爆炸'
    });
    Huangli.insert({
        type: 'basic',
        used: false,
        name: '自称腐竹',
        good: '看起来更资深',
        bad: '别人会以为你是卖菜的'
    });
    Huangli.insert({
        type: 'basic',
        used: false,
        name: '删插件',
        good: '服务器会更流畅',
        bad: '玩家会生气'
    });


    //饮料
    for (var drink of['水', '茶', '龙井茶', '红茶', '绿茶', '咖啡', '奶茶', '可乐', '鲜奶', '豆奶', '果汁', '果味汽水', '苏打水', '运动饮料', '酸奶', '酒', '蜂蜜']) {
        Huangli.insert({
            type: '%drink%',
            used: false,
            name: drink
        });
    }


    //设备
    //插件
    //mcbbs
    for (var mcbbs of['混乱', 'rom718', 'icrdr', 'john180', 'pogox', '爱国青年', 'SkyCatcher', '乙烯_中国', 'Grandiose', 'sjjklh']) {
        Huangli.insert({
            type: '%mcbbs%',
            used: false,
            name: mcbbs
        });
    }


    //方向
    for (var direction of['北方', '东北方', '东方', '东南方', '南方', '西南方', '西方', '西北方']) {
        Huangli.insert({
            type: '%direction%',
            used: false,
            name: direction
        });
    }


    //Bat位置
    for (var bat of['左上角', '右上角', '右下角', '左下角', '中央', '上面', '下面', '右边', '左边']) {
        Huangli.insert({
            type: '%bat%',
            used: false,
            name: '放在屏幕<span class="bigBlue">' + bat + '</span>'
        });
    }
    Huangli.insert({
        type: '%bat%',
        used: false,
        name: '<span class="bigBlue">最小化</span>'
    });
    Huangli.insert({
        type: '%bat%',
        used: false,
        name: '<span class="bigBlue">全屏</span>'
    });
}
