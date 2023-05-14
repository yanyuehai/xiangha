let arr = [
    {
        img: 'https://img2.baidu.com/it/u=422958201,1159036601&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
    },
    {
        img: 'https://img2.baidu.com/it/u=3570172377,853217114&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    },
    {
        img: 'https://img2.baidu.com/it/u=1444024164,3406292138&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
    },
    {
        img: 'https://img1.baidu.com/it/u=3784738455,2043719400&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
    },
    {
        img: 'https://img0.baidu.com/it/u=4213316938,3422461529&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    }
]

let goodList = []
// 请求数据
async function getData() {
    try {
        data = await getFetch(replaceHost('https://mall.xiangha.com/cmobile/index.php?app=index&mod=index_new&client_type=h5'))
        // 轮播图
        renSwiper(arr)
        // 分类
        renNav(data.data.data[1].data, data.data.data[2].data)
        // 广告热点
        renHot(data.data.data[3].data)
        // 限时折扣
        renDiscount(data.data.data[4].data[0])
        // 商品列表
        let list = []
        for (let i = 6; i < 10; i++) {
            list = [...list, ...data.data.data[i].data.info]
            goodList = [...list, ...data.data.data[i].data.info]
        }
        renGoods(list)
    } catch (err) {
        getData()
    }
}
getData()

// 渲染轮播图
function renSwiper(data) {
    $('.swiper-wrapper').html('')
    data.forEach((v) => {
        $('.swiper-wrapper').append($(`<div class="swiper-slide"><img src=${v.img} alt=""></div>`))
    });
    // 轮播图
    var swiper = new Swiper(".mySwiper", { loop: true, autoplay: true, });
}

// 渲染分类导航
function renNav(data1, data2) {
    $('.nav-item').eq(0).html('')
    $('.nav-item').eq(1).html('')
    data1.forEach((v) => {
        $('.nav-item').eq(0).append($(`<div class="cate-item">
        <div class="pic">
            <img src=${v.img} alt="">
        </div>
        <div class="tit">${v.name}</div>
    </div>`))
    })
    data2.forEach((v) => {
        $('.nav-item').eq(1).append($(`<div class="cate-item">
        <div class="pic">
            <img src=${v.img} alt="">
        </div>
        <div class="tit">${v.name}</div>
    </div>`))
    })
}

// 渲染广告热点
function renHot(data) {
    data.forEach((v, i) => {
        $('.hot > div').eq(i).html(`<img src=${v.img} alt="">`)
    })
}


// 渲染限时折扣
function renDiscount(data) {
    $('.discount  .discount-list').html('')
    data.data[1].concat(data.data[0]).forEach((v) => {
        $('.discount .discount-list').append(`<div class="discount-item">
        <div class="pic">
            <img src=${v.goods_image_url} alt="">
        </div>
        <div class="text">
            <div class="tit over-els">
               ${v.goods_name}
            </div>
            <div class="price">
                ￥<span>${v.goods_price}</span>
            </div>
            <div class="date">
                <span>抢购</span>
                <span class="date-itme"></span>
            </div>
        </div>
    </div>`)
    })

    setInterval(() => {
        let date = document.getElementsByClassName("date-itme")
        Array.from(date).forEach((v) => {
            v.innerHTML = getDate()
        })
    })

}


// 渲染商品列表
function renGoods(data) {
    data.forEach((v) => {
        $('.goods').append($(`<div class="goods-item">
        <div class="pic">
            <img src=${v.goods_image} alt="">
        </div>
        <div class="text">
            <div class="tit rows-over-els">${v.goods_name}</div>
            <div class="price">
                <span>￥${v.goods_price}</span>
                <i class="iconfont icon-gouwuche cart-item"></i>
            </div>
        </div>
    </div>`))
    })

    Array.from(document.getElementsByClassName("cart-item")).forEach((v, i) => {
        v.onclick = function () {
            myCart(goodList[i])
        }
    })
}

// 折扣时间
function getDate() {
    let date = new Date()
    let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 00, 00, 00)
    let dd = new Date(newDate - new Date())
    return zero(dd.getHours()) + ":" + zero(dd.getMinutes()) + ":" + zero(dd.getSeconds())
}

// 补零
function zero(n) {
    return n < 10 ? '0' + n : n
}


// 添加购物车
function myCart(goods) {
    if (!localStorage.getItem("data")) {
        let data = []
        data.push(goods)
        localStorage.setItem('data', JSON.stringify(data))
    } else {
        let data = JSON.parse(localStorage.getItem('data'))
        if (!data.find((v) => {
            return v.gid === goods.gid
        })) {
            data.push(goods)
            localStorage.setItem('data', JSON.stringify(data))
        }
    }
}


// 下方导航跳转
$('.xh-footer li').eq(0).on("tap", function () {
    location.href = './index.html'
})

$('.xh-footer li').eq(1).on("tap", function () {
    location.href = './categroy.html'
})

$('.xh-footer li').eq(2).on("tap", function () {
    location.href = './found.html'
})

$('.xh-footer li').eq(3).on("tap", function () {
    location.href = './cart.html'
})

$('.xh-footer li').eq(4).on("tap", function () {
    location.href = './user.html'
})