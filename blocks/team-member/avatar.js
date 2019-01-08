/**
 * Avatar Column Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Create an SocialIcons wrapper Component
export default class AvatarColumn extends Component {

    constructor( props ) {
        super( ...arguments );
    }

    render() {
        return (
            <div class="rodller-profile-column rodller-profile-avatar-wrap">
                <div class="rodller-profile-image-wrap">
                    { this.props.children }
                </div>
            </div>
        );
    }
}