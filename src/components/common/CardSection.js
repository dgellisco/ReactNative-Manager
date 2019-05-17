import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
        // The keys in the right of the array will override any duplicate keys earlier in the array
        <View style={[styles.containerStyle, props.style]}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        // Positioning
        justifyContent: 'flex-start',
        position: 'relative'
    }
}

export { CardSection };
