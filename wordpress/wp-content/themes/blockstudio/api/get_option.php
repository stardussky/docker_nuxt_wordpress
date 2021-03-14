<?php
(function(){
    function get_options(){
        $response['code'] = 200;
        $response['data'] = startOption();
    
        return new WP_REST_Response($response, 123);
    }
})();