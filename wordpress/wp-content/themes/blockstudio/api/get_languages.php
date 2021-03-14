<?php
(function(){
    function get_languages(){
        $response['code'] = 200;
        $response['data'] = wpm_get_languages();
    
        return new WP_REST_Response($response, 123);
    }
})();