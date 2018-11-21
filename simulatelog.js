class Simulate  {
    
    constructor(_options = {}) {
        let defaultOptions = { // 默认配置
            autoScroll : false,
            autoOpenContent : false
        }
        // 合并配置项
        this.options = Object.assign({},defaultOptions,_options);

        if (window) {
            this.DOM = window.document;

            if(this.options.autoOpenContent){ // 初始化操作按钮文案
                this.buttonText = '收起';
            } else {
                this.buttonText = '展开';
            }
            // 初始化日志容器结构
            this.init();
        }
    }

    init() {
        if (this.DOM) {
            let logWrapper = this.DOM.createElement('aside');
                logWrapper.style = `position: absolute;top: 1rem;right: 1rem;left: 1rem;z-index: 99999`;
 
            let clearButton = this.DOM.createElement('button');
                clearButton.innerText = '清空';
                clearButton.style = `position: absolute;top: 0.2rem;right: 3.4rem;height: 1.6rem;width: 3rem;border:none;border-radius: 0.2rem;background-color: rgb(46, 161, 123)`;
            
            clearButton.addEventListener('touchend' , () => {
                this.clear();
            })

            let logButton = this.DOM.createElement('button');
                logButton.innerText = this.buttonText;
                logButton.style = `position: absolute;top: 0.2rem;right: 0.2rem;height: 1.6rem;width: 3rem;border:none;border-radius: 0.2rem;background-color: rgb(46, 161, 123)`;
            
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
                logContent.style = `display:${displayString};background-color: rgba(0,0,0,0.5);color: #fff;padding: 0.5rem;border-radius: 0.5rem;border:none;height: 10rem;margin-top: 2rem;list-style-type: decimal;font-size: .8rem;overflow: scroll;animation: 0.5s ease all;`;            
                logContent.addEventListener('touchend' , () => {
                    this.options.autoScroll = !this.options.autoScroll;   
                })

            this.logContent = logContent;
            
            logWrapper.appendChild(clearButton);
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

            li.style = `margin-left: 1rem;`;
            b.style = `display: block;padding-right: 0.3rem;color: rgb(165, 157, 39);`;
            
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