import React, { useRef, } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image, FlatList, StatusBar, SafeAreaView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather';
import DrawerNav from './assets/DrawerNav';
import TabBarNavSpotify from './assets/TabBarNavSpotify';
import { GLOBAL } from './assets/GLOBAL';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';

const theme = 'dark'

const fontsFunc = () => {
    const result = {}
    result.textSize1 = 25
    result.textSize2 = 20
    result.textSize3 = 17
    result.textSize4 = 15
    result.textSize5 = 12

    result.backgroundColor = 'white'
    result.primaryFontColor = 'black'
    result.secondaryFontColor = 'grey'

    if (theme == 'dark') {
        result.backgroundColor = 'black'
        result.primaryFontColor = 'white'
        result.secondaryFontColor = 'grey'
    }

    return result
}
const fonts = fontsFunc()

const yourShowsList = [

    // {
    //     id: '',
    //     title: '',
    //     subtitle: '',
    //     coverArt: require(''),
    // }, 

    {
        id: '0',
        title: 'The Joe Rogan Experience',
        subtitle: 'Show . Joe Rogan',
        coverArt: require('./assets/coverArt/yourShows1.jpg'),
    },
    {
        id: '1',
        title: 'REAL AF with Andy Frisella',
        subtitle: 'Show . Andy Frisella',
        coverArt: require('./assets/coverArt/yourShows2.jpg'),
    },
    {
        id: '2',
        title: 'How to Be a Better Human',
        subtitle: 'Show . Ted and PRX',
        coverArt: require('./assets/coverArt/yourShows3.jpg'),
    },
]

const recentlyPlayedList = [
    {
        id: '0',
        title: 'The Joe Rogan Experience',
        coverArt: require('./assets/coverArt/recentlyPlayed1.jpg'),
    },
    {
        id: '1',
        title: 'WHATS POPPIN (feat. DaBaby, Tory Lanez $ Lil Wayne) [Remix]',
        coverArt: require('./assets/coverArt/recentlyPlayed2.jpg'),
    },
    {
        id: '2',
        title: 'Work It: Hip Hop',
        coverArt: require('./assets/coverArt/recentlyPlayed3.jpg'),
    },
    {
        id: '3',
        title: 'Cycles',
        coverArt: require('./assets/coverArt/recentlyPlayed4.jpg'),
    },
    {
        id: '4',
        title: 'Oliver Tree',
        coverArt: require('./assets/coverArt/recentlyPlayed5.jpg'),
    },
    {
        id: '5',
        title: 'Chillhop Essentials Summer 2021',
        coverArt: require('./assets/coverArt/recentlyPlayed6.jpg'),
    },
    {
        id: '6',
        title: 'Chil/Vibes',
        coverArt: require('./assets/coverArt/recentlyPlayed7.jpg'),
    },
]

const topMixesList = [
    {
        id: '0',
        subtitle: 'Ty Dolla $ign, Vince Staples, ScHoolboy Q and more',
        coverArt: require('./assets/coverArt/mixes1.jpg'),
    },
    {
        id: '1',
        subtitle: 'YUNGBLUD, Ramones, Set It Off and more',
        coverArt: require('./assets/coverArt/mixes2.jpg'),
    },
    {
        id: '2',
        subtitle: 'FRVRFRIDAY, Jorja Smith, 11:11 and more',
        coverArt: require('./assets/coverArt/mixes3.jpg'),
    },
    {
        id: '3',
        subtitle: 'Blackway, Marshemello, Robinson and more',
        coverArt: require('./assets/coverArt/mixes4.jpg'),
    },
    {
        id: '4',
        subtitle: 'Mother Mother, Britney Spears, La Roux and more',
        coverArt: require('./assets/coverArt/mixes5.jpg'),
    },
    // {
    //     id: '5',
    //     subtitle: 'Brakence, YUNGBLUD, jxdn and more',
    //     coverArt: require('./assets/coverArt/mixes6.jpg'),
    // },
]

const renderSideScroller = (item) => {
    return (
        <TouchableOpacity style={styles.sideScrollerItem}>
            <View style={styles.sideScrollerItemImageContainer}>
                <Image style={styles.sideScrollerItemImage} source={item.coverArt} />
            </View>
            <View style={styles.sideScrollerItemTextContainer}>
                <Text
                    numberOfLines={2}
                    ellipsizeMode={'tail'}
                    style={styles.sideScrollerItemTextTitle}
                >
                    {item.title}
                </Text>
                <Text style={styles.sideScrollerItemTextSubtitle}>{item.subtitle}</Text>
            </View>
        </TouchableOpacity>
    )
}

