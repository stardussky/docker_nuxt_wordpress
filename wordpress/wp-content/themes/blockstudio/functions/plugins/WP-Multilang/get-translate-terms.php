<?php
// 目的：取得語言 terms
// TODO: 未完成
function get_translate_terms($id, $postType) {
    $category = $postType . '_category';
    $terms = wp_get_post_terms($id, $category);
    if (sizeof($terms) > 0) {
        $translate_terms = array();
        foreach ($terms as $key => $term) {
            $translate_terms[] = wpm_translate_term(
                get_term_by('term_id', $term->term_id, $category, OBJECT, 'raw'),
                $category,
                'en'
            );
        }
        
        return $translate_terms;
    }
    return null;
}