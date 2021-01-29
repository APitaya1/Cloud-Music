// pages/music/music.js
const MAX_LIMIT = 15
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [{
      url: 'http://p1.music.126.net/nVUH7O5ZNMG1OQ1kE-tq9g==/109951165665595417.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/C9I9GxpvRX7nCZyXNBeqOw==/109951165664694558.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/j0gp3gBDRRoqIXxAs0v7oA==/109951165664720877.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/q5rKcBx9Y0V37DsUSaQKXg==/109951165664695730.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/WOoIZuva_umxxzYOvWINLA==/109951165664707565.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/UdSM2BmqY_h_t9HAOzb5dQ==/109951165664710664.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/SLfispSeeEnb6Ezs0cNjBw==/109951165666128356.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/vAjwukVm-H0LOqzy4FTJXA==/109951165664851877.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/yvhyrGGgsOlsuQFSeFc2wA==/109951165667772888.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/Z90NF2dHuBYrV6x-U9jJJQ==/109951165664719544.jpg?imageView&quality=89'
    }
    ],
    playlist: []
    //   playlist:[
    //     {
    //     "id" : "1001",
    //     "playCount": 510000.8,
    //     "name" :"2021·心里装着鲜花银河星光和我爱的人",
    //     "picUrl" : "http://p2.music.126.net/O8LkkfC7PtV7TA4UP693XA==/109951164569667332.jpg?param=140y140"
    //   },
    //   {
    //     "id" : "1002",
    //     "playCount": 4940000.5,
    //     "name" :"我试着把孤独藏进耳机",
    //     "picUrl" : "http://p2.music.126.net/Xvo6PwBcdOA69ipcpV9YYg==/109951165463253777.jpg?param=140y140"
    //   },
    //   {
    //     "id" : "1003",
    //     "playCount": 665.79,
    //     "name" :"【翻/原】温柔不是我说 而是你觉得",
    //     "picUrl" : "http://p2.music.126.net/PJylNWy_2-jI7LRgQ2Cm6w==/109951165649129522.jpg?param=140y140"
    //   },
    //   {
    //     "id" : "1004",
    //     "playCount": 18896.8,
    //     "name" :"妳 和 我 在夕 陽 下",
    //     "picUrl" : "http://p4.music.126.net/WmfWKnTbZJasIn59BJMPLA==/109951165324021457.jpg?param=140y140"
    //   },
    //   {
    //     "id" : "1005",
    //     "playCount": 220000.2,
    //     "name" :"加州公路｜西部驾车",
    //     "picUrl" : "http://p3.music.126.net/24Zk8CFWMzGInQt7C3E9lw==/109951165613653069.jpg?param=140y140"
    //   },
    //   {
    //     "id" : "1006",
    //     "playCount": 130000.7,
    //     "name" :"『一起吹晚风』",
    //     "picUrl" : "http://p3.music.126.net/swKlj43m9puewJ-YboeoSg==/109951165325068849.jpg?param=140y140"
    //   }
    // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getPlaylist()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      playlist: []
    })
    this._getPlaylist()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getPlaylist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },

  _getPlaylist() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        start: this.data.playlist.length,
        count: MAX_LIMIT,
        $url:'playlist',
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        playlist: this.data.playlist.concat(res.result.data)
      })
      wx.stopPullDownRefresh()
      wx.hideLoading()
    })
  },
})