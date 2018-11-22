/**
 * 用于在移动端打印日志
 */
class Simulate  {
    constructor(_options = {}) {
        let defaultOptions = { // 默认配置
            autoScroll : false,              // 日志内容是否滚动
            autoOpenContent : false,         // 日志面板是否自动打开
            wrapperTop:1,                    // 日志面板到屏幕顶部的距离
            buttonRight:0.5,                 // 按钮部分距离屏幕右边的距离
            contentHeight:10,                // 日志内容的高度
            contentOpacity:0.5,              // 日志内容背景透明度
            titleColor: 'rgb(165, 157, 39)', // 日志标题颜色
            logColor:'rbg(255,255,255)'      // 日志颜色
        }
        // 合并配置项
        this.options = Object.assign({},defaultOptions,_options);

        if (window) {
            this.DOM = window.document;
            this.buttonText = this.options.autoOpenContent ? '收起' : '展开';
            this.scrollButtonText = this.options.autoScroll ? '静止' : '滚动';

            // 初始化日志容器结构
            this.init();
        }
    }

    init() {
        if (this.DOM) {
            let logWrapper = this.DOM.createElement('aside');
                logWrapper.style = `position: fixed;top: ${this.options.wrapperTop}rem;right: 1rem;left: 1rem;z-index: 99999`;
 
            let clearButton = this.DOM.createElement('button');
                clearButton.innerText = '清空';
                clearButton.style = `position: absolute;top: 0.2rem;right:${this.options.buttonRight + 6.4}rem;height: 1.6rem;width: 3rem;font-size:0.8rem;border:none;border-radius: 0.2rem;background-color: rgb(46, 161, 123)`;
            
            clearButton.addEventListener('touchend' , () => {
                this.clear();
            })

            let scrollButton = this.DOM.createElement('button');
            scrollButton.innerText = this.scrollButtonText;
            scrollButton.style = `position: absolute;top: 0.2rem;right:${this.options.buttonRight + 3.2}rem;height: 1.6rem;width: 3rem;font-size:0.8rem;border:none;border-radius: 0.2rem;background-color: rgb(46, 161, 123)`;
        
            scrollButton.addEventListener('touchend' , () => {
                this.options.autoScroll = !this.options.autoScroll;
            })


            let logButton = this.DOM.createElement('button');
                logButton.innerText = this.buttonText;
                logButton.style = `position: absolute;top: 0.2rem;right:${this.options.buttonRight}rem;height: 1.6rem;width: 3rem;font-size:0.8rem;border:none;border-radius: 0.2rem;background-color: rgb(46, 161, 123)`;
            
            logButton.addEventListener('touchend' , () => {
                if (this.logContent.style.getPropertyValue('display') == 'none') {
                    this.logContent.style.setProperty('display' , 'block');
                    logButton.innerText = '收起';
                } else {
                    this.logContent.style.setProperty('display' , 'none');
                    logButton.innerText = '展开';
                }
            })

            let displayString;
            if (this.options.autoOpenContent) {
                displayString = 'block';
            } else {
                displayString = 'none';
            }

            let logContent = this.DOM.createElement('ul');
                logContent.style = `display:${displayString};background-color: rgba(0,0,0,${this.options.contentOpacity});padding: 0.5rem;border-radius: 0.5rem;border:none;height: ${this.options.contentHeight}rem;margin-top: 2rem;list-style-type: decimal;font-size: .8rem;overflow-y: scroll;overflow-x:hidden;animation: 0.5s ease all;`;            

            this.logContent = logContent;
            
            logWrapper.appendChild(clearButton);
            logWrapper.appendChild(scrollButton);
            logWrapper.appendChild(logButton);
            logWrapper.appendChild(logContent);

            this.DOM.body.appendChild(logWrapper);
            this.LogWrapper = logWrapper;
        }
    }

    createLogElement(titleString,logString) {
        if (this.DOM) {
            let li = this.DOM.createElement('li'),
                b = this.DOM.createElement('b'),
                span = this.DOM.createElement('span');

            li.style = `margin-left: 1rem;word-wrap: break-word;`;
            b.style = `display: block;padding-right: 0.3rem;color:${this.options.titleColor};`;
            span.style = `color: ${this.options.logColor};`;
            
            b.innerText = titleString;
            span.innerText = logString;
            li.appendChild(b);
            li.appendChild(span);

            return li;  
        }

    }

    log(title,log) {

        if ( typeof title == 'object') {
            title = JSON.stringify(title);
        }
        if ( typeof log == 'object') {
            log = JSON.stringify(log);
        }
        if (this.logContent) {
            this.logContent.appendChild(this.createLogElement(title,log));

            if (this.options.autoScroll) {
                this.logContent.scrollTop = this.logContent.scrollHeight;
            }
        }
    }

    clear() {
        if (this.logContent) {
            this.logContent.innerHTML = ''
        }
    }
}

window.Simulate = Simulate;