// 侧导航数据
async function getData() {
    let dataNav = await getFetch(replaceHost('https://mall.xiangha.com/cmobile/index.php?app=goods_cat&mod=get_root_class_xcx'))
    renNav(dataNav.class_list)

    getNavData(32)
}
// 右边列表数据
async function getNavData(id) {
    let data = await getFetch(replaceHost(`https://mall.xiangha.com/cmobile/index.php?app=goods_cat&mod=get_sec_third_class_xcx&pid=${id}&channel=&appVersion=`))
    renList(data.class_list)
}

getData()

let index = 0
// 渲染侧导航
function renNav(data) {
    data.forEach((v, i) => {
        if (i === 0) {
            $('.left').append($(`<div class="nav nav-this over-els" id=${v.gc_id}>${v.gc_name}</div>`))
        } else {
            $('.left').append($(`<div class="nav over-els" id=${v.gc_id}>${v.gc_name}</div>`))
        }
    });
    let navs = document.getElementsByClassName("nav")
    Array.from(navs).forEach((v, i) => {
        v.onclick = function () {
            if (!Array.from(this.classList).find((v) => {
                return v === "nav-this"
            })) {
                $(navs[index]).removeClass("nav-this")
                $(this).addClass("nav-this")
                index = $(this).index()

                getNavData(this.id)
            }
        }
    })
}

// 渲染列表数据
function renList(data) {
    $('.right').html("")
    data.forEach((v) => [
        $('.right').append($(` <div class="nav-main">
    <div class="title">
        <h2>${v.gc_name}</h2>
    </div>
    <div class="list">
    </div>
    </div>`))
    ])

    let lists = document.getElementsByClassName("list")

    data.forEach((v, i) => {
        v.third_class.forEach((val) => {
            $(lists[i]).append($(` <div class="item">
            <div class="pic" id=${val.gc_id}>
                <img src=${val.image} alt="">
            </div>
            <div class="tit">
                ${val.gc_name}
            </div>
            </div>`))

        })
    })

}


// 下方导航跳转
$('.xh-footer li').eq(0).on("tap", function() {
    location.href = './index.html'
})

$('.xh-footer li').eq(1).on("tap", function() {
    location.href = './categroy.html'
})

$('.xh-footer li').eq(2).on("tap", function() {
    location.href = './found.html'
})

$('.xh-footer li').eq(3).on("tap", function() {
    location.href = './cart.html'
})

$('.xh-footer li').eq(4).on("tap", function() {
    location.href = './user.html'
})