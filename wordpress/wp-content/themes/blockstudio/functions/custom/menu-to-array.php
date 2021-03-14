<?php
// 目的：取得 menu 列表
function buildTree(array &$elements, $parentId = 0)
{
    $branch = array();
    foreach ($elements as &$element) {
        if ($element->menu_item_parent == $parentId) {
            $children = buildTree($elements, $element->ID);
            if ($children) {
                foreach ($children as $key => $value) {
                    $object_id = $children[$key]->object_id;
                    $title = null;
                    switch ($children[$key]->type) {
                        case 'post_type':
                            $title = get_the_title($object_id);
                            $children[$key]->title = $title;
                            break;
                        case 'taxonomy':
                            $term = get_term_by('id', $object_id, $children[$key]->object);
                            $children[$key]->title = $term->name;
                            break;
                        default:
                            break;
                    }
                    $object_id = null;
                }
                $element->menu_children = $children;
            }
            $branch[$element->ID] = $element;
            unset($element);
        }
    }
    return $branch;
}

// 一開始建立轉換過menu的純id矩陣，用來查詢所屬父層
function build_id_map($menu_arr)
{
    $menu = [];
    foreach ($menu_arr as $key => $link) {
        $menu[$link->object_id] = [];
        if ($link->menu_children) {
            foreach ($link->menu_children as $_key => $_link) {
                $menu[$link->object_id][] = $_link->object_id;
            }
        }
    }
    return $menu;
}

// 搭配build_id_map, 回傳$id所屬的父層的id
function get_parent_id($id, $arr) {
    foreach ($arr as $key => $link) {
        foreach ($link as $_key => $sub_link) {
            if ($sub_link == $id) {
                return $key;
            }
        }
    }
}

// 建立單一link回傳的格式
function build_link_format($link, $menu_id_map) {
    if (isset($link->menu_children)) {
        // 多層
        return array(
            'title' => isset($link->title) ? $link->title : null,
            'url' => isset($link->url) ? $link->url : null,
            'id' => (isset($link->object) and $link->object != 'custom') ? $link->object_id : '',
            'target' => isset($link->target) ? $link->target : null,
            'menu_children' => array_map('build_link_format', $link->menu_children, $menu_id_map) // 對子層 map tree，未來有興趣可開發多層
        );
    } else {
        // 單層
        return array(
            'title' => isset($link->title) ? $link->title : null,
            'url' => isset($link->url) ? $link->url : null,
            'id' => (isset($link->object) and $link->object != 'custom') ? $link->object_id : '',
            'target' => isset($link->target) ? $link->target : null
        );
    }
}

// 主要執行
function menu_to_array($menu_id)
{
    $items = wp_get_nav_menu_items($menu_id);
    // if ($menu_id == 'footer') {
    //     print_r($items);
    // }
    if (!$items) {
        return null;
    } else {
        $post_id_now = get_the_ID();
        $row_menu = buildTree($items, 0);
        // 建立查詢父層
        $menu_id_map = build_id_map($row_menu);
        // 要回傳的新格式陣列
        $new_menu = array();
        foreach ($row_menu as $key => $link) {
            // 傳進原本link的格式與查詢父層的陣列，建立新的格式
            $new_menu[] = build_link_format($link, isset($menu_id_map[$key]) ? $menu_id_map[$key] : $menu_id_map);
        }
        return $new_menu;
    }
}
