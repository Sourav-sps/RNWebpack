//import liraries
import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  Pressable,
} from 'react-native';
import {Colors} from '../constant/colors';
const {height} = Dimensions.get('window');
// create a component
const Profile = () => {
  const {params} = useRoute<any>();
  const detail = params?.detail || '';
  const {goBack} = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => goBack()} style={styles.btn}>
        <Text style={styles.name}>{'<'}</Text>
      </Pressable>

      <View style={styles.topContent}>
        <Image
          source={{uri: detail.sprites?.other?.home?.front_default}}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.mainContent}>
        <View style={styles.row}>
          <Text style={styles.name}>{detail.name?.trim()}</Text>
          <View style={[styles.row, {justifyContent: 'flex-end'}]}>
            {detail?.types?.map((item: any, index: number) => (
              <View
                key={index}
                style={{
                  marginLeft: '2%',
                  padding: '3%',
                  paddingHorizontal: '6%',
                  borderRadius: 10,
                  backgroundColor: Colors.sage,
                }}>
                <Text style={styles.smallTxt}>{item.type.name}</Text>
              </View>
            ))}
          </View>
        </View>
        <Text style={styles.mediumTxt}></Text>

        <Text style={styles.mediumTxt}>Height: {detail.height + ' '}</Text>
        <Text style={styles.mediumTxt}>Weight: {detail.weight}</Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height,
  },
  topContent: {
    height: height * 0.4,
    backgroundColor: Colors['indigo-dye'],
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  mainContent: {
    flex: 1,
    padding: '5%',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallTxt: {
    fontSize: 15,

    color: '#ffffff',
  },
  mediumTxt: {
    fontSize: 20,
    color: '#333',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  btn: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 2000,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 30,
    width: 30,
  },
});

//make this component available to the app
export default Profile;
