import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ajax from '../ajax';
import DealList from './DealList';

class App extends React.Component {
    state = {
        deals: [],
    }
    async componentDidMount() {
        const deals = await ajax.fetchInitialDeals();
        console.log(deals);

        this.setState(() => {
            return { deals };
        })
    }

    render() {
        return (
            <View style={styles.container}>

                {this.state.deals.length > 0 ? (
                    <DealList deals={this.state.deals} />
                ) : (
                    <Text style={styles.title}>Bakesale</Text>
                )}
                
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

export default App;
