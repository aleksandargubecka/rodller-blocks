<?php
/**
 * Plugin Name: Rodller Blocks
 * Plugin URI: https://rodller.com
 * Description: Some Desc
 * Text Domain: rodller-blocks
 * Domain Path: /languages
 * Author: Rodller
 * Author URI: https://rodller.com
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package rodller
 */

//  Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

// Only load if Gutenberg is available.
// TODO add comments
if ( ! function_exists( 'register_block_type' ) ) {
	// TODO message user to install gutenberg if version of wordpress is less then 5
	return;
}

if ( ! function_exists( 'rodller_blocks_set_locale' ) ):
	function rodller_blocks_set_locale() {
		load_plugin_textdomain( 'rodller-blocks', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
	}
endif;
add_action( 'plugins_loaded', 'rodller_blocks_set_locale' );

if ( ! function_exists( 'rodller_blocks_get_registered_sidebars' ) ) :
	function rodller_blocks_get_registered_sidebars() {
		
		$sidebars[] = array(
			'value' => 'none',
			'label' => esc_html__( 'None', 'rodller-blocks' )
		);
		
		global $wp_registered_sidebars;
		
		if ( ! empty( $wp_registered_sidebars ) ) {
			
			foreach ( $wp_registered_sidebars as $sidebar ) {
				$sidebars[] = array(
					'value' => $sidebar['id'],
					'label' => $sidebar['name']
				);
			}
			
		}
		
		return $sidebars;
	}
endif;
/**
 * Enqueue block editor only JavaScript and CSS
 */
if ( ! function_exists( 'rodller_blocks_editor_scripts' ) ):
	function rodller_blocks_editor_scripts() {
		// Make paths variables so we don't write em twice ;)
		$blockPath       = '/assets/js/editor.blocks.js';
		$editorStylePath = '/assets/css/blocks.editor.css';
		
		// Enqueue the bundled block JS file
		wp_register_script( 'rodller-blocks-js', plugins_url( $blockPath, __FILE__ ), [
				'wp-i18n',
				'wp-element',
				'wp-blocks',
				'wp-components',
				'wp-api',
			], filemtime( plugin_dir_path( __FILE__ ) . $blockPath ) );
		
		wp_localize_script( 'rodller-blocks-js', 'rodller_blocks', rodller_blocks_get_js_settings() );
		
		wp_enqueue_script( 'rodller-blocks-js' );
		
		// Enqueue optional editor only styles
		wp_enqueue_style( 'rodller-blocks-editor-css', plugins_url( $editorStylePath, __FILE__ ), [ 'wp-blocks' ], filemtime( plugin_dir_path( __FILE__ ) . $editorStylePath ) );
	}
endif;
add_action( 'enqueue_block_editor_assets', 'rodller_blocks_editor_scripts' );


if(!function_exists('rodller_blocks_get_js_settings')):
    function rodller_blocks_get_js_settings(){
	    $settings = apply_filters( 'modify_rodller_blocks_js_settings', array(
		    'layouts' => array(
			    array(
				    'label' => 'a',
				    'value' => 'Layout A',
			    ),
		    ),
	    ) );
	    
	    return $settings;
    }
endif;

/**
 * Enqueue front end and editor JavaScript and CSS
 */
if ( ! function_exists( 'rodller_blocks_frontend_scripts' ) ):
	function rodller_blocks_frontend_scripts() {
		$blockPath = '/assets/js/frontend.blocks.js';
		// Make paths variables so we don't write em twice ;)
		$stylePath = '/assets/css/blocks.style.css';
		
		// Enqueue the bundled block JS file
		wp_enqueue_script( 'rodller-blocks-frontend-js', plugins_url( $blockPath, __FILE__ ), [
				'wp-i18n',
				'wp-element',
				'wp-blocks',
				'wp-components',
				'wp-api',
			], filemtime( plugin_dir_path( __FILE__ ) . $blockPath ) );
		
		// Enqueue frontend and editor block styles
		wp_enqueue_style( 'rodller-blocks-css', plugins_url( $stylePath, __FILE__ ), [ 'wp-blocks' ], filemtime( plugin_dir_path( __FILE__ ) . $stylePath ) );
		
	}
endif;
add_action( 'enqueue_block_assets', 'rodller_blocks_frontend_scripts' );

register_block_type( 'rodller/rodller-posts', array(
	'attributes'      => array(
		'layout'       => array(
			'type'    => 'string',
			'default' => 'a',
		),
		'postsToShow' => array(
			'type'    => 'number',
			'default' => 4,
		),
		'categories'   => array(
			'type' => 'string',
		),
		'order' => array(
			'type' => 'string',
			'default' => 'desc',
		),
		'orderBy'  => array(
			'type' => 'string',
			'default' => 'date',
		),
		'author'  => array(
			'type' => 'string',
		),
		'displayLoadMore'  => array(
			'type' => 'boolean',
			'default' => true
		),
	),
	'render_callback' => 'rodller_posts_block_render',
) );

/**
 * Server rendering for /blocks/rodller-posts
 */
if ( ! function_exists( 'rodller_posts_block_render' ) ):
	function rodller_posts_block_render( $attributes ) {

		$args = [
			'numberposts' => intval($attributes['postsToShow']),
			'exclude' => get_queried_object_id(),
			'post_status' => 'publish',
		];
		
		if(!empty($attributes['category'])){
		    $args['category'] = intval($attributes['categories']);
		}
		
		if(!empty($attributes['author'])){
		    $args['author'] = intval($attributes['author']);
		}
	
		$recent_posts = get_posts( $args );
		
		if ( empty( $recent_posts ) ) {
			return '<p>No posts</p>';
		}
		
		$markup = '<ul>';
		
		foreach ( $recent_posts as $post ) {
			
			$post_id = $post->ID;
			$markup  .= sprintf( '<li><a href="%1$s">%2$s</a></li>', esc_url( get_permalink( $post_id ) ), esc_html( get_the_title( $post_id ) ) );
		}
		
		$markup .= "</ul>";
		
		if( $attributes['displayLoadMore'] ){
			$load_more_button_classes = apply_filters('modify_rodller_posts_block_loadmore_button_classes', 'rodller-blocks-btn');
		
			$markup .= '<a href="javascript:void(0)" data-query="' . esc_attr( json_encode($args)) . '" data-paged="1" class="rodller-blocks-load-more-button ' . esc_attr($load_more_button_classes) . '">' . __('Load More', 'rodller-blocks') . '</a>';
		}
		
		$markup = apply_filters('modify_rodller_posts_block_render', $markup, $attributes);
		
		return $markup;
	}
endif;