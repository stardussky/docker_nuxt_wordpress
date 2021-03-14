<?php
// 目的：設定頁面陣列

function startPage()
{ // 頁面資料取得
    wp_reset_postdata();
    $nav = pageArray();
    foreach ($nav as $key => $menuItem):
        $pageId = $menuItem['id'];
        $navList[$menuItem['checkTitle']] = array(
            'title' => get_the_title($pageId),
            'link' => get_the_permalink($pageId),
            'id' => $pageId,
            'checkTitle' => $menuItem['checkTitle'],
        );
        if ( function_exists ( 'wpm_get_languages' ) && function_exists ( 'wpm_get_language' ) ){
            $enPost = get_translate_post($pageId, 'en');
            $navList[$menuItem['checkTitle']]['enTitle'] = isset($enPost->en_title) ? $enPost->en_title : $enPost->post_title;
        }
    endforeach;
    return $navList;
}

function pageArray()
{ // 頁面列表
    return array(
        // 首頁
        array(
            'id' => 2,
            'postType' => false,
            'checkTitle' => 'index',
        ),
        // 關於我們
        array(
            'id' => 3,
            'postType' => false,
            'checkTitle' => 'about',
        ),
        // 列表
        array(
            'id' => 5,
            'postType' => true,
            'checkTitle' => 'news',
        ),

    );
}