<?php

/**
 * Enqueue front end JavaScript and CSS
 */
if ( ! function_exists( 'rodller_blocks_frontend_scripts' ) ):
	function rodller_blocks_frontend_scripts() {
		wp_register_script( 'rodller-blocks-frontend-js', RODLLER_BLOCKS_DIR_URI . '/assets/js/frontend.js' , [ 'jquery' ], RODLLER_BLOCKS_VERSION );
		
		wp_localize_script( 'rodller-blocks-frontend-js', 'rodller_blocks_frontend', rodller_blocks_get_frontend_js_settings());
		
		wp_enqueue_script('rodller-blocks-frontend-js');
		
		wp_enqueue_style( 'rodller-blocks-css', RODLLER_BLOCKS_DIR_URI . '/assets/css/blocks.style.css' , [ 'wp-blocks' ], RODLLER_BLOCKS_VERSION );
	}
endif;
add_action( 'enqueue_block_assets', 'rodller_blocks_frontend_scripts' );

if(!function_exists('rodller_blocks_get_frontend_js_settings')):
    function rodller_blocks_get_frontend_js_settings(){
        $settings = [
	        'ajaxurl' => admin_url('admin-ajax.php')
        ];
        
        return apply_filters('rodller_blocks_modify_frontend_js_settings', $settings);
    }
endif;