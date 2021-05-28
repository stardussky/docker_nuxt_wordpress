<?php
function get_single_new($request)
{
    $response['status'] = 404;
    $response['error'] = 'Page Not Found';

    $post_type = 'news';
    $post_name = $request['post'];
    $post = get_post_by_name($post_name, $post_type);

    if ($post) {
        $response['status'] = 200;

        $fields = get_fields($post);
        $response['data'] = $fields;
    }

    return new WP_REST_Response($response, 123);
}
