<?php

/**
 * Trim text characters with UTF-8
 * for adding to html attributes it's not breaking the code and
 * you are able to have all the kind of characters (Japanese, Cyrillic, German, French, etc.)
 *
 * @param $text
 * @since  1.6
 */
if(!function_exists('rodller_esc_text')):
	function rodller_esc_text($text){
		return rawurlencode( html_entity_decode( wp_kses($text, null), ENT_COMPAT, 'UTF-8') );
	}
endif;

/**
 * Trims URL with special characters like used in (Japanese, Cyrillic, German, French, etc.)
 *
 * @param $url
 * @since  1.6
 */
if(!function_exists('rodller_esc_url')):
	function rodller_esc_url($url){
		return rawurlencode( esc_url( esc_attr($url) ) );
	}
endif;
