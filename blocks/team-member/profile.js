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
        const { profileAlignment, profileImgURL, profileLayout  } = this.props.attributes;

        return (
            <div
                className={ classnames(
                    this.props.className,
                    profileAlignment,
                    { 'rodller-has-avatar': profileImgURL },
                    'rodller-profile-layout-' + profileLayout,
                    'rodller-block-profile',
                    'rodller-profile-columns',
                ) }
                style={{
                    textAlign: profileAlignment
                }}
            >
                { this.props.children }
            </div>
        );
    }
}