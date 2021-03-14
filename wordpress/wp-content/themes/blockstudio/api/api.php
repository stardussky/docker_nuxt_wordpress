<?php
// 集中管理所有的 wordpress ajax
include 'mail.php';
include 'get_option.php';
include 'get_languages.php';
include 'get_index.php';

add_action('rest_api_init', function(){
    register_rest_route('api', '/options', [
        'methods' => 'GET',
        'callback' => 'get_options'
    ]);
    register_rest_route('api', '/languages', [
        'methods' => 'GET',
        'callback' => 'get_languages'
    ]);
    register_rest_route('api', '/index', [
        'methods' => 'GET',
        'callback' => 'get_index'
    ]);
});
