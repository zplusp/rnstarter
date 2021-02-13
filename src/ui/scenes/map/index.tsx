import React, {useState, useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import {Header} from 'react-native-elements';
import { ProgressBar } from 'react-native-paper';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import {getCoOrdinates} from './api';

const MapScene = (props: any) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [coordinates, setCoordinates] = useState<{ lat: number, lng: number} | null>(null);

    const item = props?.route?.params;

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            const loadData = async () => {
                setLoading(true);
                try {
                    const latlng = await getCoOrdinates();
                    console.log('LatLng ', latlng);
                    if (isActive) {
                        setCoordinates(latlng);
                        setLoading(false);
                    }

                } catch (ex) {
                    if (isActive) {
                        setLoading(false);
                    }
                }
            };

            if (!coordinates) {
                loadData();
            }

            return () => {isActive = false;};

        }, [coordinates])
      );


    return (
        <>
        <Header
            leftComponent={{ icon: 'close', color: '#fff', onPress: () => navigation.goBack() }}
            centerComponent={{ text: item?.Name || 'Place', style: { color: '#fff' } }}
        />
        {
            loading ? (
                <ProgressBar />
            ) : (
                <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    toolbarEnabled={false}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
                    </MapView>
            </View>
            )
        }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
      height: '90%',
    },
});

export default MapScene;
