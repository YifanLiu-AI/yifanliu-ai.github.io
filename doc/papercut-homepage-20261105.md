# Papercut 个人站本地重构 · 2026-11-05

基于 OpenSlide Papercut Zine Fest 完整官方源码重构，沿用 Jekyll 和现有数据。官方提交为 `4f09a4e4875a0be7fb1083932709073af6377092`。源码、16 页保真 PPTX、HTML 导出和逐页图片已保存到 `/Users/a123/Desktop/CodexWorkspace/references/papercut-zine-fest/`。

## 源码复用

- `assets/js/papercut-primitives.js` 移植官方 `rng`、`torn`、`tapeClip`、`dots`、`dotsDiag`；ResizeObserver 按纸片和胶带实际尺寸更新几何。
- `assets/css/papercut-primitives.css` 集中管理 RisoText 双层套印、Scrap 撕边与网点阴影、Tape 锯齿、Badge 工牌、矩形与圆形印章。印章采用官方 Rubik Mono One 字体。
- `assets/css/papercut-home.css` 负责网站排版与响应式布局，替换之前多轮追加的样式。
- 胶带按 cover、numbers、voices、access、facts、close 各自构图摆放；Intern 工牌按官方 Badge 不贴胶带。
- 网站适配包含正常文档流、字体和几何缩放、正文加深及底纹减淡。没有逐像素复制固定 1920×1080 幻灯片画布。来源映射见 `assets/papercut/upstream-manifest.json`，许可见 `THIRD_PARTY_NOTICES.md`。

## 页面与交互

- 保留 4 条 News、2 条 Intern、3 个 Projects、原图片、视频和链接。署名统一为 YIFAN LIU，两个有作者名单的项目中 Yifan Liu 加粗；LeHome 无作者名单。不恢复已下架 CV。
- 固定奶油纸底和蓝粉套印。河套学院用莓红色，机构标志下不再重复英文全称。
- TwinPath Wrist 图片框按原图 1005:369 比例展示，保留纸边与图注，去掉视频框造成的上下空白。
- 用户选定比赛方案 C：标题为 RoboSyn Challenge / LeHome Challenge；宽印章左侧会议名与年份上下排列，右侧 #11 / #17，中间细线分隔。小屏缩放保留层级。
- 首页姓名保留间歇套印轻抖；新增一次性滚入压印、标题粉墨校准、纸片悬停回正与网点投影、链接着色、封面圆点最多 ±4px 指针位移。继续遵守 prefers-reduced-motion，不显示开关。顶部只保留四项导航，GitHub 地址在联系区。
- 保留锚点导航、头像原图切换、图片/视频放大、Esc 关闭、焦点返回。日期与作者在桌面常驻，手机通过媒体弹窗查看完整介绍和链接。两场比赛使用保留完整动作、3 倍速无限循环的压缩 GIF 预览（480px、10fps、96 色），按最新要求删除 3× speed 文本，保留三倍速；放大后提供原视频控件。系统减少动效时用静态封面替代 GIF。

## 前一轮验证记录（本轮变更见下）

Jekyll 构建、两个 JavaScript 文件语法检查和 git diff 空白检查通过。浏览器检查桌面 1280、平板 768、手机 390/320px，页面无横向溢出。修复手机胶带越界、平板印章与头像按钮遮挡、桌面标签与按钮重叠，以及锚点偏移叠加。

浏览器验证：所有图片加载，两个视频 readyState=4 且可播放；暂停动效时视频同步暂停；头像切换、详情展开、图片/视频弹窗、Esc 关闭与按钮焦点返回正常。确认工牌胶带数为 0、作者加粗数为 2、LeHome 作者段落数为 0，正文和纸片未启用动画。浏览器未报告 JavaScript 错误。系统级 reduced-motion 未切换实测。

截图保存在 `/Users/a123/Desktop/CodexWorkspace/projects/NeurIPS2026/output/papercut-homepage-20261105/`，本轮文件以 `source-refactor-` 开头。

本地预览：http://127.0.0.1:4173/ 。分支 `codex/papercut-personal-site`，尚未提交、推送或上线。

## Gemini 评审与本轮定稿（2026-11-05）

