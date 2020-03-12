import React, { Component } from 'react'
import Test from './src/Test'
import { FlatList, View, Text } from 'react-native';


class Poopinion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameList: [
        { name: 'Alex', key: 0 },
        { name: 'Aurora', key: 1 },
        { name: 'Coronavirus', key: 2 }
      ]
    }
  }

  separator = () => {
    return (
      <View style={{
        height: 5,
        width: '100%',
        backgroundColor: 'black',
        marginVertical: 10
      }}></View>
    )
  }

  render() {
    return (
      <FlatList
        data={this.state.nameList}
        renderItem={ ({ item }) => <Test data={item} />}
        horizontal={false}
        ItemSeparatorComponent={this.separator}
        ListEmptyComponent={<Text> No hay elementos en la lista... </Text>}
      ></FlatList>
    )
  }
}


export default Poopinion