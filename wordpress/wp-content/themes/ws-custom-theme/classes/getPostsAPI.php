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
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'tax_query' => array(
                array(
                    'taxonomy' => 'religions',
                    'field' => 'slug',
                    'terms' => array('hinduism', 'christianity', 'islam', 'buddhism')
                )
            ),
        );
        $festivals = get_posts( $args );
        if ( empty( $festivals ) ) {
            return 0;
        }
        else{
            $responseArray = [];
            foreach($festivals as $festival){
                $postId=$festival->ID;
                $post_type = $festival->post_type;
                $terms = get_the_terms($postId, 'religions' );
                foreach($terms as $term) {
                    $responseArray[] = array(
                        'post_id' => $festival->ID,
                        'post_name' => $festival->post_title,
                        'post_description' => get_the_excerpt($postId),
                        'post_date' => $festival->post_date,
                        'post_status' => $festival->post_status,
                        'post_category' => $term->name,
                        'post_term_id' => $term->term_id,
                    );
                }
            }
            return json_encode($responseArray);
        }
    }
}
$get_posts_api=new getPostsAPI();
$get_posts_api::hookInitiate();
?>