/**
 * Block dependencies
 */
import icon from './icon';
import './style.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

/**
 * Register block
 */
export default registerBlockType(
    'rodller/demo',
    {
        title: __( 'Demo Block', 'rodller' ),
        description: __( 'How to use the RichText component for building your own editable blocks.', 'rodller' ),
        category: 'common',
        icon: {
            background: '#0073AA',
            src: icon
        },
        keywords: [
            __( 'How to', 'rodller' ),
            __( 'Example', 'rodller' ),
            __( 'RichText', 'rodller' ),
        ],
        supports: {
            html: false
        },
        attributes: {
            message: {
                type: 'array',
                source: 'children',
                selector: '.message-body',
            }
        },
        edit: props => {
            const { attributes: { message }, className, setAttributes } = props;
            const onChangeMessage = message => { setAttributes( { message } ) };
            return (
                <div className={ className }>
                    <h2>{ __( 'Call to Action', 'rodller' ) }</h2>
                    <RichText
                        tagName="div"
                        multiline="p"
                        placeholder={ __( 'Add your custom message', 'rodller' ) }
                  		onChange={ onChangeMessage }
                  		value={ message }
              		/>
                </div>
            );
        },
        save: props => {
            const { attributes: { message } } = props;
            return (
                <div>
                    <h2>{ __( 'Call to Action', 'rodller' ) }</h2>
                    <div class="message-body">
                        { message }
                    </div>
                </div>
            );
        },
    },
);
