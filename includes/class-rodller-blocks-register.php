<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://rodller.com
 * @since      1.0.0
 *
 * @package    Rodller_Blocks
 * @subpackage Rodller_Blocks/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Rodller_Blocks
 * @subpackage Rodller_Blocks/public
 * @author     Rodller <office@rodller.com>
 */
class Rodller_Blocks_Register {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}
	
	public function accordion_block() {
		
		wp_enqueue_script(
			'rodller-blocks-js',
			RODLLER_BLOCKS_URL . 'dist/js/blocks.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
			$this->version,
			false
		);
		
		wp_enqueue_style(
			'rodller-blocks-css',
			RODLLER_BLOCKS_URL . 'dist/css/blocks.css',
			array( 'wp-edit-blocks' ),
			$this->version
		);
		
//		register_block_type( 'gutenberg-boilerplate-esnext/hello-world-step-01', array(
//			'editor_script' => 'gutenberg-boilerplate-es5-step01',
//		) );
	}
}
