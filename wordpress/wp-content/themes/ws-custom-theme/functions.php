<?php
    add_action('wp_head', 'hook_javascript');

    function hook_javascript() {
        echo "Hello world...<br>";
        echo "This is an action hook";
    }

    $addMetaValues=apply_filters('writeMeta',1,'meta_description','post meta value');

    add_filter('writeMeta','storeMetaPost',10,3);

    function storeMetaPost( $post_id, $meta_key, $meta_value) {
        $the_post = wp_is_post_revision( $post_id );
        if ( $the_post ) {
            $post_id = $the_post;
        }
    
        return add_post_meta( 'post', $post_id, $meta_key, $meta_value);
    }

    add_action( 'init', 'register_news_cpt' );
    function register_news_cpt() {
        register_post_type( 'news',array(
                                    'labels' => 
                                        array(
                                            'name' => __( 'News' ),
                                            'singular_name' => __( 'News' ),
                                            'description' => __('Independent sources'),
                                        ),
                                        "description" => "All the news content will be posted with this type of post",
                                        'public' => true,
                                        'has_archive' => true,
                                        'rewrite' => array('slug' => 'news'),
                                    )
                            );
        }
?>