// components/showList/showList.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: {
            type: Array,
            value: [
                {
                    id: 'widget',
                    name: '业务相关',
                    open: false,
                    pages: ['video-swiper', 'emoji', 'index-list', 'tabs', 'vtabs']
                },
                {
                    id: 'widget2',
                    name: '业务相关2',
                    open: false,
                    pages: ['video-swiper', 'emoji', 'index-list', 'tabs', 'vtabs']
                },
                {
                    id: 'widget3',
                    name: '业务相关2',
                    open: false,
                    pages: ['video-swiper', 'emoji', 'index-list', 'tabs', 'vtabs']
                },
                {
                    id: 'widget4',
                    name: '业务相关2',
                    open: false,
                    pages: ['video-swiper', 'emoji', 'index-list', 'tabs', 'vtabs']
                }
            ]
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        kindToggle: function (e) {
            var id = e.currentTarget.id, list = this.data.list;
            for (var i = 0, len = list.length; i < len; ++i) {
                if (list[i].id == id) {
                    list[i].open = !list[i].open
                } else {
                    list[i].open = false
                }
            }
            this.setData({
                list: list
            });
        }
    }
})
