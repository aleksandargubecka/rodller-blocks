<?php

/**
 * Plugin Name:       Rodller Blocks
 * Plugin URI:        https://rodller.com/plugins/rodller-blocks
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.0
 * Author:            Rodller
 * Author URI:        https://rodller.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       rodller-blocks
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 */
define( 'RODLLER_BLOCKS_VERSION', '1.0.0' );
define( 'RODLLER_BLOCKS_URL', trailingslashit(plugin_dir_url(__FILE__)) );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-rodller-blocks.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_rodller_blocks() {

	$plugin = new Rodller_Blocks();
	$plugin->run();

}
run_rodller_blocks();
