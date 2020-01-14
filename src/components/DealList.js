import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class DealList extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>DealList</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 100,
        paddingBottom: 100,
    },

    title: {
        fontSize: 40,
    }
});

export default DealList;
