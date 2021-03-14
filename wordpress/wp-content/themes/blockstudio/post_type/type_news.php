<?php
/** news
 *
 * @param Number 5 相對應的頁面ID
 * @param String $typeName 顯示名稱
 * @param String $postType postType名稱，將頁面中所有的news修改成想要的名稱
 */

// *** 註冊 post-type ***
add_action('init', 'create_type_news');
function create_type_news()
{
    $typeName = '最新消息'; // 後台標籤名稱設定
    register_post_type(
        'news', // 註冊名稱
        array(
            // *** 後台標籤介面設定，可以再優化，目前沒有多國語言介面 ***
            'labels' => array(
                'name' => $typeName . '列表',
                'singular_name' => $typeName . '列表',
                'add_new' => '新增' . $typeName,
                'add_new_item' => '新增' . $typeName,
                'edit' => '編輯',
                'edit_item' => '編輯' . $typeName,
                'new_item' => '新增' . $typeName,
                'view' => '查看',
                'view_item' => '查看' . $typeName,
                'search_items' => '搜尋' . $typeName,
                'not_found' => '沒有文章',
                'not_found_in_trash' => '沒有資料在垃圾桶',
                'parent' => '父層',
            ),
            // *** 後台標籤介面設定，可以再優化，目前沒有多國語言介面 ***
            'taxonomies' => array(
                'news_category', // 需要類別的時候註冊
                'other_category', // 可以註冊多個，甚至可以兩個 post-type 共用同一個 category
                'post_tag', // 需要標籤的時候註冊
            ),
            'public' => true, // 我也不太確定幹嘛的，要查API
            // 'menu_position' => 10, // 菜單位置
            'rewrite' => array('slug' => get_post_field('post_name', 5), 'with_front' => false), // 網址綁定某個頁面的網址，沒有綁定需求可以直接下字串
            'has_archive' => get_post_field('post_name', 5), // 設定是否有 archive 頁，網址綁定某個頁面的網址，沒有綁定需求可以直接下字串
            'menu_icon' => get_template_directory_uri() . '/post_type/image.svg', //顯示icon
            // *** 支援設定，有需要移除註解 ***
            'supports' => array( 
                // 'excerpt', // 節錄
                'title', // 標題
                'editor', // 編輯器
                // 'thumbnail', // 精選圖片
            ),
            // *** 支援設定，有需要移除註解 ***
            // *** 需要權限變化的時候取消註解 ***
            // 'map_meta_cap' => true,
            // 'capability_type' => 'news',
            // 'capabilities' => array(
            //     'create_posts' => "create_news",
            //     'edit_posts' => "edit_news",
            //     'edit_post' => "edit_news",
            //     'read_posts' => "read_news",
            //     'read' => "read_news",
            //     'edit_others_posts' => "edit_others_news",
            //     'publish_posts' => "publish_news",
            //     'read_private_posts' => "read_private_news",
            //     'delete_posts' => "delete_news",
            //     'delete_private_posts' => "delete_private_news",
            //     'delete_published_posts' => "delete_published_news",
            //     'delete_others_posts' => "delete_others_news",
            //     'edit_private_posts' => "edit_private_news",
            //     'edit_published_posts' => "edit_published_news",
            // ),
            // *** 需要權限變化的時候取消註解結束 ***
        )
    );
}
// *** 註冊 post-type ***


// *** 類別處理，如果沒有需要類別可移除 ***
function register_news_category()
{
    $typeName = '最新消息';

    // *** 後台標籤介面設定，可以再優化，目前沒有多國語言介面 ***
    $categorys = array(
        "name" => __($typeName . '分類', ''),
        "singular_name" => __($typeName . '分類', ''),
        "menu_name" => __($typeName . '分類', ''),
        "all_items" => __($typeName . '分類', ''),
        "edit_item" => __('編輯' . $typeName . '分類', ''),
        "view_item" => __('查看' . $typeName . '分類', ''),
        "update_item" => __('更新' . $typeName . '分類', ''),
        "add_new_item" => __('新增' . $typeName . '分類', ''),
        "new_item_name" => __('新增' . $typeName . '分類', ''),
        "parent_item" => __('父層', ''),
        "parent_item_colon" => __('父層', ''),
        "search_items" => __('搜尋', ''),
        "popular_items" => __('最受歡迎的', ''),
        "separate_items_with_commas" => __('分隔', ''),
        "add_or_remove_items" => __('新增或刪除', ''),
        "choose_from_most_used" => __('從最常使用的選取', ''),
        "not_found" => __('沒有資料', ''),
        "no_terms" => __('沒有資料', ''),
        "items_news_navigation" => __('列表導覽', ''),
        "items_news" => __('列表', ''),
    );
    // *** 後台標籤介面設定，可以再優化，目前沒有多國語言介面 ***


    $args = array(
        "label" => __($typeName . '分類', ''),
        "categorys" => $categorys,
        "public" => true,
        "hierarchical" => true,
        "label" => $typeName . '分類',
        "show_ui" => true,
        "show_in_menu" => true,
        "show_in_nav_menus" => true,
        "query_var" => true,
        "rewrite" => array( // 網址綁定某個頁面的網址，沒有綁定需求可以直接下字串
            'slug' => get_post_field('post_name', 5), 
            'with_front' => true, 
            'hierarchical' => false
        ),
        "show_admin_column" => true,
        "show_in_rest" => false,
        "rest_base" => "",
        "show_in_quick_edit" => true,
        'exclude_from_search' => false,

    );
    register_taxonomy("news_category", array("news"), $args); 
    // 第二個參數是註冊到特定的 post-type，可以是陣列註冊多個
}
add_action('init', 'register_news_category');
// *** 類別處理，如果沒有需要類別可移除 ***
