Page({
  data: {
    //歌曲列表
    musiclist: [],
    //歌单信息（只取了封面图和歌单名称）
    listInfo: {},
  },

  onLoad: function (options) {
    console.log(options)
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        playlistId: options.playlistId,
        $url: 'musiclist'
      }
    }).then((res) => {
      console.log(res)
      console.log(res.result)
      const pl = res.result.playlist
      this.setData({
        musiclist: pl.tracks,
        listInfo: {
          coverImgUrl: pl.coverImgUrl,
          name: pl.name,
        }
      })
      this._setMusiclist()
      wx.hideLoading()
    })
  },

  _setMusiclist() {
    //将本歌单的歌曲 列表存入本地存储
    wx.setStorageSync('musiclist', this.data.musiclist)
  },
})

// Component({
//   /**
//    * 组件的属性列表
//    */
//   properties: {
//   
//   },

//   /**
//    * 组件的初始数据
//    */
//   data: {},

//   /**
//    * 组件的方法列表
//    */
//   methods: {}
// })
