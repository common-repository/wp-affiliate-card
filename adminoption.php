<?php

  if ( ! defined( 'ABSPATH' ) ) exit;

  $post_ac_option = $_POST['ac_option'];

  if ( isset($post_ac_option)) {
      check_admin_referer('afficardOption');
      $post_ac_option = array_map( function($str){ return ((int)$str); }, $post_ac_option );
      update_option('affiliate_card_option', $post_ac_option, 'no');
  ?>

    <div class="updated fade"><p><strong><?php _e('Options saved.'); ?></strong></p></div>

  <?php
  }
?>


<style>
  #afficardOption label {
    margin-right: 1em;
  }
  #afficardOption h1 {
    padding: 10px 10px;
    margin-bottom: 50px;
    background-color: #fff;
    font-size: 1.8em;
  }
  #afficardOption h2 {
    border-bottom: 1px dotted #999;
  }
</style>

<div id="afficardOption">

    <h1>アフィカード設定</h1>

    <h2>リンク項目設定</h2>
    <p>記事投稿・編集画面にて、リンク項目の表示・非表示を選択できます。<br>
    お使いにならない項目を非表示にしてください。</p>
    <p>※ CSSで表示を切り替えているだけですので、すでにURLが入力されている部分はアフィリエイトボタンとして記事に表示され続けます<br>
    ※ この設定はプラグインのアンイストール時にデータベースより削除されます</p>
    <form method="post" action="">
        <?php
            wp_nonce_field('afficardOption');
            $ac_option = get_option('affiliate_card_option');
        ?>
        <table class="form-table">
             <tbody>
                 <tr>
                      <th>Amazon</th>
                      <td>
                        <label><input type="radio" name="ac_option[url_amazon]" value="0"<?php
                        if(!$ac_option['url_amazon']){
                          echo ' checked';
                        }
                        ?>>表示する</label>
                        <label><input type="radio" name="ac_option[url_amazon]" value="1"<?php
                        if($ac_option['url_amazon']){
                          echo ' checked';
                        }
                        ?>>非表示</label>
                      </td>
                 </tr>
                 <tr>
                      <th>Rakuten</th>
                      <td>
                        <label><input type="radio" name="ac_option[url_rakuten]" value="0"<?php
                        if(!$ac_option['url_rakuten']){
                          echo ' checked';
                        }
                        ?>>表示する</label>
                        <label><input type="radio" name="ac_option[url_rakuten]" value="1"<?php
                        if($ac_option['url_rakuten']){
                          echo ' checked';
                        }
                        ?>>非表示</label>
                      </td>
                 </tr>
                 <tr>
                      <th>Yahoo</th>
                      <td>
                        <label><input type="radio" name="ac_option[url_yahoo]" value="0"<?php
                        if(!$ac_option['url_yahoo']){
                          echo ' checked';
                        }
                        ?>>表示する</label>
                        <label><input type="radio" name="ac_option[url_yahoo]" value="1"<?php
                        if($ac_option['url_yahoo']){
                          echo ' checked';
                        }
                        ?>>非表示</label>
                      </td>
                 </tr>
                 <tr>
                      <th>Yodobashi</th>
                      <td>
                        <label><input type="radio" name="ac_option[url_yodobashi]" value="0"<?php
                        if(!$ac_option['url_yodobashi']){
                          echo ' checked';
                        }
                        ?>>表示する</label>
                        <label><input type="radio" name="ac_option[url_yodobashi]" value="1"<?php
                        if($ac_option['url_yodobashi']){
                          echo ' checked';
                        }
                        ?>>非表示</label>
                      </td>
                 </tr>
             </tbody>
        </table>
    <?php submit_button(); ?>
    </form>


</div><!-- #afficardOption -->

