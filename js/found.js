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

let goodList
// 请求数据
async function getData() {
    let data = await getFetch(replaceHost(`https://mall.xiangha.com/cmobile/index.php?app=index&mod=topic&activity_type=wapcmshome`))
    // 轮播图
    renSwiper(arr)
    // 图片组
    let d = data.data.data
    renPic([d[1], d[3], d[5], d[7]], [d[2], d[4], d[6], d[8]])
    // 商品列表
    goodList = data.data.data[9].data.info
    renGoods(goodList)
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


// 渲染图片组
function renPic(data1, data2) {
    data1.forEach((v) => {
        $('.xh-hot').append(`<div class="hot-item">
        <div class="title">
        ${v.text}
        </div>
        <div class="pic-main">
        </div>
    </div>`)
    })

    let pics = document.getElementsByClassName("pic-main")
    data2.forEach((v, i) => {
        v.data.forEach((val) => {
            $(pics[i]).append($(`<div class="pic-itme"><img src=${val.img} alt=""></div>`))
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