const renderSideScrollerTitleAndSubtitle = (item) => {
    return (
        <TouchableOpacity style={styles.sideScrollerItem}>
            <View style={styles.sideScrollerItemImageContainer}>
                <Image style={styles.sideScrollerItemImage} source={item.coverArt} />
            </View>
            <View style={styles.sideScrollerItemTextContainer}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={styles.sideScrollerItemTextTitle}
                >
                    {item.title}
                </Text>
                <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={styles.sideScrollerItemTextSubtitle}
                >
                    {item.subtitle}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const renderSideScrollerTitleOnly = (item) => {
    return (
        <TouchableOpacity style={styles.sideScrollerItem}>
            <View style={styles.sideScrollerItemImageContainer}>
                <Image style={styles.sideScrollerItemImage} source={item.coverArt} />
            </View>
            <View style={[styles.sideScrollerItemTextContainer, { justifyContent: 'flex-start' }]}>
                <Text
                    numberOfLines={2}
                    ellipsizeMode={'tail'}
                    style={styles.sideScrollerItemTextTitle}
                >
                    {item.title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const renderSideScrollerSubtitleOnly = (item) => {
    return (
        <TouchableOpacity style={styles.sideScrollerItem}>
            <View style={styles.sideScrollerItemImageContainer}>
                <Image style={styles.sideScrollerItemImage} source={item.coverArt} />
            </View>
            <View style={[styles.sideScrollerItemTextContainer, { justifyContent: 'flex-start' }]}>
                <Text
                    numberOfLines={2}
                    ellipsizeMode={'tail'}
                    style={styles.sideScrollerItemTextSubtitle}
                >
                    {item.subtitle}
                </Text>
            </View>
        </TouchableOpacity>
    )
}




const Spotify = () => {
    const flatListRef = useRef(null)
    const scrollViewRef = useRef(null)
    const gestureRef = useRef(null)
    console.log(GLOBAL.tabBarHeight)
    return (
        // <DrawerNav
        //     gestureRef={gestureRef}
        //     gestureRefList={flatListRef}
        //     content={
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar
                backgroundColor={'#00000090'}
                translucent={true}
            />
            <ScrollView style={styles.contentContainer}>

                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Good evening</Text>
                    <View style={styles.headerIconContainer}>
                        <TouchableOpacity>
                            <MaterialCommunityIcons name="history" size={30} color={fonts.primaryFontColor} style={{ marginRight: 20 }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather name="settings" size={27} color={fonts.primaryFontColor} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.recomendationsContainer}>
                    <View style={styles.recomendationsRow}>
                        <TouchableOpacity style={styles.recomendationsItem}>
                            <View style={styles.recomendationsItemImageContainer}>
                                <Image style={styles.recomendationsItemImage} source={require('./assets/coverArt/coverArt1.jpg')} />
                            </View>
                            <View style={styles.recomendationsItemTextContainer}>
                                <Text style={styles.recomendationsItemText}>Liked Songs</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.recomendationsItem}>
                            <View style={styles.recomendationsItemImageContainer}>
                                <Image style={styles.recomendationsItemImage} source={require('./assets/coverArt/coverArt2.png')} />
                            </View>
                            <View style={styles.recomendationsItemTextContainer}>
                                <Text style={styles.recomendationsItemText}>Work It: Hip Hop</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.recomendationsRow}>
                        <TouchableOpacity style={styles.recomendationsItem}>
                            <View style={styles.recomendationsItemImageContainer}>
                                <Image style={styles.recomendationsItemImage} source={require('./assets/coverArt/coverArt3.jpg')} />
                            </View>
                            <View style={styles.recomendationsItemTextContainer}>
                                <Text style={styles.recomendationsItemText}>Hot Hits Australia</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.recomendationsItem}>
                            <View style={styles.recomendationsItemImageContainer}>
                                <Image style={styles.recomendationsItemImage} source={require('./assets/coverArt/coverArt4.jpg')} />
                            </View>
                            <View style={styles.recomendationsItemTextContainer}>
                                <Text style={styles.recomendationsItemText}>Pop Mix</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.recomendationsRow}>
                        <TouchableOpacity style={styles.recomendationsItem}>
                            <View style={styles.recomendationsItemImageContainer}>
                                <Image style={styles.recomendationsItemImage} source={require('./assets/coverArt/coverArt5.jpg')} />
                            </View>
                            <View style={styles.recomendationsItemTextContainer}>
                                <Text style={styles.recomendationsItemText}>*hits different*</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.recomendationsItem}>
                            <View style={styles.recomendationsItemImageContainer}>
                                <Image style={styles.recomendationsItemImage} source={require('./assets/coverArt/coverArt6.jpg')} />
                            </View>
                            <View style={styles.recomendationsItemTextContainer}>
                                <Text style={styles.recomendationsItemText}>HIT REWIND</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                {/* Your Shows */}
                <View style={styles.sideScrollerTextContainer}>
                    <Text style={styles.sideScrollerText}>Your Shows</Text>
                </View>
                <View style={styles.sideScrollerContainer}>
                    <NativeViewGestureHandler
                        ref={flatListRef}
                        simultaneousHandlers={gestureRef}
                    >
                        <FlatList
                            data={yourShowsList}
                            key={(item) => (item.id)}
                            renderItem={(({ item }) => (
                                renderSideScrollerTitleAndSubtitle(item)
                            ))}
                            horizontal={true}
                            style={{ flex: 1, }}
                        />
                    </NativeViewGestureHandler>
                </View>

                {/* Recently Played */}

                <View style={styles.sideScrollerTextContainer}>
                    <Text style={styles.sideScrollerText}>Recently Played</Text>
                </View>
                <View style={styles.sideScrollerContainer}>
                    <FlatList
                        data={recentlyPlayedList}
                        keyExtractor={(item) => (item.id)}
                        renderItem={({ item }) => renderSideScrollerTitleOnly(item)}
                        horizontal={true}
                        style={{ flex: 1, }}
                    />
                </View>

                {/* Your Mixes */}

                <View style={styles.sideScrollerTextContainer}>
                    <Text style={styles.sideScrollerText}>Your top mixes</Text>
                </View>
                <View style={styles.sideScrollerContainer}>
                    <FlatList
                        data={topMixesList}
                        keyExtractor={(item) => (item.id)}
                        renderItem={({ item }) => renderSideScrollerSubtitleOnly(item)}
                        horizontal={true}
                        style={{ flex: 1, }}
                    />
                </View>

                <View style={{ width: '100%', height: 100 }}>
                                <Text style={{color: fonts.primaryFontColor}}>Something</Text>
                </View>
            </ScrollView>
            {/* <TabBarNavSpotify /> */}
        </SafeAreaView>



        // } />
    )
}
export default Spotify;

