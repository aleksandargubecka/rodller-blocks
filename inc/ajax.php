<?php

add_action( 'wp_ajax_rodller_blocks_loadmore', 'rodller_blocks_loadmore_ajax_handler' );
add_action( 'wp_ajax_nopriv_rodller_blocks_loadmore', 'rodller_blocks_loadmore_ajax_handler' );

if(!function_exists('rodller_blocks_loadmore_ajax_handler')):
    function rodller_blocks_loadmore_ajax_handler(){
	
		$attributes = $_POST['attributes'];
		$page = $_POST['page'];
		$found = $_POST['found'];
	
	    $page++;
	
	    $html = rodller_posts_block_render($attributes, $page, ['before' => '', 'after' => '', 'allow_load_more' => false]);
		
	    wp_send_json_success([
	    	'html' => $html,
		    'last' => intval($found) <= intval($attributes['postsToShow'] * intval($page)),
	    ] );
    }
endif;