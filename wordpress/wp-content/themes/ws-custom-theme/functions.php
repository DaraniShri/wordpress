<?php
    require 'classes/shortCode.php';
    require 'classes/customPost.php';

    add_action( 'wp_enqueue_scripts', 'add_custom_js',20);
    function add_custom_js() {
        wp_enqueue_script( 'samplecustomejs', get_stylesheet_directory_uri(). '/assets/js/script.js' );
    }

    // $addMetaValues=apply_filters('writeMeta',1,'meta_description','post meta value');

    // add_filter('writeMeta','storeMetaPost',10,3);

    // function storeMetaPost( $post_id, $meta_key, $meta_value) {
    //     $the_post = wp_is_post_revision( $post_id );
    //     if ( $the_post ) {
    //         $post_id = $the_post;
    //     }
    
    //     return add_post_meta( 'post', $post_id, $meta_key, $meta_value);
    // }    
?>