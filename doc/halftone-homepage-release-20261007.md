# 主页半调样式发布

用户确认同步本地预览，发布到 yifanliu-ai.github.io。

- 新增独立 halftone-homepage 布局、CSS 和 JS；旧布局保留，便于回退。
- 名字使用 Anton 粗窄字体。名字和区块标题由半调网点组成，背景共用连续网格。
- 正文、日期、导航、研究方向和学校保持清晰文字，优先可读性。
- 研究方向和学校放在名字下方；删除底部 Research Interests。
- 华南理工透明白色 logo 单独转深色，取消正片叠底。
- 新闻、经历仍读取原有数据文件，未改内容。保留链接、SEO 和现有分析配置。
- Anton / Barlow 自托管，附 SIL OFL 许可证。无新增运行依赖。
- 用户追加：头像转半调并与页面共享网格；姓名增加逐字上下错位和上深下浅点径渐变，区块标题加轻量垂直渐变。正文与校徽不受影响。
- 用户最新追加：艺术姓名移到左上角 Logo，去掉低信息密度的大姓名首屏；研究方向、身份、简介紧随导航。头像同时调节点径和网点颜色深度，而非只做灰度过滤。
- 去除顶部重复的研究方向和身份学校两行；简介改成 working on Embodied AI, Bimanual Manipulation, and Dexterous Manipulation。学校与身份只在简介出现一次。
- ICRA 2027 改用真实透明 PNG，去除白底并还原抗锯齿边缘；原图保留，处理脚本和官方来源一并记录。
- 用户否定绿色后，采用低饱和玫红重点色：Logo 网点、链接与重点词使用深玫红，重点词下方用淡玫红细底纹。正文与头像保持灰黑，日期和分隔线用暖灰，不改变内容和半调网格。
- 优化排版与字号：页面最大宽度 1280px，标题列 160px，简介 19px、经历标题 27px。手机头像与 About 标题并排，简介独占整行（18px），避免正文挤在头像左边反复折行。
- GitHub 与 gmail 合并为右上角并排链接组；删除简介下方重复的 GitHub。手机同样与左上 Logo 保持在首行，极窄屏缩小 Logo，链接目标不变。
- About、News、Experience 及经历标题的半调网点与 YIFAN Logo 共用同一玫红；正文、背景网点、头像和校徽不改色。无 JS 时的标题也使用同色。
- 简介删除 Embodied AI，研究方向只保留 Bimanual Manipulation and Dexterous Manipulation。

发布前验收通过：Jekyll 构建无布局警告，所有本地资源存在，无未解析模板，无 noindex，无 Research Interests。浏览器确认半调已绘制、正文为深色原生文字、全部图片加载、无横向溢出或控制台错误。
回退基线：6835012（发布前 main）。发布后继续核对 Pages 部署、线上资源及实际页面。


2026-10-12：按 Overleaf 已选英文 E 版同步 CV PDF、研究经历与三个项目；Mixer 为 random seeds 47/60→56/60，MP 为 60 个冻结随机开发场景配对评测 47/60→58/60。删除 IA 和旧 77% 采样表述。项目详情可展开，沿用原主页样式。

2026-10-12：补充 RoboSyn 代码和 Hugging Face checkpoint 链接；TwinPath Wrist 补充 slai-manipulation 代码链接。

2026-10-12：项目区改为演示画面，删除长分点和 Research details。RoboSyn 使用官方 real-evaluation-videos 的 Sample Loading；LeHome 使用官方 lehome/dataset_challenge_real 的 top_short_merged、right_front、episode 0（0–24.35 秒，循环截止 24.3 秒）；TwinPath Wrist 使用本地论文 Figure 1 的完整抽屉取物三联图。取消 private 和可见来源说明。英文 CV 保留既有内容。

2026-10-12：三个项目改为紧凑展示：桌面左侧信息、右侧 360px 画面，统一对齐和分隔间距；窄屏上下排列。抽屉取物三联图完整显示，视频沿用现有播放方式。

