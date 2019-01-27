/**
 * Block dependencies
 */
import edit from './edit';
import classnames from 'classnames'

/**
 *
 */
import './style.scss';

/**
 * Internal block libraries
 */
const {__} = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

// jQuery(document).ready(function (){
//     setTimeout(function (){
//
//         jQuery('.rodller-slider').addClass('owl-carousel').owlCarousel({
//             items: 6,
//             loop: true,
//             autoplay: true,
//             autoplayTimeout: 3000,
//             margin: 20
//         });
//
//     }, 2000);
// });

registerBlockType('rodller/rodller-slider', {
    title: __('Rodller Slider', 'rodller-blocks'),
    description: __('Add posts to slider block.', 'rodller-blocks'),
    icon: 'cover-image',
    category: 'widgets',
    supports: {
        align: true,
    },
    attributes: {
        images: {
            type: 'array',
            default: [],
            source: 'query',
            selector: 'li',
            query: {
                url: {
                    source: 'attribute',
                    selector: 'img',
                    attribute: 'src',
                },
                // link: {
                //     source: 'attribute',
                //     selector: 'img',
                //     attribute: 'data-link',
                // },
                alt: {
                    source: 'attribute',
                    selector: 'img',
                    attribute: 'alt',
                    default: '',
                },
                id: {
                    source: 'attribute',
                    selector: 'img',
                    attribute: 'data-id',
                },
                // caption: {
                //     type: 'string',
                //     source: 'html',
                //     selector: 'figcaption',
                // },
            },
        },
        align: {
            type: 'string',
            default: 'wide',
        }
    },
    edit,
    save: props => {
        const { images, align } = props.attributes;

        return (
            <div>
                <ul className={ `rodller-slider align-${ align }` }>
                    { images.map( ( img, i ) => {
                        return (
                            <li key={i}>
                                <img
                                    src={ img.url }
                                    alt={ img.alt }
                                    data-id={ img.id }
                                />
                            </li>
                        );
                    } ) }
                </ul>
            </div>
        );
    },
});