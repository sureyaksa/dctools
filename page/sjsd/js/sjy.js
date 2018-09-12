var _tree = null;

var mysql = '../../../web/lib/images/mysql_icon.png';
var db2 = '../../../web/lib/images/db2.png';
var oracle = '../../../web/lib/images/oracle_icon.png';
var user = '../../../web/lib/images/user.png';
var save = '../../../web/lib/images/save.gif';

var _treeData = [{
        text: 'oracle数据库',
        icon: oracle,
        type: 'oracle',
        children: [{
                text: '[决策一包][cxtj]',
                icon: user
            },
            {
                text: '[决策一包][zgzl]',
                icon: user
            },
            {
                text: '[决策一包][dqy]',
                icon: user
            },
            {
                text: '[决策一包][kjhs]',
                icon: user
            }
        ]
    },
    {
        text: 'MySql数据库',
        icon: mysql,
        type: 'mysql',
        children: [{
            text: '[测试环境][root]',
            icon: user
        }, {
            text: '[测试环境][test]',
            icon: user
        }]
    },
    {
        text: 'DB2数据库',
        icon: db2,
        type: 'db2',
        children: [{
            text: '[测试环境][microsoft]',
            icon: user
        }]
    }
];

$(function () {


    alert($.cookie('_iframeHeight'));
    alert($.cookie('_iframeWidth'));

    var height = document.body.clientHeight - 6;

    $('.dbTreePanel').css('height', height);

    //数据库连接树
    _tree = $('#tree').ligerTree({
        nodeWidth: 220,
        data: _treeData,
        checkbox: false
    });


    //右键菜单
    var menu = $.ligerMenu({
        top: 100,
        left: 100,
        width: 120,
        items: [{
            id: 'ref',
            text: '刷新',
            click: ref
        }]
    });

    $(document).bind("contextmenu", function (e) {
        menu.show({
            top: e.pageY,
            left: e.pageX
        });
        return false;
    });

    $('.savebtn').ligerButton({
        width: 50,
        icon: save
    });

    $('.addbtn').bind('click', function () {
        if (_tree.getSelected() != null && _tree.getSelected().data.type != null) {
            console.log(_tree.getSelected().data.type);
        }
    })

    $('.delbtn').bind('click', function () {
        if (_tree.getSelected() != null && _tree.getSelected().data.type == null) {
            console.log(_tree.getSelected().data);
        }
    })

    $('.savebtn').bind('click', function () {

    })

});

$(window).resize(function () {
    
    height = document.body.clientHeight - 6;
    $('.dbTreePanel').css('height', height);
});

function ref() {
    window.location.reload();
}

function itemclick() {

}