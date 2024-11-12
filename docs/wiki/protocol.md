---
date:
  created: 2023-08-02
  updated: 2024-01-02
---

# 科学上网协议

常见的科学上网协议分为 **VPN 协议**和**代理协议**，而在讲解科学上网协议之前，首先需要了解一下最基础的互联网协议模型。

## 互联网协议模型

### OSI 模型

OSI 模型是开放式系统互联模型（英文为 Open System Interconnection Model）的缩写，是一种概念模型，是一个试图使各种设备在世界范围内互连为网络的标准框架。OSI 模型将通信过程抽象化为七个抽象层，分别为**物理层、数据链路层、网络层、传输层、会话层、表示层、应用层**一共七层。从分布式应用程序数据的最高层表示到跨通信介质传输数据的物理实现，每个中间层为上一层提供功能，其自身功能由其下一层提供，功能的类别通过标准的通信协议在软件中实现。

### TCP/IP 模型

TCP/IP 模型是 TCP/IP 协议族（英文为 TCP/IP Protocol Suite 或 TCP/IP Protocols）的缩写，提供了点对点连接的机制，将资料应该如何封装、寻址、传输、路由以及在目的地如何接受，都加以标准化。TCP/IP 模型将通信过程抽象化为四个抽象层，分别为**链接层、网络层、传输层、应用层**一共四层。采取协议堆栈的方式，分别实现出不同的通信协议，协议族下的各种协议，依据功能不同，分别归属到这四个层中，常视简化的 OSI 模型。

---

## [VPN 协议](https://zh.wikipedia.org/wiki/VPN)

VPN 是虚拟专用网络英文为 Virtual Private Network 的缩写，通过互联网在设备之间建立私有的网络连接。VPN 协议用于通过公有网络安全且匿名地传输数据。它们的原理是通过掩蔽用户 IP 地址并加密数据，使未获得接收信息授权的人无法读取。

相对于代理协议，VPN 协议的工作模式无限接近于底层，能实现真正意义上的全局代理，其中一些 Socks 不转发的流量也是全部转发，包括 ARP、DHCP、ICMP 等。这相当于是在你的电脑上虚拟了一张网卡，在第三方眼中，你的 IP 就是 VPN 的 IP，现在大多数的游戏加速器因此也是通过 VPN 协议来实现的。

### [PPTP](https://zh.wikipedia.org/wiki/PPTP)

点对点隧道协议是拨号时代的初生代 VPN 通信协议，英文全称是 Point to Point Tunneling Protocol，由微软开发，最早同 Microsoft Windows 95 OSR2 一起于 1996 年发布，一直沿用至今。它同时使用 TCP 和 GRE 来完成 PPP 数据包的封装和传输。

PPTP 协议从发布之初开始就被因为安全性能低的弱点被诟病。一开始的 PPTP 并没有加密授权特性，只能依靠 PPP（Point-to-Point Protocol 点对点协议）的 MPPE 实现加密保护。即使后面 MPPE 升级实现了 RC4 算法，支持 128 位密钥，仍拥有诸多安全漏洞，很容易被（美国国家安全局 NSA 等）解密攻破并受到（字典/暴力）攻击。为此，部分 VPN 厂商已经弃之不用。即使仍有一些 VPN 因为其良好的稳定性和连接速度将其延用，当用户有重要信息需要保护的时候，PPTP 也并不建议选择。

### [IPSec](https://zh.wikipedia.org/wiki/IPsec)