const styles = StyleSheet.create({
    contentContainer: {
        height: GLOBAL.contentHeight,
        // height: '100%',
        width: '100%', 
        paddingHorizontal: 10,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: fonts.backgroundColor
    },
    headerContainer: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'black',
    },
    headerText: {
        fontSize: fonts.textSize1,
        fontWeight: 'bold',
        color: fonts.primaryFontColor
    },
    headerIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recomendationsContainer: {
        marginTop: 10,
        minHeight: 150,
        width: '100%',
    },
    recomendationsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    recomendationsItem: {
        height: 60,
        width: '49%',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
    },
    recomendationsItemImageContainer: {
        flex: 3,
    },
    recomendationsItemImage: {
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        height: '100%',
        width: '100%',
        backgroundColor: 'black'
    },
    recomendationsItemTextContainer: {
        flex: 4,
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    recomendationsItemText: {
        fontSize: fonts.textSize3,
        fontWeight: 'bold',
        color: fonts.primaryFontColor,
    },
    sideScrollerTextContainer: {
        marginTop: 10,
    },
    sideScrollerText: {
        color: fonts.primaryFontColor,
        fontWeight: 'bold',
        fontSize: fonts.textSize2,
    },
    sideScrollerContainer: {
        height: 240,
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sideScrollerItem: {
        height: 240,
        width: 200,
        borderColor: 'black',
        borderWidth: 1,
        marginRight: 10,
    },
    sideScrollerItemImageContainer: {
        flex: 1,
        borderRadius: 10,
    },
    sideScrollerItemImage: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
    },
    sideScrollerItemTextContainer: {
        height: 40,
        justifyContent: 'space-around',
    },
    sideScrollerItemTextTitle: {
        fontSize: fonts.textSize4,
        fontWeight: 'bold',
        color: fonts.primaryFontColor,
    },
    sideScrollerItemTextSubtitle: {
        fontSize: fonts.textSize5,
        fontWeight: 'bold',
        color: fonts.secondaryFontColor,
    },
    recentlyPlayedTextContainer: {
        marginTop: 20,
    },
    recentlyPlayedText: {
        fontWeight: 'bold',
        fontSize: fonts.textSize2,
        color: fonts.primaryFontColor,
    },
    recentlyPlayedContainer: {
        height: 200,
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
    },
    episodesContainer: {
        height: 200,
        width: '100%',
    },
    mixesContainer: {

    },
})