import Scrollload from '../../Scrollload'
import './index.css'

import './loading.css'
import './baiduMobile'

import $ from 'jquery'

function getData(data) {
    return data.data.map(item => `
        <li>
            <div class="info">
                <img class="image" src="${item.image}">
                <div class="desc">
                    <p>${item.name}</p>
                    <span>${item.label}</span>
                    <p>${item.desc}</p>
                </div>
            </div>
            <a class="btn" href="http://m.dolapocket.com/" target="_blank">开始</a>
        </li>
    `).join('')
}


let page = 0
new Scrollload({
    loadMore: function (sl) {
        if (page === 6) {
            sl.noMoreData()
            return
        }

        $.ajax({
            type: 'GET',
            url: `http://rap.taobao.org/mockjsdata/14522/getgamelist?page=${page++}`,
            dataType: 'json',
            success: function(data){
                $(sl.contentDom).append(getData(data))

                sl.unLock()
            },
            error: function(xhr, type){
                sl.throwException()
            }
        })
    },
    enablePullRefresh: true,
    pullRefresh: function (sl) {
        $.ajax({
            type: 'GET',
            url: `http://rap.taobao.org/mockjsdata/14522/getgamelist?page=1`,
            dataType: 'json',
            success: function(data){
                $(sl.contentDom).prepend(getData(data))

                // 处理完业务逻辑后必须要调用refreshComplete
                sl.refreshComplete()
            }
        })
    },
})
