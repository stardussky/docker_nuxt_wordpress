<?php
function get_archive_news($request)
{
    $response['status'] = 200;

    $post_type = 'news';

    $fields = get_fields($post_type . '_options');
    $posts = get_posts([
        'post_type' => $post_type,
    ]);

    $response['data'] = (object) [
        'fields' => $fields,
        'seo' => $fields['seo'],
        'posts' => $posts
    ];

    return new WP_REST_Response($response, $response['status']);
}
