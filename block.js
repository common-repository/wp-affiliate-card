(function() {
    var el = wp.element.createElement,
        blocks = wp.blocks,
        RichText = wp.blockEditor.RichText,
        PlainText = wp.blockEditor.PlainText,
        RadioControl = wp.components.RadioControl,
        TextControl = wp.components.TextControl;

    blocks.registerBlockType('affiliate-card/basic', {
        title: 'アフィカード',
        icon: 'feedback',
        category: 'common',
        description: '商品リンクを複数表示するブロックです',
        keywords: ['aficard', 'アフィカード', 'あふぃかーど', 'affiliate', 'アフィリエイト', 'あふぃりえいと', 'card', 'カード', 'かーど', 'link', 'リンク', 'りんく'],
        attributes: {
            main_title: {
                type: 'string'
            },
            main_description: {
                type: 'string'
            },
            main_image: {
                type: 'string',
                source: 'attribute',
                selector: 'img',
                attribute: 'src'
            },
            url_amazon: {
                type: 'url'
            },
            url_rakuten: {
                type: 'url'
            },
            url_yahoo: {
                type: 'url'
            },
            url_yodobashi: {
                type: 'url'
            },
            main_link: {
                type: 'url',
                default: 'none',
            }
        },
        edit: function(props) {

            var now_main_title = props.attributes.main_title,
                now_main_description = props.attributes.main_description,
                now_main_image = props.attributes.main_image,
                now_url_amazon = props.attributes.url_amazon,
                now_url_rakuten = props.attributes.url_rakuten,
                now_url_yahoo = props.attributes.url_yahoo,
                now_url_yodobashi = props.attributes.url_yodobashi,
                now_main_link = props.attributes.main_link;

            return (
                el('div', {
                        className: 'aficard-wrapper',
                    },
                    el(
                        'div', {
                            className: 'aficard-header'
                        },
                        'Affiliate Card',
                        el('div', {
                            className: 'aficard-linkopener-button dashicons dashicons-search'
                        }),
                    ),
                    el( // main_title
                        PlainText, {
                            className: 'aficard-main_title',
                            value: now_main_title,
                            placeholder: '商品名',
                            onChange: function(newValue) {
                                props.setAttributes({ main_title: newValue });
                            },
                        },
                    ),

                    el('div', {
                            className: 'aficard-main_description_div'
                        },
                        el( // main_description
                            PlainText, {
                                className: 'aficard-main_description',
                                value: now_main_description,
                                placeholder: '補足文',
                                onChange: function(newValue) {
                                    props.setAttributes({ main_description: newValue });
                                },
                            },
                        )
                    ),

                    el(
                        TextControl, {
                            label: '画像URL',
                            className: 'aficard-url aficard-main_image',
                            value: now_main_image,
                            placeholder: 'https://',
                            onChange: function(newValue) {
                                props.setAttributes({ main_image: newValue.trim() });
                                show_tmb();
                            },
                        }
                    ),

                    el(
                        TextControl, {
                            label: 'Amazon',
                            className: 'aficard-url aficard-url_amazon',
                            value: now_url_amazon,
                            placeholder: 'https://',
                            onChange: function(newValue) {
                                props.setAttributes({ url_amazon: newValue.trim() });
                            },
                        }
                    ),

                    el(
                        TextControl, {
                            label: 'Rakuten',
                            className: 'aficard-url aficard-url_rakuten',
                            value: now_url_rakuten,
                            placeholder: 'https://',
                            onChange: function(newValue) {
                                props.setAttributes({ url_rakuten: newValue.trim() });
                            },
                        }
                    ),

                    el(
                        TextControl, {
                            label: 'Yahoo',
                            className: 'aficard-url aficard-url_yahoo',
                            value: now_url_yahoo,
                            placeholder: 'https://',
                            onChange: function(newValue) {
                                props.setAttributes({ url_yahoo: newValue.trim() });
                            },
                        }
                    ),

                    el(
                        TextControl, {
                            label: 'Yodobashi',
                            className: 'aficard-url aficard-url_yodobashi',
                            value: now_url_yodobashi,
                            placeholder: 'https://',
                            onChange: function(newValue) {
                                props.setAttributes({ url_yodobashi: newValue.trim() });
                            },
                        }
                    ),

                    el(
                        RadioControl, {
                            label: '商品名リンク',
                            className: 'aficard-mainlink',
                            selected: now_main_link,
                            options: [{
                                    label: 'なし',
                                    value: 'none'
                                }, {
                                    label: 'アマゾン',
                                    value: 'amazon'
                                },
                                {
                                    label: '楽天',
                                    value: 'rakuten'
                                },
                                {
                                    label: 'ヤフー',
                                    value: 'yahoo'
                                },
                                {
                                    label: 'ヨドバシ',
                                    value: 'yodobashi'
                                }
                            ],
                            onChange: function(newValue) {
                                props.setAttributes({ main_link: newValue });
                            },
                        },
                    ),

                )
            );
        },
        save: function(props) {
            var main_link_url;
            var main_link_image = main_link_title = url_amazon = url_rakuten = url_yahoo = url_yodobashi = '';
            // console.log(props.attributes);

            switch (props.attributes.main_link) {
                case 'none':
                    if (props.attributes.url_amazon) {
                        main_link_url = '';
                    }
                    break;
                case 'amazon':
                    if (props.attributes.url_amazon) {
                        main_link_url = props.attributes.url_amazon;
                    }
                    break;
                case 'rakuten':
                    if (props.attributes.url_rakuten) {
                        main_link_url = props.attributes.url_rakuten;
                    }
                    break;
                case 'yahoo':
                    if (props.attributes.url_yahoo) {
                        main_link_url = props.attributes.url_yahoo;
                    }
                    break;
                case 'yodobashi':
                    if (props.attributes.url_yodobashi) {
                        main_link_url = props.attributes.url_yodobashi;
                    }
                    break;
                default:
                    main_link_url = false;
                    break;
            }

            if (main_link_url) {
                main_link_image = el('a', {
                        className: 'afi_main_image_link',
                        href: main_link_url,
                        rel: 'noopener nofollow'
                    },
                    el('img', {
                        src: props.attributes.main_image,
                        className: 'afi_main_image'
                    }),
                );
                main_link_title = el('a', {
                        className: 'afi_main_title',
                        href: main_link_url,
                        rel: 'noopener nofollow'
                    },
                    props.attributes.main_title
                );
            } else {
                main_link_image = el('div', {
                        className: 'afi_main_image_link'
                    },
                    el('img', {
                        src: props.attributes.main_image,
                        className: 'afi_main_image'
                    }),
                );
                main_link_title = el('div', {
                        className: 'afi_main_title'
                    },
                    props.attributes.main_title
                );
            }

            if (props.attributes.url_amazon) {
                url_amazon = el('a', {
                    className: 'afi_link afi_url_amazon',
                    href: props.attributes.url_amazon,
                    rel: 'noopener nofollow'
                }, 'Amazon');
            }
            if (props.attributes.url_rakuten) {
                url_rakuten = el('a', {
                    className: 'afi_link afi_url_rakuten',
                    href: props.attributes.url_rakuten,
                    rel: 'noopener nofollow'
                }, '楽天');
            }
            if (props.attributes.url_yahoo) {
                url_yahoo = el('a', {
                    className: 'afi_link afi_url_yahoo',
                    href: props.attributes.url_yahoo,
                    rel: 'noopener nofollow'
                }, 'ヤフー');
            }
            if (props.attributes.url_yodobashi) {
                url_yodobashi = el('a', {
                    className: 'afi_link afi_url_yodobashi',
                    href: props.attributes.url_yodobashi,
                    rel: 'noopener nofollow'
                }, 'ヨドバシ');
            }

            return el('div', {
                    className: 'aficard'
                },
                main_link_image,

                el('div', {
                        className: 'afi_info',
                    },
                    main_link_title,
                    el(RichText.Content, {
                        tagName: 'div',
                        className: 'afi_main_description',
                        value: props.attributes.main_description,
                    }),
                    el('div', {
                            className: 'afi_button_link',
                        },
                        url_amazon,
                        url_rakuten,
                        url_yahoo,
                        url_yodobashi,
                    )

                ),
            );
        },
    });

    jQuery(document).on('click', '.aficard-linkopener-button', function() {
        jQuery(this).before('<input type="text" class="aficard-linkopener-input" />');
        jQuery(this).remove();
    });
    jQuery(document).on('keypress', '.aficard-linkopener-input', function(e) {
        if (e.which == 13) {
            var keyword = jQuery('.aficard-linkopener-input').val();
            if (jQuery('.aficard-linkopener-input').val() !== '') {
                all_open(keyword);
            }
        }
    });

})();


// function all_open(keyword) {
//     if (keyword !== '') {
//         window.open('https://www.amazon.co.jp/s/ref=sr_st_date-desc-rank?sort=date-desc-rank&keywords=' + keyword);
//         window.open('https://affiliate.rakuten.co.jp/search?sitem=' + keyword);
//         window.open('https://shopping.yahoo.co.jp/search?p=' + keyword);
//         window.open('https://www.yodobashi.com/?word=' + keyword);
//     }
// }

function show_tmb() {
    var temp;
    jQuery('.aficard-main_description_tmb').remove();
    jQuery('.aficard-main_image input').each(function(index, element) {
        temp = jQuery(element).val();
        if (temp) {
            jQuery('.aficard-main_description').eq(index).before('<div class="aficard-main_description_tmb"><img src="' + temp + '" /></div>');
        }
    });
}

wp.domReady(function() {
    show_tmb();
});