<?php 
get_header(); ?>
<div class="container">
    <div class="row">
        <?php
            if ( have_posts() ) :
                while( have_posts() ) : the_post() ;
                ?>
                <div class="col-sm-4">
                    <?php
                        echo the_title();
                        echo the_content();
                        echo "<br>";
                    ?>
                </div>
                <?php
                endwhile;
            endif;        
        ?>
    </div>
</div>
<?php get_footer(); ?>