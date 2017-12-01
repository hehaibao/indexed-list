/**
 * @desc 索引列表插件
 * @author haibao[http://www.hehaibao.com/]
 */
;($ => {
    $.indexedList = options => new indexedList(options);
    class indexedList {
        constructor(options) {
            this.init(options);
        }
        init(options) {
            //默认配置
            this.config = $.extend(true, {}, {
                el: '.indexed-list', //主列表DOM [选填，默认值：.indexed-list]
                elNav: '.indexed-nav', //右侧列表DOM [选填，默认值：.indexed-nav]
                datas: [] //自定义的数据 [必填，默认为空数组]
            }, options);

            this.autoCreate();
        }
        autoCreate() {
            const _self = this;
            //自动生成列表
            const datas = _self.config.datas;
            const dataLen = datas && datas.length;

            if(dataLen) {
                //有数据
                let labelsTpl = `
                    <% for(let i=0; i < dataLen; i++) { %>
                        <li class="<%= i == 0 ? 'active' : '' %>"><%= datas[i].label %></li>
                    <% } %>
                `;
                let listTpl = `
                    <% for(let i=0; i < dataLen; i++) { %>
                        <li>
                            <h2><%= datas[i].label %></h2>
                            <dl>
                                <% for(let j=0; j < datas[i].lists.length; j++) { %>
                                <dd><a><%= datas[i].lists[j] %></a></dd>
                                <% } %>
                            </dl>
                        </li>
                    <% } %>
                `;
                let topArr = [];
                let [parseLabels, parseLists] = [eval(_self.compile(labelsTpl)), eval(_self.compile(listTpl))];
                //渲染主列表数据
                $(_self.config.el).html(parseLists()).find('li').each((i,v) => {
                    //数组存入 索引所对应的top位置
                    topArr.push(_self.getTop(i));
                });
                //渲染右侧导航数据，并绑定点击事件
                $(_self.config.elNav).html(parseLabels()).on('click', 'li', function(){
                    //显示当前点击的值，并滚动指定位置
                    $(this).addClass('active').siblings().removeClass('active');
                    let [currentTxt, currentIndex] = [$(this).text(), $(this).index()];
                    let currentTop = _self.getTop(currentIndex); //当前点击的TOP值
                    if(!$('#hhb_prompt').length) {
                        //防止重复创建，滚动至位置后移除
                        $('body').append(`<span id="hhb_prompt">${currentTxt}</span>`);
                        $("html, body").scrollTo({toT: currentTop, callback: () => {
                            $('#hhb_prompt').remove();
                        }});
                    }
                });

                //监听滚动，当到指定位置时，高亮右侧对应标签
                $(window).on('scroll', () => {
                    let currentTop = document.documentElement.scrollTop || document.body.scrollTop;
                    let currentIndex = _self.getArrIndex(topArr, currentTop);
                    $(_self.config.elNav).find('li').removeClass('active').eq(currentIndex).addClass('active');
                });
            } else {
                //空数据
                alert('抱歉，请传入您想要展示的数据哦~');
                return;
            }
        }
        getTop(index = 0) {
            //根据索引返回当前元素的位置：top值
            return $(this.config.el).find('li').eq(index).offset().top;
        }
        getArrIndex(arr, num) {
            //逐个求差的绝对值，求出最接近值的索引
            const newArr = [];
            arr.map(function(x) {
                // 对数组各个数值求差值
                newArr.push(Math.abs(x - num));
            });
            // 求最小值的索引
            const index = newArr.indexOf(Math.min.apply(null, newArr));
            return index;
        }
        compile(template) {
            //模板编译
            const evalExpr = /<%=(.+?)%>/g;
            const expr = /<%([\s\S]+?)%>/g;
          
            template = template
              .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
              .replace(expr, '`); \n $1 \n  echo(`');
          
            template = 'echo(`' + template + '`);';
          
            let script =
            `(function parse(data){
              let output = "";
          
              function echo(html){
                output += html;
              }
          
              ${ template }
          
              return output;
            })`;
          
            return script;
        }
    }

    //滚动
    $.fn.scrollTo = function(options){
        const defaults = {
            toT: 0,    //滚动目标位置
            durTime: 400,  //过渡动画时间
            delay: 30,     //定时器时间
            callback: null   //回调函数
        };
        const opts = $.extend(defaults, options);
        const _this = this;
        const curTop = _this.scrollTop();
        let timer = null;
        const subTop = opts.toT - curTop;
        let index = 0;
        const dur = Math.round(opts.durTime / opts.delay);
        const smoothScroll = (t) => {
                index++;
                const per = Math.round(subTop/dur);
                if(index >= dur) {
                    _this.scrollTop(t);
                    clearInterval(timer);
                    if(opts.callback && typeof opts.callback == 'function') {
                        opts.callback();
                    }
                    return;
                } else {
                    _this.scrollTop(curTop + index*per);
                }
            };
        timer = setInterval(() => {
            smoothScroll(opts.toT);
        }, opts.delay);
        return _this;
    };

})(window.Zepto || window.jQuery);