/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const {
    InspectorControls,
    BlockDescription,
    ColorPalette,
    PanelColorSettings,
} = wp.editor;

// Import Inspector components
const {
    Panel,
    PanelBody,
    PanelRow,
    RangeControl,
    SelectControl,
    TextControl,
} = wp.components;

// Create an Inspector Controls wrapper Component
export default class Inspector extends Component {

    constructor( props ) {
        super( ...arguments );
    }

    render() {

        // Setup the attributes
        const { profileName, profileTitle, profileContent, profileAlignment, profileImgURL, profileImgID, profileAvatarShape, profileLayout, twitter, facebook, instagram, pinterest, google, youtube, github, linkedin, email, website  } = this.props.attributes;
        const { setAttributes } = this.props;

        // Avatar shape options
        const profileAvatarShapeOptions = [
            { value: 'square', label: __( 'Square', 'rodller-blocks' ) },
            { value: 'round', label: __( 'Round', 'rodller-blocks' ) },
        ];
        const profileLayoutOptions = [
            { value: 'horizontal', label: __( 'Horizontal', 'rodller-blocks' ) },
            { value: 'vertical', label: __( 'Vertical', 'rodller-blocks' ) },
        ];

        return (
            <InspectorControls key="inspector">
                <PanelBody>
                    <SelectControl
                        label={ __( 'Layout', 'rodller-blocks' ) }
                        description={ __( 'Choose between a horizontal or vertical avatar shape.', 'rodller-blocks' ) }
                        options={ profileLayoutOptions }
                        value={ profileLayout }
                        onChange={ ( value ) => this.props.setAttributes( { profileLayout: value } ) }
                    />
                    <SelectControl
                        label={ __( 'Avatar Shape', 'rodller-blocks' ) }
                        description={ __( 'Choose between a round or square avatar shape.', 'rodller-blocks' ) }
                        options={ profileAvatarShapeOptions }
                        value={ profileAvatarShape }
                        onChange={ ( value ) => this.props.setAttributes( { profileAvatarShape: value } ) }
                    />
                </PanelBody>

                <PanelBody title={ __( 'Social Links', 'rodller-blocks' ) } initialOpen={ false }>
                    <p>{ __( 'Add links to your social media site and they will appear in the bottom of the profile box.', 'rodller-blocks' ) }</p>

                    <TextControl
                        label={ __( 'Twitter URL', 'rodller-blocks' ) }
                        type="url"
                        value={ twitter }
                        onChange={ ( value ) => this.props.setAttributes( { twitter: value } ) }
                    />

                    <TextControl
                        label={ __( 'Facebook URL', 'rodller-blocks' ) }
                        type="url"
                        value={ facebook }
                        onChange={ ( value ) => this.props.setAttributes( { facebook: value } ) }
                    />

                    <TextControl
                        label={ __( 'Instagram URL', 'rodller-blocks' ) }
                        type="url"
                        value={ instagram }
                        onChange={ ( value ) => this.props.setAttributes( { instagram: value } ) }
                    />

                    <TextControl
                        label={ __( 'Pinterest URL', 'rodller-blocks' ) }
                        type="url"
                        value={ pinterest }
                        onChange={ ( value ) => this.props.setAttributes( { pinterest: value } ) }
                    />

                    <TextControl
                        label={ __( 'Google URL', 'rodller-blocks' ) }
                        type="url"
                        value={ google }
                        onChange={ ( value ) => this.props.setAttributes( { google: value } ) }
                    />

                    <TextControl
                        label={ __( 'YouTube URL', 'rodller-blocks' ) }
                        type="url"
                        value={ youtube }
                        onChange={ ( value ) => this.props.setAttributes( { youtube: value } ) }
                    />

                    <TextControl
                        label={ __( 'Github URL', 'rodller-blocks' ) }
                        type="url"
                        value={ github }
                        onChange={ ( value ) => this.props.setAttributes( { github: value } ) }
                    />

                    <TextControl
                        label={ __( 'LinkedIn URL', 'rodller-blocks' ) }
                        type="url"
                        value={ linkedin }
                        onChange={ ( value ) => this.props.setAttributes( { linkedin: value } ) }
                    />

                    <TextControl
                        label={ __( 'Email URL', 'rodller-blocks' ) }
                        type="url"
                        value={ email }
                        onChange={ ( value ) => this.props.setAttributes( { email: value } ) }
                    />

                    <TextControl
                        label={ __( 'Website URL', 'rodller-blocks' ) }
                        type="url"
                        value={ website }
                        onChange={ ( value ) => this.props.setAttributes( { website: value } ) }
                    />
                </PanelBody>
            </InspectorControls>
        );
    }
}