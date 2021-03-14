<?php
// 目的：修改一頁出現幾篇，或是限制搜尋結果出現的postType
function wpa85791_category_posts_per_page($query) { // 分類分頁
    if (!is_admin()) {
        if (is_archive() && $query->is_main_query()) {
            $query->set('posts_per_page', 8);
        } else if ($query->is_search() && $query->is_main_query()) {
            //搜尋分頁
            $query->set('posts_per_page', 8);
            $query->set('post_type', array('news', 'article', 'course'));
        } else {
            $query->set('posts_per_page', -1);
        }
    }
}
add_action('pre_get_posts', 'wpa85791_category_posts_per_page');