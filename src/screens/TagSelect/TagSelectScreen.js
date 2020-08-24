import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import TagColumn from './TagColumn';
import SearchButton from './SearchButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {inject, observer} from 'mobx-react';

//let list = [];

/*for (let i = 0; i < 50; i++) {
  list.push({'idx': i, 'tag' : "태그"});
}*/

const TagSelectScreen = ({tagStore, userStore}) => {
  const user = userStore.userName;
  const tags = [];
  useEffect(() => {
    tagStore.getItem();
  }, []);

  let list = tagStore.tagList;

  const list1 = list.filter((el, idx) => idx % 2 === 0);
  const list2 = list.filter((el, idx) => idx % 2 !== 0);

  list1.forEach((el, idx) => {
    let arr = list2[idx] ? [el, list2[idx]] : [el];
    tags.push(arr);
  });

  const renderColumn = ({item}) => {
    return <TagColumn item={item} />;
  };

  // user 체크
  if (!user) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>로그인해주세요</Text>
      </View>
    );
  }

  return (
    <>
      <SearchButton />
      <FlatList
        horizontal={true}
        contentContainerStyle={styles.flatListContainer}
        data={tags}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderColumn}
        showsHorizontalScrollIndicator={true}
        indicatorStyle="white"
      />
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>태그선택완료</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchView: {
    flexGrow: 1,
    height: 100,
    width: 300,
    paddingLeft: 50,
    paddingTop: 100,
    marginLeft: 50,
  },
  flatListContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 50,
  },
  buttonText: {
    color: 'black',
  },
});

export default inject('tagStore', 'userStore')(observer(TagSelectScreen));
