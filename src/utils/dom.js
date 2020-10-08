
import Vue from 'vue'

const isServer = Vue.prototype.$isServer;

/**
 * 绑定事件
 */
export const on = (function () {
  if (isServer) return function () {};
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})();

/**
 * 解除绑定的事件
 */
export const off = (function () {
  if (isServer) return;
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})();

/**
 * scrollTop animation
 * @param el 滚动元素
 * @param from 开始位置
 * @param to 结束位置
 * @param duration 总时间
 */
export const scrollTop = (el, from = 0, to, duration = 500) => {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (cb) {
                return window.setTimeout(cb, 1000 / 60)
            }
        )
    }
    const step = Math.ceil(Math.abs(from - to) / duration * 50);

    const scrollTo = (start, end, step) => {
        if (start === end) return;

        let dis = (start + step > end) ? end : start + step;
        if (start > end) {
            dis = (start - step < end) ? end : start - step;
        }

        if (el === window) {
            window.scrollTo(dis, dis);
        } else {
            el.scrollTop = dis;
        }
        window.requestAnimationFrame(() => scrollTo(dis, end, step));
    };
    scrollTo(from, to, step);
};
