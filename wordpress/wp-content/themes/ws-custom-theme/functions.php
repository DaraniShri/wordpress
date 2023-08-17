<?php
    require 'classes/shortCode.php';
    require 'classes/customPost.php';
    require 'classes/getPostsAPI.php';


    add_action( 'wp_enqueue_scripts', 'add_custom_js',20);
    function add_custom_js() {
        wp_enqueue_script( 'samplecustomjs', get_stylesheet_directory_uri(). '/assets/js/script.js' );
    }

    add_action( 'wp_enqueue_scripts', 'add_dependency_scripts',18);
    function add_dependency_scripts() {
        wp_enqueue_script( 'samplescriptdependency', get_template_directory_uri() . '/assets/js/jquery.min.js');
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