2026-10-12：TwinPath Wrist 主图仅保留后两张机器人取物画面，裁除外围白底、底部编号；两图间保留 8px 透明间距。

2026-10-12：项目画面增加 6px 小圆角；三个项目各补一句简短工作介绍，沿用紧凑布局。

2026-10-12：About 两段同步 GitHub 主页介绍，明确 B.Eng. student、机械与汽车工程学院和预计 2028 年 6 月毕业；移除泛化的 research student 表述。

2026-10-12：三个项目介绍替换为用户选定英文：RoboSyn 的 pi0.5 SFT、感知规划与 policy 残差纠正；TwinPath 的 real2real pipeline infra；LeHome 的 X-VLA data flywheel 和 SR 反馈闭环调参。

2026-10-12：两个比赛的简短介绍前补参赛队名：RoboSyn 为 Competing as MIAA-HCC；LeHome 为 Competed as Ebtech-MIAA。

2026-10-12：三个项目画面使用细密黑白半调网点，沿用原始视频实时播放；项目标题单独加密网点，桌面间距 1.8px、手机 1.6px，保持字形可读。

2026-10-12：About 学校链接文字缩短为 SCUT，保留机械与汽车工程学院名称。

2026-10-12：研究方向精简为用户指定原句 My work focuses on bimanual and dexterous manipulation.，删除后续额外工作概述。

2026-10-12：在黑白网点中加入局部主题玫红：RoboSyn 画面上部的机械臂暗部、LeHome 橙色机械臂、TwinPath 蓝青腕部。RoboSyn 以固定画面区域和明暗筛选，其余以原图色差筛选，保留明暗，实时视频沿用原文件；降低网点对比度以保留细节。

2026-10-12：按用户要求恢复部分原色，LeHome 机械臂恢复橙色、TwinPath 腕部恢复蓝青色、RoboSyn 红黄物体恢复原色；背景仍为黑白网点，网点对比度降低至 1.3。

- 2026-10-12：项目媒体网点周期由 3px 收紧至 2px，保留局部原色，提高机械臂和物体细节的可辨认度。

- 2026-10-12：顶部仅保留 CV 与 GitHub，移除 News / Experience / Projects 导航及 gmail 链接。

- 2026-10-14：河套学院职位改为 Research Assistant (Full-time)。

- 2026-10-19：新增上交 DengLab RA 经历（Oct. 2026–present），导师为邓志杰副教授；来源：https://thudzj.github.io/ 。三段经历统一使用上交、中大、华工校徽。华工按用户最终截图选用既有官网横版 logo 左侧的原版圆形校徽（scut-logo-trimmed.png），浅色背景使用蓝色版，GitHub 深色背景使用白色版，保留字形和比例。同步 GitHub 图文与手机版，保留其他职位和内容。

- 2026-10-19：删除经历区三行实验室名称；每段经历改为一行，左侧校徽与职位，右侧导师与时间，窄屏仍保留左右分工并自动换行。

- 2026-10-20：按用户要求去掉三段经历之间的细分隔线。

- 2026-10-20：三段经历名称统一为 Research Assistant，导师标签统一为 Advisor，保留导师实际职称、链接及日期。

- 2026-10-20：按实际任职机构将三段经历标题改为 RA @ SJTU、RA @ SLAI、RA @ SCUT。

- 2026-10-20：根据用户最新要求，将三段 RA @ 机构名称统一改为 Intern @ SJTU、Intern @ SLAI、Intern @ SCUT。

- 2026-10-20：网点间距略微增加、背景网点略微减淡；三枚校徽统一为黑白。GitHub 同步 Intern 标题、黑白校徽和 ICRA 2027 透明标志。

- 2026-10-20：新增同配色 Loading 遮罩，字体与首帧网点准备后自动退出；支持减少动态效果、无 JavaScript 直接显示和 6 秒超时兜底。

