# QuantumultX 自用脚本
## 食用说明
### ⚠️注意⚠️: 以下内容中，带“;” “#”的都是注释符号，去掉前面的符号，该行才有效

### [general]

//Quantumult X 会对 server_check_url 指定的网址进行相应测试，以确认节点的可用性

//当然，你同样可以在 server_local/remote 中，为节点、订阅单独指定server_check_url参数

server_check_url= http://www.qualcomm.cn/generate_204

### 👍运行模式模块
根据网络自动切换 分流/直连/全局代理 等模式

//running-mode-trigger 模式下，跟手动切换直连/全局代理 等效，rewrite/task 模块始终会生效，比 ssid 策略组设置简单，比 ssid-suspend 更灵活。

running_mode_trigger=filter, filter, asus-5g:all_direct, asus: all_proxy

//上述写法，前两个 filter 表示 在 4G 网络跟一般 Wi-Fi 下，走 filter(分流)模式，asus-5g 则切换为全局直连，asus 切换为全局代理

//如需使用，相应 SSID 换成你自己 Wi-Fi 名即可

//ssid_suspended_list，让 Quantumult X 在特定 Wi-Fi 网络下暂停工作(仅 task 模块会继续工作)，多个Wi-Fi用“,”连接

ssid_suspended_list=Asus, Shawn-Wifi

//dns_exclusion_list中的域名将不使用fake-ip方式. 其它域名则全部采用 fake-ip 及远程解析的模式

dns_exclusion_list=*.qq.com, qq.com

//UDP名单，留空则默认所有为端口。不在udp白名单列表中的端口，将被丢弃处理。

udp_whitelist=53, 123, 1900, 80-443

//下列表中的内容将不经过 QuantumultX的处理

excluded_routes= 192.168.0.0/16, 172.16.0.0/12, 100.64.0.0/10, 10.0.0.0/8
icmp_auto_reply=true

//update-interval为更新间隔，单位毫秒，默认48小时自动更新一次

### [policy] / [filter_remote]

故障切换 需修改配置文件，修改节点1节点2为已有节点名，并按需求新增更多节点才可启用

自动选择 根据 server-tag-regex 匹配的节点，按照设置 check-interval 测速，误差大于所设 tolerance 值才切换

机场专线 默认为启用，在规则中取消 ; 即可

国外网站 可自定义配置

国外影视 可自定义配置

YouTube分流 可自定义配置

Netflix分流 可自定义配置

网易云音乐分流 提供网易云音乐解锁节点 ⚠️需启用server-local的music.126.net的分流策略

国内视频分流 可自定义配置

苹果服务分流 可自定义配置

限制屏蔽更新 默认未启用，若需要请在规则中勾选并更新

漏网之鱼 可自定义配置

广告拦截 包含毒奶小姐姐的规则，NoByDa去广告测试版，NoByDa去广告稳定版，NoByDa4w规则，NoByDa6w规则，默认启用毒奶小姐姐的规则以及NoByDa4w和6w的拦截规则

正则表达式举例：日本 可根据自己的需求配置正则表达式

### [rewrite_local]

知乎直接看  //将链接重定向到搜狗实现，可能会有bug

淘宝历史价格显示

获取联通cookie

### [rewrite_remote]

开屏去广告

VIP破解

毒奶小姐姐特供

神机 youtube 去广告

野比重写规则

TikTok解锁

### [http_backend]

boxjs，根据需求常配合 task_local，rewrite_local，mitm 使用

### [task_local]

机场签到脚本
