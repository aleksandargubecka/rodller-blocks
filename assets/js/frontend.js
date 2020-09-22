(function ($) {

    var RodllerBlocks = {

        LoadMore: {
            init: function () {
                $('body').on('click', '.rodller-blocks-load-more-button', this.clickCallback)
            },

            clickCallback: function (e) {
                e.preventDefault();

                var $this = $(this),
                    req = {
                        attributes: $this.data('attributes'),
                        found: $this.data('found'),
                        page: $this.data('paged')
                    };

                RodllerBlocks.LoadMore.doTheLoadMore(req, function (response){
                    if (response.success) {
                        RodllerBlocks.LoadMore.appendPosts($this, req.page,  response.data.last, response.data.html);
                    }
                });
            },

            doTheLoadMore: function (req, response) {
                req.action = 'rodller_blocks_loadmore';

                $.post(rodller_blocks_frontend.ajaxurl, req, response);
            },

            appendPosts: function ($elem, page, isLast, postsHtml) {
                $elem.parent().prepend(postsHtml);

                if( isLast ){
                    $elem.fadeOut();
                    return false;
                }
                page++;
                $elem.data('paged', page);
            }
        },

        Sliders: {
            init: function (){
                $('.rodller-slider').each(function (){
                    var $this = $(this);
                    $this.slick({
                        speed: parseInt($this.attr('speed')),
                        slidesToShow: parseInt($this.attr('slidestoshow')),
                        slidesToScroll: parseInt($this.attr('slidestoscroll'))
                    });
                });
            }
        },


        Counter: {
            init: function() {

                $( '.wp-block-rodller-rodller-counter' ).each( function() {
                    var $this = $( this ),
                        $strong = $this.find( 'strong' );

                    if ( empty( $strong ) ) {
                        return;
                    }

                    var countTo  = String($strong.data( 'count-to' ));

                    var numbers = parseInt(countTo);
                    var symbol = countTo.match(/[\W_]+/g);

                    setTimeout( function() {

                        $( { Counter: 0 } ).animate( { Counter: numbers }, {
                            duration: 3000,
                            easing: 'swing',
                            step: function() {
                                var text = Math.ceil( this.Counter );

                                if(!empty(symbol)){
                                    text = text + ' ' + symbol
                                }

                                $strong.text( text );
                            }
                        } );
                    }, 1000 );
                } );
            }
        }
    };

    window.rodllerBlocks = RodllerBlocks;

    $(document).ready(function () {
        RodllerBlocks.LoadMore.init();
        RodllerBlocks.Sliders.init();
        RodllerBlocks.Counter.init();
    });
})(jQuery);