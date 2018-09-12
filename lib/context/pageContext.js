//右键菜单替换
$(function () {
    context.init({preventDoubleContext: false});

    context.attach('html', [
        {header: '刷新'},
        {
            text: '刷新',
            action: function (e) {
                window.parent.loadpage(window.parent.$("#custom_url").val());
            }
        }
    ]);

    $(document).on('mouseover', '.me-codesta', function () {
        $('.finale h1:first').css({opacity: 0});
        $('.finale h1:last').css({opacity: 1});
    });

    $(document).on('mouseout', '.me-codesta', function () {
        $('.finale h1:last').css({opacity: 0});
        $('.finale h1:first').css({opacity: 1});
    });
});