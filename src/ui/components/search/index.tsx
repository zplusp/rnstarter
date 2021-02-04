import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// import { Card, Input, Icon, SearchBar } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';

const Search = () => {
    const [search, setSearch] = useState('');

    return (
            <Searchbar
            placeholder="Search Category or Organization"
            value={search}
            onChangeText={setSearch}
            inputStyle={styles.input}
            style={{ borderRadius: 10 }}
        />
    );

};

const styles = EStyleSheet.create({
    root: {
        borderRadius: 10,
        padding: 4,
        margin: 0,
    },
    wrapper: {
        padding: 12,
        margin: 0,
        flex: 1,
    },
    container: {
        padding: 0,
        borderRadius: 0,
        backgroundColor: '#fff',
        color: '$text',
    },
    inputConatiner: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 0,
    },
    input: {
        fontSize: 13,
        padding: 0,
    },
});

export default Search;
