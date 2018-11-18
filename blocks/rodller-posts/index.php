<?php

register_block_type( 'rodller/rodller-posts', [
	'attributes'      => [
		'layout'          => [
			'type'    => 'string',
			'default' => 'a',
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

/**
 * Server rendering for /blocks/rodller-posts
 */
if ( ! function_exists( 'rodller_posts_block_render' ) ):
	function rodller_posts_block_render( $attributes, $page = 0, $options = ['before' => '<ul class="rodller-blocks-posts-list">', 'after' => '</ul>', 'allow_load_more' => true] ) {
		
		$args = [
			'posts_per_page' => intval( $attributes['postsToShow'] ),
			'post__not_in'   => [ get_queried_object_id() ],
			'post_status'    => 'publish',
			'order'          => $attributes['order'],
			'order_by'       => $attributes['orderBy'],
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
		
		$ignore_markup = apply_filters( 'rodller_blocks_ignore_markup', false );
		
		$posts_query = new WP_Query( $args );
		
		$markup = '';
		
		if ( ! $ignore_markup ):
			$markup = $options['before'];
			
			while ( $posts_query->have_posts() ) : $posts_query->the_post();
				$markup .= sprintf( '<li><a href="%1$s">%2$s</a></li>', esc_url( get_the_permalink() ), esc_html( get_the_title() ) );
				
				$rodller_block_listed[] = get_the_ID();
			endwhile;
			
			
			if ( $options['allow_load_more'] && $posts_query->found_posts > ( intval( $attributes['postsToShow'] ) * intval($page) ) ) :
				if ( $attributes['displayLoadMore'] ) :
					$load_more_button_classes = apply_filters( 'modify_rodller_posts_block_loadmore_button_classes', 'rodller-blocks-btn' );
					
					$markup .= '<li class="rodller-blocks-load-more-button-wrapper"><a href="javascript:void(0)" data-attributes="' . esc_attr( json_encode( $attributes ) ) . '" data-paged="1" data-found="' . intval($posts_query->found_posts) . '" class="rodller-blocks-load-more-button ' . esc_attr( $load_more_button_classes ) . '">' . __( 'Load More', 'rodller-blocks' ) . '</a></li>';
				endif;
			endif;
			
			$markup .= $options['after'];
		
		endif;
		
		$markup = apply_filters( 'modify_rodller_posts_block_render', $markup, $posts_query, $args, $attributes );
		
		return $markup;
	}
endif;