- 已在 Gemini 网页上传完整生效前端文本（HTML、模板、CSS、JS、项目数据）、官方 16 页 HTML 原件与可读 TSX；评审已返回，原文与提示保存在外部参考目录 `gemini-review-20261105/`，没有上传凭据或配置。对话：`https://gemini.google.com/app/cc8682415948c94b?hl=zh`。
- 删除 ROBOT LEARNING、ROBOTICS、ABOUT ME、重复署名/分区页码和 CONTACT 标签；全站身份名称统一 YIFAN LIU。收紧首屏与模块空白，保留正文可读字号；简介移入首屏文字列。
- 三个项目标题置于媒体纸片下沿，删除上方重复标题和编号。手机竖屏仅显示媒体纸片和叠印；印章约再缩小 15%，NeurIPS 印章从 185×48px 缩至 161×42px。桌面仍为媒体与说明并排。
- 3× speed 标注删除，GIF 仍为三倍速无限循环。手机隐藏的说明、日期、作者与外链在媒体弹窗中可查看，禁 JS 时保留常规说明。点击画面或 Expand 均打开媒体。
- 用户补充本地参考 `~/Downloads/yifan_liu_academic_homepage_papercut_zine_fest_edition.html`，仅核查并借鉴交互源码；浏览器策略禁止 file://，未执行该页面。采纳纸片轻微回正、投影分离、印章压印和同时入场纸片 65ms 错峰，保留原有官方几何与真实媒体。
- 正文无默认隐藏态，滚入效果仅一次；新增动效在减少动态效果时关闭。导航根据实时章节位置更新，覆盖锚点跳转和布局变化。
- 当前改动仅本地，未提交、推送或上线。

### 本轮验收结果

- 桌面 1280×900、平板 768×1024、手机 390×844 与 320×740 检查通过，未见横向溢出；1280px 下整页约 3138px，调整前约 4219px。
- 手机媒体弹窗可显示完整介绍、日期、作者和链接；TwinPath 图片、Esc 关闭、焦点返回和头像切换均已实测。页面无 3× speed 文本，每个项目保留一个标题。
- 740×390 横屏发现横向溢出。源码显示 LeHome 胶带仍以卡片宽度的 -6% 外伸，已将手机端外伸限制到 12px。修改后 Jekyll 构建、两份 JS 语法检查与 diff 空白检查通过；浏览器连接连续超时，横屏修正尚未复测，新增 hover 细节也未完成最终现场验收。系统 reduced-motion 未切换实测。
- 最新手机截图：`media-cards-mobile-full.png` 和从该图裁出的 `media-cards-mobile.png`；截图前已确认三张媒体加载、页面滚回顶部。截图对应横屏胶带修正之前，390px 下胶带偏移不受此修正影响。

## 发布准备与导航补充（2026-11-05）

- 用户授权上传网站，并要求补充顶部导航的滚动交互。采用下滚累计 32px 收起、回滚累计 12px 显示；页首保持展开，键盘聚焦时显示，点击站内锚点后短暂保持展开。减少动态效果时取消过渡动画。
- 导航逻辑验证通过：方向切换、细微滚动阈值、回到顶部、键盘焦点、鼠标焦点、锚点保持和底部弹性滚动。此项为 Node 隔离逻辑验证，浏览器连接超时，未完成现场滚动验收。
- Jekyll 构建、JS 语法、diff 空白检查、构建后首页本地资源存在性检查通过。发布目标为现有 GitHub Pages 的 main 分支根目录。

## 手机贴纸稳定性（2026-11-05）

- 用户反馈手机滚动时网点贴纸偶尔全部消失。未在当前桌面浏览器中复现原故障；检查到胶带依赖 JS 尺寸、CSS clip-path、mix-blend-mode 和父纸片动画叠加。
- 将胶带的官方锯齿与 4px 网点固化到蓝/粉 SVG；CSS 直接显示图片，移除胶带的运行时测量、CSS 裁切与混色。手机纸片停止滚入位移，网点阴影使用普通合成；姓名、导航、标题墨层等原交互保留。
- 尺寸为零时不覆盖纸片轮廓，pageshow 重新校准。零尺寸恢复逻辑检查通过；390px 内置浏览器来回滚动检查后贴纸可见、页面无横向溢出。尚不能据此保证所有手机浏览器的偶发问题已完全消除。
- News 四种方案保存在工作区之外的 `output/news-options-20261105/`，仅本地预览，等待用户选择。

## News 时间票据定稿（2026-11-05）

- 用户选定 B 并授权替换。News 改为桌面 2×2、手机单列时间票据，保留四条真实消息、日期与机构标志；赛事名作为主标题，结果作为次级文字，正文去掉重复结果。左侧日期栏交替使用莓红反白，保留官方撕边和网点阴影。
- 手机日期栏由预览的 72px 收窄至 62px；窄屏标志自然换行，平板标志置于标题下方。
- 按用户追加要求删除 Original photo 和 Explore projects，移除照片切换脚本及相关样式，避免空节点阻断后续交互。
- Jekyll 构建、JS 语法和 diff 检查通过；内置浏览器 1280、768、390、320px 无横向溢出，News 无文字溢出。媒体展开、Esc 关闭与焦点返回正常，浏览器无 JS 错误。
- 截图：外部输出目录 news-options-20261105/b-integrated-desktop.jpg、b-integrated-mobile.jpg。发布时以本次 Git 提交与 Pages 部署记录为准。
