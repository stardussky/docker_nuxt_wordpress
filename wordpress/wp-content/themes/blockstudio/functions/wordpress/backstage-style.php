<?php
// 目的：設定 WP 後台樣式
// add_action('admin_head', function () {
//     // 後台css引入
//     echo '<link rel="stylesheet" type="text/css" href="' . get_bloginfo('template_url') . '/src/style/admin.css">';
// });

add_editor_style(array('src/style/adminEditor.css')); // 後台可見即所得樣式