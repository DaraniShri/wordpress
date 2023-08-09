<?php 
    class customPost{
        function __construct(){
            add_action( 'init',array(get_called_class(), 'register_news_cpt' ));
        }

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
    }

    $custompost=new customPost();

?>