<?php
// 目的：設定語言陣列
function languageSet() {
    $array=array();
    if ( function_exists ( 'wpm_get_languages' ) && function_exists ( 'wpm_get_language' ) ){
        $lang_switcher = wpm_get_languages();
        foreach ($lang_switcher as $lang_key => $lang) {
            $array[$lang_key] = $lang['name'];
        }
    }
    return $array;
}