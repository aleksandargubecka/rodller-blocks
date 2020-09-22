<?php

if(!function_exists(' rodller_blocks_register_rodller_posts')):
    function  rodller_blocks_register_rodller_posts(){
	
	    // Check if the register function exists
	    if ( ! function_exists( 'register_block_type' ) ) {
		    return;
	    }
	
	    register_block_type( 'rodller/rodller-posts', [
		    'attributes'      => [
			    'layout'          => [
				    'type'    => 'string',
				    'default' => 'a'
			    ],
			    'postsToShow'     => [
				    'type'    => 'number',
				    'default' => 4,
			    ],
			    'categories'      => [
				    'type' => 'string',
			    ],
			    'order'           => [
				    'type'    => 'string',
				    'default' => 'desc',
			    ],
			    'orderBy'         => [
				    'type'    => 'string',
				    'default' => 'date',
			    ],
			    'author'          => [
				    'type' => 'string',
			    ],
			    'displayLoadMore' => [
				    'type'    => 'boolean',
				    'default' => false,
			    ],
		    ],
		    'render_callback' => 'rodller_posts_block_render',
	    ] );
	
	
    }
endif;
add_action( 'init', 'rodller_blocks_register_rodller_posts' );

/**
 * Create API fields for additional info
 */
function rodller_blocks_register_rest_fields() {

	register_rest_field(
		'post',
		'featured_image_sizes_url',
		array(
			'get_callback' => 'rodller_blocks_get_posts_featured_images',
			'update_callback' => null,
			'schema' => null,
		)
	);
	
}
add_action( 'rest_api_init', 'rodller_blocks_register_rest_fields' );

if(!function_exists('rodller_blocks_get_posts_featured_images')):
    function rodller_blocks_get_posts_featured_images( $object ){
		$fetch_image_sizes = get_intermediate_image_sizes();
		
		$images = [];
		
	    foreach ( $fetch_image_sizes as $fetch_image_size ) {
		    $image = wp_get_attachment_image_src(
			    $object['featured_media'],
			    $fetch_image_size,
			    false
		    );
		    
		    if( ! empty( $image[0] )){
		        $images[$fetch_image_size] = $image[0];
		    }
		}
	 
	    return $images;
    }
endif;


/**
 * Server rendering for /blocks/rodller-posts
 */
if ( ! function_exists( 'rodller_posts_block_render' ) ):
	function rodller_posts_block_render( $attributes, $page = 0, $options = ['before' => '<div class="container"><ul class="rodller-blocks-posts row">', 'after' => '</ul></div>', 'allow_load_more' => true] ) {
		
		$args = [
			'posts_per_page'       => intval( $attributes['postsToShow'] ),
			'post__not_in'         => [ get_queried_object_id() ],
			'post_status'          => 'publish',
			'order'                => $attributes['order'],
			'order_by'             => $attributes['orderBy'],
			'post_type'            => 'post',
			'ignore_sticky_posts'  => 1,
		];
		
		if ( ! empty( $attributes['categories'] ) ) {
			$args['cat'] = intval( $attributes['categories'] );
		}
		
		if ( ! empty( $attributes['author'] ) ) {
			$args['author'] = intval( $attributes['author'] );
		}
		
		if ( ! empty( $page ) ) {
			$args['paged'] = $page;
		}
		
		$posts_query = new WP_Query( $args );
		
		ob_start();

		do_action('rodller_posts_block_render_html', $attributes, $posts_query, $page,  $options);

		return ob_get_clean();
	}
endif;

add_action( 'rodller_posts_block_render_html', 'rodller_blocks_posts_block_render_html', 10, 4 );
if(!function_exists('rodller_blocks_posts_block_render_html')):
    function rodller_blocks_posts_block_render_html($attributes, $posts_query, $page, $options){
	
	    $markup = $options['before'];
	    $js_options = rodller_blocks_get_editor_js_settings();
	    $layout_options = $js_options['layouts'][$attributes['layout']];

	    while ( $posts_query->have_posts() ) : $posts_query->the_post();
	    
	        $markup .= '
			    <li id="post-' . get_the_ID() . '" class="rodller-blocks-post layout-' . esc_attr($attributes['layout']) . ' col-md-' . intval($layout_options['columns'][0]) . ' col-sm-12">
			        
				    <a href="' . esc_url( get_the_permalink() ) . '" class="rodller-posts-img">
					    <img src="' . get_the_post_thumbnail_url(get_the_ID(), 'medium') . '" alt="' . esc_attr(get_the_title()) . '">
				    </a>
				    <a href="' . esc_url( get_the_permalink() ) . '" class="rodller-posts-title">
					    <h2 class="ellipsis">' . esc_html( get_the_title() ) . '</h2>
				    </a>
				    <div class="rodller-posts-expert">
					    <p class="ellipsis-p">' . get_the_excerpt() . '</p>
				    </div>
			    </li>';
		
		    $rodller_block_listed[] = get_the_ID();
	    endwhile;
	
	
	    if ( $options['allow_load_more'] && $posts_query->found_posts > ( intval( $attributes['postsToShow'] ) * intval($page) ) ) :
		    if ( $attributes['displayLoadMore'] ) :
			    $load_more_button_classes = apply_filters( 'modify_rodller_posts_block_loadmore_button_classes', 'rodller-blocks-btn' );
			
			    $markup .= '<li class="rodller-blocks-load-more-button-wrapper"><a href="javascript:void(0)" data-attributes="' . esc_attr( json_encode( $attributes ) ) . '" data-paged="1" data-found="' . intval($posts_query->found_posts) . '" class="rodller-blocks-load-more-button ' . esc_attr( $load_more_button_classes ) . '">' . __( 'Load More', 'rodller-blocks' ) . '</a></li>';
		    endif;
	    endif;
	
	    $markup .= $options['after'];
	    
	    echo $markup;
    }
endif;