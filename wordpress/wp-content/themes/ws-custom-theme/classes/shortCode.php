<?php
    class shortCode{

        /**
         * Fetches recent posts from the database.
         * Function does not print anything, but rather returns a string.
         * 
         * @return  string with a link.
         */

         function __construct(){ 
            add_shortcode('static-posts',array(get_called_class(),'static_posts_function'));                       
            add_shortcode('recent-posts',array(get_called_class(),'recent_posts_function'));
            add_shortcode('custom-posts',array(get_called_class(),'custom_posts_function'));
            add_action('wp_enqueue_scripts',array(get_called_class(), 'posts_styles'));
        }

        public static function static_posts_function() {
            ?>
                <div class="static-container">
                    <div class="static-wrapper">
                        <?php
                            $args = array(
                                'post_type' => 'fashion',
                                'post_status' => 'publish',
                                'posts_per_page' => 4
                            );
                            $static_posts = new WP_Query( $args );
                            if ( $static_posts -> have_posts() ) {
                                while ( $static_posts -> have_posts() ) : $static_posts -> the_post();
                                    $args = array( 'post_title' => get_the_title(),
                                            'post_thumbnail' => wp_get_attachment_image(get_field('image_fashion')),
                                            'post_link' => get_permalink(),
                                        );
                                    ?>
                                    <div class="static-card">
                                        <?php
                                            get_template_part('templates/fashion','template',$args);
                                        ?>
                                    </div>
                                    <?php
                                endwhile;                                
                            }
                            wp_reset_query();
                        ?>
                    </div>
                </div>
            <?php
        }
        public static function recent_posts_function() {
            query_posts(array('orderby' => 'date', 
                            'order' => 'DESC' , 
                            ));
            if (have_posts()) :
                ?>
                <div class="h1">
                    <h1>Recent Posts</h1>
                </div>
                <div class="h3">
                    <h3>Our Most Popolar Posts</h3>
                </div>
                <div class="container">
                    <div class="wrapper">
                    <?php
                        $posts = array(
                            'post_status' => 'publish',
                            'posts_per_page' => 3
                        );
                        $recent_posts = new WP_Query( $posts );
                        while ($recent_posts -> have_posts()) : $recent_posts -> the_post();
                            $args = array(  'post_title' => get_the_title(),
                                            'post_thumbnail' => get_the_post_thumbnail_url(null,'medium'),
                                            'post_date' => get_the_date(),
                                        );
                            ?>
                            <div class="card">
                                <?php
                                    get_template_part('templates/custom','template',$args);
                                ?>
                            </div>
                            <?php
                        endwhile;
                        wp_reset_query();
                        ?>
                    </div>
                </div>
                <?php
            endif;
            wp_reset_query();
        }

        public static function custom_posts_function(){
                ?>
                <div class="custom-container">
                    <div class="h1">
                        <h1>Custom Posts</h1>
                    </div>
                    <div class="h3">
                        <h3>Our Custom Posts</h3>
                    </div>
                    <div class="custom-wrapper">
                        <?php
                            $args = array(
                                'post_type' => 'festivals',
                                'post_status' => 'publish',
                                'posts_per_page' => 5
                            );
                            $custom_posts = new WP_Query( $args );
                            if ( $custom_posts -> have_posts() ) {
                                while ( $custom_posts -> have_posts() ) : $custom_posts -> the_post();
                                    $post_id=get_the_ID();
                                    $args = array( 'post_id' => $post_id,
                                            'post_title' => get_the_title(),
                                            'post_thumbnail' => get_the_post_thumbnail_url(null,'medium'),
                                            'post_description' => get_the_excerpt(),
                                            'post_link' => get_permalink(),
                                        );
                                    ?>
                                    <div class="custom-card">
                                        <?php
                                            get_template_part('templates/festival','template',$args);
                                        ?>
                                    </div>
                                    <?php
                                endwhile;                                
                            }
                            wp_reset_query();
                        ?>
                    </div>
                </div>
                <?php                   
        }

        public static function posts_styles(){
            wp_enqueue_style( 'custom-css.css', get_stylesheet_directory_uri() . '/assets/css/custom-css.css', array(), time(), false );
        }

    }
    $short_code=new shortCode();
?>
