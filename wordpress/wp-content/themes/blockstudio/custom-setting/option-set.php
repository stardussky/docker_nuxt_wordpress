<?php
function optionSetArray()
{
    // option 設定，如果使用多語系套件，需要去 wp-multilang/core-config.json 內的 options 增加，才會有翻譯
    return array(
        array(
            'label' => '網站設定',
            'id' => 'websiteSetting',
            'list' => array(
                array('option' => 'blogname', 'title' => '網站名稱'),
                array('option' => 'email', 'title' => 'E-Mail'),
            ),
        ),
        array(
            'label' => '固定文案',
            'id' => 'fixedText',
            'list' => array(
                array('option' => 'copyright', 'title' => 'copyright'),
            ),
        ),
    );
}
function startOption($lang = null)
{
    // 一次叫出所有的 option 陣列
    $optionList = [];
    $listArray = optionSetArray();
    foreach ($listArray as $subGroup):
        foreach ($subGroup['list'] as $option):
            $optionList[$option['option']] = get_option($option['option']);
        endforeach;
    endforeach;
    return $optionList;
}

