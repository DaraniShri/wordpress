<?php 
get_header(); ?>
<div class="container">
    <?php
        if ( have_posts() ) :
            while( have_posts() ) : the_post() ;
                echo the_title();
                echo the_content();
                echo "<br>";
            endwhile;
        endif;        
    ?>
</div>
<?php get_footer(); ?>