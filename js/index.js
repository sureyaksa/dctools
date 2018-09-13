//创建标签页
var tab = null;
//手风琴面板，用于分割树
var accordion = null;
//菜单树
var tree = null;
//标签数组
var tabItems = [];
//
var _iframeHeight = 0;

$(function () {

    //创建布局面板
    $('#pageLayout').ligerLayout({
        leftWidth: 300,
        height: '100%',
        heightDiff: -34,
        allowLeftResize: false,
        onHeightChanged: f_heightChanged,
        onLeftToggle: function () {
            tab && tab.trigger('sysWidthChange');
            setWH2Cookie();
        },
        onRightToggle: function () {
            tab && tab.trigger('sysWidthChange');
            setWH2Cookie();
        }
    });

    //tab区域面板的高度
    var height = $(".l-layout-center").height();

    tab = $("#framecenter").ligerTab({
        height: height,
        showSwitchInTab: true,
        showSwitch: true,
        onAfterAddTabItem: function (tabdata) {
            tabItems.push(tabdata);
            saveTabStatus();
        },
        onAfterRemoveTabItem: function (tabid) {
            for (var i = 0; i < tabItems.length; i++) {
                var o = tabItems[i];
                if (o.tabid == tabid) {
                    tabItems.splice(i, 1);
                    saveTabStatus();
                    break;
                }
            }
        },
        onReload: function (tabdata) {
            var tabid = tabdata.tabid;
            addFrameSkinLink(tabid);
        }
    });

    //记录打开页面情况
    function saveTabStatus() {
        $.cookie('liger-home-tab', JSON2.stringify(tabItems));
    }

    //面板
    $("#menuPanel").ligerAccordion({
        height: height - 24,
        speed: null
    });

    $(".l-link").hover(function () {
        $(this).addClass("l-link-over");
    }, function () {
        $(this).removeClass("l-link-over");
    });

    //树
    $("#sjjcTree").ligerTree({
        data: sjjcTree,
        checkbox: false,
        slide: false,
        nodeWidth: 120,
        attribute: ['nodename', 'url'],
        render: function (a) {
            if (!a.isnew) return a.text;
            return '<a href="' + a.url + '" target="_blank">' + a.text + '</a>';
        },
        onSelect: function (node) {
            if (!node.data.url) return;
            if (node.data.isnew) {
                return;
            }
            var tabid = $(node.target).attr("tabid");
            if (!tabid) {
                tabid = new Date().getTime();
                $(node.target).attr("tabid", tabid)
            }
            f_addTab(tabid, node.data.text, node.data.url);
        }
    });

    //添加tab页面
    function f_addTab(tabid, text, url) {
        tab.addTabItem({
            tabid: tabid,
            text: text,
            url: url,
            callback: function () {}
        });
    }

    function f_heightChanged(options) {
        if (tab)
            tab.addHeight(options.diff);
        if (accordion && options.middleHeight - 24 > 0)
            accordion.setHeight(options.middleHeight - 24);
    }

    function pages_init() {
        var tabJson = $.cookie('liger-home-tab');
        if (tabJson) {
            var tabitems = JSON2.parse(tabJson);
            for (var i = 0; tabitems && tabitems[i]; i++) {
                f_addTab(tabitems[i].tabid, tabitems[i].text, tabitems[i].url);
            }
        }
    }

    //右键菜单
    var menu = $.ligerMenu({
        top: 100,
        left: 100,
        width: 120,
        items: [{
                id: 'ref',
                text: '刷新',
                click: ref
            }
        ]
    });

    $(document).bind("contextmenu", function (e) {
        menu.show({
            top: e.pageY,
            left: e.pageX
        });
        return false;
    });

    tab = liger.get("framecenter");
    accordion = liger.get("menuPanel");
    tree = liger.get("sjjcTree");

    setTimeout(function () {
        $('#pageloading').hide();
        setWH2Cookie();
    }, 500);

});

$(window).resize(function () {
    setWH2Cookie();
});

function setWH2Cookie() {
    
    setTimeout(function () {
        _iframeHeight = $('#pageLayout').height() - 28;
    }, 300);
    
}

function ref(){
    window.location.reload();
}