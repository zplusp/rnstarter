import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import EStylesheet from 'react-native-extended-stylesheet';

declare type BlankSceneProps = {
    title: string
}

const BlankScene = (props: BlankSceneProps) => {
    return (
        <View style={styles.root}>
            <Text>
                {props.title}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default BlankScene;
