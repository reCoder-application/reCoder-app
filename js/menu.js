// ヘッダーの開閉メニュー（左から出るドロワー）
// メニューボタン(#menu-box)を押すと、ドロワー(#submenu-content)と
// 背景の暗幕(#drawer-overlay)に "open" クラスを付け外しする。
// 実際のスライドや暗幕のフェードは、CSS側の transition が担当する。
// open クラスが付く  → CSSで left:0 になり、左から画面内へスライドイン
// open クラスが外れる → CSSで left:-300px に戻り、左外へスライドアウト

$(function () {
    // ドロワーを開く：本体と暗幕の両方に open を付ける
    function openDrawer() {
        $('#submenu-content').addClass('open');
        $('#drawer-overlay').addClass('open');
    }

    // ドロワーを閉じる：両方から open を外す
    function closeDrawer() {
        $('#submenu-content').removeClass('open');
        $('#drawer-overlay').removeClass('open');
    }

    // メニューボタンで開閉を切り替える
    // onメソッドでイベントを設定
    $('#menu-box').on('click', function (e) {
        e.stopPropagation();
        if ($('#submenu-content').hasClass('open')) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });

    // ドロワー内の「×」ボタンで閉じる
    $('#drawer-close').on('click', closeDrawer);

    // 背景の暗幕をタップしても閉じる
    $('#drawer-overlay').on('click', closeDrawer);
});
