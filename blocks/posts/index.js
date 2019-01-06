/**
 * Internal block libraries
 */
import edit from './edit';
import './style.scss';
import './editor.scss';

const {__} = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

registerBlockType('rodller/rodller-posts', {
    title: __('Rodller Posts', 'rodller-blocks'),
    description: __('Add posts to your page.', 'rodller-blocks'),
    icon: 'grid-view',
    category: 'widgets',
    keywords: [
        __('post', 'rodller-blocks'),
        __('rodller', 'rodller-blocks'),
    ],
    edit,
    save() {
        // Rendered in PHP
        return null;
    },
});