- 2026-10-20：经历区标题改为 Intern，与第一条经历并排对齐；三条职位位置改为实际机构英文全称。三个项目媒体独立显示 Loading、失败提示和 Retry。LeHome 复用既有官方原视频，截取原先循环的前 24.3 秒，压缩为 640×360 H.264 并开启 faststart，改由本站提供；两个视频新增静态封面。站点直连与当前 7890 系统代理均返回 HTTP 200，未复现连接关闭。

- 2026-10-20：三段经历改用“左校徽、右书法校名”的黑白横版校标，保持透明底与原始比例。上交来源 https://vi.sjtu.edu.cn/img/logo-s-w.png ，中大来源 https://www.sysu.edu.cn/images/zhuzhanLOGO.png ，华工复用已选定的 scut-logo-trimmed.png 完整横版。第二条保留真实机构 Shenzhen Loop Area Institute 小字。经历列表的校标、导师、日期区域不再显示网点；Projects 标题与第一个项目顶部对齐，窄屏仍上下排列。

- 2026-10-20：按最新要求删除中大校标下的 Shenzhen Loop Area Institute 可见文字；横版校标恢复上交红、中大绿、华工蓝，并将饱和度控制在 65%。保留 PNG 原有透明通道，移除经历列表的整块浅色背景，让页面网点背景连续透出，校标与导师、日期仍用清晰原图及原生文字。

- 2026-10-20：按用户最终选定截图，仅将个人网站第二条经历的中大校标换为河套学院官网横版彩色透明标识，宽度 370px 且保持比例；导师、日期和其余经历不变。GitHub 资料仓库不修改。

- 2026-10-22：按用户要求将 Intern 三个横版校徽缩小约 20%；桌面上交/华工高度 74→60px，河套宽度 370→300px；手机端宽度调整为所在列的 80%，高度上限 54px。保留原素材与经历文字，更新 CSS 缓存版本。1280px 和 390px 预览三张图均加载，无横向溢出。

- 2026-10-22：三个学校横版标志按 News 标志统一为灰度黑白，保留刚调整的小尺寸；News 的 NeurIPS 标志从 186×80 WebP 换成官方纯路径 SVG（来源 https://neurips.cc/media/Press/NeurIPS_logo.svg），去除编辑器元数据并补充 viewBox，背景透明。预览确认新 SVG 加载、学校样式均为 grayscale(1)，未改变内容和布局。

- 2026-10-22：按用户要求删除华南理工 Intern，经历史保留上交与河套。统一 About / News / Intern / Projects 的内容起点、标题层级与留白；桌面学校标志统一为 170×36px 透明框，手机 132×30px，导师和日期继续右对齐且经历间无细线。项目媒体列缩至 292px，标题使用清晰原生文字；仅顶部姓名与头像保留网点，背景网点减淡，保留项目局部原色与独立 Loading。
  验收：JavaScript 语法检查通过；1280px 四区内容起点均为 x=244px；320、390、900px 无横向溢出，两条经历校标加载正常，手机导师文字自动换行。

- 2026-10-22：用户选择“保留网点艺术风格，整体重新设计”。参考 minimalist-ui 与 frontend-design，改为研究手记版式：网点衬线姓名、网点头像与纸面纹理，Newsreader 标题搭配 Manrope 正文，字体本地托管并附 OFL 许可；研究方向置于简介首行。桌面 News / Intern 并排，校标保持小尺寸黑白、导师和时间在右；项目统一左侧 222px 缩略图与右侧说明，手机改为上下图文。保留四条 News、两条 Intern、三个项目、现有链接和所有锚点；华工 Intern 继续移除。网点渲染仅采样姓名和头像，正文及标题不依赖画布，保留页面和媒体独立 Loading。验收：JS 语法检查通过，320 / 390 / 768 / 1280px 无横向溢出，字体、透明校标和三个项目素材可加载。
