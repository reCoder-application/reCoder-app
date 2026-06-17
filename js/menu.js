// ヘッダーの開閉メニュー（jQueryでアニメーション）
// メニューボタン(#menu-box)を押すと、開閉ボックス(#submenu-content)が
// slideToggle でスーッと開いたり閉じたりする。
// ボックス内の「プライバシーポリシー」は通常の<a>リンクなので、押すとそのページへ遷移する。

$(function () {
    // メニューボタンのクリックで開閉ボックスをアニメーション開閉する
    // slideToggle(時間ms): 開いていれば閉じ、閉じていれば開く（高さ方向のアニメーション）
    $('#menu-box').on('click', function (e) {
        e.stopPropagation(); // クリックが下記の「外側クリックで閉じる」処理に伝わらないようにする
        $('#submenu-content').slideToggle(200);
    });

    // メニューの外側をクリックしたら、開いているボックスを閉じる
    $(document).on('click', function (e) {
        // クリックした場所がメニュー領域(.submenu)の外なら閉じる
        if (!$(e.target).closest('.submenu').length) {
            $('#submenu-content').slideUp(200);
        }
    });
});
