import React from 'react';

import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';

import ajax from '../ajax';
import Canvas from 'react-native-canvas';

import DealList from './DealList';
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';

class App extends React.Component {
    titleXPos = new Animated.Value(-100);
    state = {
        deals: [],
        dealsFromSearch: [],
        currentDealId: null,
        animationCount: 0,
        canvas: null,
        activeSearchTerm: '',
    }

    animateTitle = (direction = 1) => {
        const width = Dimensions.get('window').width;

        if (direction === 0) {
            if (this.state.animationCount === 3) {
                Animated.timing(
                    this.titleXPos, {
                        toValue: 0,
                        duration: 500,
                        easing: Easing.ease,
                    }
                ).start();
            }

            return;
        }

        this.state.animationCount++;

        Animated.timing(
            this.titleXPos,
            { toValue: direction * width * .30, duration: 500 }
        ).start(({ finished }) => {
            if (finished) {
                if (this.state.animationCount < 3) {
                    this.animateTitle(-1 * direction);
                } else {
                    this.animateTitle(0);
                }
            }
        });
    }

    async componentDidMount() {
        this.animateTitle();

        const deals = await ajax.fetchInitialDeals();

        this.setState(() => {
            return { deals };
        });
    }

    searchDeals = async (searchTerm) => {
        let dealsFromSearch = [];

        if (searchTerm) {
            dealsFromSearch = await ajax.fetchDealsSearchResults(searchTerm);            
        }

        this.setState({ dealsFromSearch, activeSearchTerm: searchTerm });
    };

    setCurrentDeal = (dealId) => {
        this.setState({
            currentDealId: dealId,
        });
    };
    
    unsetCurrentDeal = (dealId) => {
        this.setState({
            currentDealId: null,
        });
    };

    currentDeal = () => {
        return this.state.deals.find((deal) => deal.key === this.state.currentDealId);
    }

    handleCanvas = (canvas) => {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'purple';
        ctx.fillRect(0, 0, 100, 100);
    }

    render() {
        if (this.state.currentDealId) {
            return (
                <DealDetail
                        initialDealData={this.currentDeal()}
                        onBack={this.unsetCurrentDeal}
                />
            );
        }

        const dealsToDisplay =
            this.state.dealsFromSearch.length > 0
            ? this.state.dealsFromSearch
            : this.state.deals;

        if (dealsToDisplay.length > 0) {
            return (
                <View style={styles.main}>
                    <SearchBar 
                        searchDeals={this.searchDeals}
                        initialSearchTerm={this.state.activeSearchTerm}
                    />
                    <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
                </View>
            );
        }

        return (
            <Animated.View style={[{ left: this.titleXPos }, styles.container]}>
                <Text style={styles.title}>Bakesale</Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 100,
        paddingBottom: 100,
    },
    main: {
        marginTop: 50,
    },
    title: {
        fontSize: 40,
    }
});

export default App;
