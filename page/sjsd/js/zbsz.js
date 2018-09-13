$(function () {

    $('.zbTreePanel').css('height', window.parent._iframeHeight - 6);

    $('.sjyselect').ligerComboBox({
        width: 288,
        slide: false,
        selectBoxWidth: 288,
        selectBoxHeight: 350,
        valueField: 'Sjy',
        textField: 'Sjy',
        resize:false,
        grid: getGridOptions(false)
    });

});

$(window).resize(function () {
    setTimeout(function () {
        $('.zbTreePanel').css('height', window.parent._iframeHeight - 6);
    }, 600);

});

var CustomersData = {
    Rows: [{
        "DbType": "Oracle",
        "Sjy": "cxtj"
    },{
        "DbType": "Oracle",
        "Sjy": "zgzl"
    },{
        "DbType": "Oracle",
        "Sjy": "dqy"
    },{
        "DbType": "Oracle",
        "Sjy": "kjhs"
    },{
        "DbType": "MySql",
        "Sjy": "root"
    },{
        "DbType": "MySql",
        "Sjy": "test"
    },{
        "DbType": "DB2",
        "Sjy": "microsoft"
    }],
    Total: 10
};

function getGridOptions(checkbox) {
    var options = {
        columns: [{
                display: '类型',
                name: 'DbType',
                align: 'left',
                width: 120,
                minWidth: 40
            },
            {
                display: '数据源',
                name: 'Sjy',
                minWidth: 100,
                width: 60
            }
        ],
        switchPageSizeApplyComboBox: false,
        data: $.extend({}, CustomersData),
        hideLoadButton:true,
        pageSize: 10,
        checkbox: false
    };
    return options;
}