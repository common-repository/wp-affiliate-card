<?php
/*
Plugin Name: WP Affiliate Card
Author: Saboten24
Plugin URI: https://saboten24.net/2020/06/22/post1093/
Description: WP Affiliate Card
Version: 0.1
Author URI: https://saboten24.net/
*/

if ( ! defined( 'ABSPATH' ) ) exit;

// ブロックエディタ
add_action( 'enqueue_block_editor_assets', function() {
    wp_enqueue_script(
        'affiliate-card',
        plugins_url( 'block.js', __FILE__ ),
        [ 'wp-blocks', 'wp-element' ]
    );
    wp_enqueue_style(
        'affiliate-card-admin-style',
        plugins_url( 'style-admin.css', __FILE__ ),
        true
    );
});

add_action( 'wp_enqueue_scripts', function() {
    wp_enqueue_style(
        'affiliate-card-visitor-style',
        plugins_url( 'style-visitor.css', __FILE__ ),
        true
    );
});


// プラグインオプション メニュー
add_action( 'admin_menu', 'add_affiliate_card_admin_menu' );
function add_affiliate_card_admin_menu() {
    add_options_page(
        '設定｜アフィカード',
        'アフィカード',
        'administrator',
        'affiliate-card',
        'affiliate_card_plugin_admin_page'
    );
}
// プラグインオプション ページ
function affiliate_card_plugin_admin_page() {
    include_once( 'adminoption.php' );
}


// 管理者ページ用 プラグイン独自CSS、JavaScript
function affiliate_card_admin_script(){

    $ac_option = get_option('affiliate_card_option');
    $ac_css = $ac_script = '';

    if($ac_option){
        if($ac_option['url_amazon']){
            $ac_css .= '.aficard-url_amazon { display:none !important; }';
        } else {
            $ac_script .= "window.open('https://www.amazon.co.jp/s/ref=sr_st_date-desc-rank?sort=date-desc-rank&keywords=' + keyword);";
        }
        if($ac_option['url_rakuten']){
            $ac_css .= '.aficard-url_rakuten { display:none !important; }';
        } else {
            $ac_script .= "window.open('https://affiliate.rakuten.co.jp/search?sitem=' + keyword);";
        }
        if($ac_option['url_yahoo']){
            $ac_css .= '.aficard-url_yahoo { display:none !important; }';
        } else {
            $ac_script .= "window.open('https://shopping.yahoo.co.jp/search?p=' + keyword);";
        }
        if($ac_option['url_yodobashi']){
            $ac_css .= '.aficard-url_yodobashi { display:none !important; }';
        } else {
            $ac_script .= "window.open('https://www.yodobashi.com/?word=' + keyword);";
        }
    }

    if($ac_css){
        echo '<style>'.$ac_css.'</style>'.PHP_EOL;
    }

    if($ac_script){
        echo "<script>function all_open(keyword) { if (keyword !== '') {".$ac_script."}}</script>".PHP_EOL;
    }

}
add_action('admin_enqueue_scripts', 'affiliate_card_admin_script');


// プラグイン一覧にてプラグインオプションページへのリンクを追加
function affiliate_card_action_link($links, $file) {
  static $this_plugin;

  if (!$this_plugin) {
      $this_plugin = plugin_basename(__FILE__);
  }

  if ($file == $this_plugin) {
      $settings_link = '<a href="' . get_bloginfo('wpurl') . '/wp-admin/options-general.php?page=affiliate-card">設定</a>';
      array_unshift($links, $settings_link);
  }

  return $links;
}
add_filter('plugin_action_links', 'affiliate_card_action_link', 10, 2);


// Install plugin

function affiliate_card_activation_plugin() {
    $ac_option = get_option( 'affiliate_card_option' );
    if ( ! $ac_option ) {
        // Initialize
        $ac_option = array(
            'url_amazon' => '0',
            'url_rakuten' => '0',
            'url_yahoo' => '0',
            'url_yodobashi' => '0'
        );
        update_option( 'affiliate_card_option', $ac_option );
    } 
}
register_activation_hook( __FILE__, 'affiliate_card_activation_plugin' );

// Uninstall plugin

function affiliate_card_uninstall() {
    delete_option( 'affiliate_card_option' );
}
register_uninstall_hook( __FILE__, 'affiliate_card_uninstall' );