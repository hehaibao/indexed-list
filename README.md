## jQuery/Zepto 手机联系人字母索引列表 插件

在线演示地址：https://hehaibao.github.io/indexed-list/

### 插件说明：

1. ES6语法，支持jQuery和Zepto；
2. 压缩后indexedList.min.js仅4kb,未压缩文件是7kb；
3. 支持移动端单张预览；
4. 支持gulp压缩js；

### 如何使用？

1. 引入jQuery或Zepto

```javascript
<script src="https://cdn.bootcss.com/zepto/1.2.0/zepto.min.js"></script>
```

2. Dom结构

```html
<!-- wrapper -->
<div id="list-wrapper">
    <!-- 主列表 -->
    <ul class="indexed-list"></ul>

    <!-- 右侧导航列表 -->
    <ul class="indexed-nav"></ul>
</div>
```

3. 引用我写好的默认CSS

```css
<style>
.indexed-list h2{background-color: #f7f7f9;color: #333;line-height: 40px;text-indent: 15px;font-size: 1.143rem;}
.indexed-list dd{line-height: 44px;background-color: #fff;padding: 0 15px;}
.indexed-list dd a{display: block;color: #333;border-bottom: 1px solid #ddd;}
.indexed-list dd:last-child a{border-bottom: 0 none;}
.indexed-nav{background-color: #fff;position: fixed;top: 50%;right: 5px;z-index: 99;color: #5995F1;font-size: .85rem;-webkit-transform: translateY(-50%);transform: translateY(-50%);}
.indexed-nav li{padding: 0 4px 2px;text-align: center;}
.indexed-nav li.active{font-size: 1.143rem;color: #64ace3;}
#hhb_prompt{position: fixed;left: 50%;top: 50%;z-index: 10;margin: -30px 0 0 -30px;width: 60px;height: 60px;text-align: center;line-height: 60px;font-size: 30px;color: #fff;background: rgba(0,0,0,.5);border-radius: 4px;}
</style>
```

4. 引入indexedList.min.js, 目录根据你自己项目来;

```javascript
<script src="js/indexedList.min.js"></script>
```

5. 最后一步

```javascript
<script>
   //模拟数据 - Tips: 请按以下格式生成数据
    const data = [
        {
            label: 'A',
            lists: ['a-1','a-2','a-3','a-4','a-5','a-6','a-7','a-8','a-9']
        },
        {
            label: 'B',
            lists: ['b-1','b-2','b-3','b-4','b-5','b-6','b-7']
        },
        {
            label: 'C',
            lists: ['c-1','c-2','c-3','c-4','c-5','c-6','c-7','c-8','c-9','c-10','c-11','c-12']
        },
        {
            label: 'D',
            lists: ['d-1','d-2','d-3','d-4','d-5','d-6','d-7','d-8','d-9']
        },
        {
            label: 'E',
            lists: ['e-1','e-2','e-3','e-4','e-5','e-6']
        },
        {
            label: 'F',
            lists: ['f-1','f-2','f-3','f-4']
        }
    ];

    //调用插件
    $(() => $.indexedList({
         el: '.indexed-list', //主列表DOM [选填，默认值：.indexed-list]
         elNav: '.indexed-nav', //右侧列表DOM [选填，默认值：.indexed-nav]
         datas: data //自定义的数据 [必填，默认为空数组]
    }));
</script>
```


--插件依赖：

* [jQuery](http://jquery.com/) or [Zepto](http://www.zeptojs.cn/)
