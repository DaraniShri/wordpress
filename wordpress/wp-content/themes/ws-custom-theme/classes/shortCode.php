<html>
    <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    </head>
    <body>
        <?php
            class shortCode{

                /**
                 * Fetches recent posts from the database.
                 * Function does not print anything, but rather returns a string.
                 * 
                 * @return  string with a link.
                 */

                function __construct(){
                    add_shortcode('recent-posts',array(get_called_class(),'recent_posts_function'));
                }

                public function recent_posts_function() {
                    query_posts(array('orderby' => 'date', 
                                    'order' => 'DESC' , 
                                    ));
                    if (have_posts()) :
                        $post_details='';
                        ?>
                        <div class="h1">
                            <h1>Recent Posts</h1>
                        </div>
                        <div class="h3">
                            <p>Our Most Popolar Posts</p>
                        </div>
                        <div class="container">
                            <div class="row">
                                <?php
                                while (have_posts()) : the_post();
                                    $post_Id = get_the_ID();
                                    $args = array( 'post_id' => $post_Id,
                                                    'post_title' => get_the_title(),
                                                    'post_thumbnail' => get_the_post_thumbnail($post_Id,'medium'),
                                                    'post_date' => get_the_date(),
                                                );
                                    get_template_part('templates/custom','template',$args);
                                endwhile;
                                ?>
                            </div>
                        </div>
                        <?php
                    endif;
                    wp_reset_query();
                    return $post_details;
                }
            }
            $short_code=new shortCode();
        ?>
    </body>
</html>