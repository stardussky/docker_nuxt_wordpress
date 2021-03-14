<?php

add_action('wp_ajax_mail', 'ajax_mail');
add_action('wp_ajax_nopriv_mail', 'ajax_mail');

function ajax_mail() {


    $formValue = json_decode(urldecode($_POST['value']));

    /** 變數說明
     *
     *  @param Object $formValue 回傳的 Object
     */
    // 使用者確認信 Contact
    // 客戶留底信 Spare
    // $formValue->contactMail 使用者輸入的信箱，根據前端的 key 值更換
    // $formValue->languageCheck 語言確認用 key 值
    // $formValue->contactName 使用者輸入的名字
    // $formValue->contactCheck 若有不同不同類型的表單，比如高流，在信件主旨加上前綴

    $contactArray = array( // 取出使用者輸入的信箱
        $formValue->contactMail->value
    );
    $spareArray = array( // 客戶需要留底的信箱陣列
        // get_option('contactEmail')
        'default@blockstudio.tw',
    );

    $language = $formValue->languageCheck->value; // 取得當前語言
    if ($language === 'en') {
        // 根據語言決定符號使用
        $split = ',';
    } else {
        $split = '、';
    }


    $subjectContact = '我們已收到您的資料'; // 使用者確認信主旨
    $subjectSpare = $formValue->contactCheck->value . '有新的申請'; // 客戶留底信主旨，若有不同不同類型的表單，信件主旨加上前綴


    // ****** 組合 html 開始 ******

    $body = '';

    foreach ($formValue as $key => $value) {

        if ($key === 'contactMail' || $key === 'languageCheck' || $key === 'contactName' || $key === 'contactCheck') {
            // 特殊 key 值不輸出
            continue;
        }

        // 目前的資料結構是每一個 $value 都是 Object，包含 {value：傳送數值} 與 {label：顯示標籤}

        $fillLabel = $value->label;
        $fillValue = $value->value;
        if (!$fillValue) {
            continue;
        }

        $body = $body . $fillLabel . ' : ';
        if (is_array($fillValue)) {
            $length = count($fillValue);
            foreach ($fillValue as $subKey => $subValue) {
                if ($subKey === $length - 1) {
                    $body = $body . $subValue;
                } else {
                    $body = $body . $subValue . $split;
                }
            }
            $body = $body . '<br>';
        } else {
            $body = $body . $fillValue . '<br>';
        }

    }


    $bodySpare = $body; // 客戶留底信body，不需要加上聯絡資訊
    $bodyContact =
    '我們已收到您的資料，您填寫的資料如下：' . '<br><br>' .
    $body . '<br>' . '<br>' .
    '網站名稱' . '<br>' .
    '網站名稱英文' . '<br>' .
    get_option('phone') . '<br>' .
    get_home_url(); // 使用者確認信body，加上簽名檔

    // ****** 組合 html 結束 ******


    // ****** 處理 header 開始 ******

    $name = $formValue->contactName->value;  // 取得使用者輸入的名字
    $headersContact = array('Content-Type: text/html; charset=UTF-8'); // 使用者確認信headers
    $fromName = '=?UTF-8?B?' . base64_encode($name) . '?='; // 防止中文亂碼處理
    $headersSpare = array('From:' . $fromName . ' <' . $contactArray[0] . '>', 'Content-Type: text/html; charset=UTF-8'); // 客戶留底信headers

    // ****** 處理 header 結束 ******

    // ****** 寄信開始 ******

    foreach ($spareArray as $spareKey => $spareMail) { // 遍歷陣列送客戶留底信
        $mailResult[] = wp_mail($spareMail, $subjectSpare, $bodySpare, $headersSpare);
    }
    foreach ($contactArray as $contactKey => $contactMail) { // 遍歷陣列送使用者確認信
        $mailResult[] = wp_mail($contactMail, $subjectContact, $bodyContact, $headersContact);
    }
    
    // ****** 寄信結束 ******


    echo json_encode($mailResult);
    die();
}