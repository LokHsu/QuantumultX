hostname= www.zhihu.com, zhuanlan.zhihu.com

# 知乎网页去登录提示(利用Sougou的引流)
(^https?://www\.zhihu\.com/question/)(\d+)(.*) url 302 https://www.zhihu.com/tardis/sogou/qus/$2

# 知乎网页去广告 & 推荐列表
https://www\.zhihu\.com/api/v4/questions/\d+/related-readings url reject-200
https://www\.zhihu\.com/api/v4/answers/\d+/related-readings url reject-200
https://www\.zhihu\.com/api/v4/hot_recommendation url reject-200
https://www\.zhihu\.com/commercial_api/banners_v3/mobile_banner url reject-200
https://zhuanlan\.zhihu\.com/api/articles/\d+/recommendation url reject-200