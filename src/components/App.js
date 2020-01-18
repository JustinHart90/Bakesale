import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ajax from '../ajax';
import DealList from './DealList';
import DealDetail from './DealDetail';

class App extends React.Component {
    state = {
        deals: [],
        currentDealId: null,
    }

    async componentDidMount() {
        const deals = await ajax.fetchInitialDeals();
        console.log(deals);

        this.setState(() => {
            return { deals };
        });
    };

    setCurrentDeal = (dealId) => {
        this.setState({
            currentDealId: dealId
        });
    };

    currentDeal = () => {
        return this.state.deals.find((deal) => deal.key === this.state.currentDealId);
    }

    render() {
        if (this.state.currentDealId) {
            return <DealDetail initialDealData={this.currentDeal()}/>
        }

        if (this.state.deals.length > 0) {
            return <DealList deals={this.state.deals} onItemPress={this.setCurrentDeal} />
        }
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Bakesale</Text>
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
