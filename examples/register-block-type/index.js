import settings from  './code-snippets.js';
import icons from  './icons.js';
import './editor.scss';
import './style.scss';

// Get custom components for this block
import {
    TitleDescription,
    Category,
    Icon,
    Keywords,
    Supports,
    Attributes,
    Edit,
    Save,
} from './components';

// Get React Fragment
const { Fragment } = wp.element;

// Get components from from wp.blocks
const { registerBlockType } = wp.blocks;

// Get components from from wp.editor
const { InspectorControls } = wp.editor;

// Get components from Components
const { PanelBody, RadioControl } = wp.components;

// Get just the __() localization function from wp.i18n
const { __ } = wp.i18n;

// Create variable for block header since using it twice
const blockHeader = <h2>{ __( 'registerBlockType Explained', 'rodller' ) }</h2>;


/**
 * Register example block
 */
export default registerBlockType(
    // Namespaced, hyphens, lowercase, unique name
    'rodller/register-demo',
    {
        // Localize title using wp.i18n.__()
        title: __( 'registerBlockType', 'rodller' ),
        // Add a description for the block
        description: __( 'A demonstration block for learning how to register your own blocks with registerBlockType()', 'rodller' ),
        // Category Options: common, formatting, layout, widgets, embed
        category: 'common',
        // Dashicons Options - https://goo.gl/aTM1DQ
        // Customize background color
        icon: {
          background: '#0073AA',
          src: 'wordpress-alt'
        },                
        // Limit to 3 Keywords / Phrases
        keywords: [
            __( 'How to', 'rodller' ),
            __( 'Register a block', 'rodller' ),
            __( 'Example', 'rodller' ),
        ],
        // Enable or disable support for features
        supports: {
          html: false
        },
        // Set for each piece of dynamic data used in your block
        attributes: {
            setting: {
                type: 'string',
                default: 'title-and-description',
            }
        },
        // Determines what is displayed in the editor
        edit: props => {
            const { attributes: { setting }, isSelected, className, setAttributes } = props;

            // Return the markup displayed in the editor, including a core RichText field
            return [
                isSelected && (
                    <InspectorControls key="inspector">
            			<PanelBody title={ __( 'registerBlockType Setting', 'rodller' ) }>
                            <RadioControl
                                label="Choose Setting"
                                selected={ setting }
                                options={ [
                                    { label: __( 'Title and Description', 'rodller' ), value: 'title-and-description' },
                                    { label: __( 'Category', 'rodller' ), value: 'category' },
                                    { label: __( 'Icon', 'rodller' ), value: 'icon' },
                                    { label: __( 'Keywords', 'rodller' ), value: 'keywords' },
                                    { label: __( 'Supports', 'rodller' ), value: 'supports' },
                                    { label: __( 'Attributes', 'rodller' ), value: 'attributes' },
                                    { label: __( 'Edit', 'rodller' ), value: 'edit' },
                                    { label: __( 'Save', 'rodller' ), value: 'save' },
                                ] }
                                onChange={ setting => setAttributes( { setting } ) }
                            />
            			</PanelBody>
            		</InspectorControls>
                ),
                <div className={ className }>
                  { blockHeader }
                  <pre>
                    {settings.opening}
                    { ( () => {
                      switch ( setting ) {
                        case "title-and-description": return (
                          <strong><TitleDescription /></strong>
                        );
                        case "category": return (
                          <Fragment>
                            <TitleDescription />
                            <strong><Category /></strong>
                          </Fragment>
                        );
                        case "icon": return (
                          <Fragment>
                            <TitleDescription />
                            <Category />
                            <strong><Icon /></strong>
                          </Fragment>
                        );
                        case "keywords": return (
                          <Fragment>
                            <TitleDescription />
                            <Category />
                            <Icon />
                            <strong><Keywords /></strong>
                          </Fragment>
                        );
                        case "supports": return (
                          <Fragment>
                            <TitleDescription />
                            <Category />
                            <Icon />
                            <Keywords />
                            <strong><Supports /></strong>
                          </Fragment>
                        );
                        case "attributes": return (
                          <Fragment>
                            <TitleDescription />
                            <Category />
                            <Icon />
                            <Keywords />
                            <Supports />
                            <strong><Attributes /></strong>
                          </Fragment>
                        );
                        case "edit": return (
                          <Fragment>
                            <TitleDescription />
                            <Category />
                            <Icon />
                            <Keywords />
                            <Supports />
                            <Attributes />
                            <strong><Edit /></strong>
                          </Fragment>
                        );
                        case "save": return (
                          <Fragment>
                            <TitleDescription />
                            <Category />
                            <Icon />
                            <Keywords />
                            <Supports />
                            <Attributes />
                            <Edit />
                            <strong><Save /></strong>
                          </Fragment>
                        );
                        default: return null;
                      }
                    } )() }
                    {settings.closing}
                  </pre>
                </div>
            ]
        },
        // Determines what is displayed on the frontend
        save: props => {
            // Return the markup to display on the frontend
            return (
                <div>
                    { blockHeader }
                    <pre>
                        {settings.opening}
                            <strong><TitleDescription />
                            <Category />
                            <Icon />
                            <Keywords />
                            <Supports />
                            <Attributes />
                            <Edit />
                            <Save /></strong>
                        {settings.closing}
                    </pre>
                </div>
            );
        },
    },
);
