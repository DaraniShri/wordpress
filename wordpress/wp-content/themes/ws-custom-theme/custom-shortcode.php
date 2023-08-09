<?php

    /**
     * Fetches recent posts from the database.
     * Function does not print anything, but rather returns a string.
     * 
     * @return  string with a link to it.
     */

    function recent_posts_function() {
        query_posts(array(
            'orderby' => 'date', 
            'order' => 'DESC' , 
            'showposts' => 3));
        if (have_posts()) :
            while (have_posts()) : the_post();
                $post_details = '<a href="'.get_permalink().'">'.get_the_title().'</a>';
            endwhile;
        endif;
        wp_reset_query();
        return $post_details;
    }

    function register_shortcodes(){
        add_shortcode('recent-posts', 'recent_posts_function');
    }

    add_action( 'init', 'register_shortcodes');
?>