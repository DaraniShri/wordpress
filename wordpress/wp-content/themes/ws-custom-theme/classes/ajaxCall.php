<?php
    include '../../../../wp-config.php';
    
    $args = array(
        'post_type'   => 'festivals',
        'numberposts' => 10,
    );
    $festivals = get_posts( $args );
    if($festivals){
        $responseArray = [];
        foreach($festivals as $festival){
            $responseArray[] = array(
                'post_id' => $festival->ID,
                'post_name' => $festival->post_title,
                'post_description' => $festival->post_content,
                'post_date' => $festival->post_date,
            );
        }
        echo json_encode($responseArray);

    }
    else{
        echo "No posts are found";
    }
?>