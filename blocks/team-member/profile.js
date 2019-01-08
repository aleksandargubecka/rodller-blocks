/**
 * Profile Box Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

// Create a profile box wrapper Component
export default class ProfileBox extends Component {

    constructor( props ) {
        super( ...arguments );
    }

    render() {

        // Setup the attributes
        const { profileAlignment, profileImgURL,  profileAvatarShape, profileLayout  } = this.props.attributes;

        return (
            <div
                className={ classnames(
                    this.props.className,
                    profileAlignment,
                    profileAvatarShape,
                    { 'rodller-has-avatar': profileImgURL },
                    'rodller-profile-layout-' + profileLayout,
                    'rodller-block-profile',
                    'rodller-profile-columns',
                ) }>
                { this.props.children }
            </div>
        );
    }
}