<?php
add_action('after_setup_theme', function () {
    require 'api/api.php'; // 引入 API
    require 'post_type/post_type.php'; // 設定 custom post type
    require 'functions/custom/init-option.php'; // 設定網站共用文字
    require 'functions/wordpress/_wordpress.php'; // 設定 WP 後台
    require 'custom-setting/custom-setting.php'; // 初始化 WP 設定


    if (!function_exists('is_login_page')) {
        function is_login_page() {
            return in_array(
                $GLOBALS['pagenow'],
                array('wp-login.php', 'wp-register.php'),
                true
            );
        }
    }

    if (is_login_page()) {
        // *** 設定登入頁樣式 ***
        add_action('login_head', function () {
            echo '<link rel="stylesheet" type="text/css" href="' . get_bloginfo('template_url') . '/src/style/adminLogin.css">';
        });
        // *** 設定登入頁樣式 ***
    }
    
    // *** 若為編輯，引入左側選單按鈕 ***
    $user = wp_get_current_user();
    if (in_array('editor', (array)$user->roles)) {
        require 'functions/custom/edit-menu-btn.php';
    }
    // *** 若為編輯，引入左側選單按鈕 ***

    if (is_admin()) {
        // require 'custom-functions/back-end/_back-end.php';
    } else {
        // require 'custom-functions/front-end/_front-end.php';
    }
});

add_filter( 'auto_update_theme', '__return_false' ); # 防止更新 WP 主題
add_filter( 'auto_update_plugin', '__return_false' ); # 防止更新套件
