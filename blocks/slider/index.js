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

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1
        };

        return (
            <div>
                <ul {...settings}  className={ `rodller-slider align-${ align }` }>
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