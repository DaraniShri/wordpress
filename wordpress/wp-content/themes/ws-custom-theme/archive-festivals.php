<div class="wrapper">
    <div class="site-header" style="background-color:aqua">
        <?php 
        get_header(); ?>
    </div>
    <div class="container" style="background-color:white">
        <?php
            if ( have_posts() ) :
                while( have_posts() ) : the_post() ;
                    "<h2>".the_title()."</h2>";
                    echo the_content();
                    echo "<br>";
                endwhile;
            endif;        
        ?>
    </div>
    <div class="site-footer" style="background-color:aqua">
    <?php 
    get_footer(); ?>
    </div>
</div>