/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  ListView,
  TouchableOpacity,
  View,
  InteractionManager,
  RefreshControl,
  Navigator,
} from 'react-native';

import {connect} from 'react-redux'
import Const from '../../common/const';
import Loading from '../../common/Loading';
import LoadMoreFooter from '../../common/LoadMoreFooter';
import HeaderView from '../../common/HeaderView';
import PictureDetail from './pictureDetail';
import {
  picture,
} from '../../../actions/pictureAction';
let page = 1;
let isLoadMore = false;
let isRefreshing = false;
let isLoading = true;
class Picture extends Component {

  constructor(props) {
    super(props); //这一句不能省略，照抄即可
    // debugger
    this._renderRow = this._renderRow.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      const {picture} = this.props;
      picture(page, isLoadMore, isRefreshing, isLoading);
    })
  }

  render() {
   const { Picture,rowDate } = this.props;
    // console.log(('this.props'+JSON.stringify(this.props)));
    // debugger
    let pictureList = Picture.PictureList.slice(0,15);
    // console.log('picturelist='+JSON.stringify(pictureList))
    let titleName = '最新';
    return (
      <View>
        {Picture.isLoading ? <Loading /> :
          <ListView
            dataSource={this.state.dataSource.cloneWithRows(pictureList) }
            renderRow={this._renderRow}
            contentContainerStyle={styles.list}
            enableEmptySections={true}
            />
        }
      </View>
    );
  }

  _renderRow(rowDate) {
    var h=parseInt((Const.window.height-100)/5);
  // alert(h)
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={this._onPressFeedItem.bind(this,rowDate) }
          >
          <Text style={styles.text}>{rowDate.tag_name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

    _onPressFeedItem(rowDate) {
              this.props.navigator.push({
                  name: 'PictureDetail',
                  component: PictureDetail,
                  sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
                  params: {
                        rowDate: rowDate
                  }
              })
      }
}
function get(){
  var h=parseInt(Const.window.height-145)/5;
  alert(h)
  return h;
}

const styles = StyleSheet.create({
  container: {
    width: Const.window.width/3 ,
    height: get() ,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft:10,
    borderWidth:0.5,
    borderColor:'lightbgray',
    backgroundColor: 'white',
    overflow:'hidden'
  },
  listView: {
    // backgroundColor: 'red',
    height:Const.window.height-100 ,
  },
  title: {
    color: 'black',
    fontSize:16,
  },
  time: {
   fontSize:14,
   marginLeft:40
  },
  text: {
    marginTop:20,
    fontSize:14,
    height:40,
    overflow:'hidden'
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',

  },
  row:{
    flexDirection:'row',
    // borderBottomWidth:2,
    // borderBottomColor:'lightgray'
  },
  header: {
    marginTop: 20,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  }
});

export default connect((state) => {
    // alert('state='+JSON.stringify(state))
    // debugger;
    const { Picture } = state;
    return {
        Picture
    }
},{picture:picture})(Picture);