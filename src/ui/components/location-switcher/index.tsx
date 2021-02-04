import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';

const LocationSwitcher = () => {
    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <View>
                    <Icon name={'location-outline'} size={18} color={EStyleSheet.value('$text')} />
                </View>
                <View style={styles.outer}>
                    <Text>Home - Narayan Nagar</Text>
                </View>
            </View>
            <View style={styles.dash} />
        </View>
    );
};

const styles = EStyleSheet.create({
    root: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    container: {
        flexDirection: 'row',
        paddingHorizontal: 8,
    },
    outer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 4,
        marginRight: 8,
    },
    dash: {
        height: 4,
        marginTop: 8,
        backgroundColor: '$accent',
    },
});

export default LocationSwitcher;
