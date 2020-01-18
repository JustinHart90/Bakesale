import React from 'react';
import PropTypes from 'prop-types';

import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';

import { priceDisplay } from '../util';
import ajax from '../ajax';

class DealDetail extends React.Component {
    static propTypes = {
        initialDealData: PropTypes.object.isRequired,
    };

    state = {
        deal: this.props.initialDealData,
    };

    async componentDidMount() {
        const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
        this.setState({
            deal: fullDeal,
        });
    }

    render() {
        const { deal } = this.state;
        return (
            <View style={styles.deal}>
                <Image
                    source={{uri: deal.media[0]}}
                    style={styles.image}
                />
                <View>
                    <Text style={styles.title}>{deal.title}</Text>
                </View>
                <ScrollView style={styles.detail}>
                    <View style={styles.footer}>
                        <View style={styles.info}>
                            <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
                            <Text style={styles.cause}>{deal.cause.name}</Text>
                        </View>
                        {deal.user && (
                            <View style={styles.user}>
                                <Image source={{ uri: deal.user.avatar }} style={styles.avatar}/>
                                <Text>{deal.user.name}</Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.description}>
                        <Text>{deal.description}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    deal: {
        marginTop: 50,
        marginBottom: 20,
        marginHorizontal: 12,
        borderColor: '#bbb',
        borderWidth: 1,
    },
    backLink: {
        marginBottom: 5,
        color: '#22f',
        marginLeft: 10,
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: '#ccc',
    },
    title: {
        fontSize: 16,
        padding: 10,
        fontWeight: 'bold',
        backgroundColor: 'rgba(237, 149, 45, 0.4)',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 20,
    },
    info: {
        alignItems: 'center',
    },
    user: {
        alignItems: 'center',
    },
    cause: {
        marginVertical: 10,
    },
    price: {
        fontWeight: 'bold',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    description: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderStyle: 'dotted',
        margin: 10,
        padding: 10,
    },
});

export default DealDetail;
