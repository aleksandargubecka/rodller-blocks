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
	return;
}

define('RODLLER_BLOCKS_VERSION', '1.0.0');
define('RODLLER_BLOCKS_DIR_URI', trailingslashit(plugins_url('', __FILE__)) );

if ( ! function_exists( 'rodller_blocks_set_locale' ) ):
	function rodller_blocks_set_locale() {
		load_plugin_textdomain( 'rodller-blocks', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
	}
endif;
add_action( 'plugins_loaded', 'rodller_blocks_set_locale' );

require_once plugin_dir_path( __FILE__ ) . 'inc/helpers.php';

require_once plugin_dir_path( __FILE__ ) . 'inc/frontend-enqueue.php';

require_once plugin_dir_path( __FILE__ ) . 'inc/editor-enqueue.php';

require_once plugin_dir_path( __FILE__ ) . 'inc/ajax.php';

require_once plugin_dir_path( __FILE__ ) . 'blocks/posts/index.php';

require_once plugin_dir_path( __FILE__ ) . 'blocks/share/index.php';