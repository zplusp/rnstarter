import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, SectionList, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';
import LocationSwitcher from '@components/location-switcher';
import Search from '@components/search';
import { ProgressBar } from 'react-native-paper';
import ErrorDialog from '@lib/dialog/error';
import { getHomeScreenData } from './api';
import { FlatList } from 'react-native-gesture-handler';
import { Card, Image, Rating } from 'react-native-elements';

const Home = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [data, setData] = useState<Array<UIData>>();

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            const loadData = async () => {
                setLoading(true);
                try {
                    const respData: ApiResponse = await getHomeScreenData();
                    if (isActive) {
                        setData(parseApiResponse(respData));
                        setLoading(false);
                    }

                } catch (ex) {
                    if (isActive) {
                        setError('Somethin Went Wrong');
                        setShowDialog(true);
                        setLoading(false);
                    }
                }
            };

            if (!data) {
                loadData();
            }

            return () => {isActive = false;};

        }, [data])
      );

    const parseApiResponse = (apiData?: ApiResponse): Array<UIData> => {
        const uiData = [];
        if (apiData) {
            for (let key of Object.keys(apiData)) {
                uiData.push({
                    title: key,
                    data: [{data:apiData[key]}],
                });
            }
        }

        return uiData;
    };

    const renderHeader = (title: string) => (
        <View>
            <Text style={styles.header}>{title}</Text>
        </View>
    );

    const renderSection = (content: UIContent) => (
        <View>
            <FlatList
                data={content.data}
                keyExtractor={(item: PlaceItem) => item.Name}
                renderItem={({ item }: {item: PlaceItem}) => renderItem(item)}
                horizontal={true}
                style={styles.flatlist}
            />
        </View>
    );

    const renderItem = (item: PlaceItem) => (
        <Pressable onPress={() => navigation.navigate('map', item)}>
            <Card containerStyle={styles.card}>
                <Image source={{ uri: 'https://picsum.photos/200/70' }} style={styles.itemImage} resizeMode="contain"/>
                <View style={styles.cardContent}>
                    <Text style={styles.brandTitle}>{item.Name}</Text>
                    <Text style={styles.categoryText} >{item.Category}</Text>
                    <View style={styles.locRate}>
                        <Text style={styles.awayText}>{`${item.Nearest} Away`}</Text>
                        <View style={styles.ratingsEnd}>
                            <View style={styles.ratings}>
                                <Rating startingValue={1}  ratingCount={1} readonly imageSize={12}/>
                                <Text style={styles.ratingText}>{item.Ratings}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.bookView}>
                    <Text style={styles.bookText}>Book Now</Text>
                </View>
            </Card>
        </Pressable>
    );


    return (
        <>
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <LocationSwitcher />
                </View>
                <View style={styles.searchBar}>
                    <Search />
                </View>
                {loading && <ProgressBar indeterminate />}
                {
                   data &&  <SectionList
                        sections={data}
                        keyExtractor={(item: UIContent, index: number) => `${item.data[0].Name}+${index}`}
                        renderItem={({item}: {item: UIContent}) => renderSection(item)}
                        renderSectionHeader={({section: {title}}: {section: {title: string} }) => renderHeader(title)}
                        style={styles.section}
                    />
                }
            </View>
            {showDialog && (
                <ErrorDialog
                    visible={showDialog}
                    message={error}
                    onDismiss={() => {
                        setShowDialog(false);
                        setError('');
                    }}
                />
            )}
        </>
    );
};

const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {
        alignItems: 'flex-start',
        paddingVertical: 4,
    },
    searchBar: {
        paddingVertical: 4,
        paddingHorizontal: 16,
        width: '100%',
    },
    section: {
        flex: 1,
        margin: 12,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    flatlist: {
        marginVertical: 8,
    },
    card: {
        margin: 0,
        padding: 0,
        borderRadius: 10,
        height: 160,
        width: 160,
        marginRight: 16,
    },
    itemImage: {
        height: 70,
        width: 190,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    cardContent: {
        paddingTop: 4,
        paddingHorizontal: 8,
    },
    brandTitle: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    categoryText: {
        fontSize: 12,
        color: '$accent',
        textDecorationLine: 'underline',
    },
    awayText: {
        fontSize: 12,
        marginTop: 2,
    },
    ratings: {
        flexDirection: 'row',
        marginTop: 2,
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 12,
        marginLeft: 2,
    },
    locRate: {
        flexDirection: 'row',
    },
    ratingsEnd: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    bookView: {
        marginTop: 8,
        flexDirection: 'column',
        alignItems: 'center',
    },
    bookText: {
        color: '$primary',
    },
});

export default Home;
