/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */
class Webqwe {
    constructor() {
        this.logs = [];
        this.logSeparator = '\n';
        this.csrf_token =  'TDt2HwWGhMLACgVR0Wc7QesmAn4KQiMB',
        this.jwt_token = null;
        this.headers = {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            'X-CSRF-Token': this.csrf_token,
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Mobile/15E148 Safari/604.1",
            "Cookie": `_csrf=${this.csrf_token};`,
        }
        
        this.loginUrl = 'https://webqwe.com/api/login';
        this.clockinUrl = 'https://webqwe.com/user/api/user_clockin';
        this.goldLogUrl = 'https://webqwe.com/user/api/user_gold_log';
        
        this.userAccount = '1572441901'
        this.password = '1127..'
    }

    log(...logs) {
        if (logs.length > 0) {
          this.logs = [...this.logs, ...logs];
        }
        console.log(logs.join(this.logSeparator));
      }

    async login() {
        const loginInfo = `userAccount=${this.userAccount}&passwd=${this.password}&X-CSRF-Token=${this.csrf_token}`;
        
        const request = {
            url: this.loginUrl,
            method: 'POST',
            headers: this.headers,
            body: loginInfo,
            timeout: 5000
        };

        try {
            const response = await $task.fetch(request);
            const jwtToken = response.headers["Set-Cookie"]?.match(/jwt_token=([^;]+)/)?.[1];

            if (jwtToken) {
                this.jwt_token = jwtToken;
                this.headers["Content-Type"] = "application/json";
                this.headers["Cookie"] = this.headers["Cookie"] + ` jwt_token=${this.jwt_token};`;
                this.log("", "🎉 webqwe 获取身份认证成功！");
                return { status: true };
            } else {
                this.log("", "❗️ webqwe 获取身份认证失败！");
                return { status: false, msg: JSON.parse(response.body).message };
            }
        } catch (error) {
            this.log("", "❗️ webqwe 获取身份认证失败！");
            return { status: false, msg: error.message };
        }
    }

    async checkIn() {
        const request = {
            url: this.clockinUrl,
            method: 'POST',
            headers: this.headers,
            timeout: 5000
        };

        try {
            const response = await $task.fetch(request);
            const responseBody = JSON.parse(response.body);

            if (responseBody.code === 0) {
                this.log("", "🎉 webqwe 签到成功！");
                return { status: true, msg: responseBody.message };
            } else {
                this.log("", `❗️ webqwe 签到失败：${responseBody.message}`);
                return { status: false, msg: responseBody.message };
            }
        } catch (error) {
            this.log("", "❗️ webqwe 签到失败：", error.message);
            return { status: false, msg: error.message };
        }
    }

    async getCheckInfo() {
        const body = {
            "sort":"id",
            "order":"desc",
            "offset":0,
            "limit":1,
            "types":"0",
            "goldS":"",
            "dataSrc":"0",
            "id":"",
            "gold":"",
            "msg":"",
            "X-CSRF-Token": this.csrf_token
        };

        const request = {
            url: this.goldLogUrl,
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body),
            timeout: 5000
        };

        try {
            const response = await $task.fetch(request);
            const responseBody = JSON.parse(response.body);
            
            let userGoldLog = responseBody.data?.userGoldLog?.[0];
            let gold = userGoldLog?.userGoldLog?.gold || 'none';
            let datetime = userGoldLog?.userGoldLog?.createdAt || 'none';
            let userName = userGoldLog?.user?.userName || 'none';

            if (!userGoldLog) {
                this.log("", "❗️ 签到信息获取失败！");
                return { status: false, msg: '❗️ 用户签到信息获取异常' };
            } else {
                return {
                    status: true, 
                    msg: {
                        gold: gold, 
                        userName: userName,
                        datetime: datetime
                    }
                };
            }
        } catch (error) {
            this.log("", "❗️ 签到信息获取失败！", `${error.message}`);
            return { status: false, msg: error.message };
        }
    }
}

!(async () => {
    const webqwe = new Webqwe();  // 创建类签到实例
    
    const startTime = new Date().getTime();
    webqwe.log('', '🔔 webqwe 签到，开始！');

    // TODO: 存储登录信息，不每次都重新登录
    // $prefs.setValueForKey("jwt_token", this.jwt_token);
    // let jwt_token = $prefs.valueForKey("jwt_token");
    // if (checkInResult.msg === "未登录") {
    //     let loginResult = await webqwe.login();
    //     let checkInResult = await webqwe.checkIn();
    // }
    
    let loginResult = await webqwe.login();
    if (!loginResult.status) {
        $notify("webqwe", "登录失败", loginResult.msg);
    } else {
        let checkInResult = await webqwe.checkIn();

        if (checkInResult.status) {
            const result = await webqwe.getCheckInfo();
            if (result.status) {
                let logs = ["", "==============📣系统通知📣=============="];
                logs.push(`你获得了 ${result.msg.gold} 积分`);
                logs.push(`用户名：${result.msg.userName}`);
                logs.push(`签到日期：${result.msg.datetime}`);
                webqwe.log(...logs);
                $notify("webqwe", `你获得了 ${result.msg.gold} 积分`, `用户名：${result.msg.userName}`);
            } else {
                $notify("webqwe", "签到信息获取失败", result.msg);
            }
        } else {
            $notify("webqwe", "签到失败", checkInResult.msg);
        }
    }

    const endTime = new Date().getTime();
    const costTime = (endTime - startTime) / 1000;
    webqwe.log('', `🔔 webqwe 签到，结束！🕛 ${costTime} 秒`);
    $done();
})();
