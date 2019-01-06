<?php

/**
 * Enqueue block editor only JavaScript and CSS
 */
if ( ! function_exists( 'rodller_blocks_editor_scripts' ) ):
	function rodller_blocks_editor_scripts() {
		wp_register_script( 'rodller-blocks-js', RODLLER_BLOCKS_DIR_URI . 'assets/js/editor.blocks.js', [
			'wp-i18n',
			'wp-element',
			'wp-blocks',
			'wp-editor',
			'wp-components',
			'wp-api',
		], RODLLER_BLOCKS_VERSION );
		
		wp_localize_script( 'rodller-blocks-js', 'rodller_blocks', rodller_blocks_get_editor_js_settings() );
		
		wp_enqueue_script( 'rodller-blocks-js' );
		
		wp_enqueue_style( 'rodller-blocks-editor-css', RODLLER_BLOCKS_DIR_URI . 'assets/css/blocks.editor.css' , [ ], RODLLER_BLOCKS_VERSION );
		
		wp_enqueue_style( 'rodller-blocks-font-awesome-css', RODLLER_BLOCKS_DIR_URI . '/assets/css/all.css' , [ ], '5.6.3' );
	}
endif;
add_action( 'enqueue_block_editor_assets', 'rodller_blocks_editor_scripts' );

if(!function_exists('rodller_blocks_enqueue_frontend_scripts')):
    function rodller_blocks_enqueue_frontend_scripts(){
	    wp_enqueue_style( 'hehsed-core-frontend-css', RODLLER_BLOCKS_DIR_URI . 'assets/css/blocks.style.css' , [], RODLLER_BLOCKS_VERSION );
	
	    wp_enqueue_script( 'hehsed-core-frontend-js', RODLLER_BLOCKS_DIR_URI . 'assets/js/frontend.js' , ['jquery'], RODLLER_BLOCKS_VERSION );
    }
endif;
add_action( 'wp_enqueue_scripts', 'rodller_blocks_enqueue_frontend_scripts' );

if ( ! function_exists( 'rodller_blocks_get_js_settings' ) ):
	function rodller_blocks_get_editor_js_settings() {
		$settings = apply_filters( 'rodller_blocks_modify_editor_js_settings', [
			'layouts' => [
				'a' => [
					'value' => 'a',
					'label' => 'Layout A',
					'order' => ['image', 'title', 'meta', 'excerpt'],
					'columns' => ['12'],
					'image_size' => 'large'
				],
			],
		] );
		
		return $settings;
	}
endif;