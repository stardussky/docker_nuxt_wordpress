<?php
require_once 'router/mail.php';
require_once 'router/get_global_options.php';
require_once 'router/get_language.php';
require_once 'router/get_page_index.php';
require_once 'router/get_archive_news.php';
require_once 'router/get_single_new.php';

/**
 * origin api
 * wp-json/wp/v2/[router]
 */

add_action('rest_api_init', function () {
    register_rest_route('api', '/mail', [
        'methods' => 'POST',
        'callback' => 'api_send_mail',
        'args' => [
            'formValue' => [
                'required' => true,
            ]
        ]
    ]);
    register_rest_route('api', '/languages', array(
        'methods' => 'GET',
        'callback' => 'get_language'
    ));
    register_rest_route('api', '/global_options', array(
        'methods' => 'GET',
        'callback' => 'get_global_options'
    ));
    register_rest_route('api', '/index', [
        'methods' => 'GET',
        'callback' => 'get_page_index'
    ]);
    register_rest_route('api', '/news', [
        'methods' => 'GET',
        'callback' => 'get_archive_news'
    ]);
    register_rest_route('api', '/news-post/(?P<post>(%[0-9A-F]{2}|[^<>\'" %])+)', [
        'methods' => 'GET',
        'callback' => 'get_single_new'
    ]);
});
