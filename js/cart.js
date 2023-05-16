// 页面加载完渲染购物车
window.onload = async function () {
    let goodList = JSON.parse(localStorage.getItem("data"))
    if (goodList[0]) {
        $('.cart-none').hide()
        renCart(goodList)
    } else {
        $('.cart-list').hide()
        $('.cart-settle').hide()
        $('.cart-none').show()
    }
}

// 渲染数据
function renCart(data) {
    data.forEach((v) => {
        // console.log(v);
        $('.cart-list').append($(`<div class="cart-item">
        <div class="checkbox"><input type="checkbox" name="" id=${v.gid} class="box"></div>
        <div class="pic">
            <img src=${v.goods_image} alt="">
        </div>

        <div class="cart-msg">
            <div class="title over-els">${v.goods_name}</div>
            <div class="price">￥<span>${v.goods_marketprice}</span></div>
            
            <div class="bottom">
                <div class="count">
                    <button class="pre">-</button>
                    <input type="text" value="1">
                    <button class="next">+</button>
                </div>
                <div class="remove" id=${v.gid}>删除</div>
            </div>
        </div>

    </div>`))
    })
    events()
}


// 监听事件
function events() {
    let allboxs = Array.from(document.getElementsByClassName("allbox"))
    let boxs = Array.from(document.getElementsByClassName("box"))
    let pres = Array.from(document.getElementsByClassName("pre"))
    let nexts = Array.from(document.getElementsByClassName("next"))
    let removes = Array.from(document.getElementsByClassName("remove"))

    // 全选
    allboxs.forEach((v) => {
        v.onclick = function () {
            boxs.forEach((ele) => {
                ele.checked = this.checked
            })
            allboxs.forEach((val) => {
                val.checked = v.checked
            })
            updateCart()

        }
    })

    // 单选
    boxs.forEach((v, i) => {
        v.onclick = function () {
            allboxs.forEach((value) => {
                value.checked = !boxs.find((val) => {
                    return !val.checked
                })
            })
            updateCart()

        }
    })

    // 加
    nexts.forEach((v, i) => {
        v.onclick = function () {
            if (this.previousElementSibling.value > -1) {
                this.previousElementSibling.value = +this.previousElementSibling.value + 1
            }
            updateCart()

        }
    })

    // 减
    pres.forEach((v, i) => {
        v.onclick = function () {
            if (this.nextElementSibling.value > 0) {
                this.nextElementSibling.value = +this.nextElementSibling.value - 1
            }
            updateCart()
        }
    })

    // 删除
    removes.forEach((v, i) => {
        v.onclick = function () {
            this.parentElement.parentElement.parentElement.style.transform = 'translateX(-120%)';
            this.parentElement.parentElement.parentElement.style.opacity = '0';
            setTimeout(() => {
                let goodList = JSON.parse(localStorage.getItem("data"))
                this.parentElement.parentElement.parentElement.remove()
                updateCart()
                goodList.splice(goodList.findIndex(v => v.gid === this.id), 1)

                localStorage.setItem("data", JSON.stringify(goodList))

                if (!JSON.parse(localStorage.getItem("data"))[0]) {
                    setTimeout(() => {
                        $('.cart-list').hide()
                        $('.cart-settle').hide()
                        $('.cart-none').show()
                    }, 500)
                }

            }, 500)
        }

    });

    // 删除所选
    document.getElementsByClassName("obliterate")[0].onclick = function () {
        boxs.forEach((v, i) => {
            let goodList = JSON.parse(localStorage.getItem("data"))
            if (v.checked) {
                goodList.forEach((val, ind) => {
                    if (v.id === val.gid) {
                        goodList.splice(ind, 1)
                        localStorage.setItem("data", JSON.stringify(goodList))
                    }
                })
                v.parentElement.parentElement.style.transform = 'translateX(-120%)';
                v.parentElement.parentElement.style.opacity = '0';
                setTimeout(() => {
                    v.parentElement.parentElement.remove()
                    updateCart()
                }, 500)
            }

        })

        if (!JSON.parse(localStorage.getItem("data"))[0]) {
            setTimeout(() => {
                $('.cart-list').hide()
                $('.cart-settle').hide()
                $('.cart-none').show()
            }, 500)
        }

    }

    // 总价
    function updateCart() {
        let boxs = Array.from(document.getElementsByClassName("box"))
        let count = 0
        let total = 0
        boxs.forEach((v) => {
            if (v.checked) {
                count++
                let peric = v.parentElement.nextElementSibling.nextElementSibling.children[1].children[0].innerHTML
                let num = v.parentElement.nextElementSibling.nextElementSibling.children[2].children[0].children[1].value
                total = total + peric * num
            }
        })
        document.getElementsByClassName("settle")[0].innerHTML = `结算(${count})`
        document.getElementsByClassName("total")[0].innerHTML = `总价:￥${parseInt(total).toFixed(2)}`
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


// https://txmov2.a.kwimgs.com/upic/2022/09/09/18/BMjAyMjA5MDkxODQyNTFfMTEwNTcyMTY1OV84MzgwMzczNzc1Ml8xXzM=_b_Bd1825764932b9271bb3884eecb540bf8.mp4