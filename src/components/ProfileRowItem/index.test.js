import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import ProfileRowItem from './index';

const mockOnPress = jest.fn();

jest.mock("@expo/vector-icons", () => ({
    Ionicons: (props) => <ionicons testID="icon-ionicons" {...props} />,
}));

describe('ProfileRowItem', () => {
    it('renders correctly', () => {
        const {getByText, getByTestId} = render(
            <ProfileRowItem icon="person" title="Profile" onPress={mockOnPress} />,
        );

        expect(getByTestId('icon-ionicons')).toBeTruthy();
        expect(getByText('Profile')).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
        const {getByText} = render(
            <ProfileRowItem icon="person" title="Profile" onPress={mockOnPress} />,
        );

        fireEvent.press(getByText('Profile'));
        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
});