互联网安全协议（英语：Internet Protocol Security，缩写：IPsec）是一个协议包，透过对 IP 协议的分组进行加密和认证来保护 IP 协议的网络传输协议族（一些相互关联的协议的集合）。IPsec 网络传输协议族主要包括安全协议认证头 AH（Authentication Header）、封装安全载荷 ESP（Encapsulating Security Payload）和因特网密钥交换 IKE (Internet Key Exchange）。它们协同工作以验证源并锁定 IP 数据包，从而建立受保护的连接。

IPSec 可以作为 VPN 服务的协议独立工作，不仅适用于多台机器之间入口对入口的通信，还可用于端对端的分组通信。由于本身缺失加密机制，通常与下面的的 IKEv2 或 L2TP 组合使用。

附 1：IKEv2/IPSec

IKEv2/IPSec 是上述 IPsec 协议套件的一部分，IKEv2 的英文全称是 Internet Key Exchange version 2，独特的 MOBIKE（意为 Mobility and Multihoming Protocol）功能确保了 VPN 连接的稳定性，因为它不会受到任何可能的网络变化的影响。作为由微软和思科 Cisco 联合开发的 IKE 的最新版本，该 VPN 协议通常通过在 IPSec 身份验证套件内在 VPN 客户端和 VPN 服务器之间创建安全关联即 SA 来屏蔽流量，就此出现了 IKEv2/IPsec。

IKEv2/IPsec 不仅安全，而且连接快速，因此许多 VPN 应用程序已经开始使用。

附 2：[L2TP/IPSec](https://zh.wikipedia.org/wiki/L2TP)

L2TP 又叫第二层隧道协议，英文全称是 Layer Two Tunneling Protocol，是上述 PPTP 的继承者，因为本身让没有加密功能，为了提高安全级别，通常与 IPSec 一起实施以加密。这使得该协议组的工作速度比任何单个协议都要慢。

L2TP/IPsec 很容易设置，但由于它绕过防火墙的能力不强，当你想解锁某个区域的任何互联网过滤器时，L2TP/IPSec 并不是首选。知名的 VPN 厂商如 NordVPN 已经在 2018 年底停止了对 PPTP 和 L2TP 的支持。

### SSTP

SSTP 中文名叫安全套接字隧道协议，英文全称是 Secure Socket Tunneling Protocol，是另一种由微软早期开发的 VPN 专用隧道协议，伴随 Windows Vista 面世。SSTP 通过使用 SSL/TLS 来传输 PPP 流量，从而给用户提供了传输级别的安全性。此外，对 TCP 端口 443（默认）的支持有助于使流量成功通过大多数防火墙和代理。由于是微软专有协议，它被广泛认为是对 Windows 更友好的协议，但仍然对 Mac 和 Linux 友好。

SSTP 作为微软的协议，与 OpenVPN 等开源协议相比，SSTP 拒绝任何独立审核。更重要的是，这个 TCP 式的隧道协议在带宽不足的情况可能会出现 TCP 崩溃错误。所以想要让 SSTP 拥有闪电般的速度，请保证足够的带宽。

### SoftEther

SoftEther 实际是一个由日本程序员登大游在硕士毕业时开发的类似于 OpenVPN 的 VPN 程序方案，有 VPN 服务器、客户端、桥接器、命令行工具等组成，已于 2014 年变成了开源软件。它能越过各种防火墙，支持 NAT 穿透，并支持多种 VPN 协议，包括上面提到的 OpenVPN、L2TP、IPsec、SSTP 和自身的 SSL VPN 协议。或许亚洲部分区域用户很少听到这个协议，那是因为该区域的很多地区都已对此协议流量进行了屏蔽，所以根本无法使用。

SoftEther 项目地址：https://github.com/SoftEtherVPN/SoftEtherVPN

### [OpenVPN](https://zh.wikipedia.org/wiki/OpenVPN)

OpenVPN 是一个用于创建虚拟私人网络加密通道的软件包，是一种开源、跨平台、也是目前最常用的 VPN 加密协议，它使用 OpenSSL 加密库的 SSL/TLS 进行密钥交换，以便严密保护点对点或站点到站点连接，并且通过将数据分成小包来传输数据，并允许创建的 VPN 使用公开密钥、电子证书、或者用户名/密码来进行身份验证。

OpenVPN 又可分为两种 OpenVPN TCP 和 OpenVPN UDP，前者更侧重网络安全而后者拥有更好的连接速度。

这里 OpenVPN TCP 当然通过 TCP 隧道传输，所有数据包都按顺序传递。与以流形式传送数据包的 UDP 相比，它具有较慢的速度（当互联网连接不稳定时会发生延迟）但具有更高的加密方式、更好的可靠性并且能够绕过非常严格的防火墙，由于它非常难以被检测和阻止例如 443 端口，它像 SSL 流量一样在线发送数据，而不是 VPN 端口。换句话说，它更适合日常在线行为，如网页浏览、购物、文件发送和电子邮件。OpenVPN TCP 只有在带宽充足的情况下才能正常工作。否则，会意外出现已知的 TCP 崩溃问题。

如果您需要 VPN 服务来解锁/加速在线游戏、流式传输高清电影和电视、实时聊天/会议或 P2P 种子下载，可以使用 OpenVPN UDP。因为相较 OpenVPN TCP，OpenVPN UDP 拥有更快的速度，实现低延迟传输，同时仍然提供出色的安全性和匿名性。这就是为什么许多 VPN 将 OpenVPN UDP 设置为默认配置以向用户提供更好的用户体验的原因。

OpenVPN 项目地址：https://github.com/OpenVPN

### WireGuard

WireGuard 是一种比较新的开源 VPN 协议。由于它的开发目的就是在性能、易用性和省电等方面全面超越当下流行的 IKEv2/IPsec 和 OpenVPN，因此许多人将 WireGuard 称为“ VPN 协议的未来”。而已有实际测试已经证明 WireGuard（使用 UDP）确实比 OpenVPN 使用 TCP 和 UDP 都快，而且 ping 值和延迟更低。并且，与其它具有复杂加密算法的通用 VPN 协议不同，WireGuard 只是重新组装了现成的算法，以实现更简单但仍然安全的加密目标。具体来说，其前沿的密码学用法包括 Noise 协议框架、ChaCha20、Curve25519 等。

WireGuard 最初只支持 Linux（现已直接合并入 Linux 内核），现在已经变成了可在 Windows、macOS、iOS、Android 等多平台使用并且在不断更新迭代。

WireGuard 官网（里面有各个分项目的地址在 git.zx2c4.com 或 GitHub 上）：https://www.wireguard.com

### Lightway

Lightway 是一个由 VPN 提供商 ExpressVPN 建立的只属于自己的 VPN 协议，以实现更便捷、更快速、更安全且更可靠的 VPN 连接。Lightway 利用 wolfSSL（一个嵌入式 SSL/TLS 库）来提供安全通信。无论网络发生任何变化、流失或故障，保护始终处于开启状态。官方已经开放这个 VPN 协议的核心库，使其更加透明，并进行进一步的安全审计。

Lightway 项目地址：https://github.com/expressvpn/lightway-core

---

## 代理协议

代理（Proxy）协议是一种特殊的网络服务，允许一个终端（一般为客户端）通过这个代理服务与另一个终端（一般为服务器）进行非直接的连接。

一个完整的代理请求过程为：客户端首先根据代理服务器所使用的代理协议，与代理服务器创建连接，接着按照协议请求对目标服务器创建连接、或者获得目标服务器的指定资源，代理服务器可能对目标服务器的资源下载至本地缓存，刚客户端索要获取的资源在代理服务器的缓存之中，则代理服务器并不会向目标服务器的资源下载至本地缓存，如果客户端所要获取的资源在代理服务器的缓存之中，则代理服务器并不会向目标服务器发送请求，而是直接传回已缓存的资源。

### 基础的代理协议

常见的科学上网代理协议有 HTTP、HTTPS、Socks5 三种类型，一般科学上网协议都是基于这三种协议基础上而运行。

- **HTTP 代理**：基于 HTTP 协议的代理，主要用于处理 HTTP 流量，对于 HTTPS 等其他类型的流量不具备透明性，需要进行特殊配置。HTTP 代理是最常见的代理类型，几乎所有的网络应用和浏览器都支持它。但是，由于 HTTP 代理需要处理大量的 HTTP 请求和响应，因此它的速度相对较慢。

- **HTTPS 代理**：基于 HTTP 协议，但支持加密的 SSL/TLS 协议，用于处理加密的 HTTPS 流量，适用于需要处理加密通信的场景，如安全访问网站等。但是，由于 HTTPS 需要安装 SSL 证书和进行加密处理，因此它的速度相对较慢。

- **Socks5 代理**：基于 Socks 协议的代理，第五个版本是最新版本，常简称为 Socks5，适用于各种类型的网络通信，包括但不限于 HTTP 和 HTTPS。Socks5 支持 TCP 和 UDP 流量，因此可以用于代理几乎所有类型的网络流量，包括传统的 Web 浏览、邮件、文件传输等，以及实时的音频/视频传输。但是，Socks5 本身不提供加密功能，因此在需要保护数据隐私的场景下，可能需要额外的加密手段，例如使用 TLS/SSL。

### Shadowsocks

Shadowsocks（简称 SS）是一种基于 Socks5 代理方式的加密传输协议。Shadowsocks 分为服务器端和客户端，在使用之前，需要先将服务器端程序部署到服务器上面，然后通过客户端连接并创建本地代理。

Shadowsocks 原始项目地址（作者 clowwindy 受迫于压力已删库）：https://github.com/clowwindy/shadowsocks-libev

Shadowsocks 现今项目地址：https://github.com/shadowsocks

关于 Shadowsocks 的各种分支中最广为流传的应为 ShadowsocksR（简称 SSR），其源于用户 breakwa11 将原项目 fork 后进行了修改，在 Shadowsocks 的基础上增加了一些资料混淆方式，称修复了部分安全问题并可以提高 QoS 优先级。后来贡献者 Librehat 也为 Shadowsocks 补上了一些此类特性，甚至增加了类似 Tor 的可插拔传输层功能。当然其中发生的各种纷争纠葛具体可以参考 [Shadowsocks 的前世今生](https://shadowsockshelp.github.io/Shadowsocks/Shadowsocks-wiki.html)。

### VMess & VLESS

V2Ray 项目地址：https://github.com/v2fly/v2ray-core

VMess 是一个加密传输协议，是基于 V2Ray 内核的自研协议，它分为入站和出站两部分，通常作为 V2Ray 客户端和服务器之间的桥梁。VMess 依赖于系统时间，请确保使用 V2Ray 的系统 UTC 时间误差在 90 秒之内，时区无关。

VLESS 是一个无状态的轻量传输协议，一样分为入站和出站两部分，可以作为 V2Ray 客户端和服务器之间的桥梁。 与 VMess 不同，VLESS 不依赖于系统时间，认证方式同样为 UUID，但不需要 alterId。同时 VLESS 没有自带加密，请用于可靠信道，如 TLS。[（官方警告：VLESS 已被弃用并且可能被移除。请考虑使用 Trojan 作为替代品。）](https://www.v2fly.org/v5/config/proxy/vless.html)

需要注意的是，V2Ray 是一个内核程序，它不是单独运行的。V2Ray 是一个框架，对开发者来说更加自由和方便，就像积木一样，可以按照自己的使用场景把科学上网梯子搭出来，如：

- vmess
- vmess + tls
- vmess + websocket + tls
- vmess + websocket + tls + Nginx
- vmess + websocket + tls + Nginx + cloudfare（CDN）

或者

- vless
- vless + tls
- vless + websocket + tls
- vless + websocket + tls + web
- vless + websocket + tls + web + cloudfare（CDN）

从上至下，随着嵌套的协议越多，自然速度也就越慢，当然安全性也就越高。

附：基于 V2Ray 又出现了 Xray（[官网称 Xray-core 是 V2Ray-core 的超集](https://xtls.github.io/)），其引入了 XTLS 技术，因为 XTLS 无缝拼接了内外两条货真价实的 TLS，此时代理本身几乎无需对数据加解密。VLESS+XTLS 可以理解为是增强版 ECH，即多支持身份认证、代理转发、明文加密、UDP over TCP 等功能。
注意事项：XTLS 本身需要是 TLSv1.3（正常情况下的协商结果)，内层 TLS 可以为 1.3 或 1.2（上网时的绝大多数流量）。

Xray 项目地址：https://github.com/XTLS/Xray-core

### Trojan

Trojan 全称为 Trojan-GFW，是一种利用 TLS 加密方式的协议，Trojan 通过将通信流量伪装成常见的 HTTPS 流量来防止流量被检测和干扰，但是不支持 WebSocket 与 Cloudfare（CDN）。

Trojan-GFW 项目地址：https://github.com/trojan-gfw

Trojan-go 可以看作是 Trojan 的加强版，其支持使用多路复用提升并发性能，使用路由模块实现国内直连；支持 CDN 流量中转（基于 WebSocket over TLS/SSL）；支持使用 AEAD 对 Trojan 流量二次加密（基于 Shaowsocks AEAD）；支持可插拔的传输层插件，允许替换 TLS，使用其他加密隧道传输 Troian 协议流量；支持基于 ACME 协议从 Let's Encrypt 自动申请和更新 HTTPS 证书，只需提供域名和邮箱，直接运行解压得到的执行文件即可，无其他组件依赖。

Trojan-go 项目地址：https://github.com/p4gefau1t/trojan-go

### 其他

Hysteria 项目地址：https://github.com/apernet/hysteria

Brook 项目地址：https://github.com/txthinking/brook

NaiveProxy 项目地址：https://github.com/klzgrad/naiveproxy

Snell（Surge 团队开发的闭源实验性私有代理协议）：https://manual.nssurge.com/others/snell.html

Mieru 项目地址：https://github.com/enfein/mieru

---

## VPN 协议与代理协议的差异

| 协议名称 | 隐藏 IP | 资料加密 | 使用层级 | BT 下载 |
| -------- | ------- | -------- | -------- | ------- |
| VPN 协议 | 支持    | 不支持   | 特定站点 | 支持    |
| 代理协议 | 支持    | 支持     | 整个网络 | 支持    |

从上面的表格可以看出，代理协议虽然可以用来隐藏 IP 地址，但是代理服务器上仍会记录主机的 IP 地址、使用记录等等，而 VPN 协议除了不会记录任何记录，还会对所有记录进行加密。（某些代理协议同样可以通过嵌套其它加密协议来解决隐私问题，也可以通过分流方案设置使用层级。）

参考：https://iyideng.vip/black-technology/cgfw/which-protocol-is-faster-vmess-vless-trojan-gfw-trojan-go.html
