# Rule4Hsu

自用的多客户端代理规则与配置，覆盖 QuantumultX / Shadowrocket / Clash·Mihomo。

## 文件一览

| 文件 | 客户端 | 用途 |
| --- | --- | --- |
| [quantumult.conf](quantumult.conf) | QuantumultX | 完整配置 |
| [shadowrocket.conf](shadowrocket.conf) | Shadowrocket | 完整配置 |
| [clash_full.yaml](clash_full.yaml) | Clash / Mihomo | 独立完整配置，`proxies` 留空 |
| [clash.ini](clash.ini) | Clash | **只有规则**：规则集 + 策略组 |
| [clash_adv.yaml](clash_adv.yaml) | Clash | **带高级配置**：额外挂载 [base/clash_base.yaml](base/clash_base.yaml) |
| [base/clash_base.yaml](base/clash_base.yaml) | - | 骨架模板：TUN / DNS / hosts / NTP |
| [rules/](rules/) | 通用 | 自建规则集 |
| [rewrite/](rewrite/) and [scripts/](scripts/) | QuantumultX | 自用重写与脚本 |

## 快速使用

### QuantumultX

1. 把 [quantumult.conf](quantumult.conf) 导入 App 的配置文件。
2. 在 `[server_remote]` 填入自己的订阅地址。
3. 证书需自行在 App 内生成并信任，`[mitm]` 才可用。

### Shadowrocket

导入 [shadowrocket.conf](shadowrocket.conf) 作为配置文件，节点使用你自己的订阅。

### Clash / Mihomo

**直接使用**：也可配合 [limbopro 的订阅转换](https://limbopro.com/tools/2yaml) 合并配置与订阅。

- [clash_full.yaml](clash_full.yaml)：独立完整配置，在 `proxies` 填入节点即可。

**需要转换器**：用 [SubConverter-Extended](https://github.com/Aethersailor/SubConverter-Extended) 转换后使用。

- [clash.ini](clash.ini)：只有规则。
- [clash_adv.yaml](clash_adv.yaml)：带高级配置，需要能取到 `clash_rule_base` 指向的
  [base/clash_base.yaml](base/clash_base.yaml)。

## 致谢 / 来源

- **转换工具**：[SubConverter-Extended](https://github.com/Aethersailor/SubConverter-Extended)、
  [Mihomo 内核 / Clash 系列订阅转换](https://limbopro.com/tools/2yaml)
- **规则来源**：[Adblock4limbo](https://github.com/limbopro/Adblock4limbo)、
  [ios_rule_script](https://github.com/blackmatrix7/ios_rule_script)、
  [ACL4SSR](https://github.com/ACL4SSR/ACL4SSR)
