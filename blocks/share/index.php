<?php

if(!function_exists(' rodller_blocks_register_share')):
	function  rodller_blocks_register_share(){
		
		// Check if the register function exists
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}
		
		register_block_type( 'rodller/rodller-share', [
			'attributes'      => [
				'facebook' => [
					'type'    => 'boolean',
					'default' => true,
				],
				'twitter' => [
					'type'    => 'boolean',
					'default' => true,
				],
				'google' => [
					'type'    => 'boolean',
					'default' => true,
				],
				'linkedin' => [
					'type'    => 'boolean',
					'default' => false,
				],
				'pinterest' => [
					'type'    => 'boolean',
					'default' => false,
				],
				'email' => [
					'type'    => 'boolean',
					'default' => false,
				],
				'reddit' => [
					'type'    => 'boolean',
					'default' => false,
				],
				'stumbleupon' => [
					'type'    => 'boolean',
					'default' => false,
				],
				'vk' => [
					'type'    => 'boolean',
					'default' => false,
				],
				'whatsapp' => [
					'type'    => 'boolean',
					'default' => false,
				],
			],
			'render_callback' => 'rodller_share_block_render',
		] );
	}
endif;
add_action( 'init', 'rodller_blocks_register_share' );

if(!function_exists('rodller_share_block_render')):
    function rodller_share_block_render($attributes){
	
	
	    $title = rodller_esc_text(get_the_title());
	    $url = rodller_esc_url(get_the_permalink());
	
	    $share = array();
	    $share['facebook'] = '<a href="javascript:void(0);" class="gridlove-facebook gridlove-share-item" data-url="http://www.facebook.com/sharer/sharer.php?u='.$url.'&amp;t='.$title.'"><i class="fa fa-facebook"></i></a>';
	    $share['twitter'] = '<a href="javascript:void(0);" class="gridlove-twitter gridlove-share-item" data-url="http://twitter.com/intent/tweet?url='.$url.'&amp;text='.$title.'"><i class="fa fa-twitter"></i></a>';
	    $share['google'] = '<a href="javascript:void(0);"  class="gridlove-gplus gridlove-share-item" data-url="https://plus.google.com/share?url='.$url.'"><i class="fa fa-google-plus"></i></a>';
	    $pin_img = has_post_thumbnail() ? wp_get_attachment_image_src( get_post_thumbnail_id(), 'full' ) : '';
	    $pin_img = isset( $pin_img[0] ) ? $pin_img[0] : '';
	    $share['pinterest'] = '<a href="javascript:void(0);"  class="gridlove-pinterest gridlove-share-item" data-url="http://pinterest.com/pin/create/button/?url='.$url.'&amp;media='.urlencode( esc_attr( $pin_img ) ).'&amp;description='.$title.'"><i class="fa fa-pinterest-p"></i></a>';
	    $share['linkedin'] = '<a href="javascript:void(0);"  class="gridlove-linkedin gridlove-share-item" data-url="http://www.linkedin.com/shareArticle?mini=true&amp;url='.$url.'&amp;title='.$title.'"><i class="fa fa-linkedin"></i></a>';
	    $share['reddit'] = '<a href="javascript:void(0);"  class="gridlove-reddit gridlove-share-item" data-url="http://www.reddit.com/submit?url='.$url.'&amp;title='.$title.'"><i class="fa fa-reddit-alien"></i></a>';
	    $share['email'] = '<a href="mailto:?subject='.$title.'&amp;body='.$url.'" class="gridlove-mailto"><i class="fa fa-envelope-o"></i></a>';
	    $share['stumbleupon'] = '<a href="javascript:void(0);"  class="gridlove-stumbleupon gridlove-share-item" data-url="http://www.stumbleupon.com/badge?url='.$url.'&amp;title='.$title.'"><i class="fa fa-stumbleupon"></i></a>';
	    $share['vk'] = '<a href="javascript:void(0);"  class="gridlove-vKontakte gridlove-share-item" data-url="http://vk.com/share.php?url='.$url.'&amp;title='.$title.'"><i class="fa fa-vk"></i></a>';
	    $share['whatsapp'] = '<a href="https://api.whatsapp.com/send?text='.$title.' '.$url.'" class="gridlove-whatsapp"><i class="fa fa-whatsapp"></i></a>';
	
	    $share = apply_filters('gridlove_modify_social_share', $share ); //Allow child themes or plugins to modify
    }
endif;