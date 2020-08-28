// components/showList/showList.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        data: {}
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
                list: list,
                data: {
                    list: list
                }
            });
        }
    }
})
