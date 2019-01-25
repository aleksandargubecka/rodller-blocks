/**
 * Block dependencies
 */
import { filter, pick, map, get } from 'lodash';
import './editor.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;

const {
    BlockControls,
    MediaUpload,
    MediaPlaceholder,
    InspectorControls,
    mediaUpload,
} = wp.editor;

const {
    IconButton,
    Button,
    DropZone,
    Toolbar,
} = wp.components;

const {Component, Fragment} = wp.element;

const ALLOWED_MEDIA_TYPES = [ 'image' ];

export const pickRelevantMediaFiles = ( image ) => {
    return pick( image, ['id', 'url', 'alt']);

    const imageProps = pick( image, [ 'alt', 'id', 'link', 'caption' ] );
    imageProps.url = get( image, [ 'sizes', 'large', 'url' ] ) || get( image, [ 'media_details', 'sizes', 'large', 'source_url' ] ) || image.url;

    return imageProps;
};
/**
 * Register example blocksetAttributes
 */
export default class RodllerSliderEdit extends Component{

    constructor() {
        super(...arguments);
    }

    render(){
        const { attributes: { images, align }, className, setAttributes } = this.props;

        jQuery('.rodller-slider').addClass('owl-carousel').owlCarousel({
            items: 6,
            loop: true,
            autoplay: true,
            autoplayTimeout: 3000,
            margin: 20
        });

        const onSelectImages = ( images ) => {
            setAttributes( {
                images: images.map( ( image ) => pickRelevantMediaFiles( image ) )
            } );

            jQuery('.rodller-slider').owlCarousel('update');
        };

        // const dropZone = (
        //     <DropZone
        //         onFilesDrop={ this.addFiles }
        //     />
        // );

        const controls = (
            <BlockControls>
                { !! images.length && (
                    <Toolbar>
                        <MediaUpload
                            onSelect={ onSelectImages }
                            allowedTypes={ ALLOWED_MEDIA_TYPES }
                            multiple
                            gallery
                            value={ images.map( ( img ) => img.id ) }
                            render={ ( { open } ) => (
                                <IconButton
                                    className="components-toolbar__control"
                                    label={ __( 'Edit Gallery' ) }
                                    icon="edit"
                                    onClick={ open }
                                />
                            ) }
                        />
                    </Toolbar>
                ) }
            </BlockControls>
        );

        if ( images.length === 0 ) {
            return (
                <Fragment>
                    { controls }
                    <MediaPlaceholder
                        icon="format-gallery"
                        className={ className }
                        labels={ {
                            title: __( 'Slider', 'rodller-blocks' ),
                            instructions: __( 'Drag images, upload new ones or select files from your library.' ),
                        } }
                        onSelect={ onSelectImages }
                        accept="image/*"
                        allowedTypes={ ALLOWED_MEDIA_TYPES }
                        multiple
                    />
                </Fragment>
            );
        }

        return (
            <div>
                { controls }
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
    }
}
