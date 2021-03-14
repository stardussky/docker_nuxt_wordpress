<?php
(function(){
    function get_index(){
        $response['code'] = 200;

        $ID = 2;
        $response['data'] = wpm_translate_string(get_field('og', $ID));

        return new WP_REST_Response($response, 123);
    }
})();