/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import axios from "axios";
import { MessageBox } from "element-ui";

// import store from "@/store";

class AjaxRequest {
  constructor() {
    // this.baseURL = process.env.VUE_APP_BASE_API;
    // this.timeout = 5000
    this.withCredentials = true;
  }

  setInterceptor(instance) {
    instance.interceptors.request.use(
      (config) => {
        // 每次请求前，将token 放到请求头中
        // config.headers.token = getToken() || ''

        // 每次请求的时候，都拿到一个取消请求的方法 , 产生一个令牌
        const Cancel = axios.CancelToken;
        config.cancelToken = new Cancel(function (c) {
          // store.commit("request/PUSH_TOKEN", c);
        });

        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    instance.interceptors.response.use(
      (response) => {
        const res = response.data;
        if (res.code === 200) {
          return res;
        }
        const resMsg = res.msg;
        if (typeof resMsg === "object") {
          const arrMsgs = Object.values(resMsg);
          MessageBox.alert(arrMsgs.join('</p><p class="errs">'), "系统提示", {
            confirmButtonText: "知道了",
            dangerouslyUseHTMLString: true,
            callback: () => {},
          });
          return Promise.reject(new Error(resMsg || "error"));
        }
        if (res.selfDefineDialog === "1") {
          // 不用message 弹窗，用设计自定义弹窗
          return res;
        }
        if (res.selfDefineDialog === "0") {
          MessageBox.alert(`<p style="color: #FF2741">${resMsg}</p>`, "系统提示", {
            confirmButtonText: "知道了",
            dangerouslyUseHTMLString: true,
            callback: () => {},
          });
          return Promise.reject(new Error(resMsg || "error"));
        }
      },
      (error) => {
        if (error.response) {
          const { status, data } = error.response;
          console.info(status, data);
          if (status === "401") {
            // store.dispatch("user/ResetToken").then(() => {
            //   location.reload();
            // });
          } else if (status === "500") {
            if (data.status === "401") {
              // store.dispatch("user/ResetToken").then(() => {
              //   location.reload();
              // });
            }
            return Promise.reject(error || "error");
          }
        }
      }
    );
  }

  request(options) {
    const instance = axios.create();
    const config = {
      ...options,
      baseURL: this.baseURL,
      // timeout: this.timeout,
      withCredentials: this.withCredentials,
    };
    this.setInterceptor(instance);
    return instance(config); // 返回的是一个promise
  }
}

export default new AjaxRequest();
