<?php

class getPostsAPI{
    public static function hookInitiate(){
        add_action( 'rest_api_init', array(get_called_class(),'add_post_api'));
    }

    public static function add_post_api(){
        register_rest_route( 'mypost/api', '/get-posts/', array(
            'methods' => 'GET',
            'callback' => array(get_called_class(),'get_post_data'),
        ));
    }

    public static function get_post_data(){
        $args = array(
            'post_type'   => 'festivals',
            'posts_per_page' => -1
        );
        $festivals = get_posts( $args );
        if ( empty( $festivals ) ) {
            return 0;
        }
        else{
            $responseArray = [];
            foreach($festivals as $festival){
                $postId=$festival->ID;
                $responseArray[] = array(
                    'post_id' => $festival->ID,
                    'post_name' => $festival->post_title,
                    'post_description' => get_the_excerpt($postId),
                    'post_date' => $festival->post_date,
                    'post_status' => $festival->post_status,
                );
            }
            return json_encode($responseArray);
        }
    }
}
$get_posts_api=new getPostsAPI();
$get_posts_api::hookInitiate();
?>