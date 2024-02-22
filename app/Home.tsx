//import liraries
import {useNavigation} from '@react-navigation/native';
import React, {memo, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
} from 'react-native';
import ApiClient from '../request';
import {BASE_URL} from '../constant';

const {height} = Dimensions.get('window');

const Header = () => {
  return (
    <View
      style={{
        backgroundColor: '#2c3e50',
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: '5%',
      }}>
      <Text style={{color: '#ffffff'}}>Poke Go</Text>
    </View>
  );
};
const Card = memo(
  ({
    item,
    apiClient,
  }: {
    item: {name: string; url: string};
    apiClient: ApiClient;
  }) => {
    const {navigate} = useNavigation<any>();
    const [detail, setDetail] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      if (Object.keys(detail).length > 0) setLoading(false);
    }, [detail]);

    useEffect(() => {
      (async () => {
        try {
          const responseData = await apiClient.getRequest<any>(item.url);

          setDetail(responseData);
        } catch (error) {
          // Handle errors here
          console.log('Error:===>', error);
        }
      })();
    }, []);

    const type =
      detail?.types?.map((item: any) => item.type.name).join(', ') || '';

    return (
      <Pressable
        style={{width: Platform.OS === 'web' ? '32%' : '48%'}}
        disabled={loading}
        onPress={() => navigate('Profile', {detail})}>
        <View style={styles.card}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <View style={{justifyContent: 'space-between'}}>
              <View style={styles.header}>
                <View>
                  <Text style={styles.name}>{detail.name?.trim()}</Text>
                </View>
                <Text style={styles.type}>{type?.trim()}</Text>
              </View>
              <Image
                source={{uri: detail.sprites?.other?.home?.front_default}}
                style={styles.image}
                resizeMode="contain"
              />
              <View style={styles.details}>
                <Text>Height: {detail.height + ' '}</Text>
                <Text>Weight: {detail.weight}</Text>
                {/* Add more details as needed */}
              </View>
            </View>
          )}
        </View>
      </Pressable>
    );
  },
);

// create a component
const Home = () => {
  const [data, setData] = useState<any>([]);
  const apiClient = ApiClient.getInstance();
  const [offset, setoffset] = useState<number>(0);
  useEffect(() => {
    (async () => {
      try {
        const responseData = await apiClient.getRequest<any>(
          BASE_URL + `?offset=${offset * 20}&limit=20`,
        );
        setData((prev: any) => [...prev, ...responseData.results]);
      } catch (error) {
        // Handle errors here
        console.log('Error:===>', error);
      }
    })();
  }, [offset]);

  const _onMomentumScrollEnd = () => {
    if (data.length) {
      setoffset(prev => prev + 1);
    }
    console.log('_onMomentumScrollEnd=>');
  };

  return (
    <View style={{height}}>
      <Header />
      <FlatList
        data={data}
        numColumns={Platform.OS === 'web' ? 3 : 2}
        renderItem={({item}) => <Card {...{apiClient}} {...{item}} />}
        keyExtractor={(item, index) => `${item.name}${index}`}
        style={styles.container}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        ListHeaderComponent={() => <View style={{height: 10}} />}
        ListFooterComponent={() => <View style={{height: 10}} />}
        onEndReached={_onMomentumScrollEnd}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '2%',
    paddingBottom: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: '2%',
  },
  btnStyle: {
    backgroundColor: 'blue',
    padding: '2%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtColor: {
    color: '#ffffff',
  },
  section: {
    height: height * 0.2,
    width: '100%',
    marginTop: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    height: height * 0.4,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  header: {
    justifyContent: 'center',
    marginBottom: 10,
  },

  type: {
    fontSize: 14,
    color: 'gray',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  details: {
    flexDirection: 'row',
  },
});

//make this component available to the app
export default Home;
