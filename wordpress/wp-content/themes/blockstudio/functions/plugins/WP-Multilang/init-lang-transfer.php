<?php
// 目的：增加後台 admin bar 語言編輯切換按鈕
if (function_exists('wpm_get_languages')) {
    function create_lang_transfer_menu()
    {
        global $wp_admin_bar;

        $user_language = wpm_get_language();
        $languages = wpm_get_languages();
        $langArray = languageSet();
        $menu_id = 'language-transfer';
        $wp_admin_bar->add_menu(
            array(
                'id' => $menu_id,
                'title' => '<span class="ab-icon">' .
                ($languages ? '<img src="' . esc_url(wpm_get_flag_url($languages[$user_language]['flag'])) . '"/>' : '') . '</span><span class="ab-label">' . $langArray[$user_language] . '</span>',
                'href' => null,
            )
        );

        foreach ($langArray as $code => $text) {
            if ($user_language !== $code) {
                $wp_admin_bar->add_menu(
                    array(
                        'parent' => $menu_id,
                        'title' => '<span class="ab-icon">' .
                        ($languages ? '<img src="' . esc_url(wpm_get_flag_url($languages[$code]['flag'])) . '"/>' : '') . '</span><span class="ab-label">' . $langArray[$code] . '</span>',
                        'id' => $menu_id . '-' . $code,
                        'href' => add_query_arg(array('edit_lang' => $code)),
                        'meta' => array('class' => $user_language === $code ? '-active' : null),
                    )
                );
            }
        }
    }
    add_action('admin_bar_menu', 'create_lang_transfer_menu', 2000